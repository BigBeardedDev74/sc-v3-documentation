import { redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { Users } from "$lib/db/schema";

export const load = async (event) => {
  const session = await event.locals.auth();
  const users = await db.select().from(Users);

  if (!session) {
    throw redirect(303, "/auth/signin");
  }

  if (session?.user?.email) {
    const validUser = users.find(
      (user) => user.user_email === session?.user?.email
    );
    if (validUser) {
      return {
        session,
        validUser,
      };
    } else {
      return {
        session,
      };
    }
  } else {
    return {
      session,
    };
  }
};
