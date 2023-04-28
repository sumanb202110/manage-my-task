import { PrismaClient, Task } from "@prisma/client"
import prisma from "./prisma";


export const getTasks = async () => {
    const tasks: Task[] = await prisma.task.findMany();

    return tasks;
}

export const getTask = async (id: Number) => {
    const task: Task = await prisma.task.findFirstOrThrow({ where: { id: Number(id) } });

    return task;
}


export const createTask = async (task: Task) => {
    const createdTask: Task = await prisma.task.create({ data: task });

    return task;
}

export const updateTask = async (task: Task) => {
    const createdTask: Task = await prisma.task.update({
        where: {
            id: task.id
        },
        data: task
    });

    return task;
}

export const deleteTask = async (task: Task) => {
    const createdTask: Task = await prisma.task.delete({
        where: {
            id: task.id
        }
    });

    return task;
}



