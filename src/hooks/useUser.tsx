/*
 * useUser is a custom hook to fetch data from the API 'user' endpoint
 * and returns properties and functions to handle the fetched data.
*/

import useSWR from 'swr'


// The fetcher function takes a URL as an argument 
// and fetches data from that URL then parses the response as JSON.
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useUser() {
  // useSWR is used to fetch data from api/user using the fetcher function
  const { data, mutate } = useSWR('/api/user', fetcher);

  const user = data?.user;
  const barangay = data?.barangay;
  const isLoggedIn = Boolean(user);

  return {
    user,
    barangay,
    data,
    isLoggedIn,
    mutate, // The mutate function from useSWR 
    // manually triggers re-fetch of data
  };
}