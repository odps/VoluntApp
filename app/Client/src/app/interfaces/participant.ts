export interface Participant {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
  pivot?: {
    event_id: number;
    user_id: number;
    joined_at: string;
  };
}
