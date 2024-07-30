import { db } from "$lib/server/db";
import { ConfigOptions } from "$lib/db/schema";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  const configOptions = await db.select().from(ConfigOptions);

  return {
    configOptions,
  };
}) satisfies PageServerLoad;
