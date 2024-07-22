
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../../../@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../@/components/ui/form"
import { Input } from "../../../@/components/ui/input"
import { toast } from "../../../@/components/ui/use-toast"
import { useNavigate, useParams } from "react-router-dom"
import ProfileUploader from "../../../@/components/shared/ProfileUploader"
import { useGetUserById, useUpdateUser } from "../../../@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { Textarea } from "../../../@/components/ui/textarea"
import { ProfileValidation } from "../../../@/lib/validation"
import Loader from "../../../@/components/shared/Loader"
import {Helmet} from "react-helmet";


export default function UpdateProfile() {
    const navigate = useNavigate()
    const {id} = useParams()
    const {data: currentUser} = useGetUserById(id || "")
    const {user , setUser} = useUserContext()
    const { mutateAsync: updateUser, isPending: isLoadingUpdate } =
    useUpdateUser();
    // console.log(currentUser.userName , user);
    
    const form = useForm<z.infer<typeof ProfileValidation>>({
        resolver: zodResolver(ProfileValidation),
        defaultValues: {
        file: [],
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio || "",
        },
    })

    async function onSubmit(data: z.infer<typeof ProfileValidation>) {
    const newProfile = await updateUser({
        userId:currentUser?.$id || "",
        name: data.name,
        bio: data.bio,
        file: data.file,
        imageUrl: currentUser?.imageUrl,
        imageId: currentUser?.imageId,
    })
    if (!newProfile) {
        toast({
            title: `Update user failed. Please try again.`,
        });
        }

        setUser({
        ...user,
        name: newProfile?.name,
        bio: newProfile?.bio,
        imageUrl: newProfile?.imageUrl,
        });
        return navigate(`/profile/${id}`);
    }
    if (!currentUser || !user)
        return (
        <div className="flex-center w-full h-full">
            <Loader/>
        </div>
    );
    return (
<>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Snapgram | Update Profile</title>
            </Helmet>


<div className="flex flex-1">
    <div className="common-container">
    <div className="flex justify-start items-center w-full gap-4">
            <img
            src="/assets/icons/edit.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
            />
            <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
    </div>
<Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-5 flex flex-col gap-7 mt-4">
        <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
            <FormItem className="flex">
            <FormControl>
                <ProfileUploader
                fieldChange={field.onChange}
                imageUrl={currentUser?.imageUrl}
                />
            </FormControl>
            <FormMessage className="shad-form_message" />
            </FormItem>
        )}
    />
<FormField
    control={form.control}
    name="name"
    render={({ field }) => (
                <FormItem>
    <FormLabel className="shad-form_label">Name</FormLabel>
    <FormControl>
                    <Input type="text" className="shad-input" {...field} />
        </FormControl>
        <FormMessage />
        </FormItem>
        )}
            />
<FormField
        control={form.control}
    name="username"
    render={({ field }) => (
                <FormItem>
        <FormLabel className="shad-form_label">Username</FormLabel>
        <FormControl>
        <Input
        type="text"
        className="shad-input"
        {...field}
        disabled
                    />
        </FormControl>
        <FormMessage />
                </FormItem>
            )}
/>

                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="shad-form_label">Email</FormLabel>
                    <FormControl>
                        <Input
                        type="text"
                        className="shad-input"
                        {...field}
                        disabled
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="shad-form_label">Bio</FormLabel>
                    <FormControl>
                        <Textarea
                        className="shad-textarea custom-scrollbar"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                    </FormItem>
                )}
            />



    <div className="flex gap-4 items-center justify-end w-full">
        <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
        >
            Cancel
        </Button>
                <Button
                    type="submit"
                    className="shad-button_primary whitespace-nowrap"
                    disabled={isLoadingUpdate}>
                    {isLoadingUpdate && <Loader />}
                    Update Profile
                </Button>
        </div>
    </form>
</Form>
        </div>
</div>
</>
    )
}