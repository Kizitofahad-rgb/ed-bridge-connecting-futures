import { people, communitiesById } from "../edbridge/data";
import type { Person, Recommendation, SupportType } from "../edbridge/types";

export interface ConnectionRationale {
  targetPerson: Person;
  matchScore: number; // 0 to 100
  reasons: string[];
  sharedCommunities: string[];
}

export function getRecommendedConnections(currentUser: Person): ConnectionRationale[] {
  return people
    .filter((p) => p.id !== currentUser.id)
    .map((other) => {
      const reasons: string[] = [];
      let score = 0;

      // College match
      if (currentUser.college && other.college && currentUser.college === other.college) {
        reasons.push(`Same College (${currentUser.college})`);
        score += 35;
      }

      // Course match
      if (currentUser.course && other.course && currentUser.course === other.course) {
        reasons.push(`Same Program (${currentUser.course})`);
        score += 30;
      }

      // Secondary school match
      if (
        currentUser.secondarySchool &&
        other.secondarySchool &&
        currentUser.secondarySchool === other.secondarySchool
      ) {
        reasons.push(`Alumni of ${currentUser.secondarySchool}`);
        score += 40;
      }

      // Shared communities
      const shared = currentUser.communities.filter((c) => other.communities.includes(c));
      if (shared.length > 0) {
        const communityNames = shared.map((id) => communitiesById[id]?.short ?? id).join(", ");
        reasons.push(`Shared Communities: ${communityNames}`);
        score += shared.length * 15;
      }

      // Mentorship offers match
      if (other.role === "mentor" || other.role === "supporter" || other.offers.includes("mentorship")) {
        reasons.push("Offers Mentorship & Guidance");
        score += 20;
      }

      if (reasons.length === 0) {
        reasons.push("Member of Makerere Ed-Bridge Community");
        score = 10;
      }

      return {
        targetPerson: other,
        matchScore: Math.min(score, 100),
        reasons,
        sharedCommunities: shared,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
