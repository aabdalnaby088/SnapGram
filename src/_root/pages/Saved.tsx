import Loader from "../../../@/components/shared/Loader"
import { useGetCurrentUser } from "../../../@/lib/react-query/queriesAndMutations"
import GridPostList from "../../../@/components/shared/GridPostList"
import { Models } from "appwrite"
import {Helmet} from "react-helmet";
export default function Saved() {

const {data : currentUser} = useGetCurrentUser()



    const savedPosts = currentUser?.save
        .map((savePost: Models.Document) => ({
        ...savePost.post,
        creator: {
            imageUrl: currentUser.imageUrl,
        },
        }))
    .reverse();

    return (
<>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Snapgram | saves</title>
        </Helmet>
        <div className="saved-container">
            <div className="flex w-full max-w-5xl gap-3">
                <img src="/assets/icons/save.svg" alt="save"
                width={36}
                height={36}
                className="invert-white"
                />
                <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
            </div>
            {!currentUser? <Loader/> : 
            !savedPosts.length? 
            <p className="text-light-3">No saved posts</p>
            :
                <GridPostList  posts = {savedPosts} showStats = {false}/>
            } 
        </div>
</>
    )
}
