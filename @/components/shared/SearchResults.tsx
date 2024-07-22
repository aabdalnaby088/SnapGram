import Loader from "./Loader";
import GridPostList from "./GridPostList";



type SearchResultsProps = {
    isSearchFetching:boolean;
    searchedPosts : any
}

export default function SearchResults({isSearchFetching,searchedPosts} : SearchResultsProps) {

if (isSearchFetching){
    return(
        <Loader/>
    )
}

if(searchedPosts?.length>0){
    
    return (
        <GridPostList posts={searchedPosts}/>
    )
}

    return (
        <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    )
}
