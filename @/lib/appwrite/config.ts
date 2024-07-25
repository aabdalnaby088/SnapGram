import {Client , Account , Databases , Storage , Avatars} from 'appwrite'


// export const appwriteConfig = {
//     projectId : import.meta.env.VITE_APPWRITE_PROJECT_ID,
//     url : import.meta.env.VITE_APPWRITE_URL,
//     databaseId : import.meta.env.VITE_APPWRITE_DATABASE_ID,
//     storageId : import.meta.env.VITE_APPWRITE_STORAGE_ID,
//     userCollectionId : import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
//     postCollectionId : import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
//     savesCollectionId : import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID
// }
export const appwriteConfig = {
    projectId : '668695ac0026b33a226a',
    url : 'https://cloud.appwrite.io/v1',
    databaseId : '668f0ac8003b5a079e07',
    storageId : '668f0a4f0038e07a368e',
    userCollectionId : '668f0b51001891ba79ca',
    postCollectionId : '668f0b1900112863cf69',
    savesCollectionId : '668f0b51001891ba79ca'
}


export const client = new Client()
console.log(appwriteConfig.url);

client.setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectId);


// console.log(client.config.endpointRealtime);


export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)