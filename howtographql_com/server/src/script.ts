import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newLink = await prisma.link.create({
    data: {
      description: "Fullstack tutorial for GraphQL",
      url: "www.howtographql.com",
    },
  });

  const allLinks = await prisma.link.findMany();
  console.log("All Links", allLinks);
}

main()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
