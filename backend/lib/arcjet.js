import { tokenBucket, shield, detectBot } from "@arcjet/node";

import "dotenv/config";

// init arcjet
export const aj = {
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    // Shield protects your Apps from common ataacks e.g SQL Injection, XSS, CSRF, etc
    shield({ mode: "LIVE" }),
    // Bot Detection
    detectBot({
      mode: "LIVE",
      // BLOCK ALL BOTS EXCEPT GOOGLEBOT / Search Engines
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        // see the full list of categories here: https://arcjet.com/bot-list
      ],
    }),
    // Rate Limiting
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
};
