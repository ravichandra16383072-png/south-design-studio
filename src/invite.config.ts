import cover from "@/assets/cover.jpg";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";

// All invitation content lives here. Change per client — no component edits needed.
export const invite = {
  groomName: "Rahul",
  brideName: "Anjali",
  title: "Hridayam",
  regionalSubtitle: "హృదయం",
  regionalLang: "te" as const,
  blessing: "ॐ श्री गणेशाय नमः",
  blessingTranslation: "With the grace of Lord Ganesha",
  familyRegionalLine: "ഗുരുക്കന്മാരുടെ അനുഗ്രഹത്തോടെ",
  weddingDateTime: "2026-10-21T10:30:00+05:30",
  muhurtham: "10:30 AM – 11:15 AM (Muhurtham)",
  events: [
    { name: "Haldi", date: "2026-10-19", time: "10:00 AM", venueName: "Groom's Residence", address: "Panampilly Nagar, Kochi", mapsUrl: "https://maps.google.com/?q=Panampilly+Nagar+Kochi" },
    { name: "Mehendi", date: "2026-10-19", time: "5:00 PM", venueName: "Bride's Residence", address: "Kakkanad, Kochi", mapsUrl: "https://maps.google.com/?q=Kakkanad+Kochi" },
    { name: "Sangeet", date: "2026-10-20", time: "7:00 PM", venueName: "Grand Plaza – Lawn", address: "MG Road, Kochi", mapsUrl: "https://maps.google.com/?q=Grand+Plaza+Kochi" },
    { name: "Muhurtham", date: "2026-10-21", time: "10:30 AM", venueName: "Grand Plaza – Kalyana Mandapam", address: "MG Road, Kochi", mapsUrl: "https://maps.google.com/?q=Grand+Plaza+Kochi" },
    { name: "Reception", date: "2026-10-21", time: "7:00 PM", venueName: "Grand Plaza – Ballroom", address: "MG Road, Kochi", mapsUrl: "https://maps.google.com/?q=Grand+Plaza+Kochi" },
  ],
  venue: {
    name: "Grand Plaza",
    address: "MG Road, Ernakulam, Kochi, Kerala 682016",
    lat: 9.9667,
    lng: 76.2833,
    mapsUrl: "https://maps.google.com/?q=Grand+Plaza+Kochi",
  },
  groomParents: { father: "Mr. Suresh Menon", mother: "Mrs. Lakshmi Menon" },
  brideParents: { father: "Mr. Krishnan Nair", mother: "Mrs. Radha Nair" },
  story:
    "We met on a rainy monsoon evening in Fort Kochi, sharing an umbrella and a plate of banana fritters. What began as a chance conversation grew into countless filter-coffee mornings, long drives along the backwaters, and a love that feels like home. Now, with our families' blessings, we begin forever.",
  coverPhoto: cover,
  galleryPhotos: [g2, g1, g3, g4, cover],
  galleryDriveUrl: "https://drive.google.com/drive/folders/1jaGvdT6wbjQCAcY2RRA06EceRmnFu31c",
  musicUrl: "https://cdn.pixabay.com/audio/2022/10/30/audio_347111d6a5.mp3",
  rsvpDeadline: "2026-10-10",
  contactPhone: "919876543210",
};

export type InviteEvent = (typeof invite.events)[number];
