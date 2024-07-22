import {  useState } from "react";
import { Input } from "../../../@/components/ui/input";
import SearchResults from "../../../@/components/shared/SearchResults";
import GridPostList from "../../../@/components/shared/GridPostList";
import { useGetRecentPosts, useSearchPosts } from "../../../@/lib/react-query/queriesAndMutations";
import useDebounce from "../../../@/Hooks/useDebounce";
import Loader from "../../../@/components/shared/Loader";
import { Helmet } from "react-helmet";

export default function Explore() {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: posts, isLoading: isPostsLoading } = useGetRecentPosts();
    const debouncedValue = useDebounce(searchQuery, 500);

    const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedValue);

    if (isPostsLoading) {
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );
    }
// console.log(posts?.documents);

    const showSearchResults = searchQuery !== '';
    const shouldShowPosts = posts && posts.documents.length > 0;
// console.log(showSearchResults);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Snapgram | Explore</title>
            </Helmet>

            <div className="explore-container">
                <div className="explore-inner_container">
                    <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
                    <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
                        <img src="/SnapGram/assets/icons/search.svg" alt="search" width={24} height={24} />
                        <Input
                            type="text"
                            placeholder="Search"
                            className="explore-search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-between w-full max-w-5xl mt-16 mb-7">
                    <h3 className="body-bold md:h3-bold">Popular Today</h3>
                    <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
                        <p className="small-medium md:base-medium text-light-2">All</p>
                        <img src="/SnapGram/assets/icons/filter.svg" alt="filter" width={20} height={20} />
                    </div>
                </div>
                <div className="flex flex-wrap gap-9 w-full max-w-5xl">
                    {showSearchResults ? (
                        <SearchResults
                            isSearchFetching={isSearchFetching}
                            searchedPosts={searchedPosts?.documents} 
                        />
                    ) : (
                        shouldShowPosts ? (
                            
                            // posts?.documents.map((item, i) => <GridPostList key={`post-${i}`} posts={item} />)
                            <GridPostList posts={posts?.documents} />
                        ) : (
                            <p className="text-light-4 mt-10 text-center">End of Posts</p>
                        )
                    )}
                </div>
            </div>
        </>
    );
}
