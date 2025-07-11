import { useState, useEffect, useRef } from "react";
import {
  Brush,
  Eraser,
  Undo,
  Redo,
  Trash2,
  Download,
  Settings,
  X,
} from "lucide-react";

// Define types for our application state and brush settings
type BrushTool = "brush" | "eraser";

interface BrushSettings {
  size: number;
  color: string;
  opacity: number;
}

// Example artworks with actual content
const exampleArtworks = [
  {
    name: "Sunset Landscape",
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF9800;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23E91E63;stop-opacity:1' /%3E%3C/linearGradient%3E%3ClinearGradient id='ground' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FFEB3B;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23FF9800;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23sky)'/%3E%3Ccircle cx='320' cy='80' r='40' fill='%23FFEB3B'/%3E%3Crect x='0' y='200' width='400' height='100' fill='url(%23ground)'/%3E%3Cpolygon points='100,200 150,100 200,200' fill='%234CAF50'/%3E%3Cpolygon points='250,200 300,120 350,200' fill='%234CAF50'/%3E%3C/svg%3E",
  },
  {
    name: "Abstract Art",
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23FFFFFF'/%3E%3Ccircle cx='100' cy='100' r='50' fill='%232196F3' opacity='0.8'/%3E%3Ccircle cx='200' cy='150' r='40' fill='%23E91E63' opacity='0.7'/%3E%3Ccircle cx='300' cy='80' r='60' fill='%23FF9800' opacity='0.6'/%3E%3Crect x='50' y='200' width='100' height='60' fill='%239C27B0' opacity='0.9'/%3E%3Crect x='200' y='220' width='80' height='40' fill='%234CAF50' opacity='0.8'/%3E%3C/svg%3E",
  },
  {
    name: "Geometric Pattern",
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23F5F5F5'/%3E%3Crect x='50' y='50' width='80' height='80' fill='%2300BCD4'/%3E%3Crect x='150' y='50' width='80' height='80' fill='%23FF5722'/%3E%3Crect x='250' y='50' width='80' height='80' fill='%23FFEB3B'/%3E%3Crect x='50' y='150' width='80' height='80' fill='%23E91E63'/%3E%3Crect x='150' y='150' width='80' height='80' fill='%234CAF50'/%3E%3Crect x='250' y='150' width='80' height='80' fill='%239C27B0'/%3E%3C/svg%3E",
  },
];

const HEADER_HEIGHT = 64; // px, adjust as needed
const SIDEBAR_WIDTH = 288; // px, 72 * 4

// Toast Component
const Toast = ({ message }: { message: string | null }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg text-sm animate-fade-in-up">
      {message}
    </div>
  );
};

// Desktop Header Component
const DesktopHeader = ({ onProfileClick }: { onProfileClick: () => void }) => (
  <header
    className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm"
    style={{ height: HEADER_HEIGHT }}
  >
    <div
      className="max-w-7xl mx-auto flex items-center justify-between px-8"
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
          Virtual Painting Studio
        </span>
        <span className="ml-2 px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold">
          Beta
        </span>
      </div>
      <nav className="flex items-center gap-6">
        <div
          className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition-transform"
          onClick={onProfileClick}
        >
          A
        </div>
      </nav>
    </div>
  </header>
);

// Mobile Header Component
const MobileHeader = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm flex items-center justify-between px-4 py-3">
    <button
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
      onClick={onMenuClick}
      aria-label="Open menu"
    >
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-600 dark:text-blue-300"
      >
        <line x1="4" y1="7" x2="24" y2="7" />
        <line x1="4" y1="14" x2="24" y2="14" />
        <line x1="4" y1="21" x2="24" y2="21" />
      </svg>
    </button>
    <span className="font-bold text-lg text-blue-600 dark:text-blue-200">
      Virtual Painting Studio
    </span>
    <span className="ml-2 px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold">
      Beta
    </span>
  </header>
);

// Tool Button Component
const ToolButton = ({
  tool,
  currentTool,
  icon: Icon,
  label,
  onClick,
}: {
  tool: BrushTool;
  currentTool: BrushTool;
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
      tool === currentTool
        ? "bg-blue-100 text-blue-600 shadow-md dark:bg-blue-900 dark:text-blue-200"
        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
    }`}
  >
    <Icon size={24} />
    <span className="text-xs">{label}</span>
  </button>
);

// Action Button Component
const ActionButton = ({
  icon: Icon,
  label,
  onClick,
  disabled = false,
  variant = "default",
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "danger" | "success";
}) => {
  const variantClasses = {
    default: "text-gray-700 dark:text-gray-200",
    danger: "text-red-500",
    success: "text-green-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all disabled:opacity-50 ${variantClasses[variant]}`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
};

// Desktop Sidebar Component
const DesktopSidebar = ({
  tool,
  brush,
  currentStep,
  historyLength,
  onToolChange,
  onSizeChange,
  onColorChange,
  onUndo,
  onRedo,
  onClear,
  onDownload,
  onSettings,
  onProfileClick,
}: {
  tool: BrushTool;
  brush: BrushSettings;
  currentStep: number;
  historyLength: number;
  onToolChange: (tool: BrushTool) => void;
  onSizeChange: (size: number) => void;
  onColorChange: (color: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onDownload: () => void;
  onSettings: () => void;
  onProfileClick: () => void;
}) => (
  <aside
    className="fixed left-0 z-40 bg-white/90 dark:bg-gray-900/90 shadow-lg flex flex-col justify-between"
    style={{
      top: HEADER_HEIGHT,
      width: SIDEBAR_WIDTH,
      height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    }}
  >
    <div>
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="ml-2 px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold">
          Beta
        </span>
      </div>
      <div className="flex flex-col gap-4 px-6">
        {/* Tools Section */}
        <div className="flex gap-2">
          <ToolButton
            tool="brush"
            currentTool={tool}
            icon={Brush}
            label="Brush"
            onClick={() => onToolChange("brush")}
          />
          <ToolButton
            tool="eraser"
            currentTool={tool}
            icon={Eraser}
            label="Eraser"
            onClick={() => onToolChange("eraser")}
          />
        </div>

        {/* Brush Settings */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500 dark:text-gray-400">
            Size
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={brush.size}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-xs text-center text-gray-700 dark:text-gray-200">
            {brush.size}px
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500 dark:text-gray-400">
            Color
          </label>
          <input
            type="color"
            value={brush.color}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-10 h-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer self-center"
            title="Pick color"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 mt-4">
          <ActionButton
            icon={Undo}
            label="Undo"
            onClick={onUndo}
            disabled={currentStep <= 0}
          />
          <ActionButton
            icon={Redo}
            label="Redo"
            onClick={onRedo}
            disabled={currentStep >= historyLength - 1}
          />
          <ActionButton
            icon={Trash2}
            label="Clear"
            onClick={onClear}
            variant="danger"
          />
          <ActionButton
            icon={Download}
            label="Download"
            onClick={onDownload}
            variant="success"
          />
          <ActionButton icon={Settings} label="Settings" onClick={onSettings} />
        </div>
      </div>
    </div>

    <div className="px-6 py-4 flex items-center gap-3 border-t border-gray-200 dark:border-gray-800">
      <div
        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition-transform"
        onClick={onProfileClick}
      >
        A
      </div>
      <span className="text-sm text-gray-600 dark:text-gray-300">User</span>
    </div>
  </aside>
);

// Mobile Drawer Component
const MobileDrawer = ({
  isOpen,
  tool,
  brush,
  currentStep,
  historyLength,
  onClose,
  onToolChange,
  onSizeChange,
  onColorChange,
  onUndo,
  onRedo,
  onClear,
  onDownload,
  onSettings,
  onProfileClick,
}: {
  isOpen: boolean;
  tool: BrushTool;
  brush: BrushSettings;
  currentStep: number;
  historyLength: number;
  onClose: () => void;
  onToolChange: (tool: BrushTool) => void;
  onSizeChange: (size: number) => void;
  onColorChange: (color: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onDownload: () => void;
  onSettings: () => void;
  onProfileClick: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed top-0 left-0 z-50 h-full w-72 max-w-full bg-white dark:bg-gray-900 shadow-lg flex flex-col justify-between animate-slide-in-left">
        <div>
          <div className="flex items-center justify-between px-6 py-6">
            <span className="text-xl font-bold text-blue-700 dark:text-blue-300">
              Virtual Painting Studio
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-4 px-6">
            {/* Tools Section */}
            <div className="flex gap-2">
              <ToolButton
                tool="brush"
                currentTool={tool}
                icon={Brush}
                label="Brush"
                onClick={() => {
                  onToolChange("brush");
                  onClose();
                }}
              />
              <ToolButton
                tool="eraser"
                currentTool={tool}
                icon={Eraser}
                label="Eraser"
                onClick={() => {
                  onToolChange("eraser");
                  onClose();
                }}
              />
            </div>

            {/* Brush Settings */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-500 dark:text-gray-400">
                Size
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={brush.size}
                onChange={(e) => onSizeChange(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-center text-gray-700 dark:text-gray-200">
                {brush.size}px
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-500 dark:text-gray-400">
                Color
              </label>
              <input
                type="color"
                value={brush.color}
                onChange={(e) => onColorChange(e.target.value)}
                className="w-10 h-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer self-center"
                title="Pick color"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 mt-4">
              <ActionButton
                icon={Undo}
                label="Undo"
                onClick={() => {
                  onUndo();
                  onClose();
                }}
                disabled={currentStep <= 0}
              />
              <ActionButton
                icon={Redo}
                label="Redo"
                onClick={() => {
                  onRedo();
                  onClose();
                }}
                disabled={currentStep >= historyLength - 1}
              />
              <ActionButton
                icon={Trash2}
                label="Clear"
                onClick={() => {
                  onClear();
                  onClose();
                }}
                variant="danger"
              />
              <ActionButton
                icon={Download}
                label="Download"
                onClick={() => {
                  onDownload();
                  onClose();
                }}
                variant="success"
              />
              <ActionButton
                icon={Settings}
                label="Settings"
                onClick={() => {
                  onSettings();
                  onClose();
                }}
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 flex items-center gap-3 border-t border-gray-200 dark:border-gray-800">
          <div
            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition-transform"
            onClick={() => {
              onProfileClick();
              onClose();
            }}
          >
            A
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-300">User</span>
        </div>
      </aside>
    </>
  );
};

// Settings Panel Component
const SettingsPanel = ({
  isOpen,
  canvasSize,
  onClose,
  onCanvasSizeChange,
  onLoadExample,
}: {
  isOpen: boolean;
  canvasSize: { width: number; height: number };
  onClose: () => void;
  onCanvasSizeChange: (size: { width: number; height: number }) => void;
  onLoadExample: (url: string) => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 p-1"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
              Canvas Size
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={canvasSize.width}
                  onChange={(e) =>
                    onCanvasSizeChange({
                      ...canvasSize,
                      width: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  min="100"
                  max="2000"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={canvasSize.height}
                  onChange={(e) =>
                    onCanvasSizeChange({
                      ...canvasSize,
                      height: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                  min="100"
                  max="2000"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
              Templates
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {exampleArtworks.map((example, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onLoadExample(example.url);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-12 h-12 rounded border-2 border-gray-300 dark:border-gray-700 overflow-hidden flex-shrink-0">
                    <img
                      src={example.url}
                      alt={example.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-left text-gray-900 dark:text-gray-100">
                    {example.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const VirtualPaintingStudio = () => {
  // State for painting
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<BrushTool>("brush");
  const [brush, setBrush] = useState<BrushSettings>({
    size: 5,
    color: "#000000",
    opacity: 1.0,
  });
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [history, setHistory] = useState<ImageData[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [showSettings, setShowSettings] = useState(false);
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // References for canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDraggingRef = useRef(false);
  const prevPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Check device type and set responsive canvas size
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      let newDeviceType: "mobile" | "tablet" | "desktop";
      let newCanvasSize: { width: number; height: number };

      if (width <= 640) {
        // Mobile: 320px - 640px
        newDeviceType = "mobile";
        newCanvasSize = { width: Math.min(width - 32, 400), height: 300 };
      } else if (width <= 1024) {
        // Tablet: 641px - 1024px
        newDeviceType = "tablet";
        newCanvasSize = { width: Math.min(width - 64, 600), height: 450 };
      } else {
        // Desktop: 1025px+
        newDeviceType = "desktop";
        newCanvasSize = { width: 800, height: 600 };
      }

      setDeviceType(newDeviceType);
      setCanvasSize(newCanvasSize);
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);
    return () => window.removeEventListener("resize", checkDeviceType);
  }, []);

  // Initialize canvas and history
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = containerRef.current;
    if (!container) return;

    // Set canvas dimensions
    const { width, height } = canvasSize;
    canvas.width = width;
    canvas.height = height;

    // Get rendering context
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;
    contextRef.current = context;

    // Set initial background
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    // Initialize history with initial state
    const initialImageData = context.getImageData(0, 0, width, height);
    setHistory([initialImageData]);
    setCurrentStep(0);

    // Set up event listeners
    const preventDefault = (e: TouchEvent) => e.preventDefault();
    container.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      container.removeEventListener("touchmove", preventDefault);
    };
  }, [canvasSize]);

  // Set brush properties whenever they change
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.globalAlpha = brush.opacity;
      contextRef.current.strokeStyle = brush.color;
      contextRef.current.lineWidth = brush.size;
      contextRef.current.lineCap = "round";
      contextRef.current.lineJoin = "round";
    }
  }, [brush]);

  // Event handlers
  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    setIsDrawing(true);
    isDraggingRef.current = false;

    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    // Get position with better touch handling
    const rect = canvas.getBoundingClientRect();
    let x: number, y: number;

    if ("touches" in e) {
      // Touch event
      const touch = e.touches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      // Mouse event
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    // Scale coordinates for responsive canvas
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    x *= scaleX;
    y *= scaleY;

    // Start drawing
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    prevPositionRef.current = { x, y };
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();

    if (!isDrawing || !contextRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    isDraggingRef.current = true;

    // Get position with better touch handling
    const rect = canvas.getBoundingClientRect();
    let x: number, y: number;

    if ("touches" in e) {
      // Touch event
      const touch = e.touches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      // Mouse event
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    // Scale coordinates for responsive canvas
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    x *= scaleX;
    y *= scaleY;

    // Draw line
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();

    // Update previous position
    prevPositionRef.current = { x, y };
  };

  const endDrawing = () => {
    if (!contextRef.current || !isDrawing) return;

    contextRef.current.closePath();
    setIsDrawing(false);

    // Save to history if we actually drew something
    if (isDraggingRef.current) {
      saveToHistory();
    }
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    // Get current state
    const currentState = contextRef.current.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Limit history size to prevent memory issues
    const maxHistorySize = 50;
    const newHistory = [...history.slice(0, currentStep + 1), currentState];

    if (newHistory.length > maxHistorySize) {
      newHistory.shift();
    }

    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const handleToolChange = (newTool: BrushTool) => {
    setTool(newTool);

    if (contextRef.current) {
      if (newTool === "eraser") {
        contextRef.current.globalCompositeOperation = "source-over";
        contextRef.current.strokeStyle = "#ffffff";
      } else {
        contextRef.current.globalCompositeOperation = "source-over";
        contextRef.current.strokeStyle = brush.color;
      }
    }
  };

  const handleColorChange = (newColor: string) => {
    setBrush((prev) => ({ ...prev, color: newColor }));

    if (contextRef.current && tool !== "eraser") {
      contextRef.current.strokeStyle = newColor;
    }
  };

  const handleSizeChange = (newSize: number) => {
    setBrush((prev) => ({ ...prev, size: newSize }));

    if (contextRef.current) {
      contextRef.current.lineWidth = newSize;
    }
  };

  const clearCanvas = () => {
    if (!contextRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    contextRef.current.fillStyle = "#ffffff";
    contextRef.current.fillRect(0, 0, canvas.width, canvas.height);

    // Update history
    const clearedState = contextRef.current.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    const newHistory = [...history, clearedState];
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const undo = () => {
    if (currentStep <= 0) return;

    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    const previousStep = currentStep - 1;
    contextRef.current.globalCompositeOperation = "source-over";
    contextRef.current.putImageData(history[previousStep], 0, 0);
    setCurrentStep(previousStep);
  };

  const redo = () => {
    if (currentStep >= history.length - 1) return;

    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    const nextStep = currentStep + 1;
    contextRef.current.globalCompositeOperation = "source-over";
    contextRef.current.putImageData(history[nextStep], 0, 0);
    setCurrentStep(nextStep);
  };

  const loadExample = (exampleUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Clear canvas
      contextRef.current!.fillStyle = "#ffffff";
      contextRef.current!.fillRect(0, 0, canvas.width, canvas.height);

      // Draw image
      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const width = img.width * scale;
      const height = img.height * scale;
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;

      contextRef.current!.drawImage(img, x, y, width, height);

      // Save to history
      const newState = contextRef.current!.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      const newHistory = [...history, newState];
      setHistory(newHistory);
      setCurrentStep(newHistory.length - 1);
    };

    img.onerror = () => {
      console.error("Failed to load image");
    };

    img.src = exampleUrl;
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "my_painting.png";
    a.click();
  };

  const handleProfileClick = () => setToast("Coming soon!");

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex flex-col items-center`}
    >
      {deviceType === "desktop" ? (
        <DesktopHeader onProfileClick={handleProfileClick} />
      ) : (
        <MobileHeader onMenuClick={() => setShowMobileMenu(true)} />
      )}

      {deviceType === "desktop" && (
        <DesktopSidebar
          tool={tool}
          brush={brush}
          currentStep={currentStep}
          historyLength={history.length}
          onToolChange={handleToolChange}
          onSizeChange={handleSizeChange}
          onColorChange={handleColorChange}
          onUndo={undo}
          onRedo={redo}
          onClear={clearCanvas}
          onDownload={downloadCanvas}
          onSettings={() => setShowSettings(true)}
          onProfileClick={handleProfileClick}
        />
      )}

      <main
        className={deviceType === "desktop" ? "" : "w-full"}
        style={
          deviceType === "desktop"
            ? { paddingLeft: SIDEBAR_WIDTH, paddingTop: HEADER_HEIGHT }
            : {}
        }
      >
        <div
          className={`w-full max-w-7xl ${
            deviceType === "desktop" ? "mt-16" : "mt-14"
          }`}
        >
          {/* Canvas Container */}
          <div
            ref={containerRef}
            className={`w-full flex justify-center ${
              deviceType === "mobile" ? "px-0" : ""
            }`}
          >
            <canvas
              ref={canvasRef}
              className={`bg-white dark:bg-gray-900 rounded-lg shadow-xl touch-none border-2 border-gray-200 dark:border-gray-700 max-w-full ${
                deviceType === "mobile" ? "w-full" : ""
              }`}
              style={{
                maxWidth: "100%",
                height: "auto",
                display: "block",
                margin: deviceType === "mobile" ? "0 auto" : undefined,
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={endDrawing}
              onMouseLeave={endDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={endDrawing}
            />
          </div>

          {/* Footer */}
          <div className="mt-4 sm:mt-6 lg:mt-8 text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="dark:text-gray-200">
                Virtual Painting Studio
              </span>
              . All rights reserved.
            </p>
          </div>
        </div>

        {/* Settings Panel */}
        <SettingsPanel
          isOpen={showSettings}
          canvasSize={canvasSize}
          onClose={() => setShowSettings(false)}
          onCanvasSizeChange={setCanvasSize}
          onLoadExample={loadExample}
        />

        {/* Mobile Drawer */}
        <MobileDrawer
          isOpen={showMobileMenu}
          tool={tool}
          brush={brush}
          currentStep={currentStep}
          historyLength={history.length}
          onClose={() => setShowMobileMenu(false)}
          onToolChange={handleToolChange}
          onSizeChange={handleSizeChange}
          onColorChange={handleColorChange}
          onUndo={undo}
          onRedo={redo}
          onClear={clearCanvas}
          onDownload={downloadCanvas}
          onSettings={() => setShowSettings(true)}
          onProfileClick={handleProfileClick}
        />

        {/* Toast */}
        <Toast message={toast} />
      </main>
    </div>
  );
};

export default VirtualPaintingStudio;
// Zod Schema
export const Schema = {
  commentary:
    "Develop a playful site for users to experiment with virtual painting",
  template: "nextjs-developer",
  title: "Virtual Painting Studio",
  description: "A web app for users to experiment with virtual painting",
  additional_dependencies: [],
  has_additional_dependencies: false,
  install_dependencies_command: "",
  port: 3000,
  file_path: "pages/index.tsx",
  code: "<see code above>",
};
