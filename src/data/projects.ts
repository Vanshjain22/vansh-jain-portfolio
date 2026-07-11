export type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  caseStudyUrl: string;
  githubUrl: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "Career AI",
    category: "AI Platform",
    description:
      "AI-powered career platform that helps users build resumes, prepare for interviews, and make smarter career decisions.",
    technologies: ["React", "Node.js", "MongoDB", "Gemini AI"],
    image: "",
    liveUrl: "",
    caseStudyUrl: "",
    githubUrl: "",
  },
  {
    number: "02",
    title: "SyncSpace",
    category: "Collaboration SaaS",
    description:
      "Real-time collaborative workspace for managing projects, tasks, and team workflows efficiently.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    image: "",
    liveUrl: "",
    caseStudyUrl: "",
    githubUrl: "",
  },
];
