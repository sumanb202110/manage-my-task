import { createTask, getTasks } from "@/lib/task"
import { PrismaClient, Task } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"





export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      {
        try {
          const tasks: Task[] = await getTasks();
          res.status(200).json(tasks)
        } catch (error) {
          res.status(500).json({ error: error });
        }
       
        break;
      }
    case "POST":
      {
        const task: Task = req.body

        try {
          const createdTask: Task = await createTask(task);

          res.status(200).json(createdTask);
        } catch (error) {
          res.status(500).json({ error: error });
        }
      }
        
    }

  }