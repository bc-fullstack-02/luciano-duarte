import { AuthForm } from "../../Components/AuthForm";
import api from "../../Services/api";

// Explicação Aula 6 min 24 até 26:20
export function Login() {
// aula 6 min 1h e 11 até 1h e 16
    async function handleLogin(user:string, password: string) {
        const data = await api.post("/security/login", {
            user,
            password
        });
        console.log(data)
    }

    return (
        <AuthForm
            formTitle="Faça seu Login para Entrar!"
            submitFormButtonText="Entrar"
            submitFormButtonAction={handleLogin}
            linkDescription="Não Tem Uma Conta? Crie Uma Agora!"
            routeName="singup"
            />
    );
};