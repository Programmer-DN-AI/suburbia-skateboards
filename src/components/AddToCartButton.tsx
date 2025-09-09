"use client";

import { ButtonLink } from "./ButtonLink";
import { useCart } from "@/contexts/CartContext";
import { useCustomizerControls } from "@/app/build/context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddToCartButton() {
  const { addItem } = useCart();
  const { selectedWheel, selectedDeck, selectedTruck, selectedBolt } = useCustomizerControls();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedWheel || !selectedDeck || !selectedTruck || !selectedBolt) {
      alert("Please select all components before adding to cart.");
      return;
    }

    setIsAdding(true);

    try {
      // Generate a dynamic name based on components
      const skateboardName = `${selectedDeck.uid} Deck with ${selectedWheel.uid} Wheels`;
      
      // Calculate price based on components (base price + component variations)
      const basePrice = 12000; // $120 base
      const deckPrice = selectedDeck.uid.includes('premium') ? 3000 : 0; // +$30 for premium
      const wheelPrice = selectedWheel.uid.includes('pro') ? 2000 : 0; // +$20 for pro wheels
      const totalPrice = basePrice + deckPrice + wheelPrice;

      // Add the current configuration to cart
      addItem({
        name: skateboardName,
        type: 'custom',
        wheel: {
          uid: selectedWheel.uid,
          texture: selectedWheel.texture?.url || "",
        },
        deck: {
          uid: selectedDeck.uid,
          texture: selectedDeck.texture?.url || "",
        },
        truck: {
          uid: selectedTruck.uid,
          color: selectedTruck.color || "#ffffff",
        },
        bolt: {
          uid: selectedBolt.uid,
          color: selectedBolt.color || "#ffffff",
        },
        price: totalPrice,
      });

      // Navigate to cart page
      router.push("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="button-cutout group mx-4 inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-lime to-brand-orange text-black"
    >
      <div className="flex size-6 items-center justify-center transition-transform group-hover:-rotate-[25deg] [&>svg]:h-full [&>svg]:w-full">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
      <div className="w-px self-stretch bg-black/25" />
      {isAdding ? "Adding..." : "Add to cart"}
    </button>
  );
}
