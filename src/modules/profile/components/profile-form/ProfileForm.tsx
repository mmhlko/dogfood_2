
import { SubmitHandler, useForm } from 'react-hook-form';
import s from './styles.module.scss'
import { useAppDispatch, useAppSelector } from 'storage/hookTypes';
import { ContentHeader } from 'components/content-header/ContentHeader';
import Form from 'components/form/Form';
import { FormInput } from 'components/form-input/FormInput';
import FormButton, { FormButtonSize } from 'modules/auth-form/components/form-button';
import { useMemo } from 'react';
import validator from 'validator';
import { fetchEditUserInfo, fetchPasswordReset } from 'storage/user/userSlice';
import { authApi } from 'modules/auth-form/api/authApi';
import { getToken } from 'utils/auth';

type FormValuesUserData = {
    email: string,
    name: string,
    about: string,
    avatar: string
}

type FormValuesUserPassword = {
    password: string,
}

function ProfileForm() {
    const passwordRequest = useAppSelector(state => state.user.fetchPasswordResetRequest)
    const {name, about, email, avatar} = useAppSelector(store => store.user.data) || {};
    const { register: registerUserInfo, handleSubmit: handleSubmitUserInfo, formState: { errors: errorsUserInfo } } = useForm<FormValuesUserData>(
        { 
            mode: 'onBlur', 
            defaultValues: useMemo(() => ({name, about, email, avatar}), 
            [{name, about, email, avatar}]) || {} 
        });
    //defaultValues: currentuser || {} предзаполнение полей из объекта, где такие же поля уже имеются, также он протипизирован дженериком useForm<FormValuesUserData>
    const { register: registerUserPassword, handleSubmit: handleSubmitUserPassword, formState: { errors: errorsUserPassword } } = useForm<FormValuesUserPassword>({ mode: 'onBlur' });
    const dispatch = useAppDispatch();
    /*     const navigate = useNavigate();
        const location = useLocation();
        const initialPath = location.state?.initialPath; */

    //Переход на страницу  авторизации



    const emailRegister = registerUserInfo('email', {
        required: {
            value: true,
            message: "Обязательное поле"
        },
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Email не соотвествует формату электронной почты"
        }
    })

    const nameRegister = registerUserInfo('name', {
        required: {
            value: true,
            message: "Обязательное поле"
        },

    })

    const aboutRegister = registerUserInfo('about', {
        // required: {
        //     value: true,
        //     message: "Обязательное поле"
        // },
        minLength: {
            value: 3,
            message: 'Минимальное поле 3 символа'
        },
        /*         pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email не соотвествует формату электронной почты"
                } */

    })

    const avatarRegister = registerUserInfo('avatar', {
        validate: (value) => validator.isURL(value)
    })

    const passwordRegister = registerUserPassword('password', {
        required: {
            value: true,
            message: 'Обязательное поле'
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру"
        }
    })

    const onSubmitUserInfo: SubmitHandler<FormValuesUserData> = (dataForm) => {
        console.log(dataForm);
        dispatch(fetchEditUserInfo(dataForm))
    }


    const onSubmitUserPassword: SubmitHandler<FormValuesUserPassword> = (dataForm) => {
        console.log(dataForm);        
        dispatch(fetchPasswordReset(dataForm))
    }


    return (
        <>  <ContentHeader title='Мои данные' textButton='назад' to='/profile'/>
            <Form handleForm={handleSubmitUserInfo(onSubmitUserInfo)} align='left'>
                <div className={s.formRow}>
                    <label className={s.formLabel}>
                        <FormInput
                            {...nameRegister}
                            id='name'
                            type='text'
                            placeholder='Имя'
                            label='Имя'
                        />
                        {errorsUserInfo?.name && <p className='errorMessage'>{errorsUserInfo.name.message}</p>}
                    </label>
                    <label className={s.formLabel}>
                        <FormInput
                            {...aboutRegister}
                            id='about'
                            type='text'
                            placeholder='Описание профессии'
                            label='Профессия'
                        />
                        {errorsUserInfo?.about && <p className='errorMessage'>{errorsUserInfo.about.message}</p>}

                    </label>
                </div>
                <div className={s.formRow}>
                    <label className={s.formLabel}>
                        <FormInput
                            {...emailRegister}
                            id='email'
                            type='text'
                            placeholder='email'
                            disabled
                            label='email'
                        />
                        {errorsUserInfo?.email && <p className='errorMessage'>{errorsUserInfo.email.message}</p>}

                    </label>
                    <label className={s.formLabel}>
                        <FormInput
                            {...avatarRegister}
                            id='avatar'
                            type='text'
                            placeholder='Ссылка на аватар'
                            label='Аватар'
                        />
                        {errorsUserInfo?.avatar && <p className='errorMessage'>{errorsUserInfo.avatar.message}</p>}

                    </label>
                </div>
                <FormButton type='submit' color='secondary'>Сохранить</FormButton>
            </Form>

            <Form title={'Изменить пароль'} handleForm={handleSubmitUserPassword(onSubmitUserPassword)} align='left'>
                <div className={s.formRowHalf}>
                    {passwordRequest && <h2>Загрузка...</h2>}
                    <label className={s.formLabel}>
                        <FormInput
                            {...passwordRegister}
                            id='password'
                            type='password'
                            placeholder='Пароль'
                        />
                        {errorsUserPassword?.password && <p className='errorMessage'>{errorsUserPassword?.password?.message}</p>}

                    </label>
                </div>
                <FormButton type='submit' color='secondary' size={FormButtonSize.minContent} >Сохранить</FormButton>
            </Form>
        </>

    );
}

export default ProfileForm;