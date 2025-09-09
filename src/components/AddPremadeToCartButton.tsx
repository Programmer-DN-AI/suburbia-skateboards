"use client";

import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ButtonLink } from "./ButtonLink";

interface AddPremadeToCartButtonProps {
  skateboardId: string;
  name: string;
  price: number;
  image?: string;
}

export function AddPremadeToCartButton({ 
  skateboardId, 
  name, 
  price, 
  image 
}: AddPremadeToCartButtonProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);

    try {
      // Add the premade skateboard to cart
      addItem({
        name: name,
        type: 'premade',
        skateboardId: skateboardId,
        image: image,
        price: price,
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
      {isAdding ? "Adding..." : "Add to Cart"}
    </button>
  );
}
