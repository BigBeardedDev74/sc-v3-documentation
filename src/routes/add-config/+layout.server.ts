import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const session = await event.locals.auth();

  if (!session) {
    throw redirect(303, "/auth/signin");
  }

  return {
    session,
  };
};
