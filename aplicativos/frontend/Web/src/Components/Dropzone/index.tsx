import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Image } from 'phosphor-react'
import Text from '../Text'

interface DropzoneProps {
    onFileUploaded: (file: File) => void
}

function Dropzone({ onFileUploaded }: DropzoneProps) {
    const [selectedFileUrl, setSelectedFileUrl] = useState("")

    const onDrop = useCallback(
        (acceptedFiles: any[]) => {
            const file = acceptedFiles[0]
            const fileUrl = URL.createObjectURL(file)
            setSelectedFileUrl(fileUrl)
            onFileUploaded(file)
        }, [onFileUploaded])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div className='flex flex-col mt-4'{...getRootProps()}>
            <input {...getInputProps()} />

            {selectedFileUrl ? (
                <img src={selectedFileUrl} className="max-h-96" alt="Foto" />
            ) : (
                <p className='flex items-center gap-2'>
                    <Image size={40} weight="thin" />
                    <Text>Clique aqui para selecionar uma imagem ou arraste!</Text>
                </p>
            )}
        </div>
    )
}

export default Dropzone