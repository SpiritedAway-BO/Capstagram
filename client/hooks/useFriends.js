import Axios from 'axios';
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Get currentUserId from context API (firebase)




export default function useFriends() {

  const queryClient = useQueryClient();

  const getFriends = () => {
    //return Axios.get(`http://localhost:3000/users/${currentUserId}/friends`)
    return new Promise((resolve, reject) => {
      resolve([1, 2]);
    });
  };

  const get = useQuery(['friends'], getFriends, {
    select: (fetchResponse) => fetchResponse.data
  });


  // POST add friend
  const postFriend = (data) => {
    //return Axios.post(`http://localhost:3000/users/${currentUserId}/friends`, data)
    return new Promise((resolve, reject) => {
      resolve([1, 2]);
    });
  };

  const add = useMutation(['friends'], (data) => postFriend(data), {
    onSuccess: () => {
      // Invalidate and automatically refetch friends where useQuery subscribes to friends
      queryClient.invalidateQueries(['friends']);
    }
  });

  return {
    get,
    add
  };
}
