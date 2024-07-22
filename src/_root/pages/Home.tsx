import { useGetRecentPosts } from '../../../@/lib/react-query/queriesAndMutations'
import Loader from '../../../@/components/shared/Loader'
import { Models } from 'appwrite'
import PostCard from '../../../@/components/shared/PostCard'
import {Helmet} from "react-helmet";
export default function Home() {
    const {data : posts , isPending : isPostLoading } = useGetRecentPosts()
    return (
        <div className='flex flex-1'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Snapgram | Home</title>
            </Helmet>
            <div className='home-container'>
                <div className='home-posts'>
                    <h2 className='h3-bold md:h2-bold text-left w-full'>
                        Home Feed
                    </h2>
                    {isPostLoading&&!posts ? (
                        <Loader/>
                    ):
                    (
                        <ul className='flex flex-col flex-1 gap-9 w-full'> 
                            {
                                posts?.documents.map((post : Models.Document) => (
                                    <li key={post.$id}>
                                        <PostCard post={post}/>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                    
                    }
                </div>
            </div>
        </div>
    )
}
