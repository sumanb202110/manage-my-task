import { createTask, getTask, updateTask } from "@/lib/task";
import { PrismaClient, Task } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"




export default async function handle(req : NextApiRequest, res : NextApiResponse) {

    switch (req.method) {
        case "GET":
            {
                const id : Number  = Number(req.query.id)

                res.status(200).json(await getTask(id));

                break;
            }
        case "DELETE":
            break;

        case "PUT":
            {
                const task : Task  = req.body

                try {
                    const updatedTask : Task = await updateTask(task);

                    res.status(200).json(updatedTask);
                } catch (error) {
                    res.status(500).json({error : error});
                }
                break;

            }
        default:
          res.status(400).json({ message: "bad request" });
      }


}