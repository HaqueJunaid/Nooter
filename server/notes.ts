'use server';

import { db } from "@/db/drizzle";
import { InsertNote, notes } from "@/db/note-schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const createNotes = async (values: InsertNote) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        const userId = session?.user?.id;

        if (!userId)
            return { success: false, message: "User not found" };

        await db.insert(notes).values(values);

        return {success: true, message: "Note created successfully."};
    } catch (error) {
        return {success: false, message: "Failed to create note"};
    }
}

export const getNotesById = async (id: string) => {
    try {
        const note = await db.select().from(notes).where(eq(notes.id, id));
        return {success: true, note};
    } catch(error) {
        return {success: false, message: "Failed to get note"};
    }
}

export const updateNote = async (id: string, values: Partial<InsertNote>) => {
    try {
        await db.update(notes).set(values).where(eq(notes.id, id));
        return {success: true, message: "Note update successfully."}
    } catch(error) {
        return {success: false, message: "Failed to update note"};
    }
}

export const deleteNoteById = async (id: string) => {
    try {
        await db.delete(notes).where(eq(notes.id, id));
        return {success: true, message: "Note deleted successfully."}
    } catch(error) {
        return {success: false, message: "Failed to delete note"};
    }
}