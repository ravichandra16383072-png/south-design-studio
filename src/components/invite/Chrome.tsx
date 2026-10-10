import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Disc3, Share2, Link2, MessageCircle, VolumeX, Heart } from "lucide-react";
import { invite } from "@/invite.config";
import { Button } from "@/components/ui/button";

export function OpeningReveal({ onOpen, onFinish }: { onOpen: () => void; onFinish: () => void }) {
  const [opening, setOpening] = useState(false);
  const reduce = !!useReducedMotion();
  const open = () => {
    if (opening) return;
    setOpening(true);
    onOpen();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-maroon-deep"
      initial={false}
      animate={{ opacity: opening ? 0 : 1 }}
      transition={{
        duration: reduce ? 0.35 : 0.65,
        delay: opening && !reduce ? 1.2 : 0,
        ease: "easeInOut",
      }}
      onAnimationComplete={() => {
        if (opening) onFinish();
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--maroon)_45%,var(--maroon-deep)),var(--maroon-deep)_72%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-full max-w-[430px] -translate-x-1/2" aria-hidden="true">
        <div className="absolute inset-4 border border-gold/30 sm:inset-6">
          <div className="absolute inset-1 border border-gold/15" />
          <span className="absolute -left-px -top-px h-5 w-5 border-l border-t border-gold/80" />
          <span className="absolute -right-px -top-px h-5 w-5 border-r border-t border-gold/80" />
          <span className="absolute -bottom-px -left-px h-5 w-5 border-b border-l border-gold/80" />
          <span className="absolute -bottom-px -right-px h-5 w-5 border-b border-r border-gold/80" />
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold/70 bg-maroon-deep" />
          <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 border border-gold/70 bg-maroon-deep" />
        </div>
      </div>
      <Button
        variant="ghost"
        onClick={open}
        disabled={opening}
        aria-label={`Open the wedding invitation of ${invite.groomName} and ${invite.brideName}`}
        className="absolute left-1/2 top-1/2 h-auto w-[min(82vw,21rem)] -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-md bg-transparent p-0 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-8 focus-visible:ring-offset-maroon-deep"
      >
        <motion.div
          className="relative aspect-[1.5/1] w-full"
          style={{ perspective: 1000 }}
          animate={
            opening || reduce
              ? { rotate: 0, x: 0, y: opening ? -24 : 0, scale: opening ? 1.04 : 1 }
              : { rotate: [0, -1.2, 1.2, -0.8, 0], x: [0, -2, 2, -1, 0], y: [0, -2, 0, -1, 0] }
          }
          transition={
            opening || reduce
              ? { duration: reduce ? 0.2 : 0.8, ease: [0.22, 1, 0.36, 1] }
              : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <div className="absolute inset-0 rounded-md border border-gold/80 bg-gradient-to-br from-maroon via-maroon to-maroon-deep shadow-2xl shadow-black/40" />
          <div className="absolute inset-1 rounded border border-gold/50" />
          <div className="absolute inset-[7px] rounded border border-gold/20" />
          <motion.div
            className="absolute inset-x-[8%] top-[6%] z-10 flex h-[88%] flex-col items-center justify-center rounded-sm bg-ivory px-3 text-center shadow-md"
            initial={false}
            animate={{ y: opening ? -58 : 0 }}
            transition={{ duration: reduce ? 0.2 : 0.9, delay: opening && !reduce ? 0.35 : 0, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <p lang={invite.regionalLang} className="font-regional text-sm text-gold">{invite.regionalSubtitle}</p>
            <p className="mt-2 font-serif text-lg text-maroon">{invite.groomName} &amp; {invite.brideName}</p>
            <span className="mt-2 h-px w-10 bg-gold/70" />
            <p className="mt-2 font-script text-xl text-maroon">{invite.title}</p>
          </motion.div>
          <div className="absolute inset-0 z-20" style={{ clipPath: "polygon(0 0, 50% 54%, 0 100%)", background: "linear-gradient(135deg, var(--maroon), var(--maroon-deep))" }} />
          <div className="absolute inset-0 z-20" style={{ clipPath: "polygon(100% 0, 50% 54%, 100% 100%)", background: "linear-gradient(225deg, var(--maroon), var(--maroon-deep))" }} />
          <div className="absolute inset-0 z-20" style={{ clipPath: "polygon(0 100%, 50% 50%, 100% 100%)", background: "linear-gradient(0deg, var(--maroon-deep), var(--maroon))" }} />
          <motion.div
            className="absolute inset-x-0 top-0 z-30 h-[58%] bg-gradient-to-b from-maroon to-maroon-deep"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            animate={{ rotateX: opening && !reduce ? -165 : 0 }}
            transition={{ duration: reduce ? 0.2 : 0.8, delay: opening && !reduce ? 0.12 : 0, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0 z-40 rounded-md border border-gold/70 shadow-[inset_0_0_0_3px_color-mix(in_oklab,var(--gold)_20%,transparent)]"
            initial={false}
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: reduce ? 0.15 : 0.25 }}
          />
          <motion.div
            className="absolute left-1/2 top-[54%] z-50 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-maroon shadow-md"
            animate={opening ? { opacity: 0, scale: 0.7 } : { opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0.15 : 0.3 }}
            aria-hidden="true"
          >
            <Heart className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
          </motion.div>
        </motion.div>
        <span className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gold/80 bg-maroon px-7 py-3 font-serif text-lg italic text-gold-soft shadow-lg">
          {opening ? "Opening your invitation" : "Open invitation"}
        </span>
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
