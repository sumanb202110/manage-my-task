import { act, fireEvent, render, screen } from '@testing-library/react'
import Task, { getStaticPaths, getStaticProps } from "@/pages/tasks/[id]";
import '@testing-library/jest-dom'
import { store } from "@/store";
import { Provider } from "react-redux";
import { GetServerSidePropsContext } from 'next';
import { NextRequest, NextResponse } from 'next/server';



describe('Tasks', () => {
    it('Task edit', async () => {
        const handleSaveFunc = jest.fn();


        await act(async () => render(
            <Provider store={store}>
                <Task task={{ id: 1, task_name: "test1", task_status: "test status", description: "test description" }} />
            </Provider>
        ));

        

        const taskEditButton = screen.getByTestId("task-form-edit-button")

        await act(async () => {
            fireEvent.click(taskEditButton);
        });


        const taskForm = screen.getByTestId("task-form")
        const taskName = screen.getByTestId("task-form-task-name")
        const taskDescription = screen.getByTestId("task-form-description")
        const taskStatus = screen.getByTestId("task-form-task-status")

        const taskSaveButton = screen.getByTestId("task-form-save-button")



        fireEvent.change(taskName.querySelector('input') as HTMLInputElement, { target: { value: "new task" } })
        fireEvent.change(taskDescription.querySelector('input') as HTMLInputElement, { target: { value: "new task description" } })
        fireEvent.change(taskStatus.querySelector('input') as HTMLInputElement, { target: { value: "complete" } })


        fireEvent.change(taskSaveButton, { target: { onclick: handleSaveFunc } })

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ id: 1, task_name: "test122", task_status: "test status", description: "test description" }]),
            }),
        ) as jest.Mock;

        await act(async () => {
            fireEvent.click(taskSaveButton);
        });


        expect(handleSaveFunc).toHaveBeenCalled();


    })

    it('test get static props', async () => {

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ id: 1, task_name: "test1", task_status: "test status", description: "test description" }]),
            }),
        ) as jest.Mock;

        const getStaticPathsFunc = await getStaticPaths();
        expect(getStaticPathsFunc.paths.length).toBeGreaterThan(0);

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ id: 1, task_name: "test1", task_status: "test status", description: "test description" }),
            }),
        ) as jest.Mock;


        const getStaticPropsFunc = await getStaticProps({ id: '1' } as any);
        expect(getStaticPropsFunc.props.task.id).toEqual(1);


    })

    it('test get static props with no props', async () => {

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ id: 1, task_name: "test1", task_status: "test status", description: "test description" }]),
            }),
        ) as jest.Mock;

        const getStaticPathsFunc = await getStaticPaths();
        expect(getStaticPathsFunc.paths.length).toBeGreaterThan(0);

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
            }),
        ) as jest.Mock;


        const getStaticPropsFunc = await getStaticProps({} as any);
        expect(getStaticPropsFunc.props.task.id).toEqual(undefined);

        const getStaticPropsFunc1 = await getStaticProps({id: undefined} as any);
        expect(getStaticPropsFunc.props.task.id).toEqual(undefined)


    })
})