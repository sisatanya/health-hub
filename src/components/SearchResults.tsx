// src/components/SearchResults.tsx
import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';
interface Profile {
  id: number;
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
}

const SearchResults: React.FC = () => {
  const { user } = useUser();
  const [searchResults, setSearchResults] = useState<Profile[]>([]);

  if (!searchResults || searchResults.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <ul>
      {user.map((result: { id: React.Key | null | undefined; username: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; firstName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; lastName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
        <li key={result.id}>
          <p>Username: {result.username}</p>
          <p>First Name: {result.firstName}</p>
          <p>Last Name: {result.lastName}</p>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;