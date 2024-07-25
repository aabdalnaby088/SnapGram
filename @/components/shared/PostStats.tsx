import { useGetCurrentUser, useSavePost ,useLikePost } from "../../../@/lib/react-query/queriesAndMutations"
import { useDeleteSavePost } from "../../../@/lib/react-query/queriesAndMutations"
import { Models } from "appwrite"
import { useEffect, useState } from "react"
import { checkIsLiked } from "../../../@/lib/utils"
import Loader from "./Loader"


type postStatsProps = {
    post? : Models.Document,
    userId : string
}


export default function PostStats({post , userId}: postStatsProps) {


    const likesList = post?.Likes.map((user : Models.Document) => user.$id)

    const [likes , setLikes] = useState(likesList)
    const [saved , setSaved] = useState(false)

const {mutate:LikePost} = useLikePost()
const {mutate:savePost , isPending : isSaving} = useSavePost()
const {mutate:deleteSavedPost , isPending : isDeletingSave} = useDeleteSavePost()

const {data : currentUser} = useGetCurrentUser()

const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
);

useEffect(()=>{
        setSaved(!!savedPostRecord)
},[savedPostRecord])

const handleLikePost = (e : React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes]

    const hasLiked = newLikes.includes(userId) ; 

    if(hasLiked){
        newLikes = newLikes.filter((like) => like !== userId)
    }else{
        newLikes.push(userId)
    }
    setLikes(newLikes) ;
    LikePost({postId:post?.$id || "" , likesArray: newLikes})
}

const handleSavePost = (e : React.MouseEvent) => {
    
    e.stopPropagation() ; 

if(savedPostRecord){
    setSaved(false)
    deleteSavedPost({savedRecordId:savedPostRecord.$id})
}else{
    setSaved(true)
    savePost({userId : userId, postId : post?.$id || "" });
}

}

    return (
        <div className="flex justify-between items-center z-20">
            <div className="flex gap-2 mr-5">
                <img src= {`${
            checkIsLiked(likes, userId)
                ? `/SnapGram//assets/icons/liked.svg`
                : `/SnapGram//assets/icons/like.svg`
            }`}
            alt="Like" className="cursor-pointer" onClick = {handleLikePost} width={20} height={20} />
                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>
            <div className="flex gap-2 mr-5">
                {isDeletingSave || isSaving ? <Loader/> : 
                <img src={saved ? "/SnapGram/assets/icons/saved.svg" : "/SnapGram/assets/icons/save.svg"} alt="save" className="cursor-pointer" onClick={handleSavePost} width={20} height={20} />
                }
            </div>
        </div>
    )
}
