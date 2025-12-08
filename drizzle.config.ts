import { defineConfig } from "drizzle-kit";


export default defineConfig({
  schema: ["./db/user-schema.ts", "./db/note-schema.ts"],
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
