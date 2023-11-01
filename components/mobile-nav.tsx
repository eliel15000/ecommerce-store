"use client";

import { FC, Fragment, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { Menu as MenuIcon, X } from "lucide-react";

import { cn } from "@/libs/utils";
import { Category } from "@/types";
import { IconButton } from "@/components/ui";

interface MobileNavProps {
  data: Category[];
};

const MobileNav: FC<MobileNavProps> = ({
    data
  }) => {

  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return(
    <>
      <button className="flex min-[915px]:hidden ml-auto text-black hover:bg-gray-200 hover:rounded" onClick={onOpen}>
        <MenuIcon size={30} />
      </button>

      <Transition
        show={open}
      >
        <Dialog as="div" className="relative z-40 min-[915px]:hidden" onClose={onClose}>
          {/* Background */}
          <Transition.Child
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          {/* Dialog Position */}
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="-translate-x-0"
            leave="transition ease-in duration-100 transform"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="fixed inset-0 z-40 flex">
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl">

                {/* Close Button */}
                <div className="flex items-center justify-end px-4 mb-2">
                  <IconButton icon={<X size={15} />} onClick={onClose} />
                </div>

                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-lg font-medium mx-3 transition-colors hover:text-secondary group",
                      route.active ? "text-secondary" : "text-neutral-600"
                    )}
                  >
                    <button className={`${route.active && 'bg-softBG'} w-full rounded-md p-3 text-left hover:bg-softBG`} onClick={onClose}>
                      {route.label}
                      <div className={cn("mobile-nav absolute h-1 w-8  bg-secondary rounded-xl hidden group-hover:block",
                      route.active ? "block" : "")}
                    />
                    </button>
                    <hr className="my-[2px]" />
                  </Link>
                ))}
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileNav;
