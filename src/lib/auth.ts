import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema";
 
export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    cors: {
        origin: ["http://localhost:3000"], // ← NYCKELN!
        credentials: true,
      },
    database: drizzleAdapter(db, {
        provider: "pg", 
        schema: {
            ...schema,
        },
    }),
});
