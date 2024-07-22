
import {ID, ImageGravity, Query} from 'appwrite'

import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "../../../@/types/index";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

export async function createUserAccount(user: INewUser){

try{
    
    const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name,
    )

    if(!newAccount){
        throw Error;
    }
    console.log(newAccount);

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB( {
        accountId: newAccount.$id,
        name: newAccount.name,
        email: newAccount.email,
        userName : user.username,
        imageUrl: avatarUrl,
    })

    return newUser

}catch(err){
    console.log(err)
    return
}

}


export async function saveUserToDB(user : {accountId : String,
email : String,
name : String,
imageUrl : URL , 
userName?: string}){

try {
    const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        user
    )
    return newUser
} catch (error) {
    console.log(error);
    
}
}


export async function signInAccount(user : {email : string; password : string}){
    try {
    // const activeSession = await account.getSession('current');
    // await account.deleteSession(activeSession.$id);
        const session = await account.createEmailPasswordSession(user.email , user.password);
        console.log(session);
        return session;
    } catch (error) {
        console.log(error);
        
    }
}

export async function getCurrentAccount() {
    try {
        const currentAccount = await account.get() ; 
        if(!currentAccount){
            throw Error
        }
        const currentUser = await databases.listDocuments(appwriteConfig.databaseId , appwriteConfig.userCollectionId ,
            [Query.equal('accountId' , currentAccount.$id)])

    if(!currentUser){
        throw Error
    }
    return currentUser.documents[0]
    } catch (error) {
        console.log(error);
        
    }
}


export async function signOutAccount(){
    try {
        const session = await account.deleteSession("current")
        return session
    } catch (error) {
        console.log(error);
    }
}


export async function createPost (post: INewPost){
    try {
        const uploadedFile = await uploadFile(post.file[0])
        if(!uploadedFile) throw Error

        const fileUrl = await getFilePreview(uploadedFile.$id)
        if(!fileUrl) {
            deleteFile(uploadedFile.$id)
            throw Error
        }
            console.log(fileUrl);
            
        const tags = post.tags?.replace(/ /g , ' ').split(',') || [];


        const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        ID.unique(),
    {
        creator: post.userId,
        caption: post.Caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags,
    }
)

console.log(newPost);


    if(!newPost){
        await deleteFile(uploadedFile.$id)
        throw Error
    }

return newPost

    } catch (error) {
        console.log(error);
        
    }
}


export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        file
        );

        return uploadedFile;
    } catch (error) {
        console.log(error);
    }
}

export async function getFilePreview(fileId: string){
    try {
    const fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
        );
        
        return fileUrl.href
    } catch (error) {
        console.log(error);
        
    }
}

export async function deleteFile(fileId: string){
    try {
        await storage.deleteFile(
            appwriteConfig.storageId,
            fileId
        )
        return {status : "Success"}
    }catch(err){
        console.log(err);
        
    }
}


export async function getRecentPosts(){
    const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.orderDesc('$createdAt') , Query.limit(20)]
    )
    if(!posts) throw Error
    else {
        return posts
    }
}


export async function likePost(postId:string , likesArray: string[]){

    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId, 
            postId,
            {
                Likes : likesArray
            }
        )
        if (!updatedPost) throw Error
        return updatedPost
    } catch (error) {
        console.log(error);
        
    }

}

export async function savePost(userId: string, postId: string) {
    try {
        const updatedPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.savesCollectionId,
        ID.unique(),
        {
            user: userId,
            post: postId,
        }
        );

        if (!updatedPost) {
        throw new Error('Failed to create document');
        }

        return updatedPost;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



export async function deleteSavedPost(savedRecordId:string){
    try {
        const deletedPost = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId, 
            savedRecordId
        )
        if(!deletedPost) throw Error
        return {status : "ok"}
    } catch (error) {
        console.log(error);
        
    }

}



export async function getPostById(postId : string){
    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        )
        return post
    } catch (error) {
        console.log(error);
        
    }
}


export async function updatePost(post: IUpdatePost) {
    const hasFileToUpdate = post.file.length > 0;

    try {
        let image = {
        imageUrl: post.imageUrl,
        imageId: post.imageId,
        };

        if (hasFileToUpdate) {
        // Upload new file to appwrite storage
        const uploadedFile = await uploadFile(post.file[0]);
        if (!uploadedFile) throw Error;

        // Get new file url
        const fileUrl = await getFilePreview(uploadedFile.$id);
        if (!fileUrl) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
        }

        // Convert tags into array
        const tags = post.tags?.replace(/ /g, "").split(",") || [];

        //  Update post
        const updatedPost = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        post.postId,
        {
            caption: post.Caption,
            imageUrl: image.imageUrl,
            imageId: image.imageId,
            location: post.location,
            tags: tags,
        }
        );

        // Failed to update
        if (!updatedPost) {
        // Delete new file that has been recently uploaded
        if (hasFileToUpdate) {
            await deleteFile(image.imageId);
        }

        // If no new file uploaded, just throw error
        throw Error;
        }

        // Safely delete old file after successful update
        if (hasFileToUpdate) {
        await deleteFile(post.imageId);
        }

        return updatedPost;
    } catch (error) {
        console.log(error);
    }
}

export async function deletePost (postId : string , imageId : string){
    if(!postId || !imageId){
        throw Error;
    }
try {
    await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId
    )
    return {status : "res"}
} catch (error) {
    console.log(error);
    
}
}




export async function searchPosts(searchterm : string){
    
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.search('caption', searchterm)]
        )
        if(!posts) throw Error
        return posts
    } catch (error) {
        console.log(error);
        
    }
}

export async function getUserPosts(userId?: string) {
    if (!userId) return;

    try {
        const post = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
        );

        if (!post) throw Error;
        return post;
    } catch (error) {
        console.log(error);
    }
}

export async function getUserById(userId : string){
    try {
        const user = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            userId
        )
        if(!user) throw Error
        return user
    }catch(error){
        console.log(error);
        
    }
}


export async function getAllUsers(){
    try {
        const users = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId

        )

        if(!users) throw Error

        return users 
    } catch (error) {
        console.log(error);
        
    }
}

export async function updateProfile(user: IUpdateUser){
    const hasFileToUpdate = user.file.length > 0
    try {
        let image = {
            imageUrl: user.imageUrl,
            imageId : user.imageId
        }

        if(hasFileToUpdate){
            const uploadedFile = await uploadFile(user.file[0])
            if(!uploadFile) throw Error
            
    const fileUrl = await getFilePreview(uploadedFile?.$id||"");
        if (!fileUrl) {
            await deleteFile(uploadedFile?.$id||"");
            throw Error;
        }
            image = {...image ,imageUrl: fileUrl || "", imageId: uploadedFile?.$id||"" }
        }


    const updatedUser = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        user.userId,
        {
        name: user.name,
        bio: user.bio,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        }
    )
    if (!updatedUser) {
        if (hasFileToUpdate) {
            await deleteFile(image.imageId);
        }
        throw Error;
        }

        if (user.imageId && hasFileToUpdate) {
        await deleteFile(user.imageId);
        }

    return updatedUser;    
    } catch (error) {
        console.log(error);
        
    }
}