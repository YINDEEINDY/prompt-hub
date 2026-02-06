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

function createModel(name: string) {
  const handler = {
    get(_: any, method: string) {
      return async (args: any) => {
        const client = await getPrismaClient();
        if (!client) throw new Error("Database not configured");
        return client[name][method](args);
      };
    },
  };
  return new Proxy({}, handler);
}

export const prisma = {
  user: createModel("user") as any,
  savedPrompt: createModel("savedPrompt") as any,
  favorite: createModel("favorite") as any,
  account: createModel("account") as any,
  session: createModel("session") as any,
};
