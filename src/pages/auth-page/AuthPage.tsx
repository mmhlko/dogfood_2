import { TLoginFormData, TRegisterFormData, authApi } from "modules/auth-form/api/authService";
import AuthForm from "modules/auth-form/components/login-form/LoginForm";
import { fetchLoginUser, fetchRegisterUser } from "modules/auth-form/store/userSlice";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "storage/hookTypes";

type TAuthPageProps = {
    isRegister?: boolean
}

export const AuthPage = ({ isRegister }: TAuthPageProps) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const cbSubmitFormLogin: SubmitHandler<TLoginFormData> = (formData) => {
        console.log("cbSubmitFormLogin");        
        dispatch(fetchLoginUser(formData))
    }
    const cbSubmitFormRegister: SubmitHandler<TRegisterFormData> = (formData) => {
        console.log("cbSubmitFormRegister"); 
        dispatch(fetchRegisterUser(formData))
    }
    const handleClickNavigate = (to: string) => {
        navigate(to)
    }

    return (
        <AuthForm onSubmit={isRegister ? cbSubmitFormRegister : cbSubmitFormLogin} onNavigate={handleClickNavigate} isRegister={isRegister} />
    );
};