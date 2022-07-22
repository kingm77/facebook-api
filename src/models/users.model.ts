import { PrismaClient } from '@prisma/client';
import { userInfo } from 'os';

const prisma = new PrismaClient();

export type UsersInfo = {
    email: string,
    password: string
};

type UsersProfileInfo = {
  firstName?: string,
  lastName?: string
}

export const createOne = async (userInfo: UsersInfo) => 
  prisma.user.create({
    data:userInfo
  });

export const findAll = () => prisma.user.findMany() ;

export const findOneById = (id: string) =>
  prisma.user.findUnique({
    where: { id },
  });

export const updateOne = (id: string, userInfo: UsersInfo) =>
  prisma.user.update({
    where: { id },
    data: userInfo,
  });

export const deleteOne = (id : string) =>
  prisma.user.delete({
    where: { id },
  });

export const findByCredentials = (userInfo: UsersInfo) => {
    return prisma.user.findFirst({
      where: userInfo,
})};

export const UpdateUserProfile = (id: string, {firstName = "", lastName = ""}: UsersProfileInfo) => {
  return prisma.user.update({
    where: { id },
    data: {
      Profile: {
        update: {
          firstName,
          lastName
        },
      },
    },
  });
}
