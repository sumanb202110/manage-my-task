import TaskForm from "@/components/taskForm/taskForm";
import TaskList from "@/components/taskList/taskList";
import UsernameTag from "@/components/usernameTag/usernameTag";
import { getTasks } from "@/lib/task"
import { RootState } from "@/store";
import { Grid, Paper } from "@mui/material";
import { Task } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR, { Fetcher } from 'swr'



const fetcher: Fetcher<Task[], string> = async () => {
    const res = await fetch(`http://localhost:3000/api/tasks/`)
    const tasks: Task[] = await res.json()

    return tasks;
}


const Tasks = () => {
    const username = useSelector((state: RootState) => state.username.value)
    const { data, error } = useSWR<Task[], Error>("home", fetcher, { refreshInterval: 1000 });
    const tasks: Task[] = data as Task[];

    const [newTask, setNewTask] = useState({
        task_name: "",
        description: "",
        task_status: ""
    })


    return (
        <>


            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={3}>
                    <Link href={"/"} >Home</Link>
                    <UsernameTag username={username}/>
                    <div data-testid={'task-list'} >
                        <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
                            <TaskList tasks={tasks} />
                        </Paper>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <TaskForm
                            isEdit={false}
                            task={newTask}
                            setTask={setNewTask}
                        />
                    </div>

                </Grid>

            </Grid>

        </>
    )
}


export default Tasks