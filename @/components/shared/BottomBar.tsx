import { bottombarLinks } from "@/constants"
import { Link, useLocation } from "react-router-dom"

export default function BottomBar() {
    const {pathname} = useLocation()

    return (
        <section className="bottom-bar">
            {bottombarLinks.map((link) => {
                const isActive = pathname === link.route
                return (
                        <Link to={link.route}  className= {`flex-center flex-col gap-1 p-2 transition leftsidebar-link ${isActive && 'bg-primary-500 group rounded-[10px]'}`} key={link.label}>
                            <img src= {link.imgURL} width={25} height={25} alt= {`image of ${link.label}`} className={`${isActive && 'invert-white'}`} />
                            <p className="tiny-medium text-light-2">{link.label}</p>
                        </Link>
                    )
                    })}
        </section>
    )
}
