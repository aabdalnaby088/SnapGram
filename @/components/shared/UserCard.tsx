import { Link } from "react-router-dom";

export default function UserCard({user} : any) {
    
    return (
        <Link to={`/profile/${user.$id}`} className="flex flex-col p-5 justify-center items-center gap-4 border border-dark-4 rounded-[20px] px-5 py-8">
                <img src= {user.imageUrl} alt="user profile picture" width={40} height={40} className="rounded-full" />

                <div className="flex flex-col pt-4">
                    <h3 className="h4-bold md:h3-bold text-center">{user.name}</h3>
                    <p className="text-light-3">@{user.userName}</p>
                </div>
        </Link>
    )
}
