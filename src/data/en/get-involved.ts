import type { GetInvolvedContent } from "../types";

export const getInvolved: GetInvolvedContent = {
  seo: {
    title: "Get Involved — VPD",
    description:
      "Contribute to building VPD through partnership, expertise, knowledge, community participation, and institutional support.",
    ogTitle: "Get Involved — VPD",
    ogDescription:
      "VPD is in its foundation stage, and we are building it in partnership with persons with disabilities, institutions, and stakeholders who share our goal of a more inclusive society.",
  },

  header: {
    eyebrow: "Get Involved",
    title: "We build it together, not on behalf of anyone.",
    lede:
      "VPD is in its foundation stage. We believe that an organization committed to advancing participation must begin from within; therefore, we create space for persons with disabilities, experts, institutions, and partners to contribute to shaping our priorities, tools, partnerships, and institutional path.",
  },

  ways: [
    {
      key: "participate",
      icon: "users",
      title: "Share Your Experience and Voice",
      body:
        "Share your lived experience, professional knowledge, or perspective on an issue related to disability, accessibility, and inclusion. We want our priorities to be grounded in local knowledge and the lived experiences of persons with disabilities.",
      fields: [
        "Name",
        "Email",
        "Area of Expertise or Interest",
        "How would you like to contribute?",
      ],
      href: "/get-involved",
      cta: "Share With Us",
    },

    {
      key: "partner",
      icon: "handshake",
      title: "Build a Partnership",
      body:
        "We work with civil society organizations, universities, public institutions, humanitarian and development actors, experts, and other partners to develop solutions that are more inclusive and practical.",
      fields: [
        "Organization / Institution Name",
        "Contact Person",
        "Proposed Partnership Area",
        "Shared Objective",
      ],
      href: "/get-involved",
      cta: "Propose a Partnership",
    },

    {
      key: "contribute",
      icon: "lightbulb",
      title: "Contribute Knowledge or Resources",
      body:
        "Your contribution could take the form of research, technical advice, tools, in-kind resources, or unrestricted financial support that helps VPD build a sustainable institutional foundation.",
      fields: [
        "Name / Organization",
        "Email",
        "Type of Contribution",
        "How would you like to contribute?",
      ],
      href: "/get-involved",
      cta: "Contribute",
    },

    {
      key: "volunteer",
      icon: "handHeart",
      title: "Volunteer",
      body:
        "If you would like to dedicate your time or skills to support our foundation-stage work, you can contribute to research, translation, design, communications, review, or community activities.",
      fields: [
        "Name",
        "Email",
        "Skills",
        "Availability",
      ],
      href: "/get-involved",
      cta: "Volunteer With Us",
    },
  ],

  contact: {
    eyebrow: "Contact Us",
    title: "Let's talk about working together.",
    form: {
      name: "Your Name",
      email: "Email Address",
      topic: "What would you like to talk about?",
      topics: [
        "General Inquiry",
        "Community Participation",
        "Partnership",
        "Knowledge or Technical Contribution",
        "Volunteering",
        "Institutional Support",
        "Media and Press",
      ],
      message: "Message",
      accessNeeds: "Accessibility Needs",
      accessNeedsPlaceholder:
        "Tell us about any arrangements or communication formats that would help you participate and receive our response.",
      submit: "Send Message",
    },

    imageAlt:
      "A person using assistive technology while working",

    details: {
      emailLabel: "Email",
      basedLabel: "Based In",
    },

    note:
      "You can contact us in Arabic or English, and in the format that works best for you. If you need an alternative communication method or format, please let us know.",
  },
};