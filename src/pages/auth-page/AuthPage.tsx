import { TLoginFormData, authApi } from "modules/auth-form/api/authService";
import LoginForm from "modules/auth-form/components/login-form/LoginForm";
import { fetchLoginUser } from "modules/auth-form/store/userSlice";
import { SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "storage/hookTypes";

export const AuthPage = () => {

    const location = useLocation();
    const dispatch = useAppDispatch();

    const cbSubmitFormLogin: SubmitHandler<TLoginFormData> = (formData) => {
        dispatch(fetchLoginUser(formData))
    }

    return (
        <>
            <LoginForm onSubmit={cbSubmitFormLogin} onNavigate={() => console.log("onNavigate")} />
        </>
    );
};