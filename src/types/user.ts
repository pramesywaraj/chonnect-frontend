export interface User {
  id: string;
  name: string;
  email: string;
  description?: string;
  profile_image?: string | null;
  joined_at: string;
}
