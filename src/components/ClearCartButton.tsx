"use client";

import { useState } from "react";
import { FaTrashCan, FaXmark } from "react-icons/fa6";

interface ClearCartButtonProps {
  onClear: () => void;
}

export function ClearCartButton({ onClear }: ClearCartButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClear = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClear();
      setShowConfirm(false);
      setIsAnimating(false);
    }, 300);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2 animate-in slide-in-from-right-2 duration-200">
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <FaTrashCan className="text-red-500 text-sm" />
            <span className="text-red-700 text-sm font-medium">
              Clear all items?
            </span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={handleClear}
              disabled={isAnimating}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200 disabled:opacity-50"
            >
              {isAnimating ? "Clearing..." : "Yes"}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="group relative inline-flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-700 transition-all duration-200 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-200"
    >
      <div className="flex items-center gap-2">
        <FaTrashCan className="text-sm transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12" />
        <span className="text-sm font-medium">Clear Cart</span>
      </div>
      
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10" />
      
      {/* Sparkle effect on hover */}
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-ping" />
    </button>
  );
}
