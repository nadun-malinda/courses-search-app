import { z } from "zod";

export const CourseSchema = z.object({
  CourseId: z.string(),
  CourseName: z.string(),
  InstituteName: z.string(),
  Category: z.string(),
  DeliveryMethod: z.string(),
  Location: z.string(),
  Language: z.string().optional(),
  StartDate: z.string(),
  IsFavorite: z.boolean().optional(),
});

export const FavouriteCourseSchema = z.object({
  Id: z.string(),
  UserId: z.string().optional(),
  CourseId: z.string(),
  CreatedAt: z.string(),
});

export type Course = z.infer<typeof CourseSchema>;
export type FavouriteCourse = z.infer<typeof FavouriteCourseSchema>;
