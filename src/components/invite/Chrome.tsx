import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Disc3, Share2, Link2, MessageCircle, VolumeX } from "lucide-react";
import { invite } from "@/invite.config";
import { Button } from "@/components/ui/button";

export function OpeningReveal({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const reduce = !!useReducedMotion();
  const open = () => {
    if (opening) return;
    setOpening(true);
    onOpen();
  };

  return (
    <motion.div
      className={`fixed inset-0 z-50 mx-auto max-w-[430px] overflow-hidden ${opening ? "pointer-events-none" : ""}`}
      initial={false}
      animate={{ opacity: opening ? 0 : 1 }}
      transition={{ duration: reduce ? 0.8 : 0.9, ease: "easeOut" }}
    >
      <Button
        variant="ghost"
        onClick={open}
        disabled={opening}
        aria-label={`Open the wedding invitation of ${invite.groomName} and ${invite.brideName}`}
        className="absolute inset-0 h-full w-full rounded-none bg-transparent p-0 hover:bg-transparent focus-visible:ring-inset focus-visible:ring-gold"
      >
        <span className="absolute bottom-[14%] font-serif text-lg font-normal italic text-gold-soft">Tap to open</span>
      </Button>
    </motion.div>
  );
}

export function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-maroon text-gold-soft shadow-lg"
      style={{ right: "max(1.25rem, calc(50vw - 215px + 1.25rem))" }}>
      {playing ? <Disc3 className="h-6 w-6 spin-slow" /> : <VolumeX className="h-5 w-5" />}
    </button>
  );
}

export function SharePill() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const text = `You're invited to ${invite.groomName} & ${invite.brideName}'s wedding!`;
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: invite.title, text, url }); return; } catch { /* fall through */ }
    }
    setOpen((o) => !o);
  };
  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="fixed bottom-5 z-40 flex flex-col items-start gap-2" style={{ left: "max(1.25rem, calc(50vw - 215px + 1.25rem))" }}>
      {open && (
        <div className="flex flex-col gap-2">
          <a href={`https://wa.me/?text=${encodeURIComponent(`${text} ${typeof window !== "undefined" ? window.location.href : ""}`)}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-leaf px-4 py-2 text-xs text-primary-foreground shadow"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
          <button onClick={copy} className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs text-maroon shadow"><Link2 className="h-4 w-4" /> {copied ? "Copied!" : "Copy link"}</button>
        </div>
      )}
      <button onClick={share} className="flex items-center gap-2 rounded-full border-2 border-gold bg-maroon px-4 py-3 text-xs uppercase tracking-widest text-gold-soft shadow-lg">
        <Share2 className="h-4 w-4" /> Share
      </button>
    </div>
  );
}
