import { INewPost, INewUser, IUpdatePost, IUpdateUser } from '../../../@/types'
import {useQuery, 
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import {createPost , createUserAccount, deletePost, deleteSavedPost, getAllUsers, getCurrentAccount, getPostById, getRecentPosts, getUserById, getUserPosts, likePost, savePost, searchPosts, signInAccount, signOutAccount, updatePost, updateProfile } from '../appwrite/Api'
import { QUERY_KEYS } from './queryKeys'
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn : (user : INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn : (user : {email : string; password : string}) => signInAccount(user)
    })
}

export const useSignOut = () => {
    return useMutation({
        mutationFn : () => signOutAccount()
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : (post: INewPost) => createPost(post), 
        onSuccess: () => {
            queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts,
    })
}

export const useLikePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : ({postId , likesArray} : {postId:string , likesArray:string[]}) => likePost(postId , likesArray),
        onSuccess : (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID , data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useSavePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, postId }: { userId: string, postId: string}) =>
        savePost(userId, postId),
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_POSTS],
        });
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        });
        },
    });
};


    export const useDeleteSavePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ savedRecordId }: { savedRecordId: string }) => {
        return deleteSavedPost(savedRecordId)
        },
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
        })
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_POSTS]
        })
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_CURRENT_USER]
        })
        }
    })
    }


export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentAccount
    })
}

export const useGetPostById = (postId : string) => {
return useQuery({
    queryKey : [QUERY_KEYS.GET_POST_BY_ID , postId],
    queryFn : () =>  getPostById(postId),
    enabled : !!postId
})
}


export const useUpdatePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (post : IUpdatePost) => updatePost(post),
        onSuccess : (data) => {
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_POST_BY_ID , data?.$id]
            })
        }
    })
}


export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
        deletePost(postId , imageId),
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
        },
    });
};


export const useSearchPosts = (searchTerm: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
        queryFn: () => searchPosts(searchTerm),
        enabled: !!searchTerm
    })
}


export const useGetUserPosts = (userId : string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
        queryFn: () => getUserPosts(userId),
        enabled: !!userId
    })
}

export const useGetUserById = (userId : string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId
    })
}

export const userGetAllUsers = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: () => getAllUsers(),
    })
}


export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user: IUpdateUser) => updateProfile(user),
        onSuccess: (data) => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        });
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
        });
        },
    });
};