import { fetchService } from "../../../services/fetchService";

// Fetch skills
export interface Skill {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  gen_description: string;
  l1_description: string | null;
  l2_description: string | null;
  l3_description: string | null;
  l4_description: string | null;
  l5_description: string | null;
  l6_description: string | null;
  l7_description: string | null;
}

export const getSkills = (): Promise<{ [category: string]: Skill[] } | string> => {
  return fetchService(`/api/skills`, { method: "GET" })
    .then((jsonData: Skill[]): Promise<{ [category: string]: Skill[] }> => {
      const skillGroupedByCategory: { [category: string]: Skill[] } = {};
      jsonData.forEach((skill) => {
        if (!skillGroupedByCategory[skill.category]) {
          skillGroupedByCategory[skill.category] = [];
        }
        skillGroupedByCategory[skill.category].push(skill);
      });

      return Promise.resolve(skillGroupedByCategory);
    })
    .catch((error): Promise<string> => {
      return Promise.reject(error.toString());
    });
};
