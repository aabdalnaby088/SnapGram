// import React from 'react'

    export default function Loader() {
    const IMAGE_PREFEX = import.meta.env.VITE_IMAGE_PREFEX;

    return (
        <div className="flex-center w-full">
            <img
            src={`${IMAGE_PREFEX}/assets/icons/loader.svg`}
            alt="loader" 
            width={24}
            height={24}
            
            />
        </div>
    )
}
