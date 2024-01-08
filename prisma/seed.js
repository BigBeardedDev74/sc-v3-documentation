import { PrismaClient } from "@prisma/client";
import configOptions from "../src/lib/configOptions.json" assert { type: "json" };

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  for (const p of configOptions) {
    const configOption = await prisma.configOptions.create({
      data: {
        title: p.option,
        desc: p.desc,
        type: p.type,
        required: p.required,
        keywords: p.keywords,
      },
    });
    console.log(`Created config with id: ${configOption.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
