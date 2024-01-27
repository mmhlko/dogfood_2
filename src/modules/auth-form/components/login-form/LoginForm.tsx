
import { useForm } from 'react-hook-form';
import s from './styles.module.scss'
import classNames from 'classnames';
import { MouseEvent, useEffect } from 'react';
import Form from 'components/form/Form';
import { FormInput } from 'components/form-input/FormInput';
import FormButton from '../form-button';
import { useLocation } from 'react-router-dom';
import { RoutePath } from 'pages/routeConfig';

interface ILoginFormProps {
    onSubmit: (dataform: any) => void;
    onNavigate: (to: string) => void;
    isRegister?: boolean
    //onNavigateReset: (to:string) => void;
}


const AuthForm = ({ onSubmit, onNavigate, isRegister }: ILoginFormProps) => {

    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<any>({ mode: 'onBlur' });

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
            primary: isRegister ? "Зарегистрироваться" : "Войти",
            secondary: isRegister ? "Войти" : "Зарегистрироваться",
        }
    }

    const handleFormNavigateClick = () => {
        reset()
        onNavigate(isRegister ? RoutePath.login : RoutePath.register)
    }

    return (
        <Form title={isRegister ? "Регистрация" : "Вход"} handleForm={handleSubmit(onSubmit)}>
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

export default AuthForm;