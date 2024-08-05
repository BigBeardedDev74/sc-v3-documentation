import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { ConfigOptions } from "$lib/db/schema";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  const configOptions = await db.select().from(ConfigOptions);

  return {
    configOptions,
  };
}) satisfies PageServerLoad;

export const actions = {
  deleteConfigOption: async ({ request }) => {
    const data = await request.formData();
    const id = parseInt(data.get("id"));
    if (id) {
      const deletedConfigOption = await db
        .update(ConfigOptions)
        .set({
          archived: 1,
          updatedAt: new Date(),
          updatedBy: data.get("updatedBy"),
        })
        .where(eq(ConfigOptions.id, id))
        .execute();
      console.log("deleteConfigOption", id);
      return {
        success: true,
        deletedConfigOption,
      };
    }
    return {
      success: false,
    };
  },
};
