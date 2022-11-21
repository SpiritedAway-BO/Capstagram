
import Axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Get currentUserId from context API (firebase)

const queryClient = useQueryClient()

export default function useUsers() {
  const getUsers = () => {}
}