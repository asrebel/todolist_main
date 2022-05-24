import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionTypes = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistTitleActionType = {
    id: string
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
}

export type ChangeTodolistFilterActionType = {
    id: string
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionTypes): Array<TodolistType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(),
                title: action.title,
                filter: 'all'
            }]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter : action.filter} : tl)

        }

        default:
            throw new Error('I don`t understand this action type!')
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: "REMOVE-TODOLIST",id: todolistId} as const
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: "ADD-TODOLIST",title: title} as const
}

export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", title: title, id: todolistId} as const
}

export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType ): ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER",filter: filter, id: todolistId} as const
}