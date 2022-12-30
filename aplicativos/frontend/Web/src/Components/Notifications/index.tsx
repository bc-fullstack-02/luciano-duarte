import { useEffect } from "react"
import io from "socket.io-client"

import Text from "../Text"
import Heading from '../Heading'

import { UserCircle } from "phosphor-react"

import CONSTANTS from '../../constants'

const Notifications = () => {

    const user = localStorage.getItem("user")
    const msgBox = document.getElementById("msgBox")
    const token = localStorage.getItem("accessToken");
    const socket = io(CONSTANTS.SOCKET_HOST, {
        auth: { token },
        secure: true,
    })

    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket)
            msgBox.innerHTML = (`connected as ${socket.id}` + "<br />")
        });
        socket.on("connect_profile", (profile) => {
            socket.profile = profile
            msgBox.innerHTML += (`connected ${socket.profile.name}` + "<br />")
        });

        socket.on("disconnect", () => {
            msgBox.innerHTML = `status socket connected: ${socket.connected}`
        });

        socket.on("post", (data) => {
            msgBox.innerHTML += ("post: " + JSON.stringify(data("title")) + "<br />")
        })
        socket.on("post-like", (data) => {
            msgBox.innerHTML += ("O seu post recebeu uma curtida <br />")
        })
        socket.on("comment", (data) => {
            msgBox.innerHTML += ("comment: " + JSON.stringify(data) + "<br />")
        })
        socket.on("comment-like", (data) => {
            msgBox.innerHTML += ("comment-like: " + JSON.stringify(data) + "<br />")
        })

        socket.on('connect_error', (err) => {
            alert(err)
        })

        // socket.emit("user-connected", token)
        console.log(socket)

    }, [socket])


    return (
        <div className="basis-5/6">
            <Heading className="border-b border-slate-400 mt-4">
                <Text size='lg' className="font-extrabold ml-5">Notificações</Text>
                <div className="flex flex-row items-center ml-5 my-4">
                    <UserCircle size={48} weight='light' className="text-slate-50" />
                    <Text className="font-extrabold ml-2">{user}</Text>
                </div>
            </Heading>
            <ul>
                <li className="border-b border-slate-400 mt-4 pl-5">
                    <p className="text-slate-50" id="msgBox" />
                </li>
            </ul>
        </div>
    )
}

export default Notifications;