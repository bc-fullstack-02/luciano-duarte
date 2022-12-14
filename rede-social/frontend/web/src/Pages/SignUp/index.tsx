import { AuthForm } from "../../Components/AuthForm";

export function SingUp() {
    function handleRegister(user: string, password: string){

    }

    return (
        <AuthForm
            formTitle="Faça seu Cadastro para Entrar!"
            submitFormButtonText="Cadastrar"
            submitFormButtonAction={handleRegister}
            linkDescription="Já Tem Uma Conta? Entre Agora!"
            routeName="/"/>
    );
};