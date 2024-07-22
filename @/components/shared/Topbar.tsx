import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOut } from "../../../@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

export default function Topbar() {

    const {user} = useUserContext()

const navigate = useNavigate();
const {mutate : signOut , isSuccess} = useSignOut();


useEffect(()=>{
    if(isSuccess){
        navigate(0)
    }
},[isSuccess])
const IMAGE_PREFEX = import.meta.env.VITE_IMAGE_PREFEX;

    return (
        <section className="topbar">
                <div className="flex-between py-4 px-5">
                    <Link to= "/" className="flex gap-5 items-center">
                    <img src={`${IMAGE_PREFEX}/assets/images/logo.svg`} alt="logo pic" width={130} height={325} />
                    </Link>
                    <div className="flex gap-4">
                        <Button variant= "ghost" className="shad-button_ghost" onClick={()=>{signOut()}} >
                            <img src={`${IMAGE_PREFEX}/assets/icons/logout.svg `}alt="logOut"  />
                        </Button>
                        <Link to = {`/profile/${user.id}`} className="flex-center gap-3">
                            <img src= { user.imageUrl ||`${IMAGE_PREFEX}/assets/images/profile.png`} alt="Profile pic" className="h-8 w-8 rounded-full"/>
                        </Link>
                    </div>
                </div>
        </section>
    )
}
