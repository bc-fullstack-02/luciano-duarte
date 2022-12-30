import { UserCircle, Chat, Heart } from "phosphor-react"
import { Link } from "react-router-dom"
import Heading from "../Heading"
import Text from "../Text"
import { Post } from '../../Model/Post'

interface PostItemProps {
    post: Post;
    handleLike: (postId: string) => void
}

function PostItem({ post, handleLike }: PostItemProps) {
    const profile = localStorage.getItem("profile") as string

    return (
        <div className="px-5 py-3 border-b border-lineBg flex flex-col gap-2 text-white" key={post._id}>
            <div className="flex flex-row items-center ml-5 my-4">
                <UserCircle size={50} weight='light' className="text-slate-50" fill=""/>
                <Text className="font-extrabold ml-2">{post.profile.name}</Text>
            </div>
            <div className="ml-16 flex flex-col gap-2 ">
                <Link to={`/posts/${post._id}`}>
                    <Heading size="sm">{post.title}</Heading>
                    {post.image ? (
                        <img
                            src={post.imageUrl}
                            alt="Foto"
                            className="max-w-lg rounded-lg" />
                    ) : (
                        <Text asChild>
                            <p>{post.description}</p>
                        </Text>
                    )}
                </Link>
            </div>

            <div className="flex items-center gap-6 pl-2 ">
                <Chat size={26} className="text-slate-50" />
                <Text size="sm">{post.comments.length}</Text>

                <div
                    className="hover:bg-sky-400 rounded-full p-1"
                    onClick={() => handleLike(post._id)}
                >
                    {post.likes.includes(profile) ? (
                        <Heart size={26} className="hover:text-secondary text-secondary cursor-pointer hover:scale-150 ease-in" weight="fill" />
                    ) : (
                        <Heart size={26} className="hover:text-secondary  cursor-pointer hover:scale-150 ease-in " />
                    )}

                </div>
                <Text size="sm">{post.likes.length}</Text>
            </div>
        </div>
    )
}

export default PostItem