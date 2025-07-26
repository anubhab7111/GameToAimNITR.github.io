export interface Skill {
  name: string;
  level: number;
}

export type Year = 2022 | 2023 | 2024 | number;

export interface Member {
  id: number;
  name: string;
  role: string;
  year: Year;
  image: string;
  aiHint: string;
  skills: Skill[];
  specialAbility: string;
  bio: string;
  githubUrl?: string;
  linkedinUrl?: string;
}
