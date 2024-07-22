import { Outlet } from 'react-router-dom'
import LeftSideBar from '../../@/components/shared/LeftSideBar'
import Topbar from '../../@/components/shared/Topbar.tsx'
import BottomBar from '../../@/components/shared/BottomBar'

export default function RootLayout() {
    return (
        <div className='w-full md:flex'>
            <Topbar/>
            <LeftSideBar/>
            <section className='flex flex-1 h-full'>
                <Outlet/>
            </section>
            <BottomBar/>
        </div>
    )
}
