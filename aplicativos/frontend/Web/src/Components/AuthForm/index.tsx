import { Link } from 'react-router-dom';
import Heading from '../../components/Heading'
import Text from '../../components/Text';
import logo from '../../assets/logo.svg';
import { TextInput } from '../../components/TextInput';
import { User } from 'phosphor-react';
import { Lock } from 'phosphor-react';
import Button from '../../components/Button';
import { FormEvent } from 'react';

interface AuthFormProps {
    formTitle: string;
    submitFormButtonText: string;
    submitFormButtonAction: (auth: Auth) => void;
    linkDescription: string;
    routeName: string;
    showNameInput?: boolean;
}

interface AuthFormElements extends HTMLFormControlsCollection {
    name?: HTMLInputElement;
    user: HTMLInputElement;
    password: HTMLInputElement;
}

interface AuthFormElement extends HTMLFormElement {
    readonly elements: AuthFormElements
}

export interface Auth {
    user: string;
    name?: string;
    password: string;
}

function AuthForm({
    formTitle,
    submitFormButtonText,
    submitFormButtonAction,
    linkDescription,
    routeName,
    showNameInput,
}: AuthFormProps) {
    function handleSubmit(event: FormEvent<AuthFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;

        const auth = {
            name: form.elements.name?.value,
            user: form.elements.user.value,
            password: form.elements.password.value

        }
        submitFormButtonAction(auth);
    }
    return (
        <div>
            <div className="text-white flex flex-col items-center mt-16">
                <header className='flex flex-col items-center'>
                    <img src={logo} alt="Logo" />

                    <Heading size="lg">Sysmap Parrot</Heading>

                    <Text className='mt-1 opacity-60'>{formTitle}</Text>
                </header>

                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-4 items-stretch w-full max-w-sm mt-10'>
                    {showNameInput && (
                        <label htmlFor="name" className='flex flex-col gap-3'>
                            <Text size='md'>Nome</Text>
                            <TextInput.Root>
                                <TextInput.Icon>
                                    <User />
                                </TextInput.Icon>
                                <TextInput.Input
                                    id='name'
                                    type='text'
                                    placeholder='Digite o seu nome de usuário'
                                />
                            </TextInput.Root>
                        </label>
                    )}

                    <label htmlFor="user" className='flex flex-col gap-3'>
                        <Text size='md'>Endereço de e-mail</Text>
                        <TextInput.Root>
                            <TextInput.Icon>
                                <User />
                            </TextInput.Icon>
                            <TextInput.Input
                                id='user'
                                type='text'
                                placeholder='Digite o seu email'
                            />
                        </TextInput.Root>
                    </label>
                    <label htmlFor="password" className='flex flex-col gap-3'>
                        <Text size='md'>Sua senha</Text>
                        <TextInput.Root>
                            <TextInput.Icon>
                                <Lock />
                            </TextInput.Icon>
                            <TextInput.Input
                                id='password'
                                type='password'
                                placeholder='*******'
                            />
                        </TextInput.Root>
                    </label>

                    <Button type='submit' className='mt-4'>{submitFormButtonText}</Button>
                </form>


                <footer className='flex flex-col items-center gap-4 mt-8'>
                    < Text asChild size='sm'>
                        < Link to={routeName} className='text-hoverBg2 underline hover:text-hoverBg1'
                        >
                            {linkDescription}
                        </ Link>
                    </Text>
                </footer>
            </div>
        </div >
    );
}

export default AuthForm;