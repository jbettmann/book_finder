import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Book } from "@/types/book";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useFavoriteBooks } from "@/store/use-favorite-books";

const BookFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  first_publish_year: z
    .number({ invalid_type_error: "Must be a number" })
    .int()
    .positive(),
  description: z.string().optional(),
});

type BookFormValues = z.infer<typeof BookFormSchema>;

export default function BookForm({
  initialData,
  onSubmit,
}: {
  initialData: Partial<Book>;
  onSubmit: (data: BookFormValues) => void;
}) {
  const router = useNavigate();
  const { updateFavorite } = useFavoriteBooks();

  const form = useForm<BookFormValues>({
    resolver: zodResolver(BookFormSchema),
    defaultValues: {
      title: initialData.title ?? "",
      author: Array.isArray(initialData.author_name)
        ? initialData.author_name.join(", ")
        : (initialData.author_name ?? ""),
      first_publish_year:
        initialData.first_publish_year ?? new Date().getFullYear(),
      description: initialData.description ?? "",
    },
  });

  const handleSave = (formValues: BookFormValues) => {
    if (!initialData.key) {
      return;
    }

    updateFavorite({
      key: initialData.key,
      title: formValues.title,
      first_publish_year: formValues.first_publish_year,
      author_name: [formValues.author],
      description: formValues.description,
      cover_i: initialData.cover_i,
    });
    router("/");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Book</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              handleSave(values);
              onSubmit(values); // optional external save handler
            })}
            className="space-y-6"
          >
            {initialData.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${initialData.cover_i}-M.jpg`}
                alt={initialData.title}
                className="w-20 h-auto"
              />
            ) : (
              <div className="w-24 h-36 bg-gray-200  text-center flex items-center justify-center">
                No Image
              </div>
            )}

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter book title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="first_publish_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Published Year</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter year"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter book description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4 text-black">
              <Link
                className={buttonVariants({
                  variant: "outline",
                })}
                to={"/"}
              >
                Cancel
              </Link>
              <Button className="!bg-gray-700 text-white" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
