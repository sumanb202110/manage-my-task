import { fireEvent, render, screen } from '@testing-library/react'
import Tasks from '../../pages/tasks/index'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { store } from '@/store'
import Task from '@/pages/tasks/[id]'
import TaskCard from '@/components/taskCard/taskCard'




describe('Tasks', () => {
    it('Rendering task list', async () => {

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ id: 1, task_name: "test1", task_status: "test status", description: "test description" }]),
            }),
        ) as jest.Mock;


        await act(async () => render(
            <Provider store={store}>
                <Tasks />
            </Provider>
        ));
        // render(<Tasks />)

        const taskCard = screen.getByTestId("task-list")
        const card = screen.getByTestId("card-1")

        expect(taskCard).toBeInTheDocument()
        expect(card).toBeInTheDocument()

    })

    it('Test new save', async () => {

        const handleSaveFunc = jest.fn();

        await act(async () => render(
            <Provider store={store}>
                <Tasks />
            </Provider>
        ));



        const taskForm = screen.getByTestId("task-form")
        const taskName = screen.getByTestId("task-form-task-name")
        const taskDescription = screen.getByTestId("task-form-description")
        const taskStatus = screen.getByTestId("task-form-task-status")

        const taskSaveButton = screen.getByTestId("task-form-save-button")



        fireEvent.change(taskName.querySelector('input') as HTMLInputElement, { target: { value: "new task" } })
        fireEvent.change(taskDescription.querySelector('input') as HTMLInputElement, { target: { value: "new task description" } })
        fireEvent.change(taskStatus.querySelector('input') as HTMLInputElement, { target: { value: "complete" } })


        fireEvent.change(taskSaveButton, { target: { onclick: handleSaveFunc } })


        await act(async () => {
            fireEvent.click(taskSaveButton);
        });

        const saveSuccessMsg = screen.getByTestId('task-form-success-msg')
        expect(saveSuccessMsg).toBeInTheDocument();



        expect(handleSaveFunc).toHaveBeenCalled();


    })

    




    it('change username', async () => {
        const handleEditFunc = jest.fn();


        await act(async () => render(
            <Provider store={store}>
                <Tasks />
            </Provider>
        ));

        const usernameHeading = screen.getByText('UserName : Test user')
        expect(usernameHeading).toBeInTheDocument()



        const usernameEditButton = screen.getByTestId('username-tag-edit-button')
        fireEvent.change(usernameEditButton, { target: { onclick: handleEditFunc } })

        fireEvent.click(usernameEditButton)


        expect(handleEditFunc).toHaveBeenCalled();

        const usernameInput = screen.getByTestId('username-tag-input')
        fireEvent.change(usernameInput.querySelector('input') as HTMLInputElement, { target: { value: "suman" } })

        const usernameSaveButton = screen.getByTestId('username-tag-save-button')
        fireEvent.click(usernameSaveButton)

        const usernameHeadingChanged = screen.getByText('UserName : suman')
        expect(usernameHeadingChanged).toBeInTheDocument()



    })

})