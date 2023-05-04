import { User } from "@/interfaces";
import { createUser, getUsers } from "@/lib/user"
import { NextApiRequest, NextApiResponse } from "next"


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      {
        try {
          const users: User[] = await getUsers();
          res.status(200).json(users)
        } catch (error) {
          res.status(500).json({ error: error });
        }
       
        break;
      }
    case "POST":
      {
        const user: User = req.body

        try {
          const createdUser: User = await createUser(user);

          res.status(200).json(createdUser);
        } catch (error) {
          res.status(500).json({ error: error });
        }
      }
        
    }

  }