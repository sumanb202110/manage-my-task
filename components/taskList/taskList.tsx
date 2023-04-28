import { Task } from "@prisma/client"
import TaskCard from "../taskCard/taskCard"

type Props = {
    tasks: Task[]
}

const TaskList = (props : Props) => {
    const tasks = props.tasks;
    
    return (
        <>
        {
            tasks?.map((task)=>{
                return (
                    <TaskCard task = {task} key = {task.id}/>
                )
            })
        }
        </>
    )
}

export default TaskList