import { z } from "zod";

export const rsvpSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  phone: z.string().trim().regex(/^[+\d\s-]{5,20}$/, "Please enter a valid phone number"),
  guests: z.coerce.number().int().min(1, "At least 1 guest").max(20, "Max 20 guests"),
  attending: z.boolean(),
  events: z.array(z.string().max(50)).max(20),
  message: z.string().trim().max(500).optional().or(z.literal("")),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
