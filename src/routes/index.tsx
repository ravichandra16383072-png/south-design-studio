import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { invite } from "@/invite.config";
import { Blessing, Countdown, Couple, Events, Family, Footer, Gallery, Hero, Story, Venue } from "@/components/invite/Sections";
import { Rsvp } from "@/components/invite/Rsvp";
import { Curtain, MusicToggle, SharePill } from "@/components/invite/Chrome";
import { KolamDivider, Petals } from "@/components/invite/Motifs";

const d = new Date(invite.weddingDateTime);
const dateStr = d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
const title = `${invite.groomName} & ${invite.brideName} — ${invite.title} | ${dateStr}`;
const description = `You're warmly invited to the wedding of ${invite.groomName} & ${invite.brideName} on ${dateStr} at ${invite.venue.name}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  const audio = useRef<HTMLAudioElement>(null);
  const [opened, setOpened] = useState(false);
  const [curtainGone, setCurtainGone] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    document.body.style.overflow = curtainGone ? "" : "hidden";
  }, [curtainGone]);

  const [fading, setFading] = useState(false);
  const open = () => {
    setOpened(true);
    audio.current?.play().then(() => setPlaying(true)).catch(() => {});
    setTimeout(() => setFading(true), 2300);
    setTimeout(() => setCurtainGone(true), 3300);
  };
  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else { a.pause(); setPlaying(false); }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,var(--maroon),var(--maroon-deep))]">
      <audio ref={audio} src={invite.musicUrl} loop preload="none" />
      <main className="paper relative mx-auto max-w-[430px] overflow-x-hidden shadow-[0_0_80px_color-mix(in_oklab,var(--maroon-deep)_80%,transparent)]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1.5 silk-border !h-auto" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-1.5 silk-border !h-auto" />
        {opened && <div className="pointer-events-none fixed inset-0 z-40 mx-auto max-w-[430px]"><Petals count={12} /></div>}
        <Hero revealed={opened} />
        <Blessing />
        <Couple />
        <KolamDivider />
        <Story />
        <Countdown />
        <Events />
        <KolamDivider />
        <Venue />
        <Family />
        <KolamDivider />
        <Gallery />
        <Rsvp />
        <Footer />
      </main>
      {!curtainGone && <Curtain onOpen={open} fading={fading} />}
      {curtainGone && (
        <>
          <MusicToggle playing={playing} onToggle={toggle} />
          <SharePill />
        </>
      )}
    </div>
  );
}
