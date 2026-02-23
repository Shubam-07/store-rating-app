const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.user.create({
    data: {
      name: "System Administrator Account",
      email: "admin@example.com",
      password: hashedPassword,
      address: "Head Office Main Branch Address",
      role: "ADMIN"
    }
  });

  console.log("Admin user created successfully");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());