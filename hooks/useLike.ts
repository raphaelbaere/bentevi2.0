import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModel from "./useLoginModel";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { toast } from "react-hot-toast";
import axios from "axios";

const useLike = ({ postId, userId}: { postId: string, userId?: string}) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedPost, mutate: mutatedFetchedPost } = usePost(postId);
    const { mutate: mutatedFetchedPosts } = usePosts(userId);

    const loginModal = useLoginModel();

    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likedIds || [];

        return list.includes(currentUser?.id)
    }, [currentUser?.id, fetchedPost?.likedIds]);

    const toggleLike = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (hasLiked) {
                console.log(postId, 'postId')
                request = () => axios.delete('/api/like', { params: { postId } });
            } else {
                console.log(postId, 'postId')
                request = () => axios.post('/api/like', { postId });
            }

            await request();
            mutatedFetchedPost;
            mutatedFetchedPosts();

            toast.success('Success!');
        } catch(error) {
            toast.error('Something went wrong.')
        }
    }, [currentUser, hasLiked, mutatedFetchedPost, mutatedFetchedPosts, loginModal, postId]);

    return {
        hasLiked,
        toggleLike
    }
}

export default useLike;