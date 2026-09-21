import type { AboutContent } from "../types";
import { home } from "./home";

export const about: AboutContent = {
  seo: {
    title: "About Us — VPD Voice for Persons with Disabilities",
    description:
      "Learn about VPD's identity, strategic purpose, vision, mission, values, areas of work, and governance principles.",
    ogTitle: "About Us — VPD Voice for Persons with Disabilities",
    ogDescription:
      "A local, independent, non-profit civil society organization led by persons with disabilities, specializing in representation, inclusion, and evidence-based influence in Yemen.",
  },

  header: {
    eyebrow: "About Us",
    title: "A specialized organization for representation, inclusion, and influence.",
    lede:
      "Voice for Persons with Disabilities (VPD) is a local, independent, non-profit civil society organization in its foundation stage, led by persons with disabilities. We are building a specialized organization that strengthens representation, produces knowledge, supports inclusion, and contributes to influencing policies and practices in Yemen.",
  },

  onThisPage: {
    label: "On This Page",
    items: [
      { label: "Who We Are", href: "#who" },
      { label: "Our Story", href: "#story" },
      { label: "Strategic Purpose", href: "#purpose" },
      { label: "Vision", href: "#vision" },
      { label: "Mission", href: "#mission" },
      { label: "Values", href: "#values" },
      { label: "Institutional Principles", href: "#principles" },
      { label: "Strategic Framework", href: "#strategy" },
      { label: "Areas of Work", href: "#areas" },
      { label: "Governance", href: "#governance" },
      { label: "Founding Team", href: "#team" },
    ],
  },

  who: {
    eyebrow: "Who We Are",
    title: "An organization, not a campaign or a charity.",
    paragraphs: [
      "Voice for Persons with Disabilities (VPD) is a local, non-profit, independent civil society organization led by persons with disabilities, working as a specialized organization in representation, advocacy, professional inclusion, and evidence-based influence, with limited space for targeted interventions serving clear institutional purposes.",
      "VPD does not seek to provide broad charitable or emergency services, nor to duplicate the roles of existing actors. We work to build an organized institutional voice for persons with disabilities, strengthen the presence of their issues in policies, services, and programs, and improve the quality of inclusion and accessibility through knowledge, partnerships, technical support, and limited practical models.",
      "We start from the principle that persons with disabilities are not merely subjects of care or assistance, but rights-holders, actors, and partners in defining priorities, shaping solutions, and influencing decisions that affect their lives.",
    ],
    glanceLabel: "At a Glance",
    glance: [
      {
        key: "status",
        label: "Organizational Status",
        value: "Foundation stage",
      },
      {
        key: "type",
        label: "Nature",
        value: "Independent, non-profit civil society organization",
      },
      {
        key: "founded",
        label: "Founded",
        value: "2026",
      },
      {
        key: "based",
        label: "Scope",
        value: "Yemen · Local and national",
      },
      {
        key: "leadership",
        label: "Leadership",
        value: "Led by persons with disabilities",
      },
      {
        key: "approach",
        label: "Approach",
        value: "Rights-based · Participatory · Evidence-based",
      },
    ],
  },

  story: {
    eyebrow: "Our Story",
    title: "From community experience to a specialized organization.",
    image: "workshop",
    imageAlt:
      "Participants in a community discussion on issues affecting persons with disabilities and inclusion",
    paragraphs: [
      "The idea for VPD emerged from community experiences and initiatives addressing issues related to persons with disabilities, participation, and accessibility. These experiences revealed that many challenges are not only related to the absence of services, but also to barriers within institutions, policies, programs, and mechanisms for communication and participation.",
      "The experience also demonstrated the need for a specialized local organization that brings together genuine representation of persons with disabilities, knowledge production, technical support, and influence on practices and policies, rather than adding another general service provider to the existing landscape.",
      "In 2026, this path moved toward establishing VPD as a longer-term organization with a clear identity, defined scope of expertise, and governance and accountability principles, capable of turning community experience into knowledge, tools, and institutional influence.",
    ],
  },

  purpose: {
    id: "purpose",
    title: "Strategic Purpose",
    body:
      "VPD seeks to build a trusted institutional reference, led by persons with disabilities, that represents their priorities and rights, advances the integration of a disability perspective into policies, plans, services, and programs, develops practical knowledge, tools, and standards that support accessibility and participation, and contributes to strengthening the institutional and civic environment that supports the rights and inclusion of persons with disabilities in Yemen.",
  },

  vision: {
    id: "vision",
    title: "Vision",
    body:
      "For Voice for Persons with Disabilities to become a trusted and influential institutional reference on disability issues, recognized for its ability to translate the priorities and rights of persons with disabilities into organized representation, reliable knowledge, practical standards, and tangible influence on policies, services, and programs at the local and national levels.",
  },

  mission: {
    id: "mission",
    title: "Mission",
    body:
      "Voice for Persons with Disabilities works to represent the priorities of persons with disabilities, advocate for their rights, and advance their inclusion in public, humanitarian, and development policies, plans, services, and programs through knowledge production, the development of tools and standards, partnership building, technical support, evidence-based influence, and limited targeted interventions that contribute to expanding access and participation and reducing barriers, grounded in the leadership and meaningful participation of persons with disabilities.",
  },

  values: {
    eyebrow: "Values",
    title: "What We Stand For.",
    items: [
      {
        title: "Dignity",
        body:
          "We treat persons with disabilities as rights-holders, actors, and partners in decision-making, not as subjects of care or pity.",
      },
      {
        title: "Representation",
        body:
          "We are committed to the meaningful presence of persons with disabilities in leadership, guidance, priority-setting, and the development of institutional positions.",
      },
      {
        title: "Inclusion",
        body:
          "We work to expand participation and accessibility and reduce exclusion, while recognizing the diversity of disabilities, groups, and needs.",
      },
      {
        title: "Professionalism",
        body:
          "We rely on clarity, accuracy, specialized knowledge, evidence, and practical standards in our work and partnerships.",
      },
      {
        title: "Accountability",
        body:
          "We are committed to transparency and accountability to persons with disabilities, stakeholders, partners, and the wider community.",
      },
      {
        title: "Independence",
        body:
          "We maintain the independence of our decisions, identity, and mission and operate without political or institutional dependency.",
      },
      {
        title: "Partnership",
        body:
          "We view partnership and coordination as essential means of expanding impact and strengthening the broader ecosystem.",
      },
      {
        title: "Learning & Practical Innovation",
        body:
          "We continuously learn from evidence, experience, and context, and develop practical, applicable solutions and tools.",
      },
    ],
  },

  principles: {
    eyebrow: "Institutional Principles",
    title: "The principles that guide our decisions.",
    items: [
      {
        title: "Participation, Not Representation by Proxy",
        body:
          "We work with and under the leadership of persons with disabilities, rather than simply working on their behalf or for them.",
      },
      {
        title: "Rights Before Care",
        body:
          "We start from rights, citizenship, and participation, not charity or charitable intervention.",
      },
      {
        title: "Impact Before Service Expansion",
        body:
          "We focus on influencing policies, practices, standards, and the institutional environment.",
      },
      {
        title: "Knowledge as the Foundation of Influence",
        body:
          "We build our positions, advocacy, and partnerships on evidence, analysis, and local knowledge.",
      },
      {
        title: "Inclusion Is a Shared Responsibility",
        body:
          "We work with institutions and stakeholders to strengthen their responsibility for including persons with disabilities.",
      },
      {
        title: "Limited Targeted Intervention as a Strategic Tool",
        body:
          "We use limited practical models to demonstrate solutions and develop practices that can be adopted and scaled.",
      },
      {
        title: "Partnership Is Essential for Impact",
        body:
          "We work within a broader ecosystem and do not seek to replace existing actors or duplicate their roles.",
      },
      {
        title: "Institutional Focus and Discipline",
        body:
          "We maintain clarity around our scope and priorities and avoid uncontrolled expansion.",
      },
    ],
  },

  strategy: {
    eyebrow: "Strategic Framework",
    title: "Five objectives guide our work.",
    steps: [
      {
        number: "01",
        title: "Institutional Representation",
        body:
          "Build trusted representation of persons with disabilities and strengthen their meaningful participation in decisions, policies, and programs.",
      },
      {
        number: "02",
        title: "Inclusion in Policies and Programs",
        body:
          "Advance the integration of a disability perspective into public, humanitarian, and development policies, plans, services, and programs.",
      },
      {
        number: "03",
        title: "Knowledge and Tools",
        body:
          "Develop knowledge, evidence, tools, and practical standards that support institutions and stakeholders.",
      },
      {
        number: "04",
        title: "Accessibility and Participation",
        body:
          "Contribute to reducing institutional, informational, communication, physical, and social barriers.",
      },
      {
        number: "05",
        title: "Institutional and Civic Environment",
        body:
          "Strengthen partnerships, coordination, capacity building, and evidence-based influence at the local and national levels.",
      },
    ],
  },

  areas: {
    eyebrow: "Areas of Work",
    title: "Interconnected areas of expertise that drive influence.",
    items: home.focusAreas.areas,
  },

  governance: {
    eyebrow: "Governance & Transparency",
    title: "We build governance that reflects what we advocate for.",
    paragraphs: [
      "VPD is currently establishing its institutional governance. At this stage, founding and executive decisions are made within a temporary structure, drawing on specialized advice and expertise until the organization's formal structure is completed.",
      "The governance we are building is based on meaningful representation of persons with disabilities, independence, clear roles and responsibilities, transparency, accountability, risk management, and inclusion within the organization.",
      "As the organization develops and its formal frameworks are adopted, key institutional information will be published to strengthen trust and accountability to persons with disabilities, partners, and the wider community.",
    ],
    cta: {
      label: "Read Our Positions and Knowledge",
      href: "/insights",
    },
    checklist: [
      "Meaningful representation of persons with disabilities in governance",
      "Clear roles and responsibilities",
      "Independence of institutional decision-making",
      "Transparency and accountability mechanisms",
      "Inclusive and accessible internal practices",
      "Risk management and contextual sensitivity",
      "Continuous institutional learning",
    ],
  },

  team: {
    eyebrow: "Founding Team",
    title: "Leadership building the organization with the community.",
    members: [
      {
        name: "Founder",
        role: "Founder",
        bio:
          "A person with a disability working to build a specialized local organization focused on representation, inclusion, and evidence-based influence.",
      },
      {
        name: "Founding Advisory Support",
        role: "Temporary Advisory Support",
        bio:
          "Contributors with relevant experience, practice, and knowledge who provide advice during the organization's foundation stage and the development of its direction.",
      },
    ],
  },
};