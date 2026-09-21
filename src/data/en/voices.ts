import type { VoicesContent } from "../types";

export const voices: VoicesContent = {
  seo: {
    title: "Voices — VPD",
    description:
      "A space where persons with disabilities in Yemen share their experiences, ideas, priorities, and concerns in their own voices.",
    ogTitle: "Voices — VPD",
    ogDescription:
      "A space for participation and representation where persons with disabilities express their experiences and priorities in their own voices.",
  },

  header: {
    eyebrow: "Voices — A Space for Participation & Representation",
    title: "The voice belongs to those who live it.",
    lede:
      "“Voices” is a space for participation and representation where persons with disabilities in Yemen share their experiences, ideas, priorities, and concerns. We do not speak on their behalf; we work to expand the space in which they can speak and influence.",
    primaryCta: {
      label: "Share Your Voice",
      href: "/get-involved",
    },
    secondaryCta: {
      label: "Contribution Guidelines",
      href: "/get-involved",
    },
  },

  items: [
    {
      slug: "voice-leadership-nadia",
      author: "Nadia",
      role: "Teacher · Sana'a",
      title: "The Room Does Not Need to Be Rebuilt; It Needs a Different Door.",
      excerpt:
        "For years, I was invited into discussions after decisions had already been made. Leadership is not simply being present; it means being involved before the plan is made.",
      image: "voice1",
      readingTime: "4 min read",
    },

    {
      slug: "voice-work-yousef",
      author: "Yousef",
      role: "Software Engineer · Aden",
      title: "Accessible Technology Is Not Charity — It Is Good Design.",
      excerpt:
        "When filling out a form takes twenty minutes, the problem may be the design, not the person. Accessibility is part of product quality, not a favor that is given.",
      image: "voice2",
      readingTime: "4 min read",
    },

    {
      slug: "voice-family-amal",
      author: "Amal",
      role: "Mother & Advocate",
      title: "The Language of Rights Made Us Clearer.",
      excerpt:
        "Understanding our rights changed the way we talk about our needs and demands. Clarity is an important starting point for participation and change.",
      image: "voice1",
      readingTime: "4 min read",
    },
  ],

  contribute: {
    eyebrow: "Contribute",
    title: "An Open Space for Community Voices.",
    options: [
      {
        title: "Write",
        body:
          "Share an experience, opinion, or analysis in Arabic or English, whether as a short piece or a longer article.",
      },
      {
        title: "Speak",
        body:
          "You can record your contribution as audio, and we will work with you to turn it into a published piece in an appropriate format.",
      },
      {
        title: "Sign",
        body:
          "You can contribute in Yemeni Sign Language, with text and captions provided when published.",
      },
    ],
  },
};