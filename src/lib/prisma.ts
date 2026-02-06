/* eslint-disable @typescript-eslint/no-explicit-any */

// Prisma client - requires database to be configured
// Will be properly initialized when POSTGRES_PRISMA_URL is set

let prismaInstance: any = null;

async function getPrismaClient() {
  if (prismaInstance) return prismaInstance;
  try {
    const mod = await import("@prisma/client");
    const Client = mod.default || (mod as any).PrismaClient;
    if (typeof Client === "function") {
      prismaInstance = new Client();
    }
    return prismaInstance;
  } catch {
    return null;
  }
}

export const prisma = {
  savedPrompt: {
    findMany: async (args: any) => {
      const client = await getPrismaClient();
      if (!client) throw new Error("Database not configured");
      return client.savedPrompt.findMany(args);
    },
    findUnique: async (args: any) => {
      const client = await getPrismaClient();
      if (!client) throw new Error("Database not configured");
      return client.savedPrompt.findUnique(args);
    },
    create: async (args: any) => {
      const client = await getPrismaClient();
      if (!client) throw new Error("Database not configured");
      return client.savedPrompt.create(args);
    },
    delete: async (args: any) => {
      const client = await getPrismaClient();
      if (!client) throw new Error("Database not configured");
      return client.savedPrompt.delete(args);
    },
  },
};
