import { useParams } from "react-router-dom";
import PostForm from "../../../@/components/form/PostForm";
import { useGetPostById } from "../../../@/lib/react-query/queriesAndMutations";
import Loader from "../../../@/components/shared/Loader";
import {Helmet} from "react-helmet";
export default function EditPost() {

const { id } = useParams() ; 
    const {data : post , isPending : isLoadingPost} = useGetPostById(id || '')
    if (isLoadingPost)
        return<div> <Loader/> </div>

    return (
<>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Snapgram | Edit Post</title>
            </Helmet>
        <div className="flex flex-1">
            <div className="common-container">
                <div className="max-w-5xl flex-start gap-3 w-full">
                    <img src="/assets/icons/add-post.svg" alt="add post" width={36} height={36} />
                    <h2 className="h3-bold md:h2-bold text-left w-full">Update Post</h2>
                </div>
                <PostForm action = "Update" post = {post} />
            </div>
        </div>
</>
    )
}
