"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import { Color, Size } from "@/types";
import { Button } from "@/components/ui";
import { cn } from "@/libs/utils";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
};

const Filter: React.FC<FilterProps> = ({
  data,
  name,
  valueKey
}) => {

  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const current = qs.parse(searchParams.toString());

    const query = { ...current, [valueKey]: id };
    
    if (current[valueKey] === id) {
      query[valueKey] = null;
    }
    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, { skipNull: true });

    router.push(url, { scroll: false });
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">
        {name}
      </h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div key={filter.id} className="flex items-center">
            {filter.value != "NA" &&
            <Button
              className={cn(
                "rounded-md text-sm text-secondary bg-background hover:bg-gray-100 border border-gray-300",
                selectedValue === filter.id && "bg-secondary text-white hover:bg-secondary"
              )}
              onClick={(e) => onClick(filter.id, e)}
            >
              {filter.name}
            </Button>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter