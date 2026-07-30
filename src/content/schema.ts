// Definition of every editable section of the public website.
// The admin panel renders its editors from these definitions, and the public
// pages read values from the database, falling back to `defaults` below.

export type Field =
  | { name: string; label: string; type: "text" | "textarea" | "url" | "image"; hint?: string }
  | { name: string; label: string; type: "images"; hint?: string }
  | {
      name: string;
      label: string;
      type: "list";
      itemLabel: string;
      fields: Field[];
      hint?: string;
    };

export type SectionDef = {
  key: string;
  label: string;
  group: string;
  page: string;
  hint?: string;
  fields: Field[];
  defaults: Record<string, unknown>;
};

const textField = (name: string, label: string): Field => ({ name, label, type: "text" });
const areaField = (name: string, label: string): Field => ({
  name,
  label,
  type: "textarea",
});

export const SECTIONS: SectionDef[] = [
  /* ---------------------------------------------------------------- Global */
  {
    key: "site.identity",
    label: "Trust identity & logo",
    group: "Global",
    page: "/",
    hint: "Shown on the home page hero, header and footer.",
    fields: [
      { name: "logo", label: "Trust logo", type: "image" },
      textField("name", "Full trust name"),
      textField("shortName", "Short name"),
      textField("tagline", "Tagline"),
      textField("mottoSanskrit", "Motto (Sanskrit)"),
      textField("mottoEnglish", "Motto (English)"),
      textField("established", "Established"),
      textField("registration", "Registration number"),
    ],
    defaults: {
      logo: "",
      name: "Nagalakshmi Ramamurthy Iyer Educational Trust",
      shortName: "NRI Educational Trust",
      tagline: "Excellence in Education, Arts & Values",
      mottoSanskrit: "विद्या ददाति विनयम्",
      mottoEnglish: "Knowledge Bestows Humility",
      established: "2024",
      registration: "TBD / 2024",
    },
  },
  {
    key: "site.reachUs",
    label: "Reach Us (address, phone, email)",
    group: "Global",
    page: "/contact",
    fields: [
      areaField("address", "Address"),
      textField("phone", "Phone"),
      textField("email", "Email"),
    ],
    defaults: {
      address: "Trust address line 1, Area, City, State — PIN (to be confirmed)",
      phone: "+91 00000 00000",
      email: "contact@nritrust.org",
    },
  },
  {
    key: "site.social",
    label: "Social media handles",
    group: "Global",
    page: "/",
    fields: [
      { name: "instagram", label: "Trust Instagram URL", type: "url" },
      { name: "facebook", label: "Trust Facebook URL", type: "url" },
      { name: "preschoolFacebook", label: "Preschool Facebook URL", type: "url" },
    ],
    defaults: { instagram: "#", facebook: "#", preschoolFacebook: "#" },
  },
  {
    key: "site.footerExplore",
    label: "Footer — Explore links",
    group: "Global",
    page: "/",
    hint: "Controls the list of links under “Explore” in the footer.",
    fields: [
      {
        name: "items",
        label: "Links",
        type: "list",
        itemLabel: "Link",
        fields: [textField("label", "Label"), textField("path", "Path (e.g. /about)")],
      },
    ],
    defaults: {
      items: [
        { label: "About Us", path: "/about" },
        { label: "Ashwamedha School of Arts", path: "/units/ashwamedha" },
        { label: "Preschool", path: "/units/preschool" },
        { label: "Programs & Events", path: "/programs" },
        { label: "Gallery", path: "/gallery" },
        { label: "News", path: "/news" },
        { label: "Get Involved", path: "/get-involved" },
        { label: "User Guide", path: "/user-guide" },
      ],
    },
  },

  /* ------------------------------------------------------------------ Home */
  {
    key: "home.film",
    label: "Home — Trust photo film",
    group: "Home page",
    page: "/",
    hint: "Scrolling photo carousel in the top (Trust) section.",
    fields: [{ name: "photos", label: "Photos", type: "images" }],
    defaults: {
      photos: [
        { url: "", alt: "Trust community programme", caption: "Community outreach" },
        { url: "", alt: "Scholarship award ceremony", caption: "Scholarships" },
        { url: "", alt: "Cultural festival evening", caption: "Cultural festival" },
        { url: "", alt: "Value education session", caption: "Value education" },
      ],
    },
  },
  {
    key: "home.pillars",
    label: "Three pillars of the Trust",
    group: "Home page",
    page: "/",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      areaField("intro", "Intro"),
      {
        name: "items",
        label: "Pillars",
        type: "list",
        itemLabel: "Pillar",
        fields: [
          textField("title", "Title"),
          textField("meta", "Label"),
          areaField("body", "Description"),
        ],
      },
    ],
    defaults: {
      eyebrow: "Our Work",
      title: "Three pillars of the Trust",
      intro:
        "Founded to serve the community, the Trust brings together academic support, classical arts education and early-childhood learning under one shared set of values.",
      items: [
        {
          title: "The Trust",
          meta: "Service",
          body: "Scholarships, value education and community outreach for deserving students, guided by a board of trustees committed to transparency.",
        },
        {
          title: "Ashwamedha School of Arts",
          meta: "Classical Arts",
          body: "Bharatanatyam, Carnatic vocal and instrumental training in the guru–shishya tradition, with a distinctive layered learning method.",
        },
        {
          title: "Preschool",
          meta: "Early Years",
          body: "A joyful, play-based foundation programme blending curiosity, language, movement and Indian cultural roots.",
        },
      ],
    },
  },
  {
    key: "home.enrolCta",
    label: "Home — Preschool highlight",
    group: "Home page",
    page: "/",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      areaField("body", "Body"),
      textField("ctaLabel", "Button label"),
      { name: "image", label: "Photo", type: "image" },
    ],
    defaults: {
      eyebrow: "Enrolment open",
      title: "A first classroom that feels like home",
      body: "Our preschool programme is built around small groups, sensory play and storytelling — with shlokas, rhymes and festivals woven into the week so children grow up rooted and confident.",
      ctaLabel: "Explore the preschool",
      image: "",
    },
  },

  /* ----------------------------------------------------------------- About */
  {
    key: "about.hero",
    label: "About — page header",
    group: "About Us",
    page: "/about",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      areaField("subtitle", "Subtitle"),
    ],
    defaults: {
      eyebrow: "About Us",
      title: "A trust built on knowledge and humility",
      subtitle:
        "Established in 2024, the Trust carries forward a family legacy of learning, service and devotion to the classical arts.",
    },
  },
  {
    key: "about.history",
    label: "History & vision",
    group: "About Us",
    page: "/about",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      {
        name: "paragraphs",
        label: "Paragraphs",
        type: "list",
        itemLabel: "Paragraph",
        fields: [areaField("text", "Text")],
      },
      areaField("mottoNote", "Note under the motto"),
    ],
    defaults: {
      eyebrow: "Our story",
      title: "History & vision",
      paragraphs: [
        {
          text: "Placeholder history: the Trust was founded in memory of Smt. Nagalakshmi Ramamurthy Iyer, whose life was devoted to teaching, music and quiet service to her community. What began as informal classes at home has grown into a registered charitable trust serving students across age groups.",
        },
        {
          text: "Placeholder vision: to make high-quality education and classical arts training accessible regardless of means, and to raise a generation that is academically strong, artistically expressive and grounded in values.",
        },
      ],
      mottoNote:
        "True learning is measured not by what we accumulate, but by the humility and service it inspires.",
    },
  },
  {
    key: "about.trustees",
    label: "Trustees & leadership",
    group: "About Us",
    page: "/about",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      areaField("intro", "Intro"),
      {
        name: "items",
        label: "Trustees",
        type: "list",
        itemLabel: "Trustee",
        fields: [
          textField("name", "Name"),
          textField("role", "Role"),
          areaField("bio", "Biography"),
          { name: "photo", label: "Photo", type: "image" },
        ],
      },
    ],
    defaults: {
      eyebrow: "Leadership",
      title: "Trustees & leadership",
      intro:
        "The Trust is governed by a small board that oversees programmes, finances and community accountability.",
      items: [
        {
          name: "Trustee Name",
          role: "Founder & Managing Trustee",
          bio: "Short biography placeholder describing the trustee's background in education and service.",
          photo: "",
        },
        {
          name: "Trustee Name",
          role: "Trustee — Arts & Culture",
          bio: "Short biography placeholder covering classical arts training and community initiatives.",
          photo: "",
        },
        {
          name: "Trustee Name",
          role: "Trustee — Academics",
          bio: "Short biography placeholder covering early-childhood education leadership.",
          photo: "",
        },
      ],
    },
  },
  {
    key: "about.values",
    label: "Our values",
    group: "About Us",
    page: "/about",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      {
        name: "items",
        label: "Values",
        type: "list",
        itemLabel: "Value",
        fields: [textField("title", "Title"), areaField("body", "Description")],
      },
    ],
    defaults: {
      eyebrow: "What we stand for",
      title: "Our values",
      items: [
        { title: "Access", body: "Learning opportunities that do not depend on a family's means." },
        { title: "Excellence", body: "Rigorous, traditional training with modern teaching craft." },
        {
          title: "Rootedness",
          body: "Language, ritual and art forms carried forward with respect.",
        },
        {
          title: "Accountability",
          body: "Transparent use of every rupee contributed to the Trust.",
        },
      ],
    },
  },

  /* ------------------------------------------------------------ Ashwamedha */
  {
    key: "ashwamedha.unit",
    label: "Ashwamedha — identity & photo film",
    group: "Ashwamedha School of Arts",
    page: "/units/ashwamedha",
    hint: "Used on the home page branch and the unit page header.",
    fields: [
      { name: "logo", label: "Unit logo", type: "image" },
      textField("name", "Name"),
      textField("tagline", "Tagline"),
      areaField("description", "Short description"),
      { name: "photos", label: "Photo film", type: "images" },
    ],
    defaults: {
      logo: "",
      name: "Ashwamedha School of Arts",
      tagline: "Classical arts in the guru–shishya tradition",
      description:
        "Bharatanatyam, Carnatic vocal, mridangam and veena taught in graded, layered stages — from a child's first adavu to the arangetram stage.",
      photos: [
        { url: "", alt: "Ashwamedha performance", caption: "Arangetram" },
        { url: "", alt: "Ashwamedha class", caption: "Class in session" },
        { url: "", alt: "Ashwamedha recital", caption: "Recital" },
        { url: "", alt: "Ashwamedha students", caption: "Students" },
      ],
    },
  },
  {
    key: "ashwamedha.overview",
    label: "Ashwamedha — Overview",
    group: "Ashwamedha School of Arts",
    page: "/units/ashwamedha",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      areaField("heroSubtitle", "Page header subtitle"),
      {
        name: "paragraphs",
        label: "Paragraphs",
        type: "list",
        itemLabel: "Paragraph",
        fields: [areaField("text", "Text")],
      },
      { name: "image", label: "Photo", type: "image" },
    ],
    defaults: {
      eyebrow: "Overview",
      title: "Mission",
      heroSubtitle:
        "Classical training in dance, vocal and instrumental music — taught patiently, performed proudly.",
      paragraphs: [
        {
          text: "Ashwamedha exists to keep India's classical arts living and joyful. Students learn in small batches under teachers who follow the guru–shishya parampara, progressing from fundamentals to full stage repertoire.",
        },
        {
          text: "Beyond technique, the school teaches the theory, mythology and language behind each piece, so that every performance carries meaning.",
        },
      ],
      image: "",
    },
  },
  {
    key: "ashwamedha.curriculum",
    label: "Ashwamedha — Programme & curriculum",
    group: "Ashwamedha School of Arts",
    page: "/units/ashwamedha",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      {
        name: "items",
        label: "Courses",
        type: "list",
        itemLabel: "Course",
        fields: [
          textField("title", "Course"),
          textField("level", "Level"),
          areaField("summary", "Summary"),
        ],
      },
    ],
    defaults: {
      eyebrow: "Curriculum",
      title: "Courses offered",
      items: [
        {
          title: "Bharatanatyam",
          level: "Beginner → Arangetram",
          summary:
            "Adavus, jathis, abhinaya and repertoire taught in the traditional guru–shishya method.",
        },
        {
          title: "Carnatic Vocal",
          level: "Beginner → Advanced",
          summary:
            "Sarali varisai to varnams and kritis, with emphasis on shruti, laya and manodharma.",
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
      ],
    },
  },
  {
    key: "ashwamedha.teachers",
    label: "Ashwamedha — Our teachers",
    group: "Ashwamedha School of Arts",
    page: "/units/ashwamedha",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      {
        name: "items",
        label: "Faculty",
        type: "list",
        itemLabel: "Teacher",
        fields: [
          textField("name", "Name"),
          textField("discipline", "Discipline"),
          areaField("detail", "Credentials"),
          { name: "photo", label: "Photo", type: "image" },
        ],
      },
    ],
    defaults: {
      eyebrow: "Our teachers",
      title: "Faculty",
      items: [
        {
          name: "Faculty Name",
          discipline: "Bharatanatyam",
          detail: "Guru — placeholder credentials",
          photo: "",
        },
        {
          name: "Faculty Name",
          discipline: "Carnatic Vocal",
          detail: "Vidwan — placeholder credentials",
          photo: "",
        },
        {
          name: "Faculty Name",
          discipline: "Mridangam",
          detail: "Placeholder credentials",
          photo: "",
        },
        { name: "Faculty Name", discipline: "Veena", detail: "Placeholder credentials", photo: "" },
      ],
    },
  },
  {
    key: "ashwamedha.method",
    label: "Ashwamedha — How we teach",
    group: "Ashwamedha School of Arts",
    page: "/units/ashwamedha",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      areaField("intro", "Intro"),
      {
        name: "items",
        label: "Steps",
        type: "list",
        itemLabel: "Step",
        fields: [
          textField("meta", "Step number"),
          textField("title", "Title"),
          areaField("body", "Description"),
        ],
      },
    ],
    defaults: {
      eyebrow: "How we teach",
      title: "A unique learning method",
      intro:
        "Four layers repeat through every level, so students grow in skill and understanding together.",
      items: [
        {
          meta: "01",
          title: "Foundation",
          body: "Posture, breath, rhythm and voice culture practised daily.",
        },
        {
          meta: "02",
          title: "Context",
          body: "Meaning, mythology and language behind each composition.",
        },
        {
          meta: "03",
          title: "Expression",
          body: "Abhinaya and manodharma — making the piece personal.",
        },
        {
          meta: "04",
          title: "Stage",
          body: "Regular recitals build confidence long before the arangetram.",
        },
      ],
    },
  },
  {
    key: "ashwamedha.follow",
    label: "Ashwamedha — Follow us",
    group: "Ashwamedha School of Arts",
    page: "/units/ashwamedha",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      areaField("intro", "Intro"),
      {
        name: "items",
        label: "Links",
        type: "list",
        itemLabel: "Link",
        fields: [
          textField("label", "Label"),
          textField("meta", "Platform"),
          { name: "href", label: "URL", type: "url" },
          areaField("body", "Description"),
        ],
      },
    ],
    defaults: {
      eyebrow: "Follow us",
      title: "Ashwamedha online",
      intro: "Watch recent performances and class highlights on our social channels.",
      items: [
        {
          label: "Instagram",
          meta: "Profile",
          href: "https://www.instagram.com/ashwamedha_school_of_arts123/",
          body: "@ashwamedha_school_of_arts123 — photos, reels and announcements from the school.",
        },
        {
          label: "Performance video",
          meta: "Facebook",
          href: "https://www.facebook.com/share/v/1ELPHSGyC9/",
          body: "A recent student performance shared on Facebook.",
        },
        {
          label: "Featured reel",
          meta: "Facebook",
          href: "https://www.facebook.com/share/r/19KuVDR2Hd/",
          body: "Short reel from a recent recital.",
        },
        {
          label: "Stage recital",
          meta: "Facebook",
          href: "https://www.facebook.com/share/v/18b3RKAjSH/",
          body: "Another stage recital by our students.",
        },
      ],
    },
  },
  {
    key: "ashwamedha.join",
    label: "Ashwamedha — Join us",
    group: "Ashwamedha School of Arts",
    page: "/units/ashwamedha",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      areaField("body", "Body"),
      textField("ctaLabel", "Button label"),
    ],
    defaults: {
      eyebrow: "Join us",
      title: "Admissions",
      body: "Admissions are open through the year, subject to batch availability. Placement for new students is decided after a short informal assessment. Fee structure and class timings will be shared on request.",
      ctaLabel: "Enquire about admissions",
    },
  },

  /* ------------------------------------------------------------- Preschool */
  {
    key: "preschool.unit",
    label: "Preschool — identity & photo film",
    group: "Preschool",
    page: "/units/preschool",
    fields: [
      { name: "logo", label: "Unit logo", type: "image" },
      textField("name", "Name"),
      textField("tagline", "Tagline"),
      areaField("description", "Short description"),
      { name: "photos", label: "Photo film", type: "images" },
    ],
    defaults: {
      logo: "",
      name: "Preschool",
      tagline: "Gentle, playful early years",
      description:
        "A play-based foundation programme where language, movement, stories and shlokas grow together in small, warmly supported groups.",
      photos: [
        { url: "", alt: "Preschool classroom", caption: "Classroom" },
        { url: "", alt: "Preschool circle time", caption: "Circle time" },
        { url: "", alt: "Preschool craft", caption: "Craft corner" },
        { url: "", alt: "Preschool outdoor play", caption: "Outdoor play" },
      ],
    },
  },
  {
    key: "preschool.overview",
    label: "Preschool — Overview",
    group: "Preschool",
    page: "/units/preschool",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      areaField("heroSubtitle", "Page header subtitle"),
      {
        name: "paragraphs",
        label: "Paragraphs",
        type: "list",
        itemLabel: "Paragraph",
        fields: [areaField("text", "Text")],
      },
      { name: "image", label: "Photo", type: "image" },
    ],
    defaults: {
      eyebrow: "Overview",
      title: "Our approach",
      heroSubtitle: "Where the first years of learning are gentle, playful and full of wonder.",
      paragraphs: [
        {
          text: "Children learn best when they are curious and unhurried. Our programme uses play, sensory material, music and stories to build language, motor skills and early numeracy — without worksheets or pressure.",
        },
        {
          text: "Shlokas, rhymes, festivals and seasonal crafts keep culture present in the everyday, while small group sizes let every child be known well.",
        },
      ],
      image: "",
    },
  },
  {
    key: "preschool.programme",
    label: "Preschool — Programme & age groups",
    group: "Preschool",
    page: "/units/preschool",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      {
        name: "items",
        label: "Age groups",
        type: "list",
        itemLabel: "Group",
        fields: [
          textField("title", "Group"),
          textField("meta", "Ages"),
          areaField("body", "Description"),
        ],
      },
    ],
    defaults: {
      eyebrow: "Programme",
      title: "Age groups & curriculum",
      items: [
        {
          title: "Playgroup",
          meta: "Ages 1.5 – 2.5",
          body: "Sensory play, gross motor activity, rhymes and settling-in routines.",
        },
        {
          title: "Nursery",
          meta: "Ages 2.5 – 3.5",
          body: "Language building, pre-writing, number sense, music and movement.",
        },
        {
          title: "Kindergarten",
          meta: "Ages 3.5 – 5",
          body: "Phonics, early maths, storytelling, art and school-readiness skills.",
        },
      ],
    },
  },
  {
    key: "preschool.day",
    label: "Preschool — A day with us",
    group: "Preschool",
    page: "/units/preschool",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      {
        name: "items",
        label: "Steps",
        type: "list",
        itemLabel: "Step",
        fields: [textField("title", "Title"), areaField("body", "Description")],
      },
    ],
    defaults: {
      eyebrow: "A day with us",
      title: "Daily rhythm",
      items: [
        { title: "Circle time", body: "Greeting, shloka, calendar and the day's story." },
        { title: "Free play", body: "Child-led exploration across learning corners." },
        { title: "Focus activity", body: "Language, numeracy or craft in small groups." },
        { title: "Snack & rest", body: "Shared snack, hygiene habits and quiet time." },
        { title: "Music & movement", body: "Songs, rhythm games and outdoor play." },
        { title: "Wind down", body: "Reflection, tidy-up and goodbye circle." },
      ],
    },
  },
  {
    key: "preschool.enrolment",
    label: "Preschool — Enrolment",
    group: "Preschool",
    page: "/units/preschool",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      areaField("body", "Body"),
      textField("ctaLabel", "Button label"),
    ],
    defaults: {
      eyebrow: "Enrolment",
      title: "Admissions",
      body: "Admissions for the new academic year open in advance of each term. Parents are welcome to visit the campus, meet the teachers and observe a session before enrolling. Fee details and the enrolment form are shared on enquiry.",
      ctaLabel: "Book a campus visit",
    },
  },

  /* -------------------------------------------------------------- Programs */
  {
    key: "programs.hero",
    label: "Programs — page header",
    group: "Programs & Events",
    page: "/programs",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      areaField("subtitle", "Subtitle"),
    ],
    defaults: {
      eyebrow: "Calendar",
      title: "Programs & Events",
      subtitle:
        "Performances, festivals and workshops that bring our students and community together.",
    },
  },
  {
    key: "programs.upcoming",
    label: "What's coming up",
    group: "Programs & Events",
    page: "/programs",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      {
        name: "items",
        label: "Events",
        type: "list",
        itemLabel: "Event",
        fields: [
          textField("title", "Title"),
          textField("date", "Date"),
          textField("place", "Venue"),
          areaField("summary", "Summary"),
        ],
      },
    ],
    defaults: {
      eyebrow: "Upcoming",
      title: "What's coming up",
      items: [
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
      ],
    },
  },
  {
    key: "programs.recurring",
    label: "Our recurring calendar",
    group: "Programs & Events",
    page: "/programs",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      {
        name: "items",
        label: "Recurring events",
        type: "list",
        itemLabel: "Event",
        fields: [textField("title", "Title"), areaField("body", "Description")],
      },
    ],
    defaults: {
      eyebrow: "Every year",
      title: "Our recurring calendar",
      items: [
        { title: "Guru Purnima", body: "Honouring teachers with a student recital." },
        { title: "Navaratri", body: "Nine evenings of music and dance." },
        { title: "Annual Day", body: "Preschool and arts showcase for families." },
        { title: "Summer Workshop", body: "Short intensives open to new learners." },
      ],
    },
  },

  /* ------------------------------------------------------------------ News */
  {
    key: "news.page",
    label: "News & Announcements",
    group: "News",
    page: "/news",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      areaField("subtitle", "Subtitle"),
      {
        name: "items",
        label: "Posts",
        type: "list",
        itemLabel: "Post",
        fields: [
          textField("title", "Title"),
          textField("date", "Date"),
          areaField("excerpt", "Excerpt"),
          { name: "image", label: "Photo", type: "image" },
        ],
      },
    ],
    defaults: {
      eyebrow: "Newsroom",
      title: "News & Announcements",
      subtitle: "Updates from the Trust, the school of arts and the preschool.",
      items: [
        {
          title: "Trust announces its first scholarship cohort",
          date: "Coming soon",
          excerpt:
            "Placeholder announcement text for the scholarship programme supporting deserving students.",
          image: "",
        },
        {
          title: "Ashwamedha students win state-level honours",
          date: "Coming soon",
          excerpt:
            "Placeholder news item highlighting recent student achievements in classical arts.",
          image: "",
        },
        {
          title: "Preschool admissions open for the new academic year",
          date: "Coming soon",
          excerpt: "Placeholder note on admissions, age criteria and the enrolment process.",
          image: "",
        },
      ],
    },
  },

  /* --------------------------------------------------------------- Gallery */
  {
    key: "gallery.photos",
    label: "Gallery — photographs",
    group: "Gallery",
    page: "/gallery",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      areaField("subtitle", "Page header subtitle"),
      { name: "photos", label: "Photos", type: "images" },
    ],
    defaults: {
      eyebrow: "Photographs",
      title: "Recent moments",
      subtitle:
        "A growing archive of performances, classrooms and celebrations. Final photographs and videos will be added before launch.",
      photos: [
        { url: "", alt: "Arangetram recital", caption: "Arangetram recital" },
        { url: "", alt: "Preschool learning corners", caption: "Preschool learning corners" },
        { url: "", alt: "Navaratri evening", caption: "Navaratri evening" },
        { url: "", alt: "Craft session", caption: "Craft session" },
        { url: "", alt: "Guru Purnima", caption: "Guru Purnima" },
        { url: "", alt: "Annual day rehearsal", caption: "Annual day rehearsal" },
      ],
    },
  },
  {
    key: "gallery.videos",
    label: "Gallery — videos",
    group: "Gallery",
    page: "/gallery",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      {
        name: "items",
        label: "Videos",
        type: "list",
        itemLabel: "Video",
        fields: [textField("label", "Label"), { name: "href", label: "Video URL", type: "url" }],
      },
    ],
    defaults: {
      eyebrow: "Videos",
      title: "Performance recordings",
      items: [
        { label: "Bharatanatyam recital", href: "" },
        { label: "Carnatic vocal concert", href: "" },
        { label: "Preschool annual day", href: "" },
      ],
    },
  },

  /* ---------------------------------------------------------- Get involved */
  {
    key: "getInvolved.ways",
    label: "Ways to contribute",
    group: "Get Involved",
    page: "/get-involved",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      {
        name: "items",
        label: "Contribution methods",
        type: "list",
        itemLabel: "Method",
        fields: [
          textField("title", "Title"),
          textField("meta", "Label"),
          areaField("body", "Details"),
        ],
      },
      areaField("note", "Where your donation goes"),
      { name: "qr", label: "UPI QR code image", type: "image" },
    ],
    defaults: {
      eyebrow: "Donate",
      title: "Ways to contribute",
      items: [
        {
          title: "Bank transfer",
          meta: "NEFT / IMPS",
          body: "Account name: Nagalakshmi Ramamurthy Iyer Educational Trust\nAccount number: XXXXXXXXXXXX\nIFSC: XXXX0000000\nBank & branch: To be confirmed",
        },
        {
          title: "UPI",
          meta: "Instant",
          body: "UPI ID: nritrust@upi (placeholder). A QR code will be shown here once the Trust's payment details are finalised.",
        },
        {
          title: "Tax exemption",
          meta: "80G",
          body: "Receipts are issued for every contribution. 80G exemption status and registration details will be published here once confirmed.",
        },
      ],
      note: "Where your donation goes: scholarships and fee waivers, instruments and teaching material, preschool learning resources, and cultural programme costs. An annual statement of use will be published on this page.",
      qr: "",
    },
  },
  {
    key: "getInvolved.volunteer",
    label: "Volunteer opportunities",
    group: "Get Involved",
    page: "/get-involved",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      {
        name: "items",
        label: "Opportunities",
        type: "list",
        itemLabel: "Opportunity",
        fields: [textField("title", "Title"), areaField("body", "Description")],
      },
    ],
    defaults: {
      eyebrow: "Volunteer",
      title: "Give your time",
      items: [
        {
          title: "Teaching support",
          body: "Assist with classes, reading circles or homework help.",
        },
        { title: "Event help", body: "Stage management, hospitality and coordination at events." },
        {
          title: "Media & design",
          body: "Photography, videography, social media and print design.",
        },
        {
          title: "Professional skills",
          body: "Accounting, legal, technology or fundraising support.",
        },
      ],
    },
  },

  /* --------------------------------------------------------------- Contact */
  {
    key: "contact.page",
    label: "Contact page & enquiry form",
    group: "Contact",
    page: "/contact",
    fields: [
      textField("eyebrow", "Eyebrow"),
      textField("title", "Title"),
      areaField("subtitle", "Subtitle"),
      {
        name: "mapEmbedUrl",
        label: "Map embed URL",
        type: "url",
        hint: "Google Maps → Share → Embed a map → copy the src URL.",
      },
      areaField("landmarks", "Nearby landmarks"),
      {
        name: "enquiryEmail",
        label: "Enquiry notification email",
        type: "text",
        hint: "Enquiries are stored in the admin panel and flagged for this address.",
      },
      {
        name: "subjects",
        label: "Enquiry subjects",
        type: "list",
        itemLabel: "Subject",
        fields: [textField("label", "Subject")],
      },
    ],
    defaults: {
      eyebrow: "Say hello",
      title: "Contact Us",
      subtitle:
        "For admissions, donations, volunteering or collaborations — we would love to hear from you.",
      mapEmbedUrl: "",
      landmarks: "Landmarks around the trust office will be listed here.",
      enquiryEmail: "contact@nritrust.org",
      subjects: [
        { label: "Preschool admissions" },
        { label: "Arts admissions" },
        { label: "Donation" },
        { label: "Volunteering" },
        { label: "Other" },
      ],
    },
  },
];

export const SECTION_MAP: Record<string, SectionDef> = Object.fromEntries(
  SECTIONS.map((s) => [s.key, s]),
);

export const SECTION_GROUPS = SECTIONS.reduce<Record<string, SectionDef[]>>((acc, s) => {
  (acc[s.group] ||= []).push(s);
  return acc;
}, {});

export const DEFAULT_CONTENT: Record<string, Record<string, unknown>> = Object.fromEntries(
  SECTIONS.map((s) => [s.key, s.defaults]),
);
