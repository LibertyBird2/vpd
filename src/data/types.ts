/**
 * Content layer types.
 *
 * These describe *content only* — never styling, never design tokens.
 * Every locale bundle in `src/data/<locale>/` must satisfy `SiteContent`.
 */

/** Names of the icons the presentation layer knows how to render. */
export type IconName =
  | "scale"
  | "accessibility"
  | "users"
  | "bookOpen"
  | "handHeart"
  | "building2"
  | "calendar"
  | "landmark"
  | "mapPin"
  | "shieldCheck"
  | "fileText"
  | "handshake"
  | "heartHandshake"
  | "mail"
  | "quote"
  | "sparkles";

/** Names of the images the presentation layer knows how to render. */
export type ImageName =
  "heroLeadership" | "heroCollaboration" | "participation" | "workshop" | "accessibilityTech";

export interface CtaLink {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** Match the route exactly (used for the home link). */
  exact?: boolean;
}

export interface SectionIntro {
  eyebrow?: string;
  title: string;
  lede?: string;
}

export interface Seo {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
}

export interface SiteInfo {
  name: string;
  fullName: string;
  // eyebrow: string;
  title: string;
  description: string;
  tagline: string;
  location: string;
  cities: string;
  email: string;
  stage: string;
  themeColor: string;
  // seo: Seo;
}

export interface LabelledValue {
  key: string;
  label: string;
  value: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Fact extends LabelledValue {
  icon: IconName;
}

export interface Pillar {
  key: string;
  icon: IconName;
  title: string;
  body: string;
}

export interface FocusArea {
  id: string;
  title: string;
  body: string;
}

export interface OrgValue {
  title: string;
  body: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface StoryStep {
  number: string;
  title: string;
  body: string;
}

export interface InitiativeProject {
  slug: string;
  origin: string;
  partner: string;
  funder: string;
  title: string;
  period: string;
  summary: string;
  reach: string;
  status: string;
  image?: ImageName | string;
  alt?: string;
  sections?: { title: string; body: string }[];
  lessons?: string[];
  video?: string;
}

export interface EventItem {
  slug: string;
  title: string;
  /** ISO date (locale independent). */
  date: string;
  location: string;
  format: string;
  summary: string;
}

export interface Voice {
  slug: string;
  author: string;
  role: string;
  title: string;
  excerpt: string;
  image: string;
  readingTime: string;
}

export interface Insight {
  slug: string;
  image?: ImageName | string;
  kind: string;
  title: string;
  read: string;
  excerpt: string;
  date?: string;
  sections?: { title: string; body: string }[];
}

export interface WayToHelp {
  key: string;
  icon: IconName;
  title: string;
  body: string;
  fields: string[];
  href: string;
  cta: string;
}

/* ---------------- Page content ---------------- */

export interface HeroContent {
  badge: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  image: ImageName;
  imageAlt: string;
  highlight: { value: string; label: string };
}

export interface HomeContent {
  seo: Seo;
  hero: HeroContent;
  snapshot: Fact[];
  whoWeAre: SectionIntro & { cta: CtaLink };
  whatWeDo: SectionIntro & {
    image: ImageName;
    imageAlt: string;
    pillars: Pillar[];
    cta: CtaLink;
  };
  focusAreas: SectionIntro & { areas: FocusArea[] };
  impact: { eyebrow: string; statement: string; stats: Stat[] };
  accessibility: SectionIntro & {
    image: ImageName;
    imageAlt: string;
    commitments: string[];
  };
  voices: { eyebrow: string; imageAltTemplate: string; cta: CtaLink };
  knowledge: {
    eyebrow: string;
    title: string;
    allLabel: string;
    upcomingLabel: string;
    latestLabel: string;
  };
  getInvolved: SectionIntro & {
    image: ImageName;
    imageAlt: string;
    ways: Pillar[];
    cta: CtaLink;
  };
}

export interface AboutContent {
  seo: Seo;
  header: SectionIntro;
  onThisPage: { label: string; items: CtaLink[] };
  who: SectionIntro & { paragraphs: string[]; glanceLabel: string; glance: LabelledValue[] };
  story: SectionIntro & { image: ImageName; imageAlt: string; paragraphs: string[] };
  vision: { id: string; title: string; body: string };
  mission: { id: string; title: string; body: string };
  values: SectionIntro & { items: OrgValue[] };
  strategy: SectionIntro & { steps: StoryStep[] };
  areas: SectionIntro & { items: FocusArea[] };
  governance: SectionIntro & { paragraphs: string[]; cta: CtaLink; checklist: string[] };
  team: SectionIntro & { members: TeamMember[] };
}

export interface ProjectsContent {
  seo: Seo;
  header: SectionIntro;
  empty: SectionIntro & {
    badge: string;
    heading: string;
    body: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
  };
  initiatives: SectionIntro & { items: InitiativeProject[] };
  detail: {
    backLabel: string;
    disclaimer: string;
    sections: { title: string; body: string }[];
    lessonsTitle: string;
    lessons: string[];
    detailsLabel: string;
    labels: {
      origin: string;
      partner?: string;
      funder?: string;
      period: string;
      reach: string;
      status: string;
    };
    noteLabel: string;
    note: string;
    seoSuffix: string;
  };
}

export interface EventsContent {
  seo: Seo;
  header: SectionIntro;
  items: { upcoming: EventItem[]; past: EventItem[] };
  upcomingSection: SectionIntro;
  pastSection: SectionIntro;
  detail: {
    backLabel: string;
    upcomingLabel: string;
    pastLabel: string;
    openLabel: string;
    sections: { title: string; body: string }[];
    accessTitle: string;
    access: string[];
    rsvp: { eyebrow: string; title: string; body: string; cta: string };
    recording: { eyebrow: string; title: string; body: string; cta: string };
    support: { title: string; body: string; cta: CtaLink };
    seoSuffix: string;
  };
}

export interface VoicesContent {
  seo: Seo;
  header: SectionIntro & { primaryCta: CtaLink; secondaryCta: CtaLink };
  items: Voice[];
  contribute: SectionIntro & { options: OrgValue[] };
}

export interface InsightsContent {
  seo: Seo;
  header: SectionIntro;
  categories: string[];
  featuredLabel: string;
  readFeaturedLabel: string;
  readLabel: string;
  items: Insight[];
}

export interface GetInvolvedContent {
  seo: Seo;
  header: SectionIntro;
  ways: WayToHelp[];
  contact: SectionIntro & {
    form: {
      name: string;
      email: string;
      topic: string;
      topics: string[];
      message: string;
      accessNeeds: string;
      accessNeedsPlaceholder: string;
      submit: string;
    };
    imageAlt: string;
    details: { emailLabel: string; basedLabel: string };
    note: string;
  };
}

export interface UiContent {
  actions: {
    getInvolved: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
    tryAgain: string;
    goHome: string;
    changeLanguage: string;
  };
  nav: { primary: string; mobile: string };
  language: { label: string; english: string; arabic: string };
  navigation: NavItem[];
  footer: {
    description: string;
    accessibilityStatement: string;
    copyright?: string;
    columns: { title: string; links: CtaLink[] }[];
  };
  notFound: { code: string; title: string; body: string };
  error: { title: string; body: string };
  accessibility: {
    dialogLabel: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    close: string;
    appearance: string;
    appearanceHint: string;
    light: string;
    dark: string;
    system: string;
    contrast: string;
    contrastHint: string;
    highContrast: string;
    highContrastDesc: string;
    textSize: string;
    textSizeHint: string;
    decreaseText: string;
    increaseText: string;
    motionAndFocus: string;
    reducedMotion: string;
    reducedMotionDesc: string;
    focusEnhance: string;
    focusEnhanceDesc: string;
    reading: string;
    readingMode: string;
    readingModeDesc: string;
    reset: string;
    done: string;
  };
}

export interface SiteContent {
  site: SiteInfo;
  ui: UiContent;
  home: HomeContent;
  about: AboutContent;
  projects: ProjectsContent;
  events: EventsContent;
  voices: VoicesContent;
  insights: InsightsContent;
  getInvolved: GetInvolvedContent;
}
