import type { AccessibilityStatementContent } from "@/types";

export const accessibility: AccessibilityStatementContent = {
  seo: {
    title: "Accessibility Statement — VPD",
    description: "VPD's commitment to accessibility, our implemented features, and how to report issues.",
  },
  header: {
    eyebrow: "Accessibility Statement",
    title: "Our Commitment to Accessibility",
    lede: "VPD is committed to ensuring digital accessibility for persons with disabilities. We are continually working to improve the user experience for everyone, and applying the relevant accessibility standards.",
  },
  sections: [
    {
      title: "Accessibility Standard",
      body: "Our website is designed and developed with the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA as our baseline target, while applying Level AAA practices wherever practical. We view accessibility not as a one-time compliance checklist, but as an ongoing institutional practice.",
    },
    {
      title: "Implemented Features",
      body: "We have built this website with inclusive design principles. Our current implementation includes full keyboard navigation support, visible focus indicators, semantic HTML structure, and screen-reader compatibility. We also offer an Accessibility Panel that allows users to customize their experience, including options for High Contrast, Reading Mode, Text and Line Spacing adjustments, Reduced Motion, and global Light/Dark/System appearance modes.",
    },
  ],
  limitations: {
    title: "Current Status & Limitations",
    items: [
      "While we aim for WCAG 2.2 AA conformance, a formal external accessibility audit has not yet been completed.",
      "Some legacy documents or external links may not fully meet our internal standards.",
    ],
  },
  reporting: {
    title: "Reporting Accessibility Issues",
    lede: "We welcome your feedback on the accessibility of the VPD website. If you encounter any accessibility barriers or need assistance, please let us know through our Get Involved mechanism, which serves as our central communication channel.",
    cta: {
      label: "Report an Issue via Get Involved",
      href: "/get-involved",
    },
  },
};
