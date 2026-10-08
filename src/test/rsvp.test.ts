import { describe, it, expect } from "vitest";
import { rsvpSchema } from "@/lib/rsvp";

const base = { name: "Asha", phone: "+91 98765 43210", guests: 2, attending: true, events: ["Muhurtham"], message: "" };

describe("rsvp rules", () => {
  it("accepts a valid RSVP", () => expect(rsvpSchema.safeParse(base).success).toBe(true));
  it("requires at least 1 guest", () => expect(rsvpSchema.safeParse({ ...base, guests: 0 }).success).toBe(false));
  it("requires a name", () => expect(rsvpSchema.safeParse({ ...base, name: "  " }).success).toBe(false));
  it("requires a phone", () => expect(rsvpSchema.safeParse({ ...base, phone: "" }).success).toBe(false));
});
