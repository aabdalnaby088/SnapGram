import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { INavLink } from "../../../@/types";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOut } from "../../../@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";

export default function LeftSideBar() {
    const {user} = useUserContext()
    const {pathname} = useLocation()
    const {mutate : signOut , isSuccess } = useSignOut();
    const navigate = useNavigate()
useEffect(()=>{
    if(isSuccess){
        navigate(0);
    }
}, [isSuccess])

    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-11">
                <Link to= "/" className="flex gap-5 items-center">
                    <img src={`/SnapGram//assets/images/logo.svg`} alt="logo pic" width={130} height={325} />
                </Link>
                <Link to= {`/profile/${user.id}`} className="flex gap-3 items-center">
                    <img src= { user.imageUrl ||`/SnapGram//assets/images/profile.png`} alt="Profile pic" className="h-14 w-14 rounded-full"/>
                    <div className="flex flex-col">
                        <p className="body-bold">
                            {user.name}
                        </p>
                        <p className="small-regular text-light-3">
                            @{user.username}
                        </p>
                    </div>
                </Link>
                <ul className="flex flex-col gap-6">
                    {sidebarLinks.map((link:INavLink) => {
                        const isActive = pathname === link.route
                        return (
                        <li  className= {`leftsidebar-link ${isActive && 'bg-primary-500 '}`} key={link.label}>
                            <NavLink to={link.route} className= "flex gap-4 items-center p-4 group">
                                <img src= {link.imgURL} alt= {`image of ${link.label}`} className={`${isActive ? 'invert-white' : ''} group-hover:invert-white `} />
                                {link.label}
                            </NavLink>
                        </li>
                        )
                    })}
                </ul>
            </div>
                <Button variant= "ghost" className="shad-button_ghost" onClick={()=>{signOut()}} >
                    <img src={`/SnapGram//assets/icons/logout.svg`} alt="logOut"  />
                    <p className="small-medium lg:base-medium">Logout</p>
                </Button>
        </nav>
    )
}
