import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

interface Book {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year?: number;
  isbn?: string[];
  description?: string;
  cover_i?: number;
  publish_year?: number[];
  edition_key?: string[];
  subject?: string[];
  cover_edition_key?: string;
}

interface BookListProps {
  data: Book[];
  totalItems: number;
}

export function BookList({ data, totalItems }: BookListProps) {
  console.log({ data });

  return (
    <div className="flex flex-1 flex-col gap-6 h-full">
      <div className="relative flex flex-1">
        <div className="absolute bottom-0 left-0 right-0 top-0 flex overflow-scroll rounded-md border md:overflow-auto h-full">
          <ScrollArea className="flex-1 h-full">
            <div className="relative h-full ">
              {data.length ? (
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {data.map((book) => (
                    <Card className={cn("w-full")} key={book.key}>
                      <CardHeader>
                        <CardTitle className="flex flex-col justify-between gap-2 w-full">
                          <div className="flex gap-4">
                            {book.cover_i ? (
                              <img
                                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                alt={book.title}
                                className="w-20 h-auto"
                              />
                            ) : (
                              <div className="w-24 h-36 bg-gray-200  text-center flex items-center justify-center">
                                No Image
                              </div>
                            )}
                            <div className="flex flex-col justify-between">
                              <div className="leading-4">
                                {book.title}
                                <p className="text-muted-foreground mt-1 text-xs">
                                  ({book.first_publish_year})
                                </p>
                              </div>
                              <p className="text-muted-foreground italic  text-sm">
                                {book.author_name[0] ?? "Unknown Author"}
                              </p>
                            </div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        <CardDescription>
                          {book.description
                            ? book.description.substring(0, 100) + "..."
                            : "Please add a description"}
                        </CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Link
                          to={`/books/${book.cover_edition_key}`}
                          className={buttonVariants({
                            variant: "outline",
                            className: "ml-auto ",
                          })}
                        >
                          <Edit /> Edit
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="h-full flex justify-center items-center text-center">
                  No Books in your library. <br /> Start searching and add
                  books!
                </div>
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-2 sm:flex-row">
        <div className="flex w-full items-center justify-between">
          <div className="flex-1 text-sm text-muted-foreground">
            {totalItems > 0 ? totalItems : "No entries found"}
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-2 sm:justify-end"></div>
      </div>
    </div>
  );
}
