import { z } from "zod";

/**
 * Schema for a course.
 */
export const CourseSchema = z.object({
  CourseId: z.string(),
  CourseName: z.string(),
  InstituteName: z.string(),
  Category: z.string(),
  DeliveryMethod: z.string(),
  Location: z.string(),
  Language: z.string().optional(),
  StartDate: z.string(),
  Favorites: z.array(z.object({ Id: z.string() }).optional()),
  IsFavorite: z.boolean().optional(),
});

/**
 * Schema for a favorite course.
 */
export const FavouriteCourseSchema = z.object({
  Id: z.string(),
  UserId: z.string().optional().nullable(),
  CourseId: z.string(),
  CreatedAt: z.string(),
  CoursesTable: CourseSchema.pick({
    Category: true,
    CourseName: true,
    DeliveryMethod: true,
    InstituteName: true,
    Language: true,
    Location: true,
    StartDate: true,
    Favorites: true,
  }),
});

/**
 * Schema for the course application database values.
 */
export const CourseApplicationSchema = z.object({
  FirstName: z.string(),
  LastName: z.string().optional(),
  Email: z.string().email(),
  CourseId: z.string(),
});

/**
 * Schema for the course application form values.
 */
export const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  lastName: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

/**
 * Schema for the course application database/server operations.
 */
export const CourseApplicationActionSchema = formSchema.extend({
  courseId: z.string(),
});

export type Course = z.infer<typeof CourseSchema>;
export type FavouriteCourse = z.infer<typeof FavouriteCourseSchema>;
export type CourseApplication = z.infer<typeof CourseApplicationSchema>;
export type CourseApplicationAction = z.infer<
  typeof CourseApplicationActionSchema
>;
