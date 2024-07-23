import { db } from "$lib/db.server";
import { ConfigOptions } from "$lib/db/schema";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const result = await db.select().from(ConfigOptions);
  return {
    result,
  };
}) satisfies PageServerLoad;
