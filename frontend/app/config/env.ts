/**
 * Xenlog404 Open Source Environment Configuration Validation
 */

const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  
  if (!value) {
    // Throws a explicit error during server-side rendering or build phases
    throw new Error(
      `[Xenlog404 Configuration Error]: Missing required environment variable: "${key}". ` +
      `Ensure it is set in your deployment dashboard or local environment file.`
    );
  }
  
  return value;
};

export const env = {
  // Browser-accessible client connection target
  backendUrl: getEnvVariable('NEXT_PUBLIC_BACKEND_URL'),
  
  // Server-only OAuth and Session orchestration variables
  nextAuthUrl: process.env.NEXTAUTH_URL || '', // NextAuth can sometimes infer this in production
  nextAuthSecret: getEnvVariable('NEXTAUTH_SECRET'),
  githubId: getEnvVariable('GITHUB_ID'),
  githubSecret: getEnvVariable('GITHUB_SECRET'),
};