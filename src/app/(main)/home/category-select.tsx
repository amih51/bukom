"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import kyInstance from "@/lib/ky";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategorySelect() {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const query = useQuery({
    queryKey: ["category"],
    queryFn: () => kyInstance.get("/api/category").json<Category[]>(),
  });
  const categories = query.data || [];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-fill justify-start">
          {categories.find((category) => category.id === categoryId)?.name ||
            "Select a category"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    onSelect={() => {
                      router.push(`/home/${category.name}`);
                      setCategoryId(category.id);
                      setIsOpen(false);
                    }}
                  >
                    {category.name}
                  </CommandItem>
                ))
              ) : (
                <CommandItem>No categories available</CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
