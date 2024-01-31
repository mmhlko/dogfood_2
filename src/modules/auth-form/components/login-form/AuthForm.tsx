
import { SubmitHandler, useForm } from 'react-hook-form';
import s from './styles.module.scss'
import classNames from 'classnames';
import Form from 'components/form/Form';
import { FormInput } from 'components/form-input/FormInput';
import FormButton from '../form-button';
import { RoutePath } from 'pages/routeConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'storage/hookTypes';
import { TLoginFormData, TRegisterFormData } from 'modules/auth-form/api/authApi';
import { fetchLoginUser, fetchRegisterUser } from 'storage/user/userSlice';
import { authText } from 'modules/auth-form/constants/constants';

interface ILoginFormProps {
    isRegister?: boolean
    isModal?: boolean
    //onNavigateReset: (to:string) => void;
}


export const AuthForm = ({ isRegister, isModal }: ILoginFormProps) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'onBlur' });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const initialPath = location.state?.initialPath;    

    const cbSubmitFormLogin: SubmitHandler<TLoginFormData> = (formData) => {
        console.log("cbSubmitFormLogin");        
        dispatch(fetchLoginUser(formData))
    }
    const cbSubmitFormRegister: SubmitHandler<TRegisterFormData> = (formData) => {
        console.log("cbSubmitFormRegister"); 
        dispatch(fetchRegisterUser(formData))
    }
    const onNavigate = (to: string) => {
        isModal
            ? navigate(to)
            : navigate(to, { replace: true, state: { backgroundLocation: { ...location, state: null }, initialPath } })       
    }

    const onSubmit = isRegister ? cbSubmitFormRegister : cbSubmitFormLogin

    const emailRegister = register('email', {
        required: {
            value: true,
            message: "Обязательное поле"
        },
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Email не соотвествует формату электронной почты"
        }
    })

    const passwordRegister = register('password', {
        required: {
            value: true,
            message: "Обязательное поле"
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру"
        }
    })
    const groupRegister = isRegister && register('group', {
        required: {
            value: true,
            message: "Обязательное поле"
        },
        pattern: {
            value: /^group-[0-9]{1,3}$/,
            message: "Номер группы в формате group-номер"
        }
    })

    const getFormButtonInfo = (isRegister: boolean) => {
        return {
            primary: isRegister ? authText.toRegister : authText.toLogin,
            secondary: isRegister ? authText.toLogin : authText.toRegister,
        }
    }

    const handleFormNavigateClick = () => {
        reset()
        onNavigate(isRegister ? RoutePath.login : RoutePath.register)
    }

    return (
        <Form title={isRegister ? authText.register : authText.login } handleForm={handleSubmit(onSubmit)}>
            <FormInput
                {...emailRegister}
                id='email'
                type='text'
                placeholder='email'
                autoComplete="none"
                validationError={errors?.email?.message as string}
            />
            {isRegister &&
                <FormInput
                    {...groupRegister}
                    id='group'
                    type='text'
                    placeholder='Номер группы (group-11)'
                    validationError={errors?.group?.message as string}
                />}
            <FormInput
                {...passwordRegister}
                id='password'
                type='password'
                placeholder='Пароль'
                validationError={errors?.password?.message as string}
            />
            <p onClick={() => onNavigate('/reset-password')} className={classNames('infoText', s.link)}>Восстановить пароль</p>
            <FormButton type='submit' color='primary' extraClass={s.formButton}>{getFormButtonInfo(isRegister).primary}</FormButton>
            <FormButton onClick={handleFormNavigateClick} type='button' color='secondary' extraClass={s.formButton}>{getFormButtonInfo(isRegister).secondary}</FormButton>
        </Form>

    );
}