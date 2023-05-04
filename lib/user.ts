import { PrismaClient } from "@prisma/client"
import prisma from "./prisma";
import { User } from "@/interfaces";


export const getUsers = async () => {
    const users: User[] = await prisma.user.findMany();

    return users;
}

export const getUser = async (email: String) => {
    const user: User = await prisma.user.findFirstOrThrow({ where: { email: email as string} });

    return user;
}


export const createUser = async (user: User) => {
    const createdUser: User = await prisma.user.create({ data: user });

    return createdUser;
}

export const updateUser = async (user: User) => {
    const updatedUser: User = await prisma.user.update({
        where: {
            email: user.email
        },
        data: user
    });

    return updatedUser;
}

export const deleteUser = async (email: string) => {
    const deletedUser: User = await prisma.user.delete({
        where: {
            email: email
        }
    });

    return deletedUser;
}



