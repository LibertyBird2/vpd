import type { HomeContent } from "../types";

export const home: HomeContent = {
  seo: {
    title: "VPD — Voice for Persons with Disabilities in Yemen",
    description:
      "VPD is a local civil society organization in its foundation stage, led by persons with disabilities, working on representation, inclusion, and evidence-based influence in Yemen.",
    ogTitle: "VPD — Voice for Persons with Disabilities",
    ogDescription:
      "A specialized local organization focused on representing persons with disabilities, advancing inclusion, producing knowledge, and influencing policies and practices in Yemen.",
  },

  hero: {
    badge: "Disability-led · Rights-based · Yemen",
    titleLead: "Building an Institutional Voice",
    titleAccent: "for Persons with Disabilities",
    description:
      "VPD is a local civil society organization in its foundation stage, led by persons with disabilities, working to strengthen representation, inclusion, knowledge production, and influence on policies, services, and practices.",
    primaryCta: { label: "About Us", href: "/about" },
    secondaryCta: { label: "Our Areas of Work", href: "/projects" },
    image: "heroLeadership",
    imageAlt:
      "Persons with disabilities and partners participating in a discussion on inclusion and participation",
    highlight: {
      value: "Rights · Representation · Inclusion",
      label: "Our approach",
    },
  },

  snapshot: [
    {
      key: "status",
      icon: "landmark",
      label: "Organizational Status",
      value: "In the foundation stage",
    },
    {
      key: "based",
      icon: "mapPin",
      label: "Scope",
      value: "Yemen · Local and national",
    },
    {
      key: "leadership",
      icon: "users",
      label: "Leadership",
      value: "Led by persons with disabilities",
    },
    {
      key: "approach",
      icon: "shieldCheck",
      label: "Approach",
      value: "Rights-based · Participatory · Evidence-based",
    },
  ],

  whoWeAre: {
    eyebrow: "Who We Are",
    title: "A specialized organization — not a charity.",
    lede:
      "Voice for Persons with Disabilities (VPD) is a local, non-profit, independent civil society organization led by persons with disabilities. We work to build trusted institutional representation, advance disability inclusion in policies, services, and programs, and develop knowledge and tools that help institutions remove barriers and improve participation and access.",
    cta: {
      label: "Read about our identity and governance",
      href: "/about",
    },
  },

  whatWeDo: {
    eyebrow: "What We Do",
    title: "Turning rights into knowledge, practice, and influence.",
    image: "participation",
    imageAlt:
      "Persons with disabilities participating in a discussion on inclusive policies and practices",
    pillars: [
      {
        key: "representation",
        icon: "users",
        title: "Representation & Advocacy",
        body:
          "Strengthening organized representation of persons with disabilities and their meaningful participation in relevant decisions, policies, and programs.",
      },
      {
        key: "inclusion",
        icon: "accessibility",
        title: "Institutional Inclusion",
        body:
          "Supporting institutions and programs to integrate a disability perspective, improve access and participation, and reduce barriers.",
      },
      {
        key: "knowledge",
        icon: "bookOpen",
        title: "Knowledge & Influence",
        body:
          "Producing evidence, practical tools, and standards, and building partnerships to support change in policies and practices.",
      },
    ],
    cta: {
      label: "Explore Our Areas of Work",
      href: "/projects",
    },
  },

  focusAreas: {
    eyebrow: "Areas of Work",
    title: "Clear expertise, with impact beyond the organization.",
    areas: [
      {
        id: "representation",
        title: "Representation & Advocacy",
        body:
          "Building trusted institutional representation that reflects the priorities and rights of persons with disabilities and strengthens their participation in decision-making.",
      },
      {
        id: "inclusion",
        title: "Disability Inclusion",
        body:
          "Advancing the integration of a disability perspective into public, humanitarian, and development policies, plans, services, and programs.",
      },
      {
        id: "accessibility",
        title: "Accessibility & Institutional Practice",
        body:
          "Developing practical tools, standards, and practices to improve physical, digital, communication, and institutional accessibility.",
      },
      {
        id: "knowledge",
        title: "Research & Knowledge",
        body:
          "Producing local knowledge and evidence on disability, barriers, and inclusion to support advocacy and decision-making.",
      },
      {
        id: "capacity",
        title: "Technical Support & Capacity Building",
        body:
          "Providing knowledge, tools, and technical support that help institutions and stakeholders develop more inclusive practices.",
      },
      {
        id: "partnerships",
        title: "Partnerships & Collective Action",
        body:
          "Building partnerships and coordination with civil society, government entities, academia, and humanitarian and development actors.",
      },
    ],
  },

  impact: {
    eyebrow: "How We Create Change",
    statement:
      "We focus on influencing policies, practices, standards, and the institutional environment, while using limited, targeted interventions to demonstrate solutions and develop models that can be adopted.",
    stats: [
      {
        value: "01",
        label: "More effective institutional representation",
      },
      {
        value: "02",
        label: "Better inclusion in policies and programs",
      },
      {
        value: "03",
        label: "Actionable knowledge and tools",
      },
      {
        value: "04",
        label: "Partnerships that support sustainable change",
      },
    ],
  },

  accessibility: {
    eyebrow: "Inclusion Starts Within",
    title: "What we advocate for must be reflected in our own practice.",
    image: "accessibilityTech",
    imageAlt:
      "A person using assistive technology to access information and participate in work",
    commitments: [
      "Designing our practices and content according to the principles of accessibility and inclusion.",
      "Providing information in formats and through communication methods that reflect the diverse needs of persons with disabilities.",
      "Involving persons with disabilities in reviewing and developing practices and tools that affect them.",
      "Advancing non-discrimination, equal opportunities, and participation within and beyond the organization.",
    ],
  },

  voices: {
    eyebrow: "Voices",
    imageAltTemplate:
      "{author}, {role}, shares their experience and perspective on disability and inclusion",
    cta: {
      label: "Listen to More Voices",
      href: "/voices",
    },
  },

  knowledge: {
    eyebrow: "Knowledge Center",
    title: "Knowledge is the foundation of influence.",
    allLabel: "All Resources",
    upcomingLabel: "Upcoming Resource",
    latestLabel: "Latest Resource",
  },

  getInvolved: {
    eyebrow: "Get Involved",
    title: "Institutional change is built through partnership.",
    lede:
      "We work with persons with disabilities, institutions, civil society, researchers, and partners to advance inclusion and turn knowledge into practice and influence.",
    image: "workshop",
    imageAlt:
      "Participants in a participatory discussion on the priorities of persons with disabilities and inclusion",
    ways: [
      {
        key: "community",
        icon: "users",
        title: "Participation",
        body:
          "Share your experience, expertise, and priorities to help build knowledge and representation that are more responsive to the needs of persons with disabilities.",
      },
      {
        key: "partner",
        icon: "building2",
        title: "Partnership",
        body:
          "Collaborate with us on research, capacity building, or the development of more inclusive tools and practices.",
      },
      {
        key: "support",
        icon: "bookOpen",
        title: "Support",
        body:
          "Contribute to building a specialized local organization capable of producing knowledge and strengthening representation and influence on disability issues.",
      },
    ],
    cta: {
      label: "Work with VPD",
      href: "/get-involved",
    },
  },
};