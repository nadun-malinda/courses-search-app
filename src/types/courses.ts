import { z } from "zod";

export const CourseSchema = z.object({
  CourseId: z.number(),
  CourseName: z.string(),
  InstituteName: z.string(),
  Category: z.string(),
  DeliveryMethod: z.string(),
  Location: z.string(),
  Language: z.string().optional(),
  StartDate: z.date(),
});

export type Course = z.infer<typeof CourseSchema>;
