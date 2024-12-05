import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { Users } from "$lib/db/schema";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  const users = await db.select().from(Users);

  return {
    users,
  };
}) satisfies PageServerLoad;

export const actions = {
  addUser: async ({ request }) => {
    const data = await request.formData();
    const user_email = data.get("user_email");
    const user_name = data.get("user_name");
    const role = data.get("role");
    const createdAt = new Date();

    console.log(data);
    if (user_email && user_name && role) {
      const newUser = await db
        .insert(Users)
        .values({ user_email, user_name, role, createdAt })
        .execute();
      return {
        success: true,
        newUser,
      };
    }
    return {
      success: false,
    };
  },

  deleteUser: async ({ request }) => {
    const data = await request.formData();
    const id = parseInt(data.get("id"));
    if (id) {
      const deletedUser = await db
        .delete(Users)
        .where(eq(Users.id, id))
        .execute();
      return {
        success: true,
        deletedUser,
      };
    }
    return {
      success: false,
    };
  },

  updateUser: async ({ request }) => {
    const data = await request.formData();
    const id = parseInt(data.get("id"));
    const user_email = data.get("user_email");
    const user_name = data.get("user_name");
    const role = data.get("role");
    if (id) {
      const updatedUser = await db
        .update(Users)
        .set({ user_email, user_name, role })
        .where(eq(Users.id, id))
        .execute();
      return {
        success: true,
        updatedUser,
      };
    }
    return {
      success: false,
    };
  },
};
