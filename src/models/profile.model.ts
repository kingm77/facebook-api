import { PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export const findByUser = (userId: string) => {
    return prisma.profile.findFirst(
        {
            where: {
              userId
            }
        }
    )
}
