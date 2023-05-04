import { fetchUsers } from "@/features/users/usersSlice";
import { User } from "@/interfaces";
import { AppDispatch, RootState } from "@/store";
import { Button, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "@/features/users/usersSlice";


const UsersTable = () => {
    const users = useSelector((state: RootState) => state.users)
    const dispatch = useDispatch<AppDispatch>();

    console.log(users)
    useEffect(() => {
        dispatch(fetchUsers())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDelete = (user: User) => {
        axios.delete(`http://localhost:3000/api/users/${user.email}`
        ).then(() => {
            dispatch(deleteUser(user))
            console.log("Successfully deleted")
        }).catch((error) => {
            console.log(error);
        })
        // console.log(name, email, contactNo, dob);
    };


    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item>
                <h1>Users table</h1>
            </Grid>
            {
                users.loading ?
                    <CircularProgress />
                    :
                    <Grid item>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" data-testid={"users_table"}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">email</TableCell>
                                        <TableCell align="right">Contact No</TableCell>
                                        <TableCell align="right">DOB</TableCell>
                                        <TableCell align="right">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.data.map((user) => (
                                        <TableRow
                                            key={user.email as string}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            data-testid={"users_table_data_row"}
                                        >
                                            <TableCell component="th" scope="row">
                                                {user.name}
                                            </TableCell>
                                            <TableCell align="right">{user.email}</TableCell>
                                            <TableCell align="right">{user.contact_no}</TableCell>
                                            <TableCell align="right">{new Date(user.dob).toLocaleDateString()}</TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => { handleDelete(user) }}
                                                    data-testid={`users-table-delete-button-${user.email}`}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
            }

        </Grid>

    )
}

export default UsersTable;