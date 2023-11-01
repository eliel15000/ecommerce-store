"use client";

import { FC, Fragment, useState } from "react";
import { Plus, X } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";

import { Color, Size } from "@/types";
import { Button, IconButton } from "@/components/ui";
import { Filter } from ".";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
};

const MobileFilters: FC<MobileFiltersProps> = ({
  sizes,
  colors
}) => {

  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button className="flex items-center gap-x-2 lg:hidden" onClick={onOpen}>
        Filters
        <Plus size={20} />
      </Button>

      <Transition
        show={open}
      >
        <Dialog open={open} as="div" className="relative z-40 lg:hidden" onClose={onClose}>
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
                <div className="flex items-center justify-end px-4">
                  <IconButton icon={<X size={15} />} onClick={onClose} />
                </div>

                {/* Render the filters */}
                <div className="p-4">
                  <Filter
                    valueKey="sizeId"
                    name="Sizes"
                    data={sizes}
                  />
                  <Filter
                    valueKey="colorId"
                    name="Colors"
                    data={colors}
                  />
                </div>

              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileFilters;