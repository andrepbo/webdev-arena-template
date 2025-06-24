import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

// Apply font using inline global style
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    body {
      font-family: 'Inter', sans-serif;
    }
  `;
  document.head.appendChild(style);
}

type Header = {
  items: string[];
};

type SubHeader = {
  items: string[];
};

type Breadcrumb = {
  paths: string[];
};

type ProductImageWithBadge = {
  imageUrl: string;
  imageAlt: string;
  onPlay: () => void;
};

type ProductHeader = {
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
};

type ProductFlavorSelector = {
  flavors: string[];
  selectedFlavor: string;
  onSelect: (flavor: string) => void;
};

type ProductSizeSelector = {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
};

type ProductQuantitySelector = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

type AddToCartButton = {
  onClick: () => void;
};

type Product = {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  flavors: string[];
  sizes: string[];
  imageUrl: string;
  imageAlt: string;
  description: string;
  nutrition: string;
  seller: string;
  warranty: string;
  additionalInfo: string;
  videoUrl: string;
};

type CartItem = {
  product: Product;
  flavor: string;
  size: string;
  quantity: number;
};

type RecentPurchase = {
  productTitle: string;
  customerName: string;
  location: string;
  timeAgo: string;
  flavor: string;
  size: string;
};

type ProductVariantCard = {
  imageSrc: string;
  alt: string;
  bgColor: string;
};

type RelatedProductCard = {
  imageSrc: string;
  title: string;
  price: number;
  label: string;
  discount: string;
  bgColor: string;
};

type OrderConfirmationPanel = {
  onClose: () => void;
};

const PRODUCT_DATA: Product = {
  id: "june-berry-pouch",
  title: "Limited Time Only: June Berry Seasonal Pouch - Sweet & Tart Flavor",
  price: 24.99,
  originalPrice: 39.99,
  rating: 4.8,
  reviewCount: 2163,
  flavors: ["Sweet & Tart", "Honey Crisp", "Wild Forest"],
  sizes: ["6-pack", "12-pack", "24-pack"],
  imageUrl: "https://i.imgur.com/acQBwnJ.png",
  imageAlt: "June Berry Seasonal Pouch",
  description: `Experience the essence of early summer with our limited edition June Berry Seasonal Pouch. We've carefully selected these premium berries at the peak of their flavor to bring you an unmatched taste experience. Each bite delivers a perfect balance of sweetness and tartness, making it an irresistible treat for all. This is a rare opportunity to enjoy a truly seasonal flavor before it's gone!`,
  nutrition: `Energy: 120 kcal, Protein: 2g, Fat: 3g, Carbohydrates: 22g, Fiber: 4g`,
  seller: "Nature's Delight",
  warranty: "Freshness guaranteed",
  additionalInfo:
    "Made with sustainably sourced ingredients. No artificial flavors or preservatives.",
  videoUrl:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
};

const RECENT_PURCHASES: RecentPurchase[] = [
  {
    productTitle: "June Berry Seasonal Pouch",
    customerName: "Sarah J.",
    location: "Seattle, WA",
    timeAgo: "2m ago",
    flavor: "Sweet & Tart",
    size: "12-pack",
  },
  {
    productTitle: "June Berry Seasonal Pouch",
    customerName: "Michael K.",
    location: "Portland, OR",
    timeAgo: "5m ago",
    flavor: "Wild Forest",
    size: "6-pack",
  },
  {
    productTitle: "June Berry Seasonal Pouch",
    customerName: "Emily W.",
    location: "San Francisco, CA",
    timeAgo: "8m ago",
    flavor: "Honey Crisp",
    size: "24-pack",
  },
];

const Header = ({ items }: Header) => (
  <header className="w-full h-16 bg-white px-6 flex items-center justify-between border-b border-gray-200">
    <div className="flex items-center h-full">
      <div className="text-xl font-bold tracking-wide pr-6">K</div>
      <div className="h-full w-px bg-gray-300" />
    </div>
    <div className="flex items-center space-x-6 ml-auto h-full">
      <nav className="flex items-center space-x-6 h-full">
        {items.map((item, index) => (
          <a
            key={index}
            href="#"
            className="text-gray-700 hover:text-black text-sm font-medium"
          >
            {item}
          </a>
        ))}
      </nav>
      <div className="flex items-center h-full">
        <div className="h-full w-px bg-gray-300" />
        <div className="h-full flex items-center px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
            />
          </svg>
        </div>
        <div className="h-full w-px bg-gray-300" />
        <div className="h-full flex items-center pl-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  </header>
);

const SubHeader = ({ items }: SubHeader) => (
  <div className="w-full border-b border-gray-200 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-between space-x-10 h-14 text-sm text-gray-700 overflow-x-auto">
      {items.map((item, index) => (
        <span
          key={index}
          className={`whitespace-nowrap cursor-pointer px-2 sm:px-4 py-1 ${
            item === "Christmas"
              ? "font-semibold text-black relative after:content-[''] after:absolute after:top-6 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-[#9E713C] after:rounded-full"
              : "hover:text-black"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

const Breadcrumb = ({ paths }: Breadcrumb) => (
  <div className="text-sm text-gray-600 px-6 pt-6 flex items-center space-x-2 max-w-7xl mx-auto">
    {paths.map((path, index) => (
      <span
        key={index}
        className={`flex items-center ${
          index === paths.length - 1
            ? "text-gray-400"
            : "font-semibold text-black"
        }`}
      >
        {path}
        {index !== paths.length - 1 && <span className="mx-2">/</span>}
      </span>
    ))}
  </div>
);

const ProductImageWithBadge = ({
  imageUrl,
  imageAlt,
  onPlay,
  videoUrl,
  showVideo,
}: ProductImageWithBadge & { videoUrl: string; showVideo: boolean }) => (
  <div className="relative bg-[#E7DED0] flex items-center justify-center rounded-3xl aspect-square self-start">
    {!showVideo ? (
      <>
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-1/2 rounded-xl object-contain"
        />
        <span className="absolute top-4 left-4 bg-white text-[#E7DED0] w-24 h-24 text-lg flex items-center justify-center font-semibold rounded-full">
          SALE
        </span>
        <button
          onClick={onPlay}
          className="absolute bottom-4 left-4 flex items-center space-x-2 bg-white text-black font-medium py-2.5 px-5 rounded-full hover:bg-gray-100 text-base"
        >
          <span className="flex items-center justify-center w-6 h-6 border rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 fill-black"
              viewBox="0 0 20 20"
            >
              <polygon points="5,3 15,10 5,17" />
            </svg>
          </span>
          <span className="text-base">watch video!</span>
        </button>
      </>
    ) : (
      <video
        src={videoUrl}
        controls
        autoPlay
        className="w-full h-full object-contain rounded-3xl"
      />
    )}
  </div>
);

const ProductHeader = ({
  title,
  rating,
  reviewCount,
  price,
  originalPrice,
}: ProductHeader) => (
  <>
    <p className="uppercase text-sm text-gray-500">Christmas</p>
    <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
    <div className="flex items-center gap-2">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {rating} ({reviewCount} reviews)
      </span>
    </div>
    <div>
      <span className="text-3xl font-bold text-gray-900">
        ${price.toFixed(2)}
      </span>
      {originalPrice > price && (
        <>
          <span className="text-base line-through text-gray-400 ml-3">
            ${originalPrice.toFixed(2)}
          </span>
          <span className="ml-2 text-sm text-red-500">
            Save ${(originalPrice - price).toFixed(2)}
          </span>
        </>
      )}
    </div>
  </>
);

const ProductFlavorSelector = ({
  flavors,
  selectedFlavor,
  onSelect,
}: ProductFlavorSelector) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-900 mb-1">
      Choose your taste
    </h3>
    <div className="flex gap-2 flex-wrap">
      {flavors.map((flavor) => (
        <button
          key={flavor}
          onClick={() => onSelect(flavor)}
          className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
            selectedFlavor === flavor
              ? "bg-[#F4D57E] text-black"
              : "bg-[#E7DED0] text-[#5C5C6A]"
          }`}
        >
          {flavor}
        </button>
      ))}
    </div>
  </div>
);

const ProductSizeSelector = ({
  sizes,
  selectedSize,
  onSelect,
}: ProductSizeSelector) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-900 mb-1">Pouch size</h3>
    <div className="flex gap-2 flex-wrap">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSelect(size)}
          className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
            selectedSize === size
              ? "bg-[#F4D57E] text-black"
              : "bg-[#E7DED0] text-[#5C5C6A]"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  </div>
);

const ProductQuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
}: ProductQuantitySelector) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-900 mb-1">Quantity</h3>
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrease}
        className="w-10 h-10 rounded-full bg-[#F4D57E] text-black font-bold text-xl flex items-center justify-center"
      >
        -
      </button>
      <span className="w-12 h-10 bg-[#E7DED0] rounded-full flex items-center justify-center text-gray-900 font-medium">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className="w-10 h-10 rounded-full bg-[#F4D57E] text-black font-bold text-xl flex items-center justify-center"
      >
        +
      </button>
    </div>
  </div>
);

const ProductBenefits = () => (
  <div className="space-y-3 mt-6">
    <div className="flex items-center space-x-3">
      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-[#BFA2FF]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-[#BFA2FF]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0m8.486-4.243a8 8 0 11-11.314 0"
          />
        </svg>
      </span>
      <p className="text-sm text-gray-900 font-medium">Insanely delicious</p>
    </div>
    <div className="flex items-center space-x-3">
      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7h18M3 12h18M3 17h18"
          />
        </svg>
      </span>
      <p className="text-sm text-gray-900 font-medium">
        Shipped right to your door
      </p>
    </div>
    <div className="flex items-center space-x-3">
      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 2c-1.104 0-2 .896-2 2v6h4v-6c0-1.104-.896-2-2-2z"
          />
        </svg>
      </span>
      <p className="text-sm text-gray-900 font-medium">100% organic, non-GMO</p>
    </div>
  </div>
);

const ProductVariantCard = ({ imageSrc, alt, bgColor }: ProductVariantCard) => (
  <div
    className="w-44 h-44 rounded-3xl flex items-center justify-center"
    style={{ backgroundColor: bgColor }}
  >
    <img src={imageSrc} alt={alt} className="w-28 h-auto object-contain" />
  </div>
);

const RelatedProductCard = ({
  imageSrc,
  title,
  price,
  label,
  discount,
  bgColor,
}: RelatedProductCard) => (
  <div className="rounded-3xl border border-gray-200 p-4 w-full max-w-xs text-center">
    <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: bgColor }}>
      <img
        src={imageSrc}
        alt={title}
        className="mx-auto w-32 h-auto object-contain"
      />
    </div>
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <span className="text-lg font-semibold text-gray-900">
        ${price.toFixed(2)}
      </span>
    </div>
    <div className="text-sm text-gray-700 flex items-center justify-start gap-2 mb-4">
      <span className="bg-green-100 text-green-600 font-semibold text-xs px-2 py-0.5 rounded-full">
        {discount}
      </span>
      {label}
    </div>
    <button className="w-full bg-[#EAE6FD] text-[#7B5EFF] font-semibold text-center rounded-xl py-3 mt-4 hover:bg-[#dcd4fc] transition-colors text-sm">
      Try it now!
    </button>
  </div>
);

const AddToCartButton = ({ onClick }: AddToCartButton) => (
  <button
    onClick={onClick}
    className="w-full bg-[#201E20] text-white py-3 rounded-full font-semibold text-base capitalize"
  >
    add to cart
  </button>
);

const SocialProof = () => (
  <div className="flex items-center mt-4 space-x-3">
    <div className="flex -space-x-2">
      <img
        src="https://randomuser.me/api/portraits/women/1.jpg"
        alt="User 1"
        className="w-8 h-8 rounded-full border-2 border-white"
      />
      <img
        src="https://randomuser.me/api/portraits/women/2.jpg"
        alt="User 2"
        className="w-8 h-8 rounded-full border-2 border-white"
      />
      <img
        src="https://randomuser.me/api/portraits/women/3.jpg"
        alt="User 3"
        className="w-8 h-8 rounded-full border-2 border-white"
      />
      <div className="w-8 h-8 rounded-full bg-[#EAE6FD] text-[#635BFF] text-sm font-semibold flex items-center justify-center border-2 border-white">
        +10
      </div>
    </div>
    <p className="text-sm text-gray-900 font-medium">
      13 other people purchased it today
    </p>
  </div>
);

const OrderConfirmationPanel = ({ onClose }: OrderConfirmationPanel) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-3xl p-10 text-center w-80">
      <div className="mb-4 text-4xl">👏</div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">
        Your order is placed!
      </h2>
      <p className="text-sm text-gray-500 mb-6">Thank you for your payment.</p>
      <button
        onClick={onClose}
        className="bg-black text-white rounded-full px-6 py-2 font-semibold text-sm"
      >
        Return to shop
      </button>
    </div>
  </div>
);

export default function ProductDetail() {
  const headerItems = ["Home", "App", "Shop", "About"];
  const subHeaderItems = [
    "Shop",
    "Christmas",
    "New Arrivals",
    "Popular",
    "Men",
    "Women",
    "Kids",
    "Pets",
    "Accessories",
    "Cooking",
  ];
  const breadcrumbPaths = ["Products", "Christmas", "Cooking"];

  const [selectedFlavor, setSelectedFlavor] = useState<string>(
    PRODUCT_DATA.flavors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    PRODUCT_DATA.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [showOrderConfirmation, setShowOrderConfirmation] =
    useState<boolean>(false);
  const [, setRecentPurchases] = useState<RecentPurchase[]>(RECENT_PURCHASES);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newPurchase: RecentPurchase = {
        productTitle: PRODUCT_DATA.title,
        customerName: `${faker.person.firstName()} ${faker.person
          .lastName()
          .charAt(0)}.`,
        location: `${faker.location.city()}, ${faker.location.state()}`,
        timeAgo: `${Math.floor(Math.random() * 10) + 1}m ago`,
        flavor:
          PRODUCT_DATA.flavors[
            Math.floor(Math.random() * PRODUCT_DATA.flavors.length)
          ],
        size: PRODUCT_DATA.sizes[
          Math.floor(Math.random() * PRODUCT_DATA.sizes.length)
        ],
      };
      setRecentPurchases((prev) => [newPurchase, ...prev].slice(0, 3));
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      product: PRODUCT_DATA,
      flavor: selectedFlavor,
      size: selectedSize,
      quantity,
    };
    setCartItems((prev) => [...prev, newItem]);
    setShowOrderConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header items={headerItems} />
      <SubHeader items={subHeaderItems} />
      <Breadcrumb paths={breadcrumbPaths} />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <ProductImageWithBadge
              imageUrl={PRODUCT_DATA.imageUrl}
              imageAlt={PRODUCT_DATA.imageAlt}
              onPlay={() => setShowVideo(true)}
              videoUrl={PRODUCT_DATA.videoUrl}
              showVideo={showVideo}
            />
            <div className="flex justify-between w-full mt-6 gap-4">
              <ProductVariantCard
                imageSrc="https://i.imgur.com/ynqwc8f.png"
                alt="Yellow variant"
                bgColor="#FDE4A6"
              />
              <ProductVariantCard
                imageSrc="https://i.imgur.com/0bCZShN.png"
                alt="Purple variant"
                bgColor="#DCE4FF"
              />
              <ProductVariantCard
                imageSrc="https://i.imgur.com/7nlijqc.png"
                alt="Pink variant"
                bgColor="#FAD9D6"
              />
            </div>
          </div>
          <div className="space-y-6">
            <ProductHeader
              title={PRODUCT_DATA.title}
              rating={PRODUCT_DATA.rating}
              reviewCount={PRODUCT_DATA.reviewCount}
              price={PRODUCT_DATA.price}
              originalPrice={PRODUCT_DATA.originalPrice}
            />
            <ProductFlavorSelector
              flavors={PRODUCT_DATA.flavors}
              selectedFlavor={selectedFlavor}
              onSelect={setSelectedFlavor}
            />
            <ProductSizeSelector
              sizes={PRODUCT_DATA.sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />
            <ProductQuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity(quantity + 1)}
              onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
            />
            <AddToCartButton onClick={handleAddToCart} />
            <SocialProof />
            <ProductBenefits />
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6 text-center">
            You may also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            <RelatedProductCard
              imageSrc="https://i.imgur.com/0bCZShN.png"
              title="Fruity Nut"
              price={7.9}
              discount="-20%"
              label="New taste available!"
              bgColor="#EAE6FD"
            />
            <RelatedProductCard
              imageSrc="https://i.imgur.com/NkiVXc1.png"
              title="Berry Crunch"
              price={8.5}
              discount="-15%"
              label="Limited edition!"
              bgColor="#ebe8f4"
            />
            <RelatedProductCard
              imageSrc="https://i.imgur.com/8j88TJD.png"
              title="Tropical Mix"
              price={9.2}
              discount="-10%"
              label="Summer special!"
              bgColor="#DCE4FF"
            />
          </div>
        </div>
      </main>
      {showOrderConfirmation && (
        <OrderConfirmationPanel
          onClose={() => setShowOrderConfirmation(false)}
        />
      )}
    </div>
  );
}
