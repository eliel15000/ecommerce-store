"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui";
import { useCart } from "@/hooks";

const NavbarActions = () => {

  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-[915px]:ml-auto ml-5 flex items-center gap-x-4">
      <Button onClick={() => router.push("/cart")} className="flex items-center rounded-full bg-primary px-4 py-2">
        <ShoppingBag
          size={20}
          color="white"
        />
        <span className="ml-2  text-sm font-medium text-white">
          { cart.items.length }
        </span>
      </Button>
    </div>
  )
}

export default NavbarActions;