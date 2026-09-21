import type { EventItem, EventsContent } from "../types";

const upcoming: EventItem[] = [
  // {
  //   slug: "accessibility-clinic",
  //   title: "Digital Accessibility Clinic",
  //   date: "2026-09-05",
  //   location: "Sana'a · In-person and online",
  //   format: "Workshop",
  //   summary:
  //     "A practical session for civil society teams on improving accessibility across websites, documents, and digital content.",
  // },
];

const past: EventItem[] = [
  // {
  //   slug: "founders-conversation",
  //   title: "Founders' Conversation: Building VPD",
  //   date: "2026-08-14",
  //   location: "Online · Arabic and English",
  //   format: "Public Conversation",
  //   summary:
  //     "An open conversation about the motivations behind establishing VPD, its institutional direction and areas of work, and how persons with disabilities and partners can contribute to shaping it.",
  // },
  // {
  //   slug: "roots-meetup-2025",
  //   title: "Community Roots Meetup",
  //   date: "2025-11-20",
  //   location: "Aden",
  //   format: "Community Meetup",
  //   summary:
  //     "A gathering that brought together contributors from the community initiatives and experiences that helped shape the idea of establishing VPD.",
  // },
];

export const events: EventsContent = {
  items: {
    upcoming,
    past,
  },

  seo: {
    title: "Events — VPD",
    description:
      "Conversations, workshops, and gatherings that contribute to advancing representation, inclusion, and knowledge on disability issues in Yemen.",
    ogTitle: "Events — VPD",
    ogDescription:
      "Conversations, workshops, and gatherings on disability, inclusion, and participation in Yemen.",
  },

  header: {
    eyebrow: "Events",
    title: "Spaces for dialogue, learning, and participation.",
    lede:
      "VPD organizes and participates in conversations, workshops, and gatherings aimed at exchanging knowledge, strengthening participation, building capacity, and connecting persons with disabilities with institutions, stakeholders, and partners.",
  },

  upcomingSection: {
    eyebrow: "Upcoming",
    title: "What's Next.",
  },

  pastSection: {
    eyebrow: "Past",
    title: "From Our Journey.",
  },

  detail: {
    backLabel: "All Events",
    upcomingLabel: "Upcoming Event",
    pastLabel: "Past Event",
    openLabel: "Open to the Public",

    sections: [
      {
        title: "What to Expect",
        body:
          "The nature of each event varies according to its topic, partners, and target audience. Details for each event explain its objectives, participation methods, and available accessibility arrangements.",
      },
    ],

    accessTitle: "Accessibility",

    access: [
      "Clear information about accessibility arrangements before the event.",
      "Materials provided in accessible formats where possible.",
      "Consideration of participants' needs in event arrangements.",
      "Appropriate communication channels for requesting additional accessibility arrangements.",
    ],

    rsvp: {
      eyebrow: "Registration",
      title: "Join the Event",
      body:
        "Registration arrangements vary by event. Check the event details for participation methods and available dates.",
      cta: "Register Now",
    },

    recording: {
      eyebrow: "Past Event",
      title: "Event Materials",
      body:
        "When a recording or published materials are available, they can be accessed from the event page.",
      cta: "View Materials",
    },

    support: {
      title: "Need Accessibility Arrangements?",
      body:
        "Let us know about your accessibility needs as early as possible so we can consider appropriate arrangements.",
      cta: {
        label: "Contact Us →",
        href: "/get-involved",
      },
    },

    seoSuffix: "Event — VPD",
  },
};