import { AuthForm } from "modules/auth-form/components/login-form/AuthForm";

type TAuthPageProps = {
    isRegister?: boolean
}

const AuthPage = ({ isRegister }: TAuthPageProps) => {

    return (
        <AuthForm isRegister={isRegister} />
    );
};

export default AuthPage