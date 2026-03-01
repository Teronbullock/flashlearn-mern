import { db } from "../db/database";
import { eq } from "drizzle-orm";


export const findResourceById = async (model, resourceId: string) => {
  const [resource] = await db.select().from(model).where(eq(model.id, resourceId)).limit(1);

  return resource || null;
}

