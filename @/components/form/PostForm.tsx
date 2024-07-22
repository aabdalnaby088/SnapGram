
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { Button } from "../ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { createPostValidation } from "../../../@/lib/validation"
import { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import { toast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"
import { useCreatePost, useDeletePost, useUpdatePost } from "../../../@/lib/react-query/queriesAndMutations"
import Loader from "../shared/Loader"

type PostFormProps = {
    post?: Models.Document,
    action: "Create" | "Update";
}

export default function PostForm({post , action} : PostFormProps) {
// console.log(post);

const {mutateAsync :createPost , isPending : isLoadingCreate} = useCreatePost()
const {mutateAsync :updatePost , isPending : isLoadingUpdate} = useUpdatePost()
// const {mutateAsync :deletePost , isPending : isLoadingdelete} = useDeletePost()
const {user} = useUserContext()
const navigate = useNavigate()
 // 1. Define your form.
const form = useForm<z.infer<typeof createPostValidation>>({
    resolver: zodResolver(createPostValidation),
    defaultValues: {
    Caption: post ? post?.caption : "",
    file: [],
    location: post ? post.location : "",
    tags: post ? post.tags.join(",") : "",
    },
})
    
    // 2. Define a submit handler.
async function onSubmit(values: z.infer<typeof createPostValidation>) {

    if (post && action === "Update") {        
        const updatedPost = await updatePost({
            ...values,
            postId: post.$id,
            imageId: post.imageId,
            imageUrl: post.imageUrl,
        });

        if (!updatedPost) {
            toast({
            title: `${action} post failed. Please try again.`,
            });
        }
        return navigate(`/posts/${post.$id}`);
        }

        

if (values && action == 'Create'){
        console.log(post , action );
        const newPost = await createPost({
            userId: user.id,
            ...values
        })
        if(!newPost){
            return toast({
                title : "Please try againnnnnn", 
            })
        }
    }

    navigate('/')
}

    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
            <FormField
            control={form.control}
            name="Caption"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Caption</FormLabel>
                <FormControl>
                    <Textarea placeholder="Caption" className="shad-textarea custom-scrollbar" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Add Photos</FormLabel>
                <FormControl>
                    <FileUploader
                    fieldChange = {field.onChange}
                    mediaUrl = {post?.imageUrl}
                    />
                </FormControl>

                <FormMessage className="shad-form_message" />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Add Location</FormLabel>
                <FormControl>
                    <Input type="text" className="shad-input" {...field}/>
                </FormControl>
                <FormMessage className="shad-form_message" />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Add Tags (separated by comma " , ")</FormLabel>
                <FormControl>
                    <Input type="text" className="shad-input" placeholder="Art, Expression, Sports" {...field}/>
                </FormControl>
                <FormMessage className="shad-form_message" />
                </FormItem>
            )}
            />
            <div className="flex gap-4 items-center justify-end">
            <Button type="button" className="shad-button_dark_4">Cancel</Button>
        <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}>
            {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            {action} Post
        </Button>            
            </div>
        </form>
    </Form>
    )
}
