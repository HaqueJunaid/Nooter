import {user} from '@/db/user-schema';
import { relations, sql } from 'drizzle-orm';
import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const notebooks = pgTable("notebooks", {
    id: text('id').primaryKey().default(sql`gen_random_uuid()`),
    name: text('name').notNull(),
    userId: text('user_id').notNull().references(() => user.id, {onDelete: 'cascade'}),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()),
})

export type Noteboook = typeof notebooks.$inferSelect;
export type InsertNotebook = typeof notebooks.$inferInsert;

export const notes = pgTable("notes", {
    id: text('id').primaryKey().default(sql`gen_random_uuid()`),
    title: text('title').notNull(),
    content: jsonb('content').notNull(),
    notebookId: text('notebook_id').notNull().references(() => notebooks.id, {onDelete: 'cascade'}),
    createdAt: timestamp('created_at').$defaultFn(() => new Date()),
    updatedAt: timestamp('updated_at').$defaultFn(() => new Date()),
})

export type Note = typeof notes.$inferSelect;
export type InsertNote = typeof notes.$inferInsert;

export const notebookRelations = relations(notebooks, ({ many, one }) => ({
    notes: many(notes),
    users: one(user, {
        fields: [notebooks.userId],
        references: [user.id]
    })
}))

export const noteRelations = relations(notes, ({one}) => ({
    notebook: one(notebooks, {
        fields: [notes.notebookId],
        references: [notebooks.id]
    })
}))