export function requireEmployer(user: { role: string }) {
  if (!user || user.role !== "employer") {
    throw new Error("UNAUTHORIZED_EMPLOYER_ONLY");
  }
}
