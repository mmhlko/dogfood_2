import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'storage/hookTypes';
import { deleteToken, setToken } from 'utils/auth';
import { getActionName } from 'utils/redux';
import { TLoginFormData, TRegisterFormData } from 'modules/auth-form/api/authApi';
import { AxiosError } from 'axios';
import { TUserBaseInfo, TUserPassword, TUserResponseDto } from 'types/userApi';
import { TStateError } from 'storage/reduxTypes';
import { setLocalData } from 'utils/local-storage';

export type TUserState = {
    isAuthChecked: boolean,
    data: TUserResponseDto | null,
    isAuthorized: boolean,

    fetchRegisterUserRequest: boolean,
    fetchRegisterUserError: TStateError,

    fetchLoginUserRequest: boolean,
    fetchLoginUserError: TStateError,

    fetchCheckTokenRequest: boolean,
    fetchCheckTokenError: TStateError,

    fetchEditUserInfoRequest: boolean,
    fetchEditUserInfoError: TStateError,

    fetchPasswordResetRequest: boolean,
    fetchPasswordResetError: TStateError,

}

const initialState: TUserState = {
    isAuthChecked: false,
    data: null,
    isAuthorized: false,

    fetchRegisterUserRequest: false,
    fetchRegisterUserError: null,

    fetchLoginUserRequest: false,
    fetchLoginUserError: null,

    fetchCheckTokenRequest: false,
    fetchCheckTokenError: null,

    fetchEditUserInfoRequest: false,
    fetchEditUserInfoError: null,

    fetchPasswordResetRequest: false,
    fetchPasswordResetError: null,
}

export const sliceName = 'user'

export const fetchRegisterUser = createAppAsyncThunk<TUserResponseDto, TRegisterFormData>(  //вместо createAsyncThunk
    `${sliceName}/fetchRegisterUser`,
    async (dataUser, { fulfillWithValue, rejectWithValue, extra: { authApi } }) => {
        try {
            const data = (await authApi.register(dataUser)).data
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchPasswordReset = createAppAsyncThunk<TUserResponseDto, TUserPassword>(
    `${sliceName}/fetchPasswordReset`,
    async (userPassword, { fulfillWithValue, rejectWithValue, extra: { authApi } }) => {
        try {
            const data = (await authApi.passwordReset(userPassword)).data
            if (data.token) {
                setToken(data.token)
                return fulfillWithValue(data.data)
            } else {
                return rejectWithValue(data)
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchLoginUser = createAppAsyncThunk<TUserResponseDto, TLoginFormData>(
    `${sliceName}/fetchLoginUser`,
    async (dataUser, { fulfillWithValue, rejectWithValue, extra: { authApi }, dispatch }) => {
        try {
            const data = (await authApi.login(dataUser)).data
            if (data.token) {
                setToken(data.token)
                setLocalData("token", data.token)
                dispatch(authorize())
                return fulfillWithValue(data.data)
            } else {
                return rejectWithValue(data)
            }
        } catch (error) {
            return rejectWithValue(error)
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

export const fetchEditUserInfo = createAppAsyncThunk<TUserResponseDto, TUserBaseInfo>(
    `${sliceName}/fetchEditUserInfo`,
    async function payloadCreator(dataUser, { fulfillWithValue, rejectWithValue, extra: { profileApi } }) {
        try {
            const data = (await profileApi.setUserBaseInfo({ name: dataUser.name, about: dataUser.about })).data;
            const avatar = (await profileApi.setUserAvatar(dataUser.avatar)).data.avatar;
            if (data.name) {
                return fulfillWithValue({ ...data, avatar: avatar })
            } else {
                return rejectWithValue(data)
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const userSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        authCheck: (state) => {
            state.isAuthChecked = true;
        },
        logout: (state) => {
            state.data = null;
            state.isAuthorized = false
            setLocalData("token", null)
            deleteToken()
        },
        authorize: (state) => {
            state.isAuthorized = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isPending(fetchPasswordReset, fetchCheckToken, fetchEditUserInfo, fetchRegisterUser, fetchLoginUser),
                (state, action) => {
                    return {
                        ...state,
                        [`${getActionName(action.type)}Request`]: true,
                        [`${getActionName(action.type)}Error`]: null
                    }
                })
            .addMatcher(
                isRejected(fetchPasswordReset, fetchCheckToken, fetchEditUserInfo, fetchRegisterUser, fetchLoginUser),
                (state, action) => {
                    return {
                        ...state,
                        [`${getActionName(action.type)}Request`]: false,
                        [`${getActionName(action.type)}Error`]: action.payload
                    }
                })
            .addMatcher(
                isFulfilled(fetchPasswordReset, fetchCheckToken, fetchEditUserInfo, fetchRegisterUser, fetchLoginUser),
                (state, action) => {
                    return {
                        ...state,
                        data: action.payload,
                        [`${getActionName(action.type)}Request`]: false
                    }
                })
    }
    // Работа со стейтом только либо через мутацию, либо через ...spread !!!
    // isPending(экшены из данного слайса, иначе добавляются имз других)
})

export const { authCheck, logout, authorize } = userSlice.actions;
export const userReducer = userSlice.reducer;