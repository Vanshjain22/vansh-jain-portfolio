export type TechnologyIcon =
  | "atom"
  | "triangle"
  | "braces"
  | "hexagon"
  | "server"
  | "leaf"
  | "wind"
  | "git-branch"
  | "database";

export type Technology = {
  name: string;
  icon: TechnologyIcon;
};

export const technologies: Technology[] = [
  { name: "React.js", icon: "atom" },
  { name: "Next.js", icon: "triangle" },
  { name: "JavaScript", icon: "braces" },
  { name: "TypeScript", icon: "braces" },
  { name: "Node.js", icon: "hexagon" },
  { name: "Express.js", icon: "server" },
  { name: "MongoDB", icon: "leaf" },
  { name: "Tailwind CSS", icon: "wind" },
  { name: "Git & GitHub", icon: "git-branch" },
  { name: "REST APIs", icon: "server" },
  { name: "Gemini AI", icon: "database" },
];
