import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {FullInput} from "./components/FullInput";
import {EditableSpan} from "./components/EditableSpan";

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
    editTodolistTitle: (todolistId: string, newTitle: string) => void
    editTaskTitle: (todolistID: string,taskId: string, newTitle: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

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

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todolistId, newTitle)
    }

    const editTodolistTitleHandler = (newTitle: string) => {
        props.editTodolistTitle(props.todolistId, newTitle)
    }

    const editTaskTitleHandler = (tID: string, newTitle: string) => {
        props.editTaskTitle(props.todolistId, tID, newTitle)
    }


    return (
        <div>
            <h3>
                <EditableSpan
                    title={props.title}
                    callBack={editTodolistTitleHandler}/>

                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <FullInput callBack={addTaskHandler}/>
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
                            <EditableSpan
                                title={t.title}
                                callBack={(newTitle: string ) => editTaskTitleHandler(t.id, newTitle)}/>
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