"use client";

import { useState, useMemo } from "react";


export function useFilter<T>(
  items: T[],
  filterKey: keyof T,
  defaultValue = "all"
) {
  const [filterValue, setFilterValue] = useState<string>(defaultValue);

  const filteredItems = useMemo(() => {
    if (filterValue === "all") return items;
    return items.filter((item) => item[filterKey] === filterValue);
  }, [items, filterValue, filterKey]);

  return {
    filterValue,
    setFilterValue,
    filteredItems,
  };
}
export default useFilter;