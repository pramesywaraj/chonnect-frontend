export interface User {
  id: string;
  name: string;
  email: string;
  description?: string;
  profile_image?: string | null;
  joined_at: string;
}

export interface FetchUsersParams {
  limit?: number;
  before?: string;
  search?: string;
}
