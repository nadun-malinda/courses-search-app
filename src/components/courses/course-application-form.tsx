"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Course, formSchema } from "@/types/courses";
import { submitApplicationAction } from "@/actions/course/submit-application-action";

/**
 * CourseApplicationForm Component
 *
 * Renders a form for users to apply for a course.
 *
 * @param {Object} props - The component props.
 * @param {Course} props.course - The course object containing course details.
 * @returns {JSX.Element} The rendered CourseApplicationForm component.
 */
export function CourseApplicationForm({ course }: { course: Course }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  /**
   * Handles form submission.
   *
   * @param {Object} values - The form values.
   */
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const { success, message } = await submitApplicationAction({
        ...values,
        courseId: course.CourseId,
      });
      toast(message);

      if (success) {
        form.reset();
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Apply course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply course</DialogTitle>
          <DialogDescription>
            Course name: {course.CourseName}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your first name"
                        {...field}
                        className="subtle-focus-ring"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        className="subtle-focus-ring"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Your email address"
                        {...field}
                        className="subtle-focus-ring"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="transition-all-200"
                  disabled={isPending}
                >
                  {isPending && (
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                  )}
                  Submit Application
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
