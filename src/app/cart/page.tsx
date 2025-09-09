"use client";

import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";
import { ClearCartButton } from "@/components/ClearCartButton";
import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/contexts/CartContext";
import Image from "next/image";

function CartItemCard({ item }: { item: CartItem }) {
  const { removeItem } = useCart();

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-zinc-200">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-zinc-100 rounded-lg flex items-center justify-center">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span className="text-2xl">🛹</span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <div className="text-sm text-zinc-600 space-y-1">
            {item.type === 'custom' && item.wheel && item.deck && item.truck && item.bolt ? (
              <>
                <p>Wheel: {item.wheel.uid}</p>
                <p>Deck: {item.deck.uid}</p>
                <p>Truck: {item.truck.uid}</p>
                <p>Bolt: {item.bolt.uid}</p>
              </>
            ) : (
              <p className="text-zinc-500 italic">Pre-made skateboard</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">${(item.price / 100).toFixed(2)}</p>
          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 hover:text-red-700 text-sm mt-1"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <Bounded className="py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Heading as="h1" size="lg" className="mb-8">
            Your Cart
          </Heading>
          
          <div className="bg-zinc-100 rounded-lg p-8 mb-8">
            <p className="text-zinc-600 mb-4">
              Your cart is currently empty.
            </p>
            <p className="text-sm text-zinc-500">
              Start building your custom skateboard to add items to your cart.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/build" color="lime" icon="skateboard">
              Build Your Board
            </ButtonLink>
            <ButtonLink href="/" color="purple">
              Continue Shopping
            </ButtonLink>
          </div>
        </div>
      </Bounded>
    );
  }

  return (
    <Bounded className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Heading as="h1" size="lg">
            Your Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </Heading>
          <ClearCartButton onClear={clearCart} />
        </div>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>

        <div className="bg-zinc-100 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-2xl font-bold">${(total / 100).toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonLink href="/build" color="lime" icon="skateboard">
            Build Another Board
          </ButtonLink>
          <ButtonLink href="/" color="purple">
            Continue Shopping
          </ButtonLink>
          <ButtonLink href="#" color="orange">
            Checkout
          </ButtonLink>
        </div>
      </div>
    </Bounded>
  );
}
