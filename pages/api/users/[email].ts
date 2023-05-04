import { User } from "@/interfaces";
import { deleteUser, getUser, updateUser } from "@/lib/user";
import { NextApiRequest, NextApiResponse } from "next"




export default async function handle(req : NextApiRequest, res : NextApiResponse) {

    switch (req.method) {
        case "GET":
            {
                const email : string  = req.query.email as string 

                res.status(200).json(await getUser(email));

                break;
            }
        case "DELETE":
            {
                const email : string  = req.query.email as string 

                res.status(200).json(await deleteUser(email));

                break;
            }

        case "PUT":
            {
                const user : User  = req.body

                try {
                    const updatedUser : User = await updateUser(user);

                    res.status(200).json(updatedUser);
                } catch (error) {
                    res.status(500).json({error : error});
                }
                break;

            }
        default:
          res.status(400).json({ message: "bad request" });
      }


}