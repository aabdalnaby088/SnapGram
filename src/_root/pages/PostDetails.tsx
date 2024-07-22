import { formatTimeAgo } from "../../../@/lib/utils";
import Loader from "../../../@/components/shared/Loader";
import { useDeletePost, useGetPostById, useGetUserPosts } from "../../../@/lib/react-query/queriesAndMutations";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useUserContext } from "@/context/AuthContext";
import PostStats from "../../../@/components/shared/PostStats";
import GridPostList from "../../../@/components/shared/GridPostList";
import {Helmet} from "react-helmet";
export default function PostDetails() {
    const navigate = useNavigate();
    const {user} = useUserContext()
    const {id} = useParams() ; 
    const {data : post , isPending } = useGetPostById(id || "")
    const { mutate: deletePost } = useDeletePost();
    const handleDeletePost = () => {
        deletePost({ postId: id || "", imageId: post?.imageId });
        navigate(-1);
    };

    const {data: userPosts , isPending:isLoadingRelatedPosts } = useGetUserPosts(post?.creator.$id)

    const relatedPosts = userPosts?.documents.filter((userPost)=> userPost.$id !== id)
    
    return (
<>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Snapgram | Post Details {post?.$id}</title>
            </Helmet>
        <div className="post_details-container">
            {isPending ? <Loader/> : (
                <div className="post_details-card">
                <img src= {post?.imageUrl} alt=""  className="post_details-img"/>

                    <div className='post_details-info'>
                    <div className="flex-between w-full">

                    <Link to={`/profile/${post?.creator.$id}`} className="flex items-center gap-3">
                    <img src= {post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="profile pic" className='w-8 h-8 lg:w-12 lg:h-12 rounded-full' />
                    <div className='flex flex-col'>
                            <p className='base-medium lg:body-bold text-light-1'>
                                {post?.creator?.name}
                            </p>
                            <div className='flex-center gap-2 text-light-3'>
                                <p className='subtle-semibold lg:small-regular'>
                                    {formatTimeAgo(post?.$createdAt || "")}
                                </p>
                                -
                                <p className='subtle-semibold lg:small-regular'>
                                    {post?.location}
                                </p>
                            </div>
                    </div>
                    </Link>
                    <div className="flex-center gap-2">
                        <Link to={`/update-post/${post?.$id}`} className = {`${user.id != post?.creator.$id && 'hidden'}`}>
                        <img src="/assets/icons/edit.svg" height={24} width={24} alt="edit" />
                        </Link>
                        <button type="button" onClick={handleDeletePost} className = {`${user.id != post?.creator.$id && 'hidden'}`}  >
                                <img src="/assets/icons/delete.svg" height={24} width={24} alt=""  />
                        </button>
                    </div>
                    </div>
                    <hr className="border w-full border-dark-4/80" />
            <div className={`small-medium lg:base-medium py-5`}>
                <p>{post?.caption}</p>
                <ul className='flex gap-1 mt-2'>
                    {post?.tags.map((tag : string) => (
                        <li key={tag} className='text-light-3'>
                            #{tag}
                        </li>
                    ) )}
                </ul>
            </div>
            <div className="w-full">
                    <PostStats post={post} userId = {user.id}/>
            </div>
                </div>
            </div>
            )}

    <GridPostList posts = {relatedPosts} showUser = {false} showStats = {false} />

        </div>
</>
    )
}
