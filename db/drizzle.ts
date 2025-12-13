import { drizzle } from "drizzle-orm/neon-http";
import { notebooks, notes, notebookRelations, noteRelations } from "./note-schema";
import { user, session, account, verification } from "./user-schema";

// Provide schema to enable `db.query.*` API and relation-aware joins.
export const db = drizzle(process.env.DATABASE_URL!, {
  schema: {
    notebooks,
    notes,
    notebookRelations,
    noteRelations,
    user,
    session,
    account,
    verification,
  },
});
