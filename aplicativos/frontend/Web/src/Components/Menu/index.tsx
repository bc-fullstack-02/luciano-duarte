import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { HouseLine, User, UsersThree, BellSimple } from "phosphor-react"
import { Link } from 'react-router-dom'

import MenuItem from "../MenuItem"
/* import ReceiveAlert from "../Notifications" */

import Text from '../../components/Text'
import CreatePostButtom from '../../components/CreatePostButtom'
import CreatePostDialog from '../../components/CreatePostDialog'

import logo_menu from '../../assets/logo_menu.svg'

import { Post } from '../../Model/Post'

interface MenuProps {
    newPostCreated?: (post: Post) => void
}

function Menu(props: MenuProps) {
    const [open, setOpen] = useState(false)

    function postCreated(post: Post) {
        setOpen(false)
        props.newPostCreated && props.newPostCreated(post)
    }

    return (

        <div className="basis-1/6 border-r border-background ml-4 pt-4">
            <div className='ml-2 px-4'>
                <Link to={"/home"} className='flex items-center'>
                    <img src={logo_menu} alt="Logo" />
                    <Text size="lg" className="font-extrabold ml-4 text-base text-textOnP tracking-wider" >Symap Parrot</Text>
                </Link>
            </div>

            <ul>
                <MenuItem menuTitle='Página Inicial' route="/home">
                    <HouseLine className="mr-4" size={36} weight="fill" />
                </MenuItem>
                {/*  <MenuItem menuTitle='Notificações' route="/notifications">
                    <BellSimple className="mr-4" size={36} weight="fill" />
                </MenuItem> */}
                <MenuItem menuTitle='Perfil' route="/profile">
                    <User className="mr-4" size={36} weight="fill" />
                </MenuItem>
                <MenuItem menuTitle='Amigos' route="/friends">
                    <UsersThree className="mr-4" size={36} weight="fill" />
                </MenuItem >
            </ul >
            <div className='flex flex-col items-center pr-2 mt-8'>
                <Dialog.Root open={open} onOpenChange={setOpen}>
                    <CreatePostButtom />
                    <CreatePostDialog postCreated={postCreated} />
                </Dialog.Root>
            </div>
        </div>

    );
}

export default Menu