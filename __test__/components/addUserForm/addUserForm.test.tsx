import AddUserForm from "@/components/addUserForm/addUserForm"
import { store } from "@/store"
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import '@testing-library/jest-dom'
import axiosMocks from "@/__mocks__/axios"

describe('addUser', () => {
    afterEach(cleanup)
    it('render add user', async () => {
        const mockUser = { name: "suman", email: "s@error.com", contact_no: "9999999999", dob: "23/09/2002" };
        
        await act(async () => {
            render(
                <Provider store={store}>
                    <AddUserForm />
                </Provider>
            )

        })

        const addUserButton = screen.getByTestId('add-user-button')

        await act(async () => {
            fireEvent.click(addUserButton);
        });


        const addUserFormNameField = screen.getByTestId('add-user-form-name-field')
        const addUserFormEmailField = screen.getByTestId('add-user-form-email-field')
        const addUserFormContactnoField = screen.getByTestId('add-user-form-contactno-field')
        const addUserFormDobField = screen.getByLabelText('Date of birth')
        const addUserFormCancelButton = screen.getByTestId('add-user-form-cancel-button')
        const addUserFormSaveButton = screen.getByTestId('add-user-form-add-button')


        expect(addUserButton).toBeInTheDocument();
        expect(addUserFormNameField).toBeInTheDocument();
        expect(addUserFormEmailField).toBeInTheDocument();
        expect(addUserFormContactnoField).toBeInTheDocument();
        expect(addUserFormDobField).toBeInTheDocument();
        expect(addUserFormCancelButton).toBeInTheDocument();
        expect(addUserFormSaveButton).toBeInTheDocument();

        fireEvent.change(addUserFormNameField.querySelector('input') as HTMLInputElement , {target: {value: mockUser.name}})
        expect(addUserFormNameField.querySelector('input')?.value).toBe(mockUser.name)

        fireEvent.change(addUserFormEmailField.querySelector('input') as HTMLInputElement , {target: {value: mockUser.email}})
        expect(addUserFormEmailField.querySelector('input')?.value).toBe(mockUser.email)

        fireEvent.change(addUserFormContactnoField.querySelector('input') as HTMLInputElement , {target: {value: mockUser.contact_no}})
        expect(addUserFormContactnoField.querySelector('input')?.value).toBe(mockUser.contact_no)

        // fireEvent.change(addUserFormDobField as HTMLInputElement , {target: {value: mockUser.dob}})
        // expect((addUserFormDobField as HTMLInputElement ).value).toBe(mockUser.dob)

        axiosMocks.post.mockResolvedValue({ data: mockUser })

        await act(async () => {
            fireEvent.click(addUserFormSaveButton);
        });


    })


    it('render add user failed', async () => {
        const mockUser = { name: "suman", email: "s@error.com", contact_no: "9999999999", dob: "23-09-2002" };
        
        await act(async () => {
            render(
                <Provider store={store}>
                    <AddUserForm />
                </Provider>
            )

        })

        const addUserButton = screen.getByTestId('add-user-button')

        await act(async () => {
            fireEvent.click(addUserButton);
        });


        const addUserFormNameField = screen.getByTestId('add-user-form-name-field')
        const addUserFormEmailField = screen.getByTestId('add-user-form-email-field')
        const addUserFormContactnoField = screen.getByTestId('add-user-form-contactno-field')
        // const addUserFormDobField = screen.getByTestId('add-user-form-dob-field')
        const addUserFormCancelButton = screen.getByTestId('add-user-form-cancel-button')
        const addUserFormSaveButton = screen.getByTestId('add-user-form-add-button')


        expect(addUserButton).toBeInTheDocument();
        expect(addUserFormNameField).toBeInTheDocument();
        expect(addUserFormEmailField).toBeInTheDocument();
        expect(addUserFormContactnoField).toBeInTheDocument();
        // expect(addUserFormDobField).toBeInTheDocument();
        expect(addUserFormCancelButton).toBeInTheDocument();
        expect(addUserFormSaveButton).toBeInTheDocument();

        fireEvent.change(addUserFormNameField.querySelector('input') as HTMLInputElement , {target: {value: mockUser.name}})
        expect(addUserFormNameField.querySelector('input')?.value).toBe(mockUser.name)

        fireEvent.change(addUserFormEmailField.querySelector('input') as HTMLInputElement , {target: {value: mockUser.email}})
        expect(addUserFormEmailField.querySelector('input')?.value).toBe(mockUser.email)

        fireEvent.change(addUserFormContactnoField.querySelector('input') as HTMLInputElement , {target: {value: mockUser.contact_no}})
        expect(addUserFormContactnoField.querySelector('input')?.value).toBe(mockUser.contact_no)

        axiosMocks.post.mockRejectedValueOnce({ data: {}})

        await act(async () => {
            fireEvent.click(addUserFormSaveButton);
        });


    })

    it('render add user failed', async () => {
        const mockUser = { name: " ", email: "ror.com", contact_no: "9999999", dob: "23-09-2002" };
        
        await act(async () => {
            render(
                <Provider store={store}>
                    <AddUserForm />
                </Provider>
            )

        })

        const addUserButton = screen.getByTestId('add-user-button')

        await act(async () => {
            fireEvent.click(addUserButton);
        });


        const addUserFormNameField = screen.getByTestId('add-user-form-name-field')
        const addUserFormEmailField = screen.getByTestId('add-user-form-email-field')
        const addUserFormContactnoField = screen.getByTestId('add-user-form-contactno-field')
        // const addUserFormDobField = screen.getByTestId('add-user-form-dob-field')
        const addUserFormCancelButton = screen.getByTestId('add-user-form-cancel-button')
        const addUserFormSaveButton = screen.getByTestId('add-user-form-add-button')


        expect(addUserButton).toBeInTheDocument();
        expect(addUserFormNameField).toBeInTheDocument();
        expect(addUserFormEmailField).toBeInTheDocument();
        expect(addUserFormContactnoField).toBeInTheDocument();
        // expect(addUserFormDobField).toBeInTheDocument();
        expect(addUserFormCancelButton).toBeInTheDocument();
        expect(addUserFormSaveButton).toBeInTheDocument();

        fireEvent.change(addUserFormNameField.querySelector('input') as HTMLInputElement , {target: {value: mockUser.name}})
        expect(addUserFormNameField.querySelector('input')?.value).toBe(mockUser.name)

        fireEvent.change(addUserFormEmailField.querySelector('input') as HTMLInputElement , {target: {value: mockUser.email}})
        expect(addUserFormEmailField.querySelector('input')?.value).toBe(mockUser.email)

        fireEvent.change(addUserFormContactnoField.querySelector('input') as HTMLInputElement , {target: {value: mockUser.contact_no}})
        expect(addUserFormContactnoField.querySelector('input')?.value).toBe(mockUser.contact_no)

        await act(async () => {
            fireEvent.click(addUserFormCancelButton);
        });
    })
})