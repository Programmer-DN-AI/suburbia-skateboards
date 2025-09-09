"use client";

import { useCart } from "@/contexts/CartContext";

export function CartCount() {
  const { getItemCount } = useCart();
  const count = getItemCount();

  return (
    <>
      <span className="md:hidden">{count}</span>
      <span className="hidden md:inline">Cart ({count})</span>
    </>
  );
}
