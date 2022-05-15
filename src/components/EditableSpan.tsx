import React, {ChangeEvent, useState} from 'react';

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
            ? <input
                value={newTitle}
                onChange={onChangeHandler}
                onBlur={onDoubleClickHandler}
                autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};

