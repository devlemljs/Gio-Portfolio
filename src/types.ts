export interface Project {
  id: string;
  title: string;
  skills: string[];
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  sopSteps?: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  achievements: string[];
  amazonSkills: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export interface ToolItem {
  name: string;
  category: string;
  iconName: string; // The Lucide icon or brand identifier
  color: string;    // Accent color code
}

export interface EducationItem {
  degree: string;
  school: string;
}
