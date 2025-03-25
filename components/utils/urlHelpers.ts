// utils/urlHelpers.ts
export function getEnvironmentAwareUrl(url: string): string {
 const isDev = process.env.NODE_ENV === "development";

 // Replace only known production root URLs
 if (isDev && url.startsWith("https://nextjs-zoe.vercel.app")) {
  return url.replace("https://nextjs-zoe.vercel.app", "http://localhost:3005");
 }

 return url;
}
