import { z } from "zod";

import type { InteractivePresentationContent } from "./types";

export const presentationSlugSchema = z
  .string()
  .min(1)
  .regex(/^[A-Za-z0-9_-]+$/);

export const heroTextSegmentSchema = z
  .object({
    text: z.string(),
    emphasis: z.boolean().optional(),
  })
  .strict();

export const heroTextParagraphSchema = z
  .object({
    segments: z.array(heroTextSegmentSchema).min(1),
    spacing: z.enum(["compact", "normal"]).optional(),
  })
  .strict();

export const interactivePresentationStepSchema = z
  .object({
    id: z.string().min(1),
    targetId: z.string().min(1),
    text: z.string().min(1),
    block: z.enum(["center", "end", "nearest", "start"]).optional(),
  })
  .strict();

export const interactivePresentationSchema = z
  .object({
    slug: presentationSlugSchema,
    language: z.enum(["en", "fr"]),
    companyName: z.string().min(1),
    hero: z
      .object({
        identity: z
          .object({
            fullName: z.string().optional(),
            jobTitle: z.string().optional(),
          })
          .strict()
          .optional(),
        summary: z.array(heroTextParagraphSchema).min(1),
      })
      .strict(),
    controls: z
      .object({
        start: z.string().optional(),
        previous: z.string().optional(),
        next: z.string().optional(),
        finish: z.string().optional(),
      })
      .strict()
      .optional(),
    steps: z.array(interactivePresentationStepSchema).min(1),
  })
  .strict();

export function parseInteractivePresentation(value: unknown): InteractivePresentationContent {
  return interactivePresentationSchema.parse(value) as InteractivePresentationContent;
}
