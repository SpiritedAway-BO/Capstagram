
import Axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Get currentUserId from context API (firebase)

export default function useUsers() {
  const queryClient = useQueryClient();

  const getUsers = () => {
    return new Promise((resolve, reject) => {
      resolve([1, 2])
    })
  }
}