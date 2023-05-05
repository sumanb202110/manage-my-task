import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import { User } from "@/interfaces";
import AddUserFormStyles from './addUserForm.module.scss'
import { useDispatch } from "react-redux";
import { addUser } from "@/features/users/usersSlice";
import axios from "axios";

const AddUserForm = () => {
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const [name, setName] = useState<User['name']>("");
    const [email, setEmail] = useState<User['email']>("");
    const [contactNo, setContactNo] = useState<User['contact_no']>("");
    const [dob, setDob] = useState<Dayjs | null>(dayjs());

    const [errors, setErrors] = useState({
        name: {
            error: false,
            msg: ""
        },
        email: {
            error: false,
            msg: ""
        },
        contact_no: {
            error: false,
            msg: ""
        }
    });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        setName(newName);

        if (newName.trim() === "") {
            setErrors({ ...errors, name: { error: true, msg: "Please enter valid name" } })
        } else {
            setErrors({ ...errors, name: { error: false, msg: "" } })
        }
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;
        setEmail(newEmail);

        const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        if (!emailRegex.test(newEmail)) {
            setErrors({ ...errors, email: { error: true, msg: "Please enter valid email" } })
        } else {
            setErrors({ ...errors, email: { error: false, msg: "" } })
        }
    };

    const handleContactNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newContactNo = event.target.value;
        setContactNo(newContactNo);

        const contactNoRegex = new RegExp(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);

        if (!contactNoRegex.test(newContactNo)) {
            setErrors({ ...errors, contact_no: { error: true, msg: "Please enter valid contact no" } })
        } else {
            setErrors({ ...errors, contact_no: { error: false, msg: "" } })
        }
    };


    const handleSave = () => {
        axios.post('http://localhost:3000/api/users',
            {
                name: name!,
                email: email!,
                contact_no: contactNo!,
                dob: dob?.toDate()!
            }
        ).then((response)=>{
            dispatch(addUser(response.data))
        }).catch((error)=>{
            console.log(error);
        })
        // console.log(name, email, contactNo, dob);
        setOpen(false);

    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} data-testid={"add-user-button"}>
                Add User
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add user form</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '50ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                data-testid={"add-user-form-name-field"}
                                className={AddUserFormStyles.user_input}
                                id="name"
                                label="Name"
                                value={name}
                                type="text"
                                onChange={handleNameChange}
                                placeholder="Name"
                                error={errors.name.error}
                                helperText={errors.name.error ? errors.name.msg : ''}
                            />
                        </div>
                        <div>
                            <TextField
                                data-testid={"add-user-form-email-field"}
                                className={AddUserFormStyles.user_input}
                                id="email"
                                label="email"
                                placeholder="email"
                                type="email"
                                value={email}
                                error={errors.email.error}
                                helperText={errors.email.error ? errors.email.msg : ''}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div><TextField
                            data-testid={"add-user-form-contactno-field"}
                            id="contactno"
                            className={AddUserFormStyles.user_input}
                            label="Contact No"
                            placeholder="Contact No"
                            type="tel"
                            value={contactNo}
                            error={errors.contact_no.error}
                            helperText={errors.contact_no.error ? errors.contact_no.msg : ''}
                            onChange={handleContactNoChange}
                        />
                        </div>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    data-testid={"add-user-form-dob-field"}
                                    label="Date of birth"
                                    value={dob}
                                    onChange={(newDob) => setDob(newDob)}
                                    maxDate={dayjs()}
                                />
                            </LocalizationProvider>
                        </div>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} data-testid={"add-user-form-cancel-button"} >Cancel</Button>
                    <Button onClick={handleSave} data-testid={"add-user-form-add-button"}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddUserForm