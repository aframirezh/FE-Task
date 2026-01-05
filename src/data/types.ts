/**
 * Types for API responses and user data.
 * Creating this structure becausse I know the API response format.
 */
export type ApiUser = {
  id: string;
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  job: {
    title: string;
    descriptor?: string;
    area?: string;
    type?: string;
    company?: string;
  };
  location: {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
};

/**
 * Response structure from the users API.
 */
export type UsersResponse = {
  result: ApiUser[];
};

/**
 * Simplified user item for use in the UserCard component.
 */
export type UserListItem = {
  id: string;
  fullName: string;
  jobTitle: string;
  address: string;
};

