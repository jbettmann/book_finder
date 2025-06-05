import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { XCircle, Plus, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useOpenLibrarySearch } from "@/hooks/use-open-library-search";
import type { Book } from "@/types/book";

interface DataTableSearchProps {
  searchKey: string;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onAdd?: (book: Book) => void;
}

export function DataTableSearch({
  searchKey,
  searchQuery,
  setSearchQuery,
  onAdd,
}: DataTableSearchProps) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const [isOpen, setIsOpen] = useState(false);

  const { results, loading } = useOpenLibrarySearch(inputValue);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(inputValue);
      setIsOpen(inputValue.length > 1);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  const handleClear = () => {
    setInputValue("");
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="flex relative w-full max-w-sm">
          <Input
            placeholder={`Search ${searchKey}...`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={cn("w-full md:max-w-sm")}
          />

          {inputValue && (
            <button
              aria-label="Clear input"
              className="absolute inset-y-0 right-3 flex items-center opacity-50 cursor-pointer focus:outline-none"
              onClick={handleClear}
            >
              <XCircle size={18} color="#2b2b2b" />
            </button>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-full max-w-sm p-0">
        {loading ? (
          <Loader2 className="animate-spin text-muted-foreground" />
        ) : results.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground w-full">
            No results found.
          </div>
        ) : (
          <ul className="max-h-80 overflow-auto divide-y divide-muted border-t w-full">
            {results.map((book) => (
              <li
                key={book.key}
                className="flex items-center justify-between p-3"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{book.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {book.author_name?.[0] || "Unknown Author"} ·
                    {book.first_publish_year || "N/A"}
                  </span>
                </div>
                {onAdd && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onAdd(book);
                      setIsOpen(false);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}
