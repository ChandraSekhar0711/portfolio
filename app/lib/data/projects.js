export const projects = [
  {
    slug: "shareaplate",
    title: "ShareAPlate",
    tagline:
      "A food-sharing platform connecting surplus food with people who need it.",
    description:
      "ShareAPlate is a food-sharing platform designed to connect people who have surplus food with people who need it.",
    status: "In Development",
    duration: "Aug 2023 — Present",
    featured: true,
    overview:
      "ShareAPlate aims to reduce food waste by giving providers (donors) a simple way to list surplus food and letting requestors discover and claim it nearby. It's being built and iterated on solo, outside of work hours.",
    problem:
      "Usable surplus food often goes to waste because there's no lightweight way for someone with extra food to reach someone nearby who needs it.",
    solution:
      "A role-based web app where providers post available food and requestors browse and request it, with authentication and profile tooling in place today and location-based discovery planned next.",
    features: [
      "Authentication flow (Firebase Auth) completed",
      "Role-based experience planned for providers and requestors",
      "Donor/provider and requestor experiences in active development",
      "Profile statistics UI implemented",
      "Static data used for early UI development, ahead of full Firestore wiring",
    ],
    stack: [
      "React.js",
      "JavaScript",
      "Node.js",
      "Vite",
      "Firebase Auth",
      "Firestore",
      "REST APIs",
      "HTML5",
      "CSS3",
      "Vercel",
    ],
    contribution:
      "Designed and built solo — frontend architecture, component structure, auth flow, and the REST API layer connecting the client to backend services.",
    statusSteps: [
      { label: "Authentication", state: "done" },
      { label: "Core UI", state: "done" },
      { label: "Static Data", state: "done" },
      { label: "Profile", state: "done" },
      { label: "Firebase Integration", state: "in-progress" },
      { label: "Location-based Discovery", state: "planned" },
      { label: "Production Release", state: "planned" },
    ],
    github: "https://github.com/ChandraSekhar0711/ShareAPlate",
    demo: "https://shareaplate-smoky.vercel.app/",
    images: ["/projects/shareaplate/shareaplate-1.png"],
  },
  {
    slug: "notomatic",
    title: "Notomatic",
    tagline:
      "A collaborative notes platform for creating, organizing, and sharing notes.",
    description:
      "Notomatic is a web application designed to make creating, managing, and sharing notes simple and accessible.",
    status: "Completed",
    duration: "Personal Project",
    featured: false,
    overview:
      "Notomatic was built as a web-based notes application focused on providing a simple experience for creating, organizing, and sharing notes. The project helped explore reusable UI components, application state management, user interactions, and building a responsive frontend experience.",
    problem:
      "Managing notes across different topics can become difficult when information is scattered across different places and there is no simple way to organize and share it.",
    solution:
      "A centralized notes application where users can create, manage, organize, and share notes through a clean and responsive web interface.",
    features: [
      "Create and manage notes",
      "Organize notes in a centralized interface",
      "View and update existing notes",
      "Responsive user interface for desktop and mobile",
      "Reusable components for common note-management interactions",
      "Simple interface focused on quick access to personal notes",
    ],
    stack: ["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs"],
    contribution:
      "Designed and developed the application frontend, including component structure, responsive UI, note-management flows, user interactions, and integration with application APIs.",
    statusSteps: [
      { label: "Project Setup", state: "done" },
      { label: "Core UI", state: "done" },
      { label: "Notes Management", state: "done" },
      { label: "Responsive Design", state: "done" },
      { label: "API Integration", state: "done" },
      { label: "Deployment", state: "done" },
    ],
    github: "https://github.com/ChandraSekhar0711/React_NoteManager",
    demo: "https://notemanager.vercel.app/",
    images: ["/projects/noteManager/noteManager.png"],
  },
];

export const featuredProject = projects.find((p) => p.featured);
