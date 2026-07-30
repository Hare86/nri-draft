// Placeholder content — replace with real details before the client demo.
export const TRUST = {
  name: "Nagalakshmi Ramamurthy Iyer Educational Trust",
  shortName: "NRI Educational Trust",
  tagline: "Excellence in Education, Arts & Values",
  mottoSanskrit: "विद्या ददाति विनयम्",
  mottoEnglish: "Knowledge Bestows Humility",
  established: "2024",
  registration: "TBD / 2024",
  address: "Trust address line 1, Area, City, State — PIN (to be confirmed)",
  phone: "+91 00000 00000",
  email: "contact@nritrust.org",
  social: {
    instagram: "#",
    facebook: "#",
    preschoolFacebook: "#",
  },
} as const;

export const TRUSTEES = [
  {
    name: "Trustee Name",
    role: "Founder & Managing Trustee",
    bio: "Short biography placeholder describing the trustee's background in education and service.",
  },
  {
    name: "Trustee Name",
    role: "Trustee — Arts & Culture",
    bio: "Short biography placeholder covering classical arts training and community initiatives.",
  },
  {
    name: "Trustee Name",
    role: "Trustee — Academics",
    bio: "Short biography placeholder covering early-childhood education leadership.",
  },
] as const;

export const FACULTY = [
  { name: "Faculty Name", discipline: "Bharatanatyam", detail: "Guru — placeholder credentials" },
  { name: "Faculty Name", discipline: "Carnatic Vocal", detail: "Vidwan — placeholder credentials" },
  { name: "Faculty Name", discipline: "Mridangam", detail: "Placeholder credentials" },
  { name: "Faculty Name", discipline: "Veena", detail: "Placeholder credentials" },
] as const;

export const COURSES = [
  {
    title: "Bharatanatyam",
    level: "Beginner → Arangetram",
    summary: "Adavus, jathis, abhinaya and repertoire taught in the traditional guru–shishya method.",
  },
  {
    title: "Carnatic Vocal",
    level: "Beginner → Advanced",
    summary: "Sarali varisai to varnams and kritis, with emphasis on shruti, laya and manodharma.",
  },
  {
    title: "Mridangam",
    level: "Beginner → Intermediate",
    summary: "Fingering technique, korvais and accompaniment practice for concerts.",
  },
  {
    title: "Veena",
    level: "Beginner → Intermediate",
    summary: "Posture, plucking technique and graded compositions of the Carnatic tradition.",
  },
  {
    title: "Shloka & Sanskrit",
    level: "All ages",
    summary: "Chanting, pronunciation and meaning of classical shlokas and subhashitas.",
  },
  {
    title: "Yoga & Values",
    level: "All ages",
    summary: "Asana, pranayama and value education woven into every learning journey.",
  },
] as const;

export const PROGRAMS = [
  {
    title: "Annual Arangetram Series",
    date: "Date to be announced",
    place: "Venue placeholder",
    summary: "Solo debut performances by senior students of the Ashwamedha School of Arts.",
  },
  {
    title: "Navaratri Cultural Festival",
    date: "Date to be announced",
    place: "Venue placeholder",
    summary: "Nine evenings of dance, music and devotional recitals open to the community.",
  },
  {
    title: "Preschool Annual Day",
    date: "Date to be announced",
    place: "Venue placeholder",
    summary: "Little learners present songs, rhymes and a story-theatre showcase.",
  },
  {
    title: "Summer Arts Workshop",
    date: "Date to be announced",
    place: "Venue placeholder",
    summary: "Two-week intensive in dance, vocal and craft for ages 6–14.",
  },
] as const;

export const NEWS = [
  {
    title: "Trust announces its first scholarship cohort",
    date: "Coming soon",
    excerpt: "Placeholder announcement text for the scholarship programme supporting deserving students.",
  },
  {
    title: "Ashwamedha students win state-level honours",
    date: "Coming soon",
    excerpt: "Placeholder news item highlighting recent student achievements in classical arts.",
  },
  {
    title: "Preschool admissions open for the new academic year",
    date: "Coming soon",
    excerpt: "Placeholder note on admissions, age criteria and the enrolment process.",
  },
] as const;

export const UNITS = {
  ashwamedha: {
    name: "Ashwamedha School of Arts",
    tagline: "Classical arts in the guru–shishya tradition",
    description:
      "Bharatanatyam, Carnatic vocal, mridangam and veena taught in graded, layered stages — from a child's first adavu to the arangetram stage.",
    film: [
      { alt: "Ashwamedha performance", caption: "Arangetram" },
      { alt: "Ashwamedha class", caption: "Class in session" },
      { alt: "Ashwamedha recital", caption: "Recital" },
      { alt: "Ashwamedha students", caption: "Students" },
    ],
  },
  preschool: {
    name: "Preschool",
    tagline: "Gentle, playful early years",
    description:
      "A play-based foundation programme where language, movement, stories and shlokas grow together in small, warmly supported groups.",
    film: [
      { alt: "Preschool classroom", caption: "Classroom" },
      { alt: "Preschool circle time", caption: "Circle time" },
      { alt: "Preschool craft", caption: "Craft corner" },
      { alt: "Preschool outdoor play", caption: "Outdoor play" },
    ],
  },
} as const;

export const TRUST_FILM = [
  { alt: "Trust community programme", caption: "Community outreach" },
  { alt: "Scholarship award ceremony", caption: "Scholarships" },
  { alt: "Cultural festival evening", caption: "Cultural festival" },
  { alt: "Value education session", caption: "Value education" },
] as const;
