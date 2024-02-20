const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createOrdersTable() {
  try {
    const tableExists = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT 1
        FROM   information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name = 'Order'
      ) as "exists";
    `;

    const exists = tableExists[0].exists;

    if (!exists) {
      await prisma.$queryRaw`
        CREATE TABLE "Order" (
          id VARCHAR(255) PRIMARY KEY,
          entity VARCHAR(255),
          amount INTEGER,
          amountPaid INTEGER,
          amountDue INTEGER,
          currency VARCHAR(255),
          receipt VARCHAR(255),
          status VARCHAR(255),
          attempts INTEGER,
          createdAt TIMESTAMP
        );
      `;
      console.log("Table created successfully");
    } else {
      console.log("Table already exists");
    }
  } catch (err) {
    console.error("Error creating table:", err);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { createOrdersTable };
