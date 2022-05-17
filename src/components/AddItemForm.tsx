import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";


export type FullInputPropsType = {
    callBack: (newTitle: string) => void
}

export const AddItemForm: React.FC<FullInputPropsType> = (props) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<boolean>(false)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.charCode === 13) {
            addTask()
        }
    }

    const addTask = () => {
        let newTitle = title.trim()
        if (newTitle !== "") {
            props.callBack(newTitle)
            setTitle("")
        } else {
            setError(true)
        }

    }

    return (
        <div>
            {/*<input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />*/}
            <TextField id="standard-basic"
                       label={!error ? "Enter text" : "Title is required!"}
                       variant="standard"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       size={'small'}
                       error={error}
            />
            <Button
                variant="contained"
                onClick={addTask}
                style={{
                    maxWidth: '36px',
                    maxHeight: '36px',
                    minWidth: '36px',
                    minHeight: '36px',
                    backgroundColor: '#f57c00'
                }}>+
            </Button>
{/*
           {error && <div className="error-message">"Title is required!"</div>}
*/}
        </div>
    )
}
