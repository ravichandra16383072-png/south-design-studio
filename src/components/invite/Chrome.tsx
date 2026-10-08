import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Disc3, Share2, Link2, MessageCircle, VolumeX } from "lucide-react";
import { invite } from "@/invite.config";

export function Curtain({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const panel = "absolute inset-y-0 w-1/2 bg-maroon";
  const fabric = {
    backgroundImage:
      "repeating-linear-gradient(90deg, color-mix(in oklab, var(--maroon-deep) 60%, transparent) 0 3px, transparent 3px 22px)",
  };
  return (
    <AnimatePresence>
      {(

        <motion.div className="fixed inset-0 z-50 mx-auto max-w-[430px] overflow-hidden" exit={{ opacity: 0 }} onClick={() => { if (!opening) { setOpening(true); onOpen(); } }}>
          <motion.div className={`${panel} left-0 border-r-8 border-gold`} style={fabric} animate={opening ? { x: "-100%" } : { x: 0 }} transition={{ duration: 1.6, ease: [0.7, 0, 0.3, 1] }}>
            <div className="absolute inset-y-0 right-2 w-2 silk-border !h-auto" />
          </motion.div>
          <motion.div className={`${panel} right-0 border-l-8 border-gold`} style={fabric} animate={opening ? { x: "100%" } : { x: 0 }} transition={{ duration: 1.6, ease: [0.7, 0, 0.3, 1] }}>
            <div className="absolute inset-y-0 left-2 w-2 silk-border !h-auto" />
          </motion.div>
          <motion.div className="absolute inset-x-0 top-0 silk-border !h-4" animate={opening ? { y: -20, opacity: 0 } : {}} />
          <motion.button
            type="button"
            animate={opening ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: [1, 1.05, 1] }}
            transition={opening ? { duration: 0.4 } : { repeat: Infinity, duration: 2 }}
            className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-4 border-gold bg-maroon-deep text-center shadow-2xl"
          >
            <span className="font-serif text-2xl text-gold-soft">{invite.groomName[0]} & {invite.brideName[0]}</span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold">Tap to open</span>
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
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
