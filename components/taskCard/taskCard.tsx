import { Button, Card, CardActions, CardContent, Icon, Typography } from "@mui/material"
import { Task } from "@prisma/client"
import LunchIcon from "@mui/icons-material/Launch"
import Link from "next/link"


type Props = {
    task : Task
}

const TaskCard = (props : Props) => {
    const task = props.task;

    return (
        <>
            <Card sx={{ minWidth: 275 }} variant="outlined" data-testid={`card-${task.id}`}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {task.id}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {task.task_name}
                    </Typography>
                    {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {task.description}
                    </Typography> */}
                    <Typography variant="body2">
                        {task.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link href={`/tasks/${task.id}`}>
                        <Button size="small" startIcon={<LunchIcon/>}>More</Button>
                    </Link>

                </CardActions>
            </Card>
        </>
    )
}

export default TaskCard