import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const session = await event.locals.auth();

  console.log("page layout", session);

  if (!session) {
    throw redirect(303, "/auth/signin");
  }

  return {
    session,
  };
};
