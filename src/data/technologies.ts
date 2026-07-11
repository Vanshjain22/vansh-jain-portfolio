export type TechnologyIcon =
  | "atom"
  | "triangle"
  | "braces"
  | "hexagon"
  | "server"
  | "leaf"
  | "wind"
  | "container"
  | "git-branch"
  | "cloud";

export type Technology = {
  name: string;
  icon: TechnologyIcon;
};

export const technologies: Technology[] = [
  { name: "React", icon: "atom" },
  { name: "Next.js", icon: "triangle" },
  { name: "TypeScript", icon: "braces" },
  { name: "Node.js", icon: "hexagon" },
  { name: "Express.js", icon: "server" },
  { name: "MongoDB", icon: "leaf" },
  { name: "Tailwind CSS", icon: "wind" },
  { name: "Docker", icon: "container" },
  { name: "Git", icon: "git-branch" },
  { name: "AWS", icon: "cloud" },
];
