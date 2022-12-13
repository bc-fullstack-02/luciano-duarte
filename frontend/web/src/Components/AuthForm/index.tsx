// isso aki é a pagina de criar conta pra quem não tem 1 conta existente
// Q basicamente se copia a pagina de Login e muda umas paradas

// Importando components
import { Heading } from "../Heading";
import { Text } from "../Text";
import { TextInput } from "../Text_Input";
import { Button } from "../Button";

// Importanto log e icones
import Logo from "../../Assets/Logo.svg";
import { User, Lock } from "phosphor-react"

// Importando React Router e dando umas modificada, aula 6 min 41 até 44
import { Link } from "react-router-dom";
import { FormEvent } from "react";

// Criando uma interface para função AutoForm(), aula 6 minuto 22
interface AuthFormProps {
    formTitle: string;
    submitFormButtonText: string;
    submitFormButtonAction: (user: string, password: string) => void;
    linkDescription: string;
    routeName: string;
}

// De Login() se muda pra AutoForm(), e adicionar parametros
export function AuthForm({formTitle, submitFormButtonText, linkDescription, routeName, submitFormButtonAction}: AuthFormProps) {
// aula 6 min 1h e 20 até 1H e 25
    function handleSubimit(event: FormEvent) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        submitFormButtonAction(
            form.elements.user.value, 
            form.elements.password.value
            );
    };

    return (
        // Alinhar td mundo no centro
        <div className="text-cyan-50 flex flex-col items-center mt-20">
            <header className="flex flex-col items-center">

                {/* Importar o papagaio */}
                <img src={Logo} alt="Logo-Papagaio/Parrot" />

                {/* Texto inicial */}
                <Heading size="lg" className="mt-2">Sysmap Parrot</Heading>
                <Text className="mt-1 opacity-50"> {formTitle} </Text>

            </header>

            {/*Formulario: Login, Senha, e Button*/}
            {/* onsubimit aula 6 min 1H e 20 */}
            <form onSubmit={(e) => handleSubimit(e)} className="mt-10 flex-col gap-4 items-stretch w-full max-w-sm">
                 {/*Login*/}
                <label htmlFor="user" className="flex flex-col gap-2">
                    <Text>Login</Text>
                    <TextInput.Root>
                        {/* Icone */}
                        <TextInput.Icon>
                            <User/>
                        </TextInput.Icon>
                        {/* Input */}
                        <TextInput.Input id="user" type="text" placeholder="Digite seu Login"/>
                    </TextInput.Root>
                </label>

                {/*Senha*/}
                <label htmlFor="password" className="flex flex-col gap-2">
                    <Text>Senha</Text>
                    <TextInput.Root>
                        {/* Icone */}
                        <TextInput.Icon>
                            <Lock/>
                        </TextInput.Icon>
                        {/* Input */}
                        <TextInput.Input id="password" type="password" placeholder="Digite sua Senha"/>
                    </TextInput.Root>
                </label>

                {/*Button*/}
                <Button type="submit" className="mt-4"> {submitFormButtonText} </Button>
            </form>
            {/* 14:10 até 19:20 aula 6 */}
            <footer className="flex flex-col items-center gap-16 mt-8">
                <Text asChild size="sm">
                    <Link to={routeName} className="text-gray-400 underline hover:text-gray-200"> {linkDescription} </Link>
                </Text>
            </footer>
        </div>
    );
}