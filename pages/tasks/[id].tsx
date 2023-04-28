import TaskCard from "@/components/taskCard/taskCard"
import { Box, Button, Container, Grid, Input, Typography } from "@mui/material"
import { Task } from "@prisma/client"
import { GetServerSidePropsContext } from "next"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"

import { useState } from "react"
import TaskForm from "@/components/taskForm/taskForm"
import Link from "next/link"

type Props = {
    task: Task
}

const Task = (props: Props) => {
    const [isEdit, setIsEdit] = useState(false);

    const [task, setTask] = useState(props.task);

    const handleEdit = () => {
        setIsEdit(true);
    }





    return (
        <>
            <Container fixed>

                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}
                >

                    {
                        isEdit ?
                            <TaskForm
                                isEdit={isEdit}
                                task={task}
                                setTask={setTask}
                                setIsEdit={setIsEdit}
                            />

                            :
                            <Box sx={{ width: '100%', maxWidth: 500 }}>
                                <Typography variant="h1" gutterBottom>
                                    {task.id} - {task.task_name}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {task.task_status}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {task.description}
                                </Typography>
                                <Button size="small" data-testid='task-form-edit-button' onClick={handleEdit} startIcon={<EditIcon />}>Edit</Button>
                            </Box>
                    }
                    <Link href={'/tasks/'}>
                        Back to tasks
                    </Link>
                </Grid>
            </Container>
        </>
    )
}


export async function getStaticPaths() {

    const res = await fetch('http://localhost:3000/api/tasks/')
    const tasks: Task[] = await res.json()

    const paths = tasks.map((task) => {
        return {
            params: {
                id: (task.id).toString()
            }
        }
    })

    return {
        paths: paths,
        fallback: "blocking",
    }
}

export async function getStaticProps(context: GetServerSidePropsContext<{ id: string }>) {
    const id = Number(context.params?.id )

    const res = await fetch(`http://localhost:3000/api/tasks/${id}`)
    const task: Task = await res.json()

    return {
        props: { task },
    }
}

export default Task
