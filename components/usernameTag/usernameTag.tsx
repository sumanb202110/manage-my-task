import { setUsername } from "@/features/username/usernameSlice";
import { Button, Input } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
    username : string
}

const UsernameTag = (props : Props) => {
    const [username, setUserName] = useState<string>(props.username);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const dispatch = useDispatch()

    const handleUserNameChaneg = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }

    const handleSave = () => {
        dispatch(setUsername(username))
        setIsEdit(false);
    }


    const handleEdit = () => {
        setIsEdit(true);
    }


    return (
        <>
            <div>
                {
                    isEdit ?
                        <>
                            <Input placeholder="username" data-testid = "username-tag-input" value={username} onChange={handleUserNameChaneg} />
                            <Button onClick={handleSave} data-testid = "username-tag-save-button">save</Button>
                        </>
                        :

                        <div>

                            <h2 data-testid = "username-tag-heading" >UserName : {username}</h2>
                            <Button onClick={handleEdit} data-testid = "username-tag-edit-button">edit</Button>
                        </div>

                }
            </div>
        </>
    )

}

export default UsernameTag