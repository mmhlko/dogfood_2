import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { createAppAsyncThunk } from 'storage/hookTypes';
import { TUserResponseDto } from 'types/api';
import { deleteToken, setToken } from 'utils/auth';
import { getActionName, isPendingAction, isRejectedAction } from 'utils/redux';
import { TLoginFormData, TRegisterFormData } from '../api/authService';
import { AxiosError } from 'axios';

// import api from '../../utils/api'; payloadCreator => extra: api

export type TUserState = {
    isAuthChecked: boolean,
    data: TUserResponseDto | null,

    fetchRegisterUserRequest: boolean,
    fetchRegisterUserError: SerializedError | null | unknown,

    fetchLoginUserRequest: boolean,
    fetchLoginUserError: SerializedError | null | unknown,

    fetchCheckTokenRequest: boolean,
    fetchCheckTokenError: SerializedError | null | unknown,

    fetchEditUserInfoRequest: boolean,
    fetchEditUserInfoError: SerializedError | null | unknown,

}

const initialState: TUserState = {
    isAuthChecked: false,
    data: null,

    fetchRegisterUserRequest: false,
    fetchRegisterUserError: null,

    fetchLoginUserRequest: false,
    fetchLoginUserError: null,

    fetchCheckTokenRequest: false,
    fetchCheckTokenError: null,

    fetchEditUserInfoRequest: false,
    fetchEditUserInfoError: null,

}

export const sliceName = 'user'

/* Пояснение:
    fetchProducts = {
    pending: () => {type: 'products/fetchProducts/pending', payload},
    fulfilled: () => {type: 'products/fetchProducts/fulfilled', payload},
    rejected: () => {type: 'products/fetchProducts/rejected', payload}

} */

export const fetchRegisterUser = createAppAsyncThunk<TUserResponseDto, TRegisterFormData>(  //вместо createAsyncThunk
    `${sliceName}/fetchRegisterUser`,
    async (dataUser, {fulfillWithValue,rejectWithValue, extra: { authApi }}) => {
        try {
            const data = (await authApi.register(dataUser)).data
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchLoginUser = createAppAsyncThunk<TUserResponseDto, TLoginFormData>( //вместо createAsyncThunk
    `${sliceName}/fetchLoginUser`,
    async (dataUser, { fulfillWithValue, rejectWithValue, extra: { authApi } }) => {
        try {
            const data = (await authApi.login(dataUser)).data
            if (data.token) {
                setToken(data.token)
                return fulfillWithValue(data.data) //action.payload = {products: [], total: 0}
            } else {
                return rejectWithValue(data)
            }
        } catch (error) {
            return rejectWithValue(error) //возвращается при ошибке
        }
    }
)

export const fetchCheckToken = createAppAsyncThunk<TUserResponseDto>(
    `${sliceName}/fetchCheckToken`,
    async (_, { fulfillWithValue, rejectWithValue, extra: { authApi }, dispatch }) => {
        try {
            const data = (await authApi.checkToken()).data;
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue((error as AxiosError).message)
        }
        finally { dispatch(authCheck()) }
    }
)

// export const fetchEditUserInfo = createAppAsyncThunk<TUserResponseDto, UserBodyDto>(
//     `${sliceName}/fetchEditUserInfo`,
//     async function payloadCreator(dataUser, { fulfillWithValue, rejectWithValue, extra: api }) {
//         try {
//             const data = await api.setUserInfo(dataUser);
//             if (data.name) {
//                 return fulfillWithValue(data)
//             } else {
//                 return rejectWithValue(data)
//             }

//         } catch (error) {
//             return rejectWithValue(error)
//         }

//     }
// )

const userSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        authCheck: (state) => {
            state.isAuthChecked = true;
        },
        logout: (state) => {
            state.data = null;
            deleteToken()
        }
    },
    extraReducers: (builder) => {
        builder //как в switch-case:

            //fetchRegisterUser
            .addCase(fetchRegisterUser.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload; //то что приходит по запросу продуктов, массив с товарами
                state.fetchRegisterUserRequest = false;
            })

            //fetchLoginUser
            .addCase(fetchLoginUser.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload; //то что приходит по запросу продуктов, массив с товарами
                state.fetchLoginUserRequest = false;
            })

            // //fetchCheckToken
            .addCase(fetchCheckToken.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
                state.data = action.payload; //то что приходит по запросу продуктов, массив с товарами
                state.fetchCheckTokenRequest = false;
            })

            // //fetchEditUserInfo
            // .addCase(fetchEditUserInfo.fulfilled, (state, action) => { //payload экшена формируется в payload-creator асинхр функции, а сам экшен в функции fetchProducts
            //     state.data = action.payload; //то что приходит по запросу продуктов, массив с товарами
            //     state.fetchCheckTokenRequest = false;
            // })


            //add matcher шаблон для редьюсеров, принимает на вход 1. ф-я => boolean, 2. сама функция меняющая стор
            .addMatcher(isPendingAction, (state, action) => {
                //state[`${getActionName(action.type)}Request`]: true //так было бы без TS, TS ругается, тк в виде строки может придти что угодно, и может такого поля не быть
                //обход TS
                state = { ...state, [`${getActionName(action.type)}Request`]: true }
                state = { ...state, [`${getActionName(action.type)}Error`]: null } //так было бы без TS, TS ругается, тк в виде строки может придти что угодно, и может такого поля не быть

            })
            .addMatcher(isRejectedAction, (state, action) => {
                //state[`${getActionName(action.type)}Request`]: true //так было бы без TS, TS ругается, тк в виде строки может придти что угодно, и может такого поля не быть
                //обход TS
                state = { ...state, [`${getActionName(action.type)}Request`]: false }
                console.log('errrrr', action.payload)
                state = { ...state, [`${getActionName(action.type)}Error`]: action.payload } //так было бы без TS, TS ругается, тк в виде строки может придти что угодно, и может такого поля не быть
                console.log("state", state);
                
            })

    }
})

export const { authCheck, logout } = userSlice.actions; //экспорт в тот же файл, в finally {dispatch(authCheck())}
export const userReducer = userSlice.reducer;



