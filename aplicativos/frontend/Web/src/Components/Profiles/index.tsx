import { useState, useEffect } from "react"
import { UserCircle } from "phosphor-react"
import api from "../../services/api"
import { getAuthHeader } from "../../services/auth"
import Button from "../Button"
import Heading from "../Heading"
import Text from "../Text"
import Profile from "../Profile"

interface Profile {
    followButtonDisabled: boolean
    _id: string;
    name: string;
    followers: string[];
}

function Profiles() {
    const authHeader = getAuthHeader()
    const user = localStorage.getItem("user")
    const [profiles, setProfiles] = useState<Profile[]>([])

    useEffect(() => {
        const getProfiles = async () => {
            try {
                const response = await api.get('/profiles', authHeader)
                setProfiles(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        getProfiles()
    }, [])

    async function handleFollow(profileId: string) {
        try {
            await api.post(`/profiles/${profileId}/follow`, null, authHeader)
            changeButtonStatus(profileId, true)
        } catch (err) {
            console.error(err)
        }
    }
    async function handleUnfollow(profileId: string) {
        try {
            await api.post(`/profiles/${profileId}/follow`, null, authHeader)
            changeButtonStatus(profileId, false)
        } catch (err) {
            console.error(err)
        }
    }

    function changeButtonStatus(profileId: string, buttonDisabled: boolean) {
        setProfiles((profiles) => {
            const newProfiles = profiles.map((profile) => {
                if (profile._id === profileId) {
                    profile.followButtonDisabled = buttonDisabled
                }
                return profile
            })
            return [...newProfiles]
        })
    }

    return (
        <div className="basis-5/6 overflow-y-auto scrool-smooth text-white my-4">
            <Heading className="border-b border-slate-400 mt-4">
                <Text size='lg' className="font-extrabold ml-5">Amigos</Text>
                <div className="flex flex-row items-center ml-5 my-4">
                    <UserCircle size={48} weight='light' className="text-slate-50" />
                    <Text className="font-extrabold ml-2">{user}</Text>
                </div>
            </Heading>
            <ul>
                {profiles.map((profile) => (
                    <li key={profile._id} className="border-b border-slate-400 mt-4 pl-5">
                        <div className="flex flex-row items-center">
                            <UserCircle size={48} weight='light' className="text-slate-50" />
                            <Text className="font-extrabold ml-2">{profile.name}</Text>
                        </div>

                        <div>
                            
                            {profile.followers.includes(String(profile)) === true ? 
                                <div className='mt-6 flex justify-start gap-4 mb-4'>
                                    <Button
                                        onClick={() => handleFollow(profile._id)}
                                        className='w-40 py-2 rounded-xl font-semibold text-md  focus:ring-2 ring-secondary hover:opacity-80'
                                        type='submit'
                                        disabled={profile.followButtonDisabled}
                                    >
                                        Seguir
                                    </Button>
                                    <Button
                                        onClick={() => handleUnfollow(profile._id)}
                                        className='w-40  border-secondary bg-gradient-to-r from-secondaryLight via-secondary to-secondaryDark hover:bg-gradient-to-br py-2 rounded-xl font-semibold text-md  focus:ring-2 ring-secondary'
                                        type='submit'
                                        disabled={profile.followButtonDisabled}
                                    >
                                        Deixar de Seguir
                                    </Button>
                                </div>
                            :
                                <div className="flex items-center gap-3">
                                    <Button
                                        onClick={() => handleFollow(profile._id)}
                                        className='w-40 py-2 rounded-xl font-semibold text-md  focus:ring-2 ring-secondary hover:opacity-80'
                                        type='submit'
                                        disabled={profile.followButtonDisabled}
                                    >
                                        Seguir
                                    </Button>
                                    <Button
                                        onClick={() => handleUnfollow(profile._id)}
                                        className='w-40  border-secondary bg-gradient-to-r from-secondaryLight via-secondary to-secondaryDark hover:bg-gradient-to-br py-2 rounded-xl font-semibold text-md  focus:ring-2 ring-secondary'
                                        type='submit'
                                        disabled={profile.followButtonDisabled}
                                    >
                                        Deixar de Seguir
                                    </Button>                                    

                                </div>
                            }  
                       </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Profiles


