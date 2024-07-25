import { db } from "$lib/server/db";
import { ConfigOptions } from "$lib/db/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const configOptions = await db.select().from(ConfigOptions);
  return {
    configOptions,
  };
};

export const actions = {
  addConfigOption: async ({ request }) => {
    const data = await request.formData();
    const title = data.get("title");
    const desc = data.get("desc");
    const type = data.get("type");
    const keywords = data.get("keywords") || null;
    const required = parseInt(data.get("required")) || 0;
    const createdAt = new Date();
    if (title && desc) {
      const newConfigOption = await db
        .insert(ConfigOptions)
        .values({ title, desc, type, keywords, required, createdAt })
        .execute();
      return {
        success: true,
        newConfigOption,
      };
    }
    return {
      success: false,
    };
  },
};
