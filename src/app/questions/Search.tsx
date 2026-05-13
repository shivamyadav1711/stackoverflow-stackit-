"use client";

import { Input } from "@/components/ui/input";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import React from "react";

const Search = () => {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const router = useRouter();

  const [search, setSearch] =
    React.useState(
      searchParams.get("search") || ""
    );

  React.useEffect(() => {
    setSearch(
      searchParams.get("search") || ""
    );
  }, [searchParams]);

  const handleSearch = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newSearchParams =
      new URLSearchParams(searchParams);

    newSearchParams.set("search", search);

    router.push(
      `${pathname}?${newSearchParams}`
    );
  };

  return (
    <form
      className="flex w-full flex-row gap-4"
      onSubmit={handleSearch}
    >
      <Input
        type="text"
        placeholder="Search questions"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border border-white/10 bg-[#111] text-white placeholder:text-gray-400"
      />

      <button className="shrink-0 rounded-xl bg-cyan-400 px-5 py-2 font-bold text-black">
        Search
      </button>
    </form>
  );
};

export default Search;