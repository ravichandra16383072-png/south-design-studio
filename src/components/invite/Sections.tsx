import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ChevronDown, MapPin, Navigation } from "lucide-react";
import { invite } from "@/invite.config";
import { FloralCorner, Ganesha, Gopuram, Heart, JasmineStrings, Kolam, KolamDivider, Lamp, Thoranam } from "./Motifs";

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
};
const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

function Reveal({ children, delay = 0, y = 30 }: { children: ReactNode; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative px-6 py-16 ${className}`}>
      {children}
    </section>
  );
}

function Heading({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="mb-8 text-center">
      {kicker && <p className="font-script text-2xl text-gold">{kicker}</p>}
      <h2 className="font-serif text-4xl font-semibold text-maroon">{title}</h2>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 text-center">
      <motion.div
        className="absolute inset-x-0 top-0 z-10"
        initial={reduce ? false : { y: -120, rotate: -4 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 9, delay: 0.3 }}
        style={{ transformOrigin: "50% 0" }}
      >
        <Thoranam className="h-20 w-full" />
      </motion.div>
      <JasmineStrings className="absolute inset-x-0 top-6 h-40 w-full opacity-90" />
      <Gopuram className="absolute bottom-0 left-1/2 w-[120%] -translate-x-1/2 text-maroon/10" />

      <motion.div initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.9 }} className="relative z-20">
        <p className="font-sans text-xs uppercase tracking-[0.4em] text-muted-foreground">Together with their families</p>
        <h1 className="mt-4 font-serif text-7xl font-semibold leading-none text-maroon">{invite.title}</h1>
        <p lang={invite.regionalLang} className="mt-3 font-regional text-3xl font-semibold gold-text">
          {invite.regionalSubtitle}
        </p>
        <p className="mt-6 font-serif text-xl italic text-foreground">
          {invite.groomName} <span className="font-script not-italic text-gold">&</span> {invite.brideName}
        </p>
        <p className="mt-3 font-sans text-2xl tracking-[0.3em] text-maroon">{fmtDate(invite.weddingDateTime)}</p>
      </motion.div>

      <Lamp className="relative z-20 mt-8 h-32 w-20" />

      <motion.a
        href="#blessing"
        className="relative z-20 mt-6 flex flex-col items-center text-xs uppercase tracking-[0.3em] text-muted-foreground"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        Scroll to discover
        <ChevronDown className="mt-1 h-5 w-5 text-gold" />
      </motion.a>
    </section>
  );
}

export function Blessing() {
  return (
    <Section id="blessing" className="text-center">
      <Reveal>
        <Ganesha className="mx-auto h-20 w-20 text-gold" />
        <p className="mt-4 font-serif text-2xl text-maroon">{invite.blessing}</p>
        <p className="mt-2 text-sm text-muted-foreground">{invite.blessingTranslation}</p>
      </Reveal>
      <KolamDivider />
    </Section>
  );
}

export function Couple() {
  const reduce = useReducedMotion();
  return (
    <Section className="text-center">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -80, rotate: -18 }}
        whileInView={{ opacity: 1, y: 0, rotate: -4 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 70, damping: 12 }}
        className="relative mx-auto w-72 bg-card p-3 pb-14 shadow-[0_20px_40px_-15px_color-mix(in_oklab,var(--maroon)_45%,transparent)]"
      >
        <img src={invite.coverPhoto} alt={`${invite.groomName} and ${invite.brideName}`} width={896} height={1088} loading="lazy" className="aspect-[4/5] w-full object-cover" />
        <p className="absolute bottom-3 left-0 right-0 font-script text-3xl text-maroon">Better Together</p>
        <Heart className="absolute -right-4 -top-4 h-8 w-8 rotate-12 text-maroon" />
        <Heart className="absolute -left-3 bottom-16 h-5 w-5 -rotate-12 text-gold" />
      </motion.div>
      <Reveal delay={0.2}>
        <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">The Groom</p>
            <p className="font-serif text-3xl font-semibold text-maroon">{invite.groomName}</p>
          </div>
          <span className="font-script text-4xl text-gold">&</span>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">The Bride</p>
            <p className="font-serif text-3xl font-semibold text-maroon">{invite.brideName}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute -left-2 top-4 w-24"><FloralCorner /></motion.div>
      <motion.div style={{ y: y2 }} className="absolute -right-2 bottom-4 w-24 rotate-180"><FloralCorner /></motion.div>
      <Section className="text-center">
        <Heading kicker="how it began" title="Our Story" />
        <Reveal>
          <p className="font-serif text-xl leading-relaxed text-foreground first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:text-maroon">
            {invite.story}
          </p>
        </Reveal>
      </Section>
    </div>
  );
}

export function Countdown() {
  const target = new Date(invite.weddingDateTime).getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - (now ?? target));
  const parts = [
    ["Days", Math.floor(diff / 864e5)],
    ["Hours", Math.floor((diff / 36e5) % 24)],
    ["Mins", Math.floor((diff / 6e4) % 60)],
    ["Secs", Math.floor((diff / 1e3) % 60)],
  ] as const;
  return (
    <Section className="bg-maroon text-center text-primary-foreground">
      <div className="absolute inset-x-0 top-0 silk-border" />
      <p className="font-script text-2xl text-gold-soft">counting down to</p>
      <h2 className="font-serif text-4xl text-primary-foreground">The Muhurtham</h2>
      <p className="mt-1 text-sm text-gold-soft">{invite.muhurtham}</p>
      <div className="mt-8 grid grid-cols-4 gap-2">
        {parts.map(([label, v]) => (
          <div key={label} className="rounded-lg border-2 border-gold bg-maroon-deep/60 px-1 py-3">
            <p className="font-serif text-3xl font-semibold tabular-nums gold-text">{now === null ? "--" : String(v).padStart(2, "0")}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold-soft">{label}</p>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 silk-border" />
    </Section>
  );
}

export function Events() {
  const reduce = useReducedMotion();
  return (
    <Section>
      <Heading kicker="celebrations" title="Wedding Events" />
      <div className="relative">
        <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-gold/60" />
        <div className="space-y-8">
          {invite.events.map((e, i) => {
            const left = i % 2 === 0;
            return (
              <div key={e.name} className="relative grid grid-cols-2 gap-6">
                <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-background p-0.5">
                  <Kolam size={26} />
                </div>
                <motion.div
                  initial={reduce ? false : { opacity: 0, x: left ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`${left ? "col-start-1 text-right" : "col-start-2"} rounded-xl border border-gold/50 bg-card p-3 shadow-sm`}
                >
                  <p className="font-serif text-2xl font-semibold text-maroon">{e.name}</p>
                  <p className="text-xs font-medium text-foreground">{longDate(e.date)}</p>
                  <p className="text-xs text-muted-foreground">{e.time}</p>
                  <p className="mt-1 text-xs text-foreground">{e.venueName}</p>
                  <a href={e.mapsUrl} target="_blank" rel="noreferrer" className={`mt-2 inline-flex items-center gap-1 rounded-full bg-maroon px-2.5 py-1 text-[11px] text-primary-foreground ${left ? "flex-row-reverse" : ""}`}>
                    <Navigation className="h-3 w-3" /> Directions
                  </a>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export function Venue() {
  const v = invite.venue;
  return (
    <Section className="text-center">
      <Heading kicker="where" title="The Venue" />
      <Reveal>
        <p className="font-serif text-3xl text-maroon">{v.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{v.address}</p>
        <div className="mt-6 overflow-hidden rounded-2xl border-4 border-gold/70 shadow-lg">
          <iframe
            title="Venue map"
            src={`https://www.google.com/maps?q=${v.lat},${v.lng}&z=15&output=embed`}
            className="h-64 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a href={v.mapsUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-2.5 text-sm text-primary-foreground shadow-md">
          <MapPin className="h-4 w-4" /> Open in Maps
        </a>
      </Reveal>
    </Section>
  );
}

export function Family() {
  const card = (side: string, p: { father: string; mother: string }) => (
    <div className="rounded-2xl border border-gold/60 bg-card p-5 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">{side}</p>
      <p className="mt-2 font-serif text-xl text-maroon">{p.father}</p>
      <p className="font-serif text-xl text-maroon">{p.mother}</p>
    </div>
  );
  return (
    <Section className="text-center">
      <Reveal>
        <p lang={invite.regionalLang} className="font-regional text-lg text-gold">{invite.familyRegionalLine}</p>
        <h2 className="mt-2 font-serif text-3xl text-maroon">With the blessings of our parents</h2>
      </Reveal>
      <div className="mt-8 space-y-4">
        <Reveal delay={0.1}>{card(`${invite.groomName}'s Parents`, invite.groomParents)}</Reveal>
        <div className="flex items-center justify-center gap-2 text-maroon" aria-hidden>
          <span className="h-px w-12 bg-gold" /><Heart className="h-5 w-5" /><span className="h-px w-12 bg-gold" />
        </div>
        <Reveal delay={0.2}>{card(`${invite.brideName}'s Parents`, invite.brideParents)}</Reveal>
      </div>
    </Section>
  );
}

export function Gallery() {
  const [order, setOrder] = useState(invite.galleryPhotos.map((_, i) => i));
  const next = () => setOrder((o) => [...o.slice(1), o[0] as number]);
  return (
    <Section className="text-center">
      <Heading kicker="moments" title="Gallery" />
      <div className="relative mx-auto h-[380px] w-64">
        {order.map((idx, pos) => {
          const top = pos === 0;
          const rot = [-3, 4, -6, 6, -2][idx % 5] ?? 0;
          return (
            <motion.div
              key={idx}
              drag={top ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => Math.abs(info.offset.x) > 80 && next()}
              onClick={top ? next : undefined}
              animate={{ rotate: rot, scale: 1 - pos * 0.04, y: pos * 6, opacity: pos > 3 ? 0 : 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="absolute inset-0 cursor-grab bg-card p-2.5 pb-10 shadow-xl active:cursor-grabbing"
              style={{ zIndex: order.length - pos }}
            >
              <img src={invite.galleryPhotos[idx]} alt="" loading="lazy" width={768} height={896} draggable={false} className="h-full w-full object-cover" />
            </motion.div>
          );
        })}
      </div>
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">Swipe or tap</p>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-maroon px-6 pb-28 pt-12 text-center text-primary-foreground">
      <div className="absolute inset-x-0 top-0 silk-border" />
      <p className="font-script text-2xl text-gold-soft">We look forward to celebrating with you</p>
      <p className="mt-4 font-serif text-4xl">
        {invite.groomName} <span className="text-gold">&</span> {invite.brideName}
      </p>
      <p className="mt-2 tracking-[0.3em] text-gold-soft">{fmtDate(invite.weddingDateTime)}</p>
      <div className="mt-6 flex justify-center"><Kolam size={48} /></div>
    </footer>
  );
}
