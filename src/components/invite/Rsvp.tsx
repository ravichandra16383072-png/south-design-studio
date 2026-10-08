import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { invite } from "@/invite.config";
import { rsvpSchema } from "@/lib/rsvp";
import { Petals } from "./Motifs";

const input = "w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

export function Rsvp() {
  const [form, setForm] = useState({ name: "", phone: "", guests: 1, attending: true, events: [] as string[], message: "" });
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");

  const toggleEvent = (n: string) =>
    setForm((f) => ({ ...f, events: f.events.includes(n) ? f.events.filter((e) => e !== n) : [...f.events, n] }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = rsvpSchema.safeParse(form);
    if (!parsed.success) return setError(parsed.error.issues[0].message);
    setError(null);
    setStatus("saving");
    const { error: err } = await supabase.from("rsvps").insert({ ...parsed.data, message: parsed.data.message || null });
    if (err) {
      setStatus("idle");
      return setError("Couldn't send your RSVP. Please try WhatsApp instead.");
    }
    setStatus("done");
  };

  const waText = encodeURIComponent(
    `Hi! RSVP for ${invite.groomName} & ${invite.brideName}'s wedding.\nName: ${form.name || "-"}\nGuests: ${form.guests}\nAttending: ${form.attending ? "Yes" : "No"}\nEvents: ${form.events.join(", ") || "-"}`,
  );
  const deadline = new Date(invite.rsvpDeadline).toLocaleDateString("en-IN", { day: "numeric", month: "long" });

  return (
    <section className="relative overflow-hidden px-6 py-16">
      <div className="mb-8 text-center">
        <p className="font-script text-2xl text-gold">kindly respond</p>
        <h2 className="font-serif text-4xl font-semibold text-maroon">RSVP</h2>
        <p className="mt-1 text-sm text-muted-foreground">Please respond by {deadline}</p>
      </div>

      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div key="thanks" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative rounded-2xl border-2 border-gold bg-card p-8 text-center">
            <Petals count={30} burst />
            <p className="font-script text-4xl text-maroon">Thank you!</p>
            <p className="mt-2 text-sm text-foreground">
              {form.attending ? "We can't wait to celebrate with you." : "You'll be missed — thank you for your blessings."}
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} className="space-y-3 rounded-2xl border border-gold/50 bg-card/70 p-5">
            <input className={input} placeholder="Your name" maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className={input} placeholder="Phone" inputMode="tel" maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <label className="flex items-center justify-between text-sm">
              Number of guests
              <input type="number" min={1} max={20} className={`${input} w-20`} value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} />
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[true, false].map((v) => (
                <button type="button" key={String(v)} onClick={() => setForm({ ...form, attending: v })}
                  className={`rounded-lg border py-2 text-sm ${form.attending === v ? "border-maroon bg-maroon text-primary-foreground" : "border-input bg-card"}`}>
                  {v ? "Joyfully attending" : "Regretfully decline"}
                </button>
              ))}
            </div>
            {form.attending && (
              <div className="flex flex-wrap gap-2">
                {invite.events.map((ev) => (
                  <label key={ev.name} className={`cursor-pointer rounded-full border px-3 py-1 text-xs ${form.events.includes(ev.name) ? "border-gold bg-secondary text-secondary-foreground" : "border-input"}`}>
                    <input type="checkbox" className="sr-only" checked={form.events.includes(ev.name)} onChange={() => toggleEvent(ev.name)} />
                    {ev.name}
                  </label>
                ))}
              </div>
            )}
            <textarea className={input} rows={3} maxLength={500} placeholder="Message for the couple" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button disabled={status === "saving"} className="flex w-full items-center justify-center gap-2 rounded-full bg-maroon py-3 font-medium text-primary-foreground shadow-md disabled:opacity-60">
              {status === "saving" && <Loader2 className="h-4 w-4 animate-spin" />} Send RSVP
            </button>
            <a href={`https://wa.me/${invite.contactPhone}?text=${waText}`} target="_blank" rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-leaf py-3 text-sm text-leaf">
              <MessageCircle className="h-4 w-4" /> RSVP on WhatsApp
            </a>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}
