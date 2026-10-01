// Netlify enforces this limit before requests reach the Next.js contact API.
// Returning undefined continues the request chain without changing the response.
export default async () => undefined;

export const config = {
  path: "/api/contact",
  method: "POST",
  rateLimit: {
    windowLimit: 5,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
  },
};
