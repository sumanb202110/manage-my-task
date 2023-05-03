import AddUserForm from "@/components/addUserForm/addUserForm";
import UsersTable from "@/components/usersTable/usersTable";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const Users = () => {

    return (
        <>
        <AddUserForm/>
        <UsersTable/>
        </>
    )
}

export default Users;