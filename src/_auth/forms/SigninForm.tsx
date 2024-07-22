import { zodResolver } from "@hookform/resolvers/zod"

import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "../../../@/components/ui/form"
import { Input } from "../../../@/components/ui/input"



import { Button } from "../../../@/components/ui/button"
import { useForm } from "react-hook-form"
import { signInValidation } from "../../../@/lib/validation/index.ts"
import { z } from "zod"
import Loader from "../../../@/components/shared/Loader.tsx"
import { Link, useNavigate } from "react-router-dom"

import { useToast } from "../../../@/components/ui/use-toast"
import { useSignInAccount } from "../../../@/lib/react-query/queriesAndMutations.ts"
import { useUserContext } from '../../context/AuthContext.tsx';

export default function SigninForm() {

const navigate = useNavigate()
const {toast} = useToast() 

const {checkAuthUser , isLoading : isUserLoading} = useUserContext()

//mutateAsync is the mutationFn in the createUserAccountNutation function 



const {mutateAsync:signInAccount , isPending: isSigningIn} = useSignInAccount()


    const form = useForm<z.infer<typeof signInValidation>>({
        resolver : zodResolver(signInValidation), 
        defaultValues: {
            email : "" , 
            password : ""
        }
    })
   // 2. Define a submit handler.
    const handleSignin = async (user: z.infer<typeof signInValidation>) => {
        const session = await signInAccount(user);

        if (!session) {
        toast({ title: "Login failed. Please try again." });
        
        return;
        }

        const isLoggedIn = await checkAuthUser();

        if (isLoggedIn) {
        form.reset();

        navigate("/");
        } else {
        toast({ title: "Login failed. Please try again.", });
        
        return;
        }
    };



    return (
<>
    <Form {...form}>

    <div className="sm:w-420  flex-center flex-col ">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12" >Log in to your account</h2>

        <p className="text-light-3 small-medium md:base-regular">Welcome back, please enter your details</p>


        <form onSubmit={form.handleSubmit(handleSignin)} className="flex flex-col gap-5 w-full mt-4">

            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input type="email" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" className="shad-button_primary" disabled = {isSigningIn}>
                
                {
                    isSigningIn ? (
                        <div className="flex-center gap-2">
                            <Loader/>
                        </div>
                    ) : "SignUp"
                }
            </Button>
            <p className="text-small-regular text-light-2 text-center mt-2">
                Don&apos;t have an account?
                <Link to={"/sign-up"} className="text-primary-500 text-small-semibold ml-1">
                Sign up
                </Link>
            </p>
        </form>
            </div>
    </Form>
</>
    )
}