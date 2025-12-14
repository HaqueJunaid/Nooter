'use server';

import { db } from "@/db/drizzle";
import { InsertNotebook, notebooks, notes } from "@/db/note-schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const createNotebook = async (values: InsertNotebook) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        const userId = session?.user?.id;

        if (!userId)
            return { success: false, message: "User not found" };

        await db.insert(notebooks).values(values);

        return {success: true, message: "Notebook created successfully."};
    } catch (error) {
        return {success: false, message: "Failed to create notebook"};
    }
}

export const getNotebooks = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        const userId = session?.user?.id;

        if (!userId)
            return {success: false, message: "User not found"};

        const allNotebooks = await db.query.notebooks.findMany({
            where: eq(notebooks.userId, userId),
            with: {
                notes: true,
            }
        });

        return {success: true, allNotebooks };
    } catch (error) {
        console.error("getNotebooks:error: ", error);
        return {success: false, message: "Failed to get notebooks", error: String(error)};
    }
}

export const getNotebooksById = async (id: string) => {
    try {
        console.log("Inside server action")
        const notebook = await db.query.notebooks.findFirst({
            where: eq(notebooks.id, id),
            with: {
                notes: true,
            }
        });
        return {success: true, notebook};
    } catch(error) {
        return {success: false, message: "Failed to get notebook"};
    }
}

export const updateNotebook = async (id: string, values: InsertNotebook) => {
    try {
        await db.update(notebooks).set(values).where(eq(notebooks.id, id));
        return {success: true, message: "Notebook update successfully."}
    } catch(error) {
        return {success: false, message: "Failed to update notebook"};
    }
}

export const deleteNotebookById = async (id: string) => {
    try {
        await db.delete(notebooks).where(eq(notebooks.id, id));
        return {success: true, message: "Notebook deleted successfully."}
    } catch(error) {
        return {success: false, message: "Failed to delete notebook"};
    }
}