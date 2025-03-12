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

export type Course = z.infer<typeof CourseSchema>;
