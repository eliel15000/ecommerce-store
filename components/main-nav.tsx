"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/libs/utils";
import { Category } from "@/types";

interface MainNavProps {
  data: Category[];
};

const MainNav: React.FC<MainNavProps> = ({
  data
}) => {

  const pathname = usePathname();

  // const newPathname = (name: string) => {
  //   return name.toLowerCase().replaceAll(" ", "-");
  // }

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    // href: `/category/${newPathname(route.name)}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
    // active: pathname === `/category/${newPathname(route.name)}`,
  }));

  // routes.reverse();

  return (
    <nav
      className="mx-6 hidden min-[915px]:flex text-center items-center space-x-4 lg:space-x-6 "
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-secondary group",
            route.active ? "text-secondary" : "text-neutral-500"
          )}
        >
          {route.label}
          <div className={cn("main-nav absolute bottom-4 h-1 w-8  bg-secondary rounded-xl hidden group-hover:block",
            route.active ? "block" : "")}
          />
        </Link>
      ))}
    </nav>

  )
}

export default MainNav;