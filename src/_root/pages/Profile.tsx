    import { useUserContext } from "@/context/AuthContext";
    import { Link, useParams } from 'react-router-dom';
    import { useGetUserById } from '../../../@/lib/react-query/queriesAndMutations';
    import GridPostList from "../../../@/components/shared/GridPostList";
    import Loader from "../../../@/components/shared/Loader";
import {Helmet} from "react-helmet";
    export default function Profile() {
    const { id } = useParams();
    const { user } = useUserContext();
    const { data: currentUser, isLoading } = useGetUserById(id || user.id);

    if (isLoading) {
        return <Loader />;
    }

    if (!currentUser) {
        return <div>User not found</div>;
    }

    return (
<>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Snapgram | Profile {currentUser.name}</title>
            </Helmet>

        <div className="profile-container">
        <div className="profile-inner_container">
            <div className="flex xl:flex-row flex-col gap-7">
            <img
                src={currentUser.imageUrl || "/SnapGram/assets/icons/profile-placeholder.svg"}
                alt="user profile picture"
                width={80}
                height={80}
                className="rounded-full"
            />
            </div>
            <div className="flex flex-col flex-1 w-full">
            <div className="flex-between w-full ">
                <div className="flex flex-col">
                <h2 className="h3-bold md:h2-bold">{currentUser.name}</h2>
                <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">@{currentUser.userName}</p>
                </div>
                {user.id === currentUser.$id && (
                <Link to={`/update-profile/${currentUser.$id}`} className="h-8 bg-dark-4 px-4 text-light-1 flex-center gap-2 rounded-lg">
                    <img src="/SnapGram/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                    <p className="small-regular text-light-3">Edit profile</p>
                </Link>
                )}
            </div>
            <div className="flex flex-col pl-8 pt-2">
                <p className="small-semibold lg:body-bold text-primary-500 pl-3">{currentUser.posts.length}</p>
                <p className="small-medium lg:base-medium text-light-2">Posts</p>
            </div>
            </div>
        </div>
        <h2 className="h3-bold md:h2-bold">posts</h2>
        <div>
            {currentUser.posts.length > 0 ? (
            <GridPostList posts={currentUser.posts} showUser={false} />
            ) : (
            <h4 className="text-light-3 h5-bold md:h4-bold">No Posts from {currentUser.name}</h4>
            )}
        </div>
        </div>
</>
    );
    }