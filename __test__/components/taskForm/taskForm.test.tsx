import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TaskForm from '@/components/taskForm/taskForm'
import { act } from 'react-dom/test-utils'




describe('TaskForm', () => {
    it('render form', async () => {


        render(<TaskForm
            task={
                { id: 1, task_name: "test1", task_status: "test status", description: "test description" }
            }
            isEdit={true}
            setTask={()=>{}}
            setIsEdit={()=>{}}
        />)

        const taskForm = screen.getByTestId("task-form")
        const taskId = screen.getByTestId("task-form-id")
        const taskName = screen.getByTestId("task-form-task-name")
        const taskDescription = screen.getByTestId("task-form-description")
        const taskStatus = screen.getByTestId("task-form-task-status")


        expect(taskId).toBeInTheDocument();
        expect(taskName).toBeInTheDocument();
        expect(taskDescription).toBeInTheDocument();
        expect(taskStatus).toBeInTheDocument();

        expect(taskForm).toBeInTheDocument()

    })

    it('Test new save', async () => {

        const handleSaveFunc = jest.fn();

        render(<TaskForm
            task={
                { task_name: "", task_status: "", description: "" }
            }
            isEdit={false}
            setTask={()=>{}}
            setIsEdit={()=>{}}
        />)

        const taskForm = screen.getByTestId("task-form")
        const taskName = screen.getByTestId("task-form-task-name")
        const taskDescription = screen.getByTestId("task-form-description")
        const taskStatus = screen.getByTestId("task-form-task-status")

        const taskSaveButton = screen.getByTestId("task-form-save-button")



        fireEvent.change(taskName.querySelector('input') as HTMLInputElement, {target: {value: "new task 11"}})
        fireEvent.change(taskDescription.querySelector('input') as HTMLInputElement, {target: {value: "new task description"}})
        fireEvent.change(taskStatus.querySelector('input') as HTMLInputElement, {target: {value: "complete"}})


        fireEvent.change(taskSaveButton, {target: {onclick: handleSaveFunc}})



        await act(async () => {
            fireEvent.click(taskSaveButton);
        });

        expect(handleSaveFunc).toHaveBeenCalled();


    })

    it('Test edit save', async () => {

        const handleSaveFunc = jest.fn();

        render(<TaskForm
            task={
                { id: 1, task_name: "test1", task_status: "test status", description: "test description" }
            }
            isEdit={true}
            setTask={()=>{}}
            setIsEdit={()=>{}}
        />)

        const taskForm = screen.getByTestId("task-form")
        const taskId = screen.getByTestId("task-form-id")
        const taskName = screen.getByTestId("task-form-task-name")
        const taskDescription = screen.getByTestId("task-form-description")
        const taskStatus = screen.getByTestId("task-form-task-status")

        const taskSaveButton = screen.getByTestId("task-form-save-button")



        fireEvent.change(taskId.querySelector('input') as HTMLInputElement, {target: {value: 1}})
        fireEvent.change(taskName.querySelector('input') as HTMLInputElement, {target: {value: "new task"}})


        fireEvent.change(taskSaveButton, {target: {onclick: handleSaveFunc}})


        await act(async () => {
            fireEvent.click(taskSaveButton);
        });

        expect(handleSaveFunc).toHaveBeenCalled();


    })


})