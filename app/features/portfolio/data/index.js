/**
 * Public portfolio content boundary.
 *
 * UI components should import portfolio data from this module rather than
 * reaching into app/lib/data directly. The current implementation re-exports
 * the existing local data modules, which remain the reliable static fallback.
 *
 * A Firestore-backed published-content adapter can be introduced behind this
 * boundary without coupling presentation components to Firebase.
 */
export { personal } from "@/app/lib/data/personal";
export { projects, featuredProject } from "@/app/lib/data/projects";
export { experience } from "@/app/lib/data/experience";
export { skillGroups } from "@/app/lib/data/skills";
export { education, certifications } from "@/app/lib/data/education";
export { techEcosystem } from "@/app/lib/data/techEcosystem";
