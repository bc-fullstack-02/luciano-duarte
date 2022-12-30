import { ChangeEvent, FormEvent, useState, useEffect } from "react"
import { Stack, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Button from "../Button"
import Dropzone from "../Dropzone"
import Menu from "../Menu"
import Text from "../Text"
import { TextInput } from "../TextInput"
import { Profile } from "../../Model/Profile"
import api from "../../services/api"
import { toast } from "react-toastify"
import logo from "../../assets/logo_menu.svg"
import { Post } from "../../Model/Post"
import Heading from "../Heading"
import { UserCircle } from "phosphor-react"

function ProfileEdit() {

  const profileClean = {
    _id: "",
    name: "",
    image: true,
    imageUrl: "",
    user: "",
    following: [""],
    followers: [""],
  }

  const [selectedFile, setSelectedFile] = useState<File>()
  const navigate = useNavigate()
  const token = localStorage.getItem("accessToken")
  const profileId = localStorage.getItem("profile")
  const user = localStorage.getItem("user")

  const [profile, setProfile] = useState<Profile>(profileClean)
  const [formData, setFormData] = useState({
    name: "",
  })

  useEffect(() => {
    const getProfile = async () => {
      try {
        const responseProfile = await api.get(`/profiles/${profileId}`, {
          headers: { authorization: `Bearer ${token}` }
        });
        setProfile(responseProfile.data)
        setFormData({
          name: responseProfile.data.name,
        })
      } catch (error) {
        toast.warning('Erro ao obter o perfil!', {
          icon: () => <img src={logo} alt="logo" />,
        })
      }
    }
    getProfile()
  }, [token, profileId])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { name } = formData;
    const data = new FormData();

    data.append("name", name as string);
    if (selectedFile) {
      data.append("file", selectedFile);
    }
    try {
      console.log(data);
      const response = await api.put("/users/me", data, {
        headers: { authorization: `Bearer ${token}` },
      })
      console.log(response);
      navigate("/home");
    } catch (err) {
      toast.warning("Ocorreu um erro ao editar o perfil!", {
        icon: () => <img src={logo} alt="logo SocialMap" />,
      });
    }
  };


  return (
    <div className="basis-5/6">
      <Heading className="border-b border-slate-400 mt-4">
        <div className="flex flex-row items-center ml-5 my-4">
          <UserCircle size={48} weight='light' className="text-slate-50" />
          <Text className="font-extrabold ml-2">{user}</Text>
        </div>
      </Heading>

      <div className="ml-4 mt-4">
        <Text>Foto de Perfil</Text>
        <TextInput.Root>
          <Dropzone onFileUploaded={setSelectedFile} />
        </TextInput.Root>


        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <h3 className="titleEdit text-cyan-50">Nome</h3>
            <TextField
              variant="standard"
              name="name"
              value={formData.name}
              placeholder={profile.name}
              onChange={handleInputChange}
              style={{ marginTop: "5px" }}
            />
            <div className="flex flex-1 gap-2">
              <Button onClick={() => window.location.reload()}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </Stack>
        </form>
      </div>
    </div>
  );
}
export default ProfileEdit;
