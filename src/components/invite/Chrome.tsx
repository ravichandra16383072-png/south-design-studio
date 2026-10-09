import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Disc3, Share2, Link2, MessageCircle, VolumeX } from "lucide-react";
import { invite } from "@/invite.config";
import { InviteTitle } from "./Sections";
import curtainLeft from "@/assets/curtain-left.jpg";
import curtainRight from "@/assets/curtain-right.jpg";

const silkEase = [0.7, 0, 0.25, 1] as const;

function Panel({ side, opening, reduce }: { side: "left" | "right"; opening: boolean; reduce: boolean }) {
  const left = side === "left";
  return (
    <motion.div
      className={`absolute inset-y-0 w-1/2 overflow-hidden ${left ? "left-0" : "right-0"}`}
      style={{ transformOrigin: left ? "0% 50%" : "100% 50%" }}
      initial={false}
      animate={
        opening && !reduce
          ? { x: left ? "-88%" : "88%", scaleX: 0.82, skewY: left ? -1.2 : 1.2 }
          : { x: 0, scaleX: 1, skewY: 0 }
      }
      transition={{ duration: 2.3, ease: silkEase }}
    >
      <img
        src={left ? curtainLeft : curtainRight}
        alt=""
        width={640}
        height={1600}
        fetchPriority="high"
        draggable={false}
        className={`h-full w-full object-cover ${left ? "object-[100%_50%]" : "object-[0%_50%]"}`}
      />
      {/* light catching the silk as it moves */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(100deg,transparent_30%,color-mix(in_oklab,var(--turmeric)_28%,transparent)_50%,transparent_70%)] mix-blend-soft-light"
        initial={false}
        animate={opening && !reduce ? { x: left ? ["60%", "-80%"] : ["-60%", "80%"], opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        aria-hidden
      />
      {/* inner-edge shadow where the panels meet */}
      <div className={`absolute inset-y-0 w-6 ${left ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"} from-maroon-deep/60 to-transparent`} aria-hidden />
    </motion.div>
  );
}

export function Curtain({ onOpen, fading }: { onOpen: () => void; fading: boolean }) {
  const [opening, setOpening] = useState(false);
  const reduce = !!useReducedMotion();
  const open = () => {
    if (opening) return;
    setOpening(true);
    onOpen();
  };
  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Open the wedding invitation of ${invite.groomName} and ${invite.brideName}`}
      onClick={open}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } }}
      className={`fixed inset-0 z-50 mx-auto max-w-[430px] overflow-hidden outline-none ${opening ? "pointer-events-none" : "cursor-pointer"}`}
      initial={false}
      animate={{ opacity: fading || (reduce && opening) ? 0 : 1 }}
      transition={{ duration: reduce ? 0.8 : 0.9, ease: "easeOut" }}
    >
      <Panel side="left" opening={opening} reduce={reduce} />
      <Panel side="right" opening={opening} reduce={reduce} />
      {/* soft vignette keeping the centre dark for the type */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_45%_at_50%_48%,color-mix(in_oklab,var(--maroon-deep)_65%,transparent),transparent_75%)]"
        initial={false}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6"
        initial={false}
        animate={opening ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="-mt-10"><InviteTitle /></div>
        <motion.p
          className="absolute bottom-[14%] font-serif text-lg italic text-gold-soft/90"
          animate={reduce ? { opacity: 0.85 } : { opacity: [0.45, 0.95, 0.45] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
        >
          Tap to open
        </motion.p>
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
