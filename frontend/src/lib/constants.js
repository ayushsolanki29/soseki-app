import packageJson from "../../package.json";

export const APP_NAME = "Soseki";
export const APP_VERSION = `v${packageJson.version}`;
export const APP_AUTHOR = packageJson.author || "Ayush Solanki";
export const APP_AUTHOR_URL = "https://ayushsolanki.site";
export const APP_GITHUB_URL = packageJson.repository?.url || "https://github.com/ayushsolanki29/soseki-app";
export const APP_TWITTER_URL = "https://x.com/sosekiapp";

export const APP_SOCIALS = [
  { name: "GitHub", url: APP_GITHUB_URL },
  { name: "Twitter", url: APP_TWITTER_URL },
  { name: "Website", url: APP_AUTHOR_URL },
];

export const LEGAL_PAGES = [
  { name: "Privacy Policy", url: "/privacy" },
  { name: "Terms of Service", url: "/terms" },
  { name: "Report Abuse", url: "/report-abuse" },
];

export const APP_EMAILS = [
  { label: "Email", value: "hello.soseki.app@gmail.com" },
  { label: "Support", value: "hello.soseki.app@gmail.com" },
];
