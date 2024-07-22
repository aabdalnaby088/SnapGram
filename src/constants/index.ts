    
    const IMAGE_PREFEX = import.meta.env.VITE_IMAGE_PREFEX;

    export const sidebarLinks = [
    {
        imgURL: `${IMAGE_PREFEX}/assets/icons/home.svg`,
        route: "/",
        label: "Home",
    },
    {
        imgURL: `${IMAGE_PREFEX}/assets/icons/wallpaper.svg`,
        route: "/explore",
        label: "Explore",
    },
    {
        imgURL: `${IMAGE_PREFEX}/assets/icons/people.svg`,
        route: "/all-users",
        label: "People",
    },
    {
        imgURL: `${IMAGE_PREFEX}/assets/icons/bookmark.svg`,
        route: "/saved",
        label: "Saved",
    },
    {
        imgURL: `${IMAGE_PREFEX}/assets/icons/gallery-add.svg`,
        route: "/create-post",
        label: "Create Post",
    },
    ];

    export const bottombarLinks = [
    {
        imgURL: `${IMAGE_PREFEX}/assets/icons/home.svg`,
        route: "/",
        label: "Home",
    },
    {
        imgURL: `${IMAGE_PREFEX}/assets/icons/wallpaper.svg`,
        route: "/explore",
        label: "Explore",
    },
    {
        imgURL: `${IMAGE_PREFEX}/assets/icons/bookmark.svg`,
        route: "/saved",
        label: "Saved",
    },
    {
        imgURL: `${IMAGE_PREFEX}/assets/icons/gallery-add.svg`,
        route: "/create-post",
        label: "Create",
    },
    ];