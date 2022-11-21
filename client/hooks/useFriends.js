import Axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Get currentUserId from context API (firebase)

const queryClient = useQueryClient()


export const useFriends = () => {
  const getFriends = () => {
    return Axios.get(`http://localhost:3000/users/${currentUserId}/friends`)
  }

  const get = useQuery('friends', getFriends, {
    select: (fetchResponse) => fetchResponse.data,
  });


  // POST add friend
  const postFriend = (data) => {
    return Axios.post(`http://localhost:3000/users/${currentUserId}/friends`, data)
  }

  const add = useMutation('friends', (data) => postFriend(data), {
    onSuccess: () => {
      // Invalidate and automatically refetch friends where useQuery subscribes to friends
      queryClient.invalidateQueries('friends')
    }
  })

  return {
    get,
    add
  }
}
