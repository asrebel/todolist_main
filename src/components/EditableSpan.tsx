import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {

    let [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.title)

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        props.callBack(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        edit
            ? /*<input
                value={newTitle}
                onChange={onChangeHandler}
                onBlur={onDoubleClickHandler}
                autoFocus/>*/
            <TextField id="standard-basic"
                       label="Standard"
                       variant="standard"
                       value={newTitle}
                       onChange={onChangeHandler}
                       onBlur={onDoubleClickHandler}
                       size={'small'}
            />
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};

