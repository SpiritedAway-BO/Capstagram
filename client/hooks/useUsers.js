
import Axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Get currentUserId from context API (firebase)

export default function useUsers() {
  const queryClient = useQueryClient();

  // Get all users
  const getUsers = () => {
    return new Promise((resolve, reject) => {
      resolve([1, 2])
    })
  }

  const getAll = useQuery(['users'], getUsers, {
    select: (fetchResponse) => fetchResponse.data
  });

  // Get one user's info


  // Add user
  const postUser = () => {
    return new Promise((resolve, reject) => {
      resolve([1, 2])
    })
  }

  const add = useMutation(['users'], (data) => postUser(data), {
      onSuccess: () => {
        // Invalidate and automatically refetch friends where useQuery subscribes to friends
        queryClient.invalidateQueries(['users']);
      }
  })
}