import { AsyncThunk } from "@reduxjs/toolkit"
import { UnknownAction } from "redux"

interface IActionType {
    type: string,
    payload: any
}
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>

//функция возвращает булевое значение, выполнять ли ей следующую за ней функцию экшенов
export function isPendingAction(action: UnknownAction): action is PendingAction {
    return typeof action.type === 'string' && action.type.endsWith('/pending')
}

export function isRejectedAction(action: UnknownAction): action is RejectedAction {
    return typeof action.type === 'string' && action.type.endsWith('/rejected')
}

//функция для возвращения названия экшена в виде строки user/fetchUserInfo/pending => fetchUserInfo
export function getActionName(actionType: string) { // [user, fetchUserInfo, pending]
    return actionType.split('/')[1]
}