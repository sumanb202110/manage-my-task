import { Alert, Box, Button, Input } from "@mui/material"
import { Task } from "@prisma/client"
import SaveIcon from "@mui/icons-material/Save"
import { ChangeEventHandler, MouseEventHandler, useState } from "react"
import { NewTask } from "@/interfaces"


type Props = {
    isEdit: Boolean,
    task: NewTask,
    setTask: Function,
    setIsEdit?: Function
}

const TaskForm = (props: Props) => {

    const [successMsgVisible, setSuccessMessageVisible] = useState(false);

    const { isEdit, task, setTask, setIsEdit } = props;


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, task_name: e.target.value })
    }

    const handledescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, description: e.target.value })
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, task_status: e.target.value })
    }

    const handleSave = async () => {

        if (isEdit) {
            console.log("Task updating");

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            };

            try {
                const response = await fetch(`http://localhost:3000/api/tasks/${task.id}`, requestOptions);

                const updatedTask = await response.json();

                console.log("Task updated", updatedTask);
                setTask(updatedTask)
                setSuccessMessageVisible(true);
                if(setIsEdit){
                    setIsEdit(false);
                }
            } catch (error) {
                console.log("Error in updating task ", error)
            }

        } else {
            console.log("Task creating");

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            };

            try {
                const response = await fetch(`http://localhost:3000/api/tasks/`, requestOptions);
                const createdTask = await response.json();
                console.log("Task created", createdTask);
                setSuccessMessageVisible(true);
            } catch (error) {
                console.log("Error in creating task ", error)
            }
        }


    }

    return (
        <>
        {
            successMsgVisible ? 
            <Alert severity="success" data-testid={"task-form-success-msg"}>Successfully created</Alert>
            :
            null

        }
            <Box
                data-testid={"task-form"}
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                {
                    isEdit ?
                        <Input placeholder="Id" name="id" disabled={Boolean(isEdit)} value={task.id} data-testid={"task-form-id"} />
                        :
                        null
                }
                <Input placeholder="Task name" name="task_name" value={task.task_name} onChange={handleNameChange} data-testid={"task-form-task-name"} />
                <Input placeholder="Description" name="description" value={task.description} onChange={handledescriptionChange} data-testid={"task-form-description"} />
                <Input placeholder="Status" name="task_status" value={task.task_status} onChange={handleStatusChange} data-testid={"task-form-task-status"} />

                <Button size="small" onClick={handleSave} startIcon={<SaveIcon />} data-testid={"task-form-save-button"}>Save</Button>

            </Box>
        </>
    )
}

export default TaskForm