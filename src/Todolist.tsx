import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(newTaskTitle, props.todolistId)
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(props.todolistId, newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError("Title is required!")
        }

    }
    const onAllClickHandler = () => {
        props.changeFilter(props.todolistId, "all",)

    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistId, "active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todolistId, "completed")
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }


    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {

                    const onClickHandler = () => {
                        props.removeTask(props.todolistId, t.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked)
                    }


                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeHandler}
                            />
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}