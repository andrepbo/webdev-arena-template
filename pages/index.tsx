import React, { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Types
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface OrderItem extends MenuItem {
  quantity: number;
}

interface PickupTime {
  id: number;
  time: string;
  available: boolean;
}

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
}

interface Customization {
  specialInstructions: string;
  addOns: { name: string; value: string }[];
}

interface OrderState {
  items: OrderItem[];
  total: number;
  pickupTime: string;
  customerInfo: CustomerInfo;
  customizations: { [key: number]: Customization };
}

interface Feedback {
  isOpen: boolean;
  message: string;
  type: "success" | "error";
}

// Menu data
const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Juicy beef patty with lettuce, tomato, and cheddar",
    price: 12.99,
    image: "🍔",
    category: "Burgers",
  },
  {
    id: 2,
    name: "Veggie Wrap",
    description: "Fresh veggies and hummus in a whole wheat wrap",
    price: 9.99,
    image: "🥙",
    category: "Wraps",
  },
  {
    id: 3,
    name: "Chicken Salad",
    description: "Grilled chicken with mixed greens and balsamic vinaigrette",
    price: 11.99,
    image: "🥗",
    category: "Salads",
  },
  {
    id: 4,
    name: "Korean BBQ Tacos",
    description: "Marinated beef with kimchi and cilantro in corn tortillas",
    price: 13.99,
    image: "🌮",
    category: "Specials",
  },
  {
    id: 5,
    name: "Mango Smoothie",
    description: "Fresh mango blended with yogurt and honey",
    price: 4.99,
    image: "🥭",
    category: "Drinks",
  },
  {
    id: 6,
    name: "Fries",
    description: "Crispy golden fries with sea salt",
    price: 3.99,
    image: "🍟",
    category: "Sides",
  },
  {
    id: 7,
    name: "Fish & Chips",
    description: "Beer-battered fish with golden fries",
    price: 14.99,
    image: "🐟",
    category: "Specials",
  },
  {
    id: 8,
    name: "Chocolate Cake",
    description: "Rich chocolate cake slice with whipped cream",
    price: 5.99,
    image: "🍰",
    category: "Desserts",
  },
];

const pickupTimes: PickupTime[] = [
  { id: 1, time: "11:30 AM", available: true },
  { id: 2, time: "11:45 AM", available: true },
  { id: 3, time: "12:00 PM", available: true },
  { id: 4, time: "12:15 PM", available: true },
  { id: 5, time: "12:30 PM", available: true },
];

const createEmptyCustomization = (): Customization => ({
  specialInstructions: "",
  addOns: [],
});

const initialOrderState: OrderState = {
  items: [],
  total: 0,
  pickupTime: "",
  customerInfo: { name: "", phone: "", email: "" },
  customizations: {},
};

const emptyFeedback: Feedback = {
  isOpen: false,
  message: "",
  type: "success",
};

export default function OrderSystem() {
  const [order, setOrder] = useState<OrderState>(initialOrderState);
  const [feedback, setFeedback] = useState<Feedback>(emptyFeedback);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [showCustomization, setShowCustomization] = useState<number | null>(
    null
  );
  const [tempCustomization, setTempCustomization] =
    useState<Customization | null>(null);
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    setCategories([
      "All",
      ...Array.from(new Set(menuItems.map((item) => item.category))),
    ]);
  }, []);

  const filteredMenu =
    activeFilter === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeFilter);

  const calculateTotal = (items: OrderItem[]) =>
    items.reduce((sum, item) => {
      const addonSum = (order.customizations[item.id]?.addOns || []).reduce(
        (a, b) => a + parseFloat(b.value.replace("$", "")),
        0
      );
      return sum + (item.price + addonSum) * item.quantity;
    }, 0);

  const showNotification = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setFeedback({ isOpen: true, message, type });
    setTimeout(() => setFeedback(emptyFeedback), 3000);
  };

  const addToOrder = (item: MenuItem) => {
    const idx = order.items.findIndex((oi) => oi.id === item.id);
    let updated: OrderItem[];
    if (idx >= 0) {
      updated = [...order.items];
      updated[idx].quantity += 1;
    } else {
      updated = [...order.items, { ...item, quantity: 1 }];
    }
    setOrder({ ...order, items: updated, total: calculateTotal(updated) });
    showNotification(`Added ${item.name} to your order!`);
  };

  const removeFromOrder = (itemId: number) => {
    const updated = order.items
      .map((it) =>
        it.id === itemId ? { ...it, quantity: it.quantity - 1 } : it
      )
      .filter((it) => it.quantity > 0);
    setOrder({ ...order, items: updated, total: calculateTotal(updated) });
    const name = order.items.find((it) => it.id === itemId)?.name;
    if (name) showNotification(`Removed one ${name} from your order`, "error");
  };

  const updateQuantity = (itemId: number, qty: number) => {
    const updated = order.items
      .map((it) =>
        it.id === itemId ? { ...it, quantity: Math.max(0, qty) } : it
      )
      .filter((it) => it.quantity > 0);
    setOrder({ ...order, items: updated, total: calculateTotal(updated) });
  };

  const selectPickupTime = (time: string) => {
    setOrder({ ...order, pickupTime: time });
    // no toast here
  };

  const updateCustomerInfo = (field: keyof CustomerInfo, value: string) => {
    setOrder({
      ...order,
      customerInfo: { ...order.customerInfo, [field]: value },
    });
  };

  const openCustomizationModal = (itemId: number) => {
    setShowCustomization(itemId);
    setTempCustomization(
      order.customizations[itemId] || createEmptyCustomization()
    );
  };

  const saveCustomization = () => {
    if (showCustomization !== null && tempCustomization) {
      setOrder({
        ...order,
        customizations: {
          ...order.customizations,
          [showCustomization]: tempCustomization,
        },
        total: calculateTotal(order.items),
      });
      showNotification("Customization saved!");
    }
    setShowCustomization(null);
    setTempCustomization(null);
  };

  const cancelCustomization = () => {
    setShowCustomization(null);
    setTempCustomization(null);
  };

  const placeOrder = () => {
    if (!order.items.length)
      return showNotification("Add items first!", "error");
    if (!order.pickupTime)
      return showNotification("Select pickup time", "error");
    if (
      !order.customerInfo.name ||
      !order.customerInfo.phone ||
      !order.customerInfo.email
    )
      return showNotification("Enter contact info", "error");

    showNotification(
      `Order confirmed! Pickup at ${order.pickupTime}`,
      "success"
    );
    setOrder(initialOrderState);
    // remain on the order screen
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[#f2f2f2] to-[#ffffff] p-4 ${montserrat.className}`}
    >
      <div className="max-w-4xl mx-auto bg-[#f2f2f2] rounded-xl shadow-lg overflow-hidden border border-[#009246]">
        <header className="px-6 py-4 border-b border-[#009246] flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://gimgs2.nohat.cc/thumb/f/640/free-food-truck-icon--m2H7H7b1i8N4d3i8.jpg"
              alt="Food Truck"
              className="h-8 w-auto mr-2"
            />
            <h1 className="text-2xl font-extrabold text-[#009246]">
              FOOD TRUCK
            </h1>
          </div>
          <button
            onClick={() => setShowOrder((v) => !v)}
            className="bg-[#009246] hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm"
          >
            {showOrder ? "Back to Menu" : "Your Order"}
          </button>
        </header>

        {showOrder ? (
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-bold text-[#009246] flex items-center">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </span>
              Your Order
            </h2>
            {order.items.length === 0 ? (
              <p className="text-[#009246]">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4">
                  {order.items.map((item) => {
                    const customization = order.customizations[item.id];
                    return (
                      <div
                        key={item.id}
                        className="border-b border-[#009246] pb-2"
                      >
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-[#009246]">
                            {item.name} × {item.quantity}
                          </p>
                          <span className="font-medium text-[#009246]">
                            $
                            {(
                              (item.price +
                                (customization?.addOns || []).reduce(
                                  (a, b) =>
                                    a + parseFloat(b.value.replace("$", "")),
                                  0
                                )) *
                              item.quantity
                            ).toFixed(2)}
                          </span>
                        </div>
                        {customization && (
                          <div className="ml-4 mt-1 text-sm text-[#009246]">
                            {customization.specialInstructions && (
                              <p>
                                <strong>Instructions:</strong>{" "}
                                {customization.specialInstructions}
                              </p>
                            )}
                            {customization.addOns.length > 0 && (
                              <p>
                                <strong>Add‑Ons:</strong>{" "}
                                {customization.addOns
                                  .map((a) => `${a.name} (${a.value})`)
                                  .join(", ")}
                              </p>
                            )}
                          </div>
                        )}
                        <div className="flex items-center space-x-2 mt-1">
                          <button
                            onClick={() => removeFromOrder(item.id)}
                            aria-label="Remove one"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="0"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, +e.target.value)
                            }
                            className="w-12 text-center text-[#009246] border border-[#009246] rounded"
                          />
                          <button
                            onClick={() => addToOrder(item)}
                            aria-label="Add one"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <h3 className="font-medium text-[#009246] mb-2">
                    Pickup Time
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {pickupTimes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => selectPickupTime(t.time)}
                        disabled={!t.available}
                        className={`py-2 text-sm rounded ${
                          order.pickupTime === t.time
                            ? "bg-[#009246] text-white"
                            : t.available
                            ? "bg-[#ffffff] text-[#009246] hover:bg-[#f2f2f2]"
                            : "bg-[#f2f2f2] text-[#ce2b37] cursor-not-allowed"
                        }`}
                      >
                        {t.time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-[#009246] mb-2">
                    Contact Info
                  </h3>
                  <div className="space-y-4">
                    {(["name", "phone", "email"] as (keyof CustomerInfo)[]).map(
                      (field) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-[#009246] mb-1">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          <input
                            type={field === "email" ? "email" : "text"}
                            value={order.customerInfo[field]}
                            onChange={(e) =>
                              updateCustomerInfo(field, e.target.value)
                            }
                            placeholder={`Your ${field}`}
                            className="w-full px-3 py-2 border border-[#009246] rounded focus:ring-2 focus:ring-[#009246] focus:border-[#009246] text-[#009246]"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#009246]">Total:</span>
                  <span className="text-xl font-bold text-[#009246]">
                    ${order.total.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={placeOrder}
                  className="w-full bg-[#009246] hover:opacity-90 text-white py-3 rounded-lg"
                >
                  Confirm & Place Order
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="p-6 space-y-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === cat
                      ? "bg-[#009246] text-white"
                      : "bg-[#ffffff] text-[#009246] hover:bg-[#f2f2f2]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMenu.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#ffffff] rounded-lg shadow-md p-5 border border-[#009246] hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold text-[#009246]">
                    {item.name}
                  </h3>
                  <p className="text-[#009246] text-sm mt-1">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-[#009246]">
                      ${item.price.toFixed(2)}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => addToOrder(item)}
                        className="bg-[#e00410] hover:opacity-90 text-white p-2 rounded-full accent-[#009246]"
                        aria-label="Add to cart"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => openCustomizationModal(item.id)}
                        className="bg-[#009246] hover:opacity-90 text-white p-2 rounded-full accent-[#009246]"
                        aria-label="Customize item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showCustomization !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#ffffff] rounded-lg p-6 w-full max-w-md overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#009246]">
                Customize Item
              </h3>
              <button
                onClick={cancelCustomization}
                className="text-[#ce2b37] hover:opacity-90"
              >
                ✖️
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#009246] mb-1">
                  Special Instructions
                </label>
                <textarea
                  value={tempCustomization?.specialInstructions || ""}
                  onChange={(e) =>
                    setTempCustomization(
                      (t) => t && { ...t, specialInstructions: e.target.value }
                    )
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-[#009246] rounded focus:ring-2 focus:ring-[#009246] focus:border-[#009246] text-[#009246]"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#009246] mb-2">
                  Add‑Ons
                </h4>
                {[
                  "Extra Cheese ($1.00)",
                  "Avocado ($1.50)",
                  "Bacon ($2.00)",
                ].map((opt) => {
                  const [name, price] = [
                    opt.split(" ($")[0],
                    `$${opt.split("($")[1]}`,
                  ];
                  const checked =
                    tempCustomization?.addOns.some((a) => a.name === name) ||
                    false;
                  return (
                    <div className="flex items-center" key={name}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          if (!tempCustomization) return;
                          const current = tempCustomization;
                          const idx = current.addOns.findIndex(
                            (a) => a.name === name
                          );
                          const updatedAddOns =
                            idx >= 0
                              ? current.addOns.map((a, i) =>
                                  i === idx
                                    ? {
                                        ...a,
                                        value: e.target.checked ? price : "",
                                      }
                                    : a
                                )
                              : [
                                  ...current.addOns,
                                  {
                                    name,
                                    value: e.target.checked ? price : "",
                                  },
                                ];
                          setTempCustomization({
                            ...current,
                            addOns: updatedAddOns,
                          });
                        }}
                        className="mr-2 accent-[#009246]"
                      />
                      <label className="text-sm text-[#009246]">{opt}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={cancelCustomization}
                className="px-4 py-2 border border-[#009246] rounded hover:bg-[#f2f2f2]"
              >
                Cancel
              </button>
              <button
                onClick={saveCustomization}
                className="px-4 py-2 bg-[#009246] text-white rounded hover:opacity-90"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {feedback.isOpen && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white ${
            feedback.type === "success" ? "bg-[#009246]" : "bg-[#ce2b37]"
          }`}
        >
          {feedback.message}
        </div>
      )}
    </div>
  );
}
