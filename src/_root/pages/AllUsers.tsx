import UserCard from "../../../@/components/shared/UserCard"
import Loader from "../../../@/components/shared/Loader"
import { userGetAllUsers } from "../../../@/lib/react-query/queriesAndMutations"
import {Helmet} from "react-helmet";
export default function AllUsers() {

const {data:users , isLoading } = userGetAllUsers()
    
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Snapgram | AllUsers</title>
            </Helmet>
        <div className="common-container">

            <div className="flex w-full gap-6 md:gap-9">
    {isLoading && !users ? (
            <Loader />
            ) : (
            <ul className="user-grid">
                {users?.documents.map((creator) => (
                <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                    <UserCard user={creator} />
                </li>
                ))}
            </ul>
            )}
            </div>
        </div>
        </>
    )
}
