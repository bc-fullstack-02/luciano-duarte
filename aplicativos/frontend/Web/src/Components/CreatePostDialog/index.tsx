import { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { FormEvent } from 'react'
import api from '../../services/api'
import { TextInput } from '../TextInput'
import Button from '../Button'
import Dropzone from '../Dropzone'
import { Post } from '../../Model/Post'

interface CreatePostDialogProps {
    postCreated: (post: Post) => void
}

interface PostFormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    description: HTMLInputElement;
}

interface PostFormElement extends HTMLFormElement {
    readonly elements: PostFormElements
}

function CreatePostDialog({ postCreated }: CreatePostDialogProps) {
    const token = localStorage.getItem('accessToken')
    const [selectedFile, setSelectedFile] = useState<File>()

    async function handleSubmit(event: FormEvent<PostFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        const newPost = {
            title: form.elements.title.value,
            description: form.elements.description.value
        }

        const data = new FormData()
        data.append("title", form.elements.title.value)
        data.append("description", form.elements.description.value)
        if (selectedFile) {
            data.append("file", selectedFile)
        }

        try {
            const response = await api.post('/posts', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            postCreated(response.data)
        } catch (err) {
            console.error(err)
            alert('Erro ao criar o Post')
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

            <Dialog.Content className='fixed bg-secondary py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25'>
                <Dialog.Title className='text-4xl font-black'>Novo Post</Dialog.Title>
                <form className='mt-8 flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="title" className='font-semibold'>
                            Título do Post
                        </label>
                        <TextInput.Input
                            id='title'
                            placeholder='Qual o título do Post?'
                        />
                        <label htmlFor="description" className='font-semibold'>
                            O que você está pensando?
                        </label>
                        <TextInput.Input
                            id='description'
                            placeholder='Diga o que está pensando...'
                        />
                        <Dropzone onFileUploaded={setSelectedFile} />
                    </div>
                    <footer className='mt-7 flex justify-end gap-4'>
                        <Dialog.Close type='button' className='px-5 h-12 border hover:bg-close hover:border-none rounded-xl focus:ring-2 ring-close text-md font-semibold'>
                            Fechar
                        </Dialog.Close>
                        <Button type='submit' className='flex-none w-48 h-12 font-semiboold'>Postar</Button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default CreatePostDialog