import UsersTable from "@/components/usersTable/usersTable"
import { store } from "@/store"
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import { Provider } from "react-redux"
import axiosMocks from "@/__mocks__/axios"


describe('usersTable', () => {
    afterEach(cleanup)
    it('render usersTable', async() => {
        const mockUser = { name: "suman", email: "s@error.com", contact_no: "9999999999", dob: "23-09-2002" };
        axiosMocks.get.mockResolvedValue({ data: [mockUser] })
        

        await act(async () => {
            render(
                    <Provider store={store}>
                        <UsersTable />
                    </Provider>
                )
        });
        
        const usersTableElement = screen.getByTestId('users_table')
        const usersTableDeleteButton = screen.getByTestId(`users-table-delete-button-${mockUser.email}`)

        expect(usersTableElement).toBeInTheDocument();
        expect(usersTableDeleteButton).toBeInTheDocument();

        axiosMocks.delete.mockResolvedValue({ data:{} })


        await act(async () => {
            fireEvent.click(usersTableDeleteButton);
        });

        expect(usersTableDeleteButton).not.toBeInTheDocument()
        
    })

    it('no data', async() => {
        axiosMocks.get.mockRejectedValueOnce({ data: {}})
        

        await act(async () => {
            render(
                    <Provider store={store}>
                        <UsersTable />
                    </Provider>
                )
        });
    })

    it('usersTable delete faild', async() => {
        const mockUser = { name: "suman", email: "s@error.com", contact_no: "9999999999", dob: "23-09-2002" };
        axiosMocks.get.mockResolvedValue({ data: [mockUser] })
        

        await act(async () => {
            render(
                    <Provider store={store}>
                        <UsersTable />
                    </Provider>
                )
        });
        
        const usersTableElement = screen.getByTestId('users_table')
        const usersTableDeleteButton = screen.getByTestId(`users-table-delete-button-${mockUser.email}`)

        expect(usersTableElement).toBeInTheDocument();
        expect(usersTableDeleteButton).toBeInTheDocument();

        axiosMocks.delete.mockRejectedValueOnce({ data:{} })


        await act(async () => {
            fireEvent.click(usersTableDeleteButton);
        });

        
    })
})