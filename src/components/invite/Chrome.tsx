import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Disc3, Share2, Link2, MessageCircle, VolumeX } from "lucide-react";
import { invite } from "@/invite.config";

export function Curtain({ onOpen, fading }: { onOpen: () => void; fading: boolean }) {
  const [opening, setOpening] = useState(false);
  const reduce = !!useReducedMotion();
  const date = new Date(invite.weddingDateTime).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 mx-auto flex max-w-[430px] items-center justify-center overflow-y-auto bg-maroon-deep/75 px-6 py-10 backdrop-blur-sm"
      initial={false}
      animate={{ opacity: fading || (reduce && opening) ? 0 : 1 }}
      transition={{ duration: reduce ? 0.4 : 0.7, ease: "easeOut" }}
    >
      <motion.div
        className="relative w-full max-w-sm rounded-2xl border border-gold/70 bg-ivory/95 px-6 py-12 text-center shadow-2xl shadow-maroon-deep/40"
        animate={opening ? { opacity: 0, y: -12, scale: 0.98 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduce ? 0.25 : 0.55, ease: "easeOut" }}
      >
        <div className="pointer-events-none absolute inset-2 rounded-xl border border-gold/30" aria-hidden />
        <p lang={invite.regionalLang} className="font-regional text-xl text-gold">{invite.regionalSubtitle}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">Together with their families</p>
        <h1 className="mt-5 font-serif text-4xl font-medium text-maroon">
          {invite.groomName} <span className="text-gold">&amp;</span> {invite.brideName}
        </h1>
        <p className="mt-3 font-serif text-lg text-maroon/80">{date}</p>
        <div className="mx-auto my-6 h-px w-16 bg-gold/70" aria-hidden />
        <p className="font-script text-3xl text-maroon">{invite.title}</p>
        <button
          type="button"
          disabled={opening}
          onClick={() => {
            setOpening(true);
            onOpen();
          }}
          className="mt-8 rounded-full bg-maroon px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground shadow-lg transition hover:bg-maroon-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:cursor-default"
        >
          Open invitation
        </button>
      </motion.div>
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
