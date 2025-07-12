import { Toaster as DefaultToaster } from "@/components/ui/toaster";
import {
  Banknote,
  Building,
  Car,
  CheckCircle,
  CreditCard,
  DollarSign,
  Edit,
  FileText,
  Gamepad2,
  Heart,
  Home,
  LogOut as LogoutIcon,
  MoreHorizontal,
  PiggyBank,
  Plane,
  Plus,
  Settings as SettingsIcon,
  ShieldCheck,
  ShoppingCart,
  Target,
  TrendingDown,
  TrendingUp,
  User,
  Utensils,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { Inter } from "next/font/google";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const inter = Inter({ subsets: ["latin"], display: "swap" });

type BudgetItem = {
  id: string;
  name: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string;
  frequency?: "one-time" | "weekly" | "monthly" | "yearly";
  notes?: string;
};

type BudgetSummary = {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  savingsRate: number;
  categories: { name: string; value: number }[];
  monthlyData: { month: string; income: number; expenses: number }[];
};

type NavigationItem = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
};

type CurrentView =
  | "dashboard"
  | "income"
  | "budgets"
  | "goals"
  | "reports"
  | "transactions";

const initialBudgetData: BudgetItem[] = [
  {
    id: "1",
    name: "Monthly Salary",
    amount: 2800,
    category: "Salary / Wages",
    type: "income",
    date: "2025-07-05",
    frequency: "monthly",
  },
  {
    id: "2",
    name: "Freelance Gig",
    amount: 750,
    category: "Freelance",
    type: "income",
    date: "2025-07-02",
    frequency: "one-time",
  },
  {
    id: "3",
    name: "Stock Dividend",
    amount: 125.4,
    category: "Investment",
    type: "income",
    date: "2025-06-28",
    frequency: "monthly",
  },
  {
    id: "4",
    name: "Birthday Gift",
    amount: 100,
    category: "Gift",
    type: "income",
    date: "2025-06-25",
    frequency: "one-time",
  },
  {
    id: "5",
    name: "Restaurant",
    amount: 45.5,
    category: "Food",
    type: "expense",
    date: "2025-07-10",
    frequency: "one-time",
  },
  {
    id: "6",
    name: "Groceries",
    amount: 120.3,
    category: "Shopping",
    type: "expense",
    date: "2025-07-08",
    frequency: "weekly",
  },
  {
    id: "7",
    name: "Utilities",
    amount: 88,
    category: "Bills",
    type: "expense",
    date: "2025-07-07",
    frequency: "monthly",
  },
];

const navigationItems: NavigationItem[] = [
  { id: "dashboard", name: "Dashboard", icon: Home },
  { id: "transactions", name: "Transactions", icon: CreditCard },
  { id: "budgets", name: "Budgets", icon: PiggyBank },
  { id: "goals", name: "Goals", icon: Target },
  { id: "reports", name: "Reports", icon: FileText },
];

const categoryIcons: {
  [key: string]: React.ComponentType<{ className?: string }>;
} = {
  Food: Utensils,
  Shopping: ShoppingCart,
  Transport: Car,
  Bills: Building,
  Health: Heart,
  Fun: Gamepad2,
  Travel: Plane,
  Other: MoreHorizontal,
};

type ToastType = "success" | "error" | "info" | "warning";

type Toast = {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
};

type ToastContextType = {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const useCustomToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useCustomToast must be used within ToastProvider");
  return ctx;
};

const CustomToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now().toString();
    const newToast = { ...toast, id, duration: toast.duration || 3000 };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, newToast.duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

const CustomToast: React.FC<{
  toast: Toast;
  onRemove: (id: string) => void;
}> = ({ toast, onRemove }) => {
  const typeClasses = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-white",
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-lg max-w-sm sm:max-w-md w-full ${
        typeClasses[toast.type]
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">{toast.title}</div>
          {toast.message && (
            <div className="text-sm opacity-90 break-words">
              {toast.message}
            </div>
          )}
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="ml-4 text-white hover:opacity-70 flex-shrink-0"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const CustomToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCustomToast();

  return (
    <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 z-[9999] space-y-2">
      {toasts.map((toast) => (
        <CustomToast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

function ThemedToaster() {
  return (
    <>
      <DefaultToaster />
      <CustomToastContainer />
      <style jsx global>{`
        .themed-toast {
          background: #1f2937;
          color: #f9fafb;
          border-radius: 0.75rem;
          box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.12);
          border: 1px solid #374151;
        }
        .themed-toast button[toast-close] {
          color: #f9fafb;
          opacity: 0.7;
        }
        .themed-toast button[toast-close]:hover {
          color: #f9fafb;
          opacity: 1;
        }

        :root {
          --bg: #f6f8fa;
          --card: #fff;
          --sidebar: #fff;
          --border: #e5e7eb;
          --text: #101e13;
          --text-muted: #4b5563;
          --accent: #16c784;
          --accent-hover: #14a06b;
          --accent-bg: #e6f9f0;
          --error: #ef4444;
        }
        .dark {
          --bg: #112617;
          --card: #12391a;
          --sidebar: #000;
          --border: #174c22;
          --text: #f9fafb;
          --text-muted: #b6f5c6;
          --accent: #16ff6b;
          --accent-hover: #1aff6b;
          --accent-bg: #174c22;
          --error: #ef4444;
        }
        html {
          background: var(--bg);
          color: var(--text);
        }
        body {
          background: var(--bg);
          color: var(--text);
        }
      `}</style>
    </>
  );
}

function useTheme(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return [theme, setTheme];
}

const FinTrackDashboardContent = () => {
  const [budgetData, setBudgetData] = useState<BudgetItem[]>(initialBudgetData);
  const [currentView, setCurrentView] = useState<CurrentView>("dashboard");
  const [newItem, setNewItem] = useState<Partial<BudgetItem>>({
    type: "expense",
    date: new Date().toISOString().split("T")[0],
    frequency: "one-time",
  });
  const [showAddIncomeForm, setShowAddIncomeForm] = useState(false);
  const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { addToast } = useCustomToast();
  useTheme();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (asideRef.current) {
      if (sidebarOpen) {
        const firstFocusable = asideRef.current.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        if (firstFocusable) {
          firstFocusable.focus();
        }
      } else {
        const triggerButton = document.querySelector(
          '[aria-label="Open sidebar"]'
        ) as HTMLElement;
        if (triggerButton) {
          triggerButton.focus();
        }
      }
    }
  }, [sidebarOpen]);

  const calculateSummary = (): BudgetSummary => {
    const totalIncome = budgetData
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpenses = budgetData
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);

    const netIncome = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (netIncome / totalIncome) * 100 : 0;

    const categoriesObj: { [key: string]: number } = {};
    budgetData.forEach((item) => {
      if (item.type === "expense") {
        if (!categoriesObj[item.category]) {
          categoriesObj[item.category] = 0;
        }
        categoriesObj[item.category] += item.amount;
      }
    });

    const categories = Object.entries(categoriesObj)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    const monthlyDataObj: {
      [key: string]: { income: number; expenses: number };
    } = {};
    budgetData.forEach((item) => {
      const month = new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
      });

      if (!monthlyDataObj[month]) {
        monthlyDataObj[month] = { income: 0, expenses: 0 };
      }

      if (item.type === "income") {
        monthlyDataObj[month].income += item.amount;
      } else {
        monthlyDataObj[month].expenses += item.amount;
      }
    });

    const monthlyData = Object.entries(monthlyDataObj)
      .map(([month, data]) => ({ month, ...data }))
      .sort((a, b) => a.month.localeCompare(b.month));

    return {
      totalIncome,
      totalExpenses,
      netIncome,
      savingsRate,
      categories,
      monthlyData,
    };
  };

  const summary = calculateSummary();

  const handleAddItem = () => {
    if (!newItem.name || !newItem.amount || !newItem.category) return;

    const newId = Date.now().toString();
    setBudgetData([
      ...budgetData,
      {
        id: newId,
        ...(newItem as Omit<BudgetItem, "id">),
        amount: Math.abs(newItem.amount || 0),
      },
    ]);
    setNewItem({
      type: "expense",
      date: new Date().toISOString().split("T")[0],
      frequency: "one-time",
    });
    setShowAddIncomeForm(false);
    setShowAddTransactionForm(false);

    addToast({
      type: "success",
      title: `${
        newItem.type === "income" ? "Income" : "Transaction"
      } added successfully`,
      duration: 3000,
    });
  };

  const recentTransactions = budgetData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const recentIncome = budgetData
    .filter((item) => item.type === "income")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const renderNavigation = () => (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden={!sidebarOpen}
      />
      <aside
        ref={asideRef}
        className={`fixed z-50 top-0 left-0 h-full lg:h-screen w-64 bg-[var(--sidebar)] border-r border-[var(--border)] flex flex-col transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        tabIndex={sidebarOpen ? 0 : -1}
        aria-hidden={isClient && !sidebarOpen && window.innerWidth < 1024}
      >
        <div className="p-6 border-b border-[var(--border)] flex items-center space-x-3">
          <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-[var(--text)]" />
          </div>
          <span className="text-xl font-bold text-[var(--text)]">FinTrack</span>
        </div>
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id as CurrentView);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    currentView === item.id
                      ? "bg-[var(--accent-bg)] text-[var(--text)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--accent-bg)] hover:text-[var(--text)]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>
        </nav>
        <div className="mt-auto p-4 flex flex-col gap-2">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-[var(--text-muted)] hover:bg-[var(--accent-bg)] hover:text-[var(--text)] transition-all duration-200"
            onClick={() =>
              addToast({
                type: "info",
                title: "Feature coming soon",
              })
            }
          >
            <SettingsIcon className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-[var(--text-muted)] hover:bg-[var(--accent-bg)] hover:text-[var(--text)] transition-all duration-200"
            onClick={() =>
              addToast({
                type: "info",
                title: "Feature coming soon",
              })
            }
          >
            <LogoutIcon className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );

  const renderHeader = () => {
    const isDashboard = currentView === "dashboard";
    const isTransactions = currentView === "transactions";
    const isBudgets = currentView === "budgets";
    const isGoals = currentView === "goals";
    const getTitle = () => {
      switch (currentView) {
        case "dashboard":
          return "Dashboard";
        case "transactions":
          return "Transactions";
        case "income":
          return "Manage Income";
        case "budgets":
          return "Budget Performance";
        case "goals":
          return "Savings Goals";
        case "reports":
          return "Financial Reports";
        default:
          return "Dashboard";
      }
    };
    const getSubtitle = () => {
      switch (currentView) {
        case "dashboard":
          return "Here's your financial overview for this month.";
        case "transactions":
          return "Add, view, and manage your transactions.";
        case "income":
          return "Add, view, and manage your income sources.";
        case "budgets":
          return "Your monthly spending and savings overview.";
        case "goals":
          return "Track your progress and stay motivated on your financial journey.";
        case "reports":
          return "Analyze your income and spending patterns.";
        default:
          return "";
      }
    };
    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 mt-2 w-full">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden p-2 mr-2 rounded-md text-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <svg
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
                {getTitle()}
              </h1>
              <p className="text-[var(--text-muted)] text-base mt-1">
                {getSubtitle()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          {(isDashboard || isTransactions || isBudgets || isGoals) && (
            <button
              onClick={
                isDashboard || isTransactions
                  ? () => {
                      setNewItem({
                        type: isDashboard ? "expense" : "expense",
                        date: new Date().toISOString().split("T")[0],
                        frequency: "one-time",
                      });
                      setShowAddTransactionForm(true);
                    }
                  : () => {
                      addToast({
                        type: "info",
                        title: "Feature coming soon",
                      });
                    }
              }
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black px-5 py-2.5 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 shadow-md w-full sm:w-auto justify-center"
            >
              <Plus className="w-5 h-5" />
              <span>
                {isDashboard && "Add Expense"}
                {isTransactions && "Add Transaction"}
                {isBudgets && "Create Budget"}
                {isGoals && "Create new Goal"}
              </span>
            </button>
          )}
          <div className="flex items-center space-x-3 justify-end">
            <div className="w-8 h-8 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-[var(--text)]" />
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-[var(--text)]">
                Alex Johnson
              </div>
              <div className="text-xs text-[var(--text-muted)]">
                alex.jo@example.com
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-1 lg:col-span-1 flex flex-col gap-6 lg:gap-0 relative">
          <div className="bg-[var(--card)] rounded-xl p-6 border border-[var(--border)] flex flex-row items-center justify-between h-full">
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[var(--text-muted)] mb-1">
                Total Balance
              </p>
              <p className="text-3xl lg:text-2xl xl:text-3xl font-bold text-[var(--text)] leading-tight">
                $
                {(summary.totalIncome - summary.totalExpenses).toLocaleString(
                  undefined,
                  { minimumFractionDigits: 2 }
                )}
              </p>
              <p className="text-sm font-medium text-[var(--accent)] mt-1">
                +2.5% vs last month
              </p>
            </div>
            <div className="p-3 bg-[var(--accent)]/20 rounded-xl ml-4 absolute top-4 right-4">
              <Wallet className="w-7 h-7 text-[var(--accent)]" />
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-1 flex flex-col gap-6 lg:gap-0 relative">
          <div className="bg-[var(--card)] rounded-xl p-6 border border-[var(--border)] flex flex-row items-center justify-between h-full">
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[var(--text-muted)] mb-1">
                Income
              </p>
              <p className="text-3xl lg:text-2xl xl:text-3xl font-bold text-[var(--text)] leading-tight">
                $
                {summary.totalIncome.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="text-sm font-medium text-[var(--text-muted)] mt-1">
                This Month
              </p>
            </div>
            <div className="p-3 bg-[var(--accent)]/20 rounded-xl ml-4 absolute top-4 right-4">
              <TrendingDown className="w-7 h-7 text-[var(--accent)]" />
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-1 flex flex-col gap-6 lg:gap-0 relative">
          <div className="bg-[var(--card)] rounded-xl p-6 border border-[var(--border)] flex flex-row items-center justify-between h-full">
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[var(--text-muted)] mb-1">
                Expenses
              </p>
              <p className="text-3xl lg:text-2xl xl:text-3xl font-bold text-[var(--text)] leading-tight">
                $
                {summary.totalExpenses.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="text-sm font-medium text-[var(--text-muted)] mt-1">
                This Month
              </p>
            </div>
            <div className="p-3 bg-[var(--error)]/20 rounded-xl ml-4 absolute top-4 right-4">
              <TrendingUp className="w-7 h-7 text-[var(--error)]" />
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-1 flex flex-col gap-6 lg:gap-0">
          <div className="bg-[var(--card)] rounded-xl p-6 border border-[var(--border)] h-full flex flex-col">
            <h3 className="text-lg font-bold text-[var(--text)] mb-4">
              Recent Transactions
            </h3>
            <div className="flex flex-col gap-3">
              {recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[var(--accent-bg)]">
                      {tx.category === "Food" && (
                        <Utensils className="w-5 h-5 text-[var(--accent)]" />
                      )}
                      {tx.category === "Shopping" && (
                        <ShoppingCart className="w-5 h-5 text-[var(--accent)]" />
                      )}
                      {tx.category === "Utilities" && (
                        <Zap className="w-5 h-5 text-[var(--accent)]" />
                      )}
                      {tx.category === "Salary / Wages" && (
                        <Banknote className="w-5 h-5 text-[var(--accent)]" />
                      )}
                    </div>
                    <div>
                      <div className="text-base lg:text-sm xl:text-base font-semibold text-[var(--text)]">
                        {tx.name}
                      </div>
                      <div className="text-xs lg:text-[10px] xl:text-xs text-[var(--text-muted)]">
                        {new Date(tx.date).toLocaleDateString(undefined, {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`font-bold text-base ${
                      tx.type === "expense"
                        ? "text-[var(--error)]"
                        : "text-[var(--accent)]"
                    }`}
                  >
                    {tx.type === "expense" ? "-" : "+"}$
                    {tx.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 bg-[var(--card)] rounded-xl p-6 border border-[var(--border)]">
          <h3 className="text-lg font-bold text-[var(--text)] mb-4">
            Spending Breakdown
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={summary.categories}
                layout="vertical"
                margin={{ left: 40, right: 20, top: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  type="number"
                  stroke="var(--text-muted)"
                  fontSize={13}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="var(--text-muted)"
                  fontSize={15}
                  axisLine={false}
                  tickLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--text)",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="var(--accent)"
                  barSize={18}
                  radius={[8, 8, 8, 8]}
                >
                  {summary.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="var(--accent)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-1 bg-[var(--card)] rounded-xl p-6 border border-[var(--border)] flex flex-col justify-between">
          <h3 className="text-lg font-bold text-[var(--text)] mb-4">
            Savings Goals
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-semibold text-[var(--text)]">
                  New Car
                </span>
                <span className="text-base text-[var(--text-muted)]">
                  $1,200 / $5,000
                </span>
              </div>
              <div className="w-full bg-[var(--accent-bg)] rounded-full h-2">
                <div
                  className="bg-[var(--accent)] h-2 rounded-full"
                  style={{ width: "24%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-semibold text-[var(--text)]">
                  Vacation
                </span>
                <span className="text-base text-[var(--text-muted)]">
                  $1,800 / $2,000
                </span>
              </div>
              <div className="w-full bg-[var(--accent-bg)] rounded-full h-2">
                <div
                  className="bg-[var(--accent)] h-2 rounded-full"
                  style={{ width: "90%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIncomeForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--card)] rounded-xl p-8 w-full max-w-2xl mx-4 border border-[var(--border)]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[var(--text)]">
            Add New Income
          </h2>
          <button
            onClick={() => setShowAddIncomeForm(false)}
            className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
              Income Source
            </label>
            <input
              type="text"
              value={newItem.name || ""}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="e.g., Monthly Salary, Freelance Project"
              className="w-full px-4 py-3 bg-[var(--accent-bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]">
                  $
                </span>
                <input
                  type="number"
                  value={newItem.amount || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, amount: Number(e.target.value) })
                  }
                  placeholder="2,800.00"
                  className="w-full pl-8 pr-4 py-3 bg-[var(--accent-bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                Date Received
              </label>
              <input
                type="date"
                value={newItem.date}
                onChange={(e) =>
                  setNewItem({ ...newItem, date: e.target.value })
                }
                className="w-full px-4 py-3 bg-[var(--accent-bg)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                Frequency
              </label>
              <select
                value={newItem.frequency || "one-time"}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    frequency: e.target.value as BudgetItem["frequency"],
                  })
                }
                className="w-full px-4 py-3 bg-[var(--accent-bg)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
              >
                <option value="one-time">One-time</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                Category
              </label>
              <select
                value={newItem.category || ""}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
                className="w-full px-4 py-3 bg-[var(--accent-bg)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="Salary / Wages">Salary / Wages</option>
                <option value="Freelance">Freelance</option>
                <option value="Investment">Investment</option>
                <option value="Gift">Gift</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={newItem.notes || ""}
              onChange={(e) =>
                setNewItem({ ...newItem, notes: e.target.value })
              }
              placeholder="Additional details about this income..."
              rows={3}
              className="w-full px-4 py-3 bg-[var(--accent-bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent resize-none"
            />
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <button
              onClick={() => {
                setNewItem({ ...newItem, type: "income" });
                handleAddItem();
              }}
              className="flex-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text)] py-3 px-6 rounded-lg font-medium transition-colors duration-200"
            >
              Save Income
            </button>
            <button
              onClick={() => setShowAddIncomeForm(false)}
              className="px-6 py-3 bg-[var(--accent-bg)] hover:bg-[var(--accent)] text-[var(--text-muted)] rounded-lg font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTransactionForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--card)] rounded-xl p-8 w-full max-w-2xl mx-4 border border-[var(--border)]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[var(--text)]">
            Add Transaction
          </h2>
          <button
            onClick={() => setShowAddTransactionForm(false)}
            className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex bg-[var(--accent-bg)] rounded-lg p-1">
            <button
              onClick={() => setNewItem({ ...newItem, type: "expense" })}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                newItem.type === "expense"
                  ? "bg-[var(--error)] text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              Expense
            </button>
            <button
              onClick={() => setNewItem({ ...newItem, type: "income" })}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                newItem.type === "income"
                  ? "bg-[var(--accent)] text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              Income
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]">
                $
              </span>
              <input
                type="number"
                value={newItem.amount || ""}
                onChange={(e) =>
                  setNewItem({ ...newItem, amount: Number(e.target.value) })
                }
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 bg-[var(--accent-bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-2xl font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
              Category
            </label>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(categoryIcons).map(([category, Icon]) => (
                <button
                  key={category}
                  onClick={() => setNewItem({ ...newItem, category })}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                    newItem.category === category
                      ? "border-[var(--accent)] bg-[var(--accent)]/20"
                      : "border-[var(--border)] bg-[var(--accent-bg)] hover:border-[var(--accent)]"
                  }`}
                >
                  <Icon className="w-6 h-6 text-[var(--accent)] mb-2" />
                  <span className="text-xs text-[var(--text-muted)] font-medium">
                    {category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                Description
              </label>
              <input
                type="text"
                value={newItem.name || ""}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                placeholder="e.g., Weekly groceries"
                className="w-full px-4 py-3 bg-[var(--accent-bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                Date
              </label>
              <input
                type="date"
                value={newItem.date}
                onChange={(e) =>
                  setNewItem({ ...newItem, date: e.target.value })
                }
                className="w-full px-4 py-3 bg-[var(--accent-bg)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <button
              onClick={handleAddItem}
              className="flex-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text)] py-3 px-6 rounded-lg font-medium transition-colors duration-200"
            >
              Add Transaction
            </button>
            <button
              onClick={() => setShowAddTransactionForm(false)}
              className="px-6 py-3 bg-[var(--accent-bg)] hover:bg-[var(--accent)] text-[var(--text-muted)] rounded-lg font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderManageIncome = () => (
    <div className="space-y-8">
      <div className="bg-[#12391a] rounded-xl p-6 border border-[#174c22]">
        <h3 className="text-lg font-semibold text-[#fff] mb-6">
          Recent Income
        </h3>
        <div className="space-y-4">
          {recentIncome.map((income) => (
            <div
              key={income.id}
              className="flex items-center justify-between p-4 bg-[#174c22] rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-[#16ff6b]/20 rounded-lg">
                  <Banknote className="w-5 h-5 text-[#16ff6b]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#fff]">{income.name}</h4>
                  <p className="text-sm text-[#b6f5c6]">
                    {new Date(income.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#16ff6b]">
                  +${income.amount.toLocaleString()}
                </p>
                <p className="text-sm text-[#b6f5c6]">{income.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBudgets = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#12391a] rounded-xl p-6 border border-[#174c22]">
              <h3 className="text-lg font-semibold text-[#fff] mb-2">
                Total Expenses
              </h3>
              <p className="text-3xl font-bold text-[#ef4444]">
                ${summary.totalExpenses.toLocaleString()}
              </p>
              <p className="text-sm text-[#b6f5c6] mt-1">July 2025</p>
            </div>
            <div className="bg-[#12391a] rounded-xl p-6 border border-[#174c22]">
              <h3 className="text-lg font-semibold text-[#fff] mb-2">
                Total Savings
              </h3>
              <p className="text-3xl font-bold text-[#16ff6b]">
                $
                {(summary.totalIncome - summary.totalExpenses).toLocaleString()}
              </p>
              <p className="text-sm text-[#16ff6b] mt-1">+5.2% vs last month</p>
            </div>
          </div>
          <div className="bg-[#12391a] rounded-xl p-6 border border-[#174c22]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#fff]">
                Budget Categories
              </h3>
              <div className="text-sm text-[#b6f5c6]">Sort by: Name</div>
            </div>
            <div className="space-y-4">
              {summary.categories.map((category) => {
                const budgetLimit = category.value * 1.2;
                const percentage = (category.value / budgetLimit) * 100;
                const isOverBudget = percentage > 100;
                return (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-[#16ff6b]/20 rounded-lg">
                          <Utensils className="w-4 h-4 text-[#16ff6b]" />
                        </div>
                        <span className="text-[#fff] font-medium">
                          {category.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span
                          className={`font-bold ${
                            isOverBudget ? "text-[#ef4444]" : "text-[#fff]"
                          }`}
                        >
                          ${category.value.toFixed(2)}
                        </span>
                        <span className="text-[#b6f5c6]">
                          {" "}
                          / ${budgetLimit.toFixed(0)}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-[#174c22] rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          isOverBudget ? "bg-[#ef4444]" : "bg-[#16ff6b]"
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-[#12391a] rounded-xl p-6 border border-[#174c22] flex flex-col items-center">
            <h3 className="text-lg font-semibold text-[#fff] mb-4">
              Monthly Flow
            </h3>
            <p className="text-[#b6f5c6] mb-2">Income vs Expenses & Savings</p>
            <div className="w-full flex flex-col items-center">
              <div className="w-40 h-40 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={[
                        {
                          name: "Savings",
                          value: summary.totalIncome - summary.totalExpenses,
                        },
                        { name: "Expenses", value: summary.totalExpenses },
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#16ff6b"
                    >
                      <Cell key="savings" fill="#16ff6b" />
                      <Cell key="expenses" fill="#ef4444" />
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center justify-between w-full mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-[#16ff6b]"></span>
                    <span className="text-[#b6f5c6] text-sm">Savings</span>
                  </div>
                  <span className="text-[#16ff6b] font-semibold">
                    $
                    {(
                      summary.totalIncome - summary.totalExpenses
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-[#ef4444]"></span>
                    <span className="text-[#b6f5c6] text-sm">Expenses</span>
                  </div>
                  <span className="text-[#ef4444] font-semibold">
                    ${summary.totalExpenses.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#12391a] rounded-xl p-6 border border-[#174c22] flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-[#fff] mb-2">
              Quick Actions
            </h3>
            <button
              className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-[#112617] text-[#16ff6b] font-semibold hover:bg-[#174c22] transition-colors"
              onClick={() => {
                setNewItem({
                  type: "expense",
                  date: new Date().toISOString().split("T")[0],
                  frequency: "one-time",
                });
                setShowAddTransactionForm(true);
              }}
            >
              <Plus className="w-5 h-5" /> Add New Expense
            </button>
            <button
              className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-[#112617] text-[#16ff6b] font-semibold hover:bg-[#174c22] transition-colors"
              onClick={() => {
                setNewItem({
                  type: "income",
                  date: new Date().toISOString().split("T")[0],
                  frequency: "one-time",
                });
                setShowAddTransactionForm(true);
              }}
            >
              <Plus className="w-5 h-5" /> Add New Income
            </button>
            <button
              className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-[#112617] text-[#16ff6b] font-semibold hover:bg-[#174c22] transition-colors"
              onClick={() =>
                addToast({
                  type: "info",
                  title: "Feature coming soon",
                })
              }
            >
              <Edit className="w-5 h-5" /> Edit Budgets
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => {
    const totalExpenses = summary.categories.reduce(
      (sum, c) => sum + c.value,
      0
    );
    const topCategories = summary.categories.map((cat) => ({
      ...cat,
      percent: totalExpenses > 0 ? (cat.value / totalExpenses) * 100 : 0,
      icon: categoryIcons[cat.name] || ShoppingCart,
    }));

    return (
      <div className="space-y-8">
        <div className="bg-[#12391a] rounded-xl p-6 border border-[#174c22]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-[#fff]">
              Income vs Expenses
            </h3>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-xs font-semibold text-[#16ff6b]">
                <span className="w-3 h-3 rounded-full bg-[#16ff6b] inline-block"></span>
                Income
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-[#ef4444]">
                <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block"></span>
                Expenses
              </span>
            </div>
          </div>
          <p className="text-sm text-[#b6f5c6] mb-2">
            Monthly overview for the selected period.
          </p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={summary.monthlyData}
                margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16ff6b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#16ff6b" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient
                    id="expensesColor"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#174c22" />
                <XAxis
                  dataKey="month"
                  stroke="#b6f5c6"
                  fontSize={13}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#b6f5c6"
                  fontSize={13}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#16ff6b"
                  fillOpacity={1}
                  fill="url(#incomeColor)"
                  name="Income"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#expensesColor)"
                  name="Expenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#12391a] rounded-xl p-6 border border-[#174c22] flex flex-col items-center justify-center z-10">
            <h3 className="text-base font-bold text-[#fff] mb-4 w-full">
              Expense Breakdown
            </h3>
            <div className="w-full h-72 flex flex-col items-center z-10">
              <div className="w-full h-full mb-2 relative z-50">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  className={"z-50"}
                >
                  <RechartsPieChart className={"z-50"}>
                    <Pie
                      data={topCategories}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#16ff6b"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(1)}%`
                      }
                      className="z-50"
                    >
                      {topCategories.map((entry, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={
                            idx === 0
                              ? "#16ff6b"
                              : idx === 1
                              ? "#1aff6b"
                              : idx === 2
                              ? "#b6f5c6"
                              : idx === 3
                              ? "#10B981"
                              : "#374151"
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "4px",
                        color: "#F9FAFB",
                        zIndex: 1000,
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="bg-[#12391a] rounded-xl p-6 border border-[#174c22] flex flex-col">
            <h3 className="text-base font-bold text-[#fff] mb-4">
              Top Spending Categories
            </h3>
            <div className="flex flex-col gap-4">
              {topCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#16ff6b]/20 rounded-lg">
                        <Icon className="w-5 h-5 text-[#16ff6b]" />
                      </div>
                      <span className="text-[#fff] font-medium">
                        {cat.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#fff] block">
                        ${cat.value.toFixed(2)}
                      </span>
                      <span className="text-xs text-[#b6f5c6]">
                        {cat.percent.toFixed(1)}% of total
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTransactions = () => (
    <div className="w-full max-w-full mx-auto flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <div className="bg-[#12391a] rounded-xl p-6 border border-[#174c22]">
          <h2 className="text-xl font-bold text-[#fff] mb-6">
            Add Transaction
          </h2>
          <div className="space-y-6">
            <div className="flex bg-[#174c22] rounded-lg p-1 mb-2">
              <button
                onClick={() => setNewItem({ ...newItem, type: "expense" })}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                  newItem.type === "expense"
                    ? "bg-[#ef4444] text-[#fff]"
                    : "text-[#b6f5c6] hover:text-[#fff]"
                }`}
              >
                Expense
              </button>
              <button
                onClick={() => setNewItem({ ...newItem, type: "income" })}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                  newItem.type === "income"
                    ? "bg-[#16ff6b] text-[#101e13]"
                    : "text-[#b6f5c6] hover:text-[#fff]"
                }`}
              >
                Income
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#b6f5c6] mb-2">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#b6f5c6]">
                  $
                </span>
                <input
                  type="number"
                  value={newItem.amount || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, amount: Number(e.target.value) })
                  }
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 bg-[#174c22] border border-[#174c22] rounded-lg text-[#fff] placeholder-[#b6f5c6] focus:outline-none focus:ring-2 focus:ring-[#16ff6b] focus:border-transparent text-2xl font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#b6f5c6] mb-2">
                Category
              </label>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(categoryIcons).map(([category, Icon]) => (
                  <button
                    key={category}
                    onClick={() => setNewItem({ ...newItem, category })}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                      newItem.category === category
                        ? "border-[#16ff6b] bg-[#16ff6b]/20"
                        : "border-[#174c22] bg-[#174c22] hover:border-[#1aff6b]"
                    }`}
                  >
                    <Icon className="w-6 h-6 text-[#16ff6b] mb-2" />
                    <span className="text-xs text-[#b6f5c6] font-medium">
                      {category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#b6f5c6] mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={newItem.name || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  placeholder="e.g., Weekly groceries"
                  className="w-full px-4 py-3 bg-[#174c22] border border-[#174c22] rounded-lg text-[#fff] placeholder-[#b6f5c6] focus:outline-none focus:ring-2 focus:ring-[#16ff6b] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#b6f5c6] mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={newItem.date}
                  onChange={(e) =>
                    setNewItem({ ...newItem, date: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#174c22] border border-[#174c22] rounded-lg text-[#fff] focus:outline-none focus:ring-2 focus:ring-[#16ff6b] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={handleAddItem}
                className="bg-[#16ff6b] hover:bg-[#1aff6b] text-[#101e13] py-2 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
              >
                <span>Add Transaction</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-96">
        <div className="bg-[#12391a] rounded-xl p-6 border border-[#174c22] h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#fff]">Recent Income</h3>
            <button
              className="text-[#16ff6b] font-semibold text-sm hover:underline"
              onClick={() =>
                addToast({
                  type: "info",
                  title: "Feature coming soon",
                })
              }
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentIncome.map((income) => (
              <div
                key={income.id}
                className="flex items-center justify-between p-3 bg-[#174c22] rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#16ff6b]/20 rounded-lg">
                    <Banknote className="w-5 h-5 text-[#16ff6b]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#fff]">{income.name}</h4>
                    <p className="text-xs text-[#b6f5c6]">
                      {new Date(income.date).toLocaleDateString(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#16ff6b]">
                    +${income.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const goalsData = [
    {
      id: 1,
      title: "New Car",
      icon: <Car className="w-6 h-6" />,
      due: "Due by Dec 2026",
      amount: 4800,
      target: 20000,
      percent: 24,
      achieved: false,
    },
    {
      id: 2,
      title: "Dream Vacation",
      icon: <Plane className="w-6 h-6" />,
      due: "Due by Aug 2025",
      amount: 1800,
      target: 2000,
      percent: 90,
      achieved: false,
    },
    {
      id: 3,
      title: "Downpayment",
      icon: <Home className="w-6 h-6" />,
      due: "Due by Jan 2028",
      amount: 15250,
      target: 50000,
      percent: 30.5,
      achieved: false,
    },
    {
      id: 4,
      title: "Emergency Fund",
      icon: <ShieldCheck className="w-6 h-6" />,
      due: "Completed on May 2025",
      amount: 10000,
      target: 10000,
      percent: 100,
      achieved: true,
    },
  ];

  const renderGoals = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {goalsData.map((goal) => (
          <div
            key={goal.id}
            className={`relative bg-[#12391a] rounded-xl p-6 border border-[#174c22] flex flex-col ${
              goal.achieved ? "opacity-90" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-[#16ff6b]">
                {goal.icon}
              </div>
              <button className="text-[#b6f5c6] hover:text-[#fff] p-1 rounded-full">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="font-bold text-lg text-[#fff] mb-1">
              {goal.title}
            </div>
            <div className="text-sm text-[#b6f5c6] mb-3">{goal.due}</div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-2xl font-extrabold text-[#fff]">
                ${goal.amount.toLocaleString()}
              </span>
              <span className="text-base text-[#b6f5c6]">
                / ${goal.target.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-[#174c22] rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full ${
                  goal.achieved ? "bg-[#16ff6b]" : "bg-[#16ff6b]"
                }`}
                style={{ width: `${goal.percent}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-sm font-semibold ${
                  goal.achieved ? "text-[#16ff6b]" : "text-[#b6f5c6]"
                }`}
              >
                {goal.achieved ? "100% Reached!" : `${goal.percent}% achieved`}
              </span>
              {goal.achieved && (
                <CheckCircle className="w-5 h-5 text-[#16ff6b]" />
              )}
            </div>
            {goal.achieved ? (
              <button
                className="w-full py-3 rounded-lg bg-[#174c22] text-[#b6f5c6] font-semibold cursor-default"
                disabled
              >
                Goal Achieved
              </button>
            ) : (
              <button
                className="w-full py-3 rounded-lg bg-[#16ff6b] text-[#101e13] font-semibold hover:bg-[#1aff6b] transition-colors"
                onClick={() =>
                  addToast({
                    type: "info",
                    title: "Feature coming soon",
                  })
                }
              >
                Add Funds
              </button>
            )}
          </div>
        ))}
        <button
          className="border-2 border-dashed border-[#16ff6b] rounded-xl flex flex-col items-center justify-center p-6 min-h-[220px] hover:bg-[#174c22] transition-colors"
          onClick={() =>
            addToast({ type: "info", title: "Feature coming soon" })
          }
        >
          <div className="w-12 h-12 rounded-full bg-[#112617] flex items-center justify-center mb-3">
            <Plus className="w-7 h-7 text-[#16ff6b]" />
          </div>
          <div className="font-bold text-lg text-[#fff] mb-1">
            Create a New Goal
          </div>
          <div className="text-sm text-[#b6f5c6]">
            Start saving for your next big thing.
          </div>
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return renderDashboard();
      case "transactions":
        return renderTransactions();
      case "income":
        return renderManageIncome();
      case "budgets":
        return renderBudgets();
      case "goals":
        return renderGoals();
      case "reports":
        return renderReports();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className={`${inter.className} min-h-screen bg-[var(--bg)] flex`}>
      {renderNavigation()}
      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-8">
          {renderHeader()}
          {renderContent()}
        </div>
      </div>
      {showAddIncomeForm && renderIncomeForm()}
      {showAddTransactionForm && renderTransactionForm()}
      <ThemedToaster />
    </div>
  );
};

const FinTrackDashboard = () => {
  return (
    <CustomToastProvider>
      <FinTrackDashboardContent />
    </CustomToastProvider>
  );
};

export default FinTrackDashboard;
