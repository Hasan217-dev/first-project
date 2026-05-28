// lib/db.ts

import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// ✅ Only returns string
function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("❌ DATABASE_URL is not defined in .env");
  }

  if (!url.startsWith("postgresql://") && !url.startsWith("postgres://")) {
    throw new Error("❌ Invalid DATABASE_URL format");
  }

  return url;
}

// ✅ Create Prisma client
function createPrismaClient() {
  const connectionString = getDatabaseUrl();

  const adapter = new PrismaNeon({
    connectionString,
  });

  return new PrismaClient({
    adapter,
  });
}

// ✅ Global singleton (fixes hot reload issue)
export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}