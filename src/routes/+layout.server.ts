import type { LayoutServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { Users } from "$lib/db/schema";
export const load: LayoutServerLoad = async (event) => {
  console.log("loading layout");
  const session = await event.locals.auth();
  const users = await db.select().from(Users);

  // check if session.user.email exists in users
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
  }
};
