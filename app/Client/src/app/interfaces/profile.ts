export interface Profile {
  id: number;
  user_id: number;
  nickname: string;
  profile_picture_route: string;
  interests: string | null;
  rating: number | null;
  created_at: string;
  updated_at: string;
}
