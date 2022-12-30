import { Link, useNavigate } from "react-router-dom"
import { UserCircle } from "phosphor-react"
import Button from "../Button"
import Heading from "../Heading"
import Text from "../Text"

function Profile() {
    const navigate = useNavigate()
    const user = localStorage.getItem("user")

    function handleLogout() {
        localStorage.clear()
        navigate("/")
    }

    return (
        <div className="basis-5/6 text-white">
            <Heading className="px-5 py-3 border-b border-lineBg flex items-center">
                <div className="flex flex-row items-center ml-5 my-4">
                    <UserCircle size={50} weight='light' className="text-slate-50" fill="" />
                    <Text className="font-extrabold ml-2">{user}</Text>
                </div>
            </Heading>
            <div className="mt-4 w-full flex flex-col items-stretch px-5 py-4 ">
                <Link to={`/profileeditpage`}>
                    <Button className="ml-4 mb-4 max-w-sm" >
                        Editar Perfil
                    </Button>
                </Link>
                <Button className="ml-4 max-w-sm" onClick={handleLogout}>Sair</Button>
            </div>
        </div >
    )

}

export default Profile