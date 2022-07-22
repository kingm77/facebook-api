import { PrismaClient} from "@prisma/client";
import base64url from "base64url";
const prisma = new PrismaClient()

export type PostsInfo = {
    message: string,
    userId: string
}

export const createOne = ({message, userId}: PostsInfo) => 
   prisma.post.create({
       data: {
           Author:{
               connect: {
                   id: userId
               }
           },
           message
       }
   })


export const findAll = () => prisma.post.findMany();

export const findOneById = (id: number) =>
  prisma.post.findUnique({
    where: { id },
})

// export const findByUser = (userId: string) => {
//     return prisma.post.findMany(
//         {
//             where: {
//                 authorId: userId
//             }
//         }
//     )
// }

export const updateOne = (id: number, { message }: PostsInfo) =>
  prisma.post.update({
    where: { id },
    data: { message },
  });

export const deleteOne = (id: number) =>
  prisma.post.delete({
    where: { id },
});

export const findByUser= async ({ skip, cursor, limit }: any, userId: string) => {
    const posts = await prisma.post.findMany({
      skip,
      ...(cursor) ? { cursor }:{},
      take: limit,

      where: {
        authorId: userId
      }   
    });
  
    return posts.map((post) => ({
      ...post,
      cursor: base64url.encode(JSON.stringify({ id: post.id })),
    }));
  }