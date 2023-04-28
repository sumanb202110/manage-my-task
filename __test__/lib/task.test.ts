import { createTask, deleteTask, getTask, getTasks, updateTask } from "@/lib/task"




describe('Tasks', () => {
   
    it('test task crud', async () => {

        const tasks = await getTasks();

        expect(tasks.length).toBeGreaterThan(0)

        const task = await getTask(1);

        expect(task.id).toEqual(1)



       

        const newTask = {
            id: 11111,
            task_name: "new task",
            description: "task description",
            task_status: "task status"
        }

       
        const createdTask = await createTask(newTask);

        expect(createdTask.id).toEqual(newTask.id)

        const newTask1 = {
            id: 11111,
            task_name: "updated task",
            description: "task description",
            task_status: "task status"
        }

        const updatedTask = await updateTask(newTask1);

        expect(updatedTask.task_name).toEqual(newTask1.task_name)


        const deletedTask = await deleteTask(newTask);

        expect(createdTask.id).toEqual(newTask.id);



    })
})
