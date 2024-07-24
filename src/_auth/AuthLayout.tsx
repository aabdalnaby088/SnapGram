// import React from 'react'

import { Outlet , Navigate } from "react-router-dom"

export default function AuthLayout() {

    const isAuth = false ; 

return (
    <>
    {isAuth ?  <Navigate to= '/'/> :  
    
    <>
    <section className="flex flex-1 justify-center items-center flex-col py-10" >
    <Outlet/>
    </section>
        <img src="/SnapGram/assets/images/side-img.svg"
        alt="side image"
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat" />
    </>
    
    }
    </>
)

}
