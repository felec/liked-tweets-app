export interface New_Tweet {
  category: string;
  created_at: string;
  default_profile: boolean;
  default_profile_image: boolean;
  description: string;
  favorite_count: number;
  followers_count: number;
  friends_count: number;
  id_str: string;
  is_quote_status: boolean;
  media: New_Media[];
  name: string;
  profile_image_url_https: string;
  q_created_at: string;
  q_default_profile?: boolean;
  q_default_profile_image?: boolean;
  q_description?: string;
  q_favorite_count?: number;
  q_followers_count?: number;
  q_friends_count?: number;
  q_name?: string;
  q_profile_image_url_https?: string;
  q_retweet_count?: number;
  q_screen_name?: string;
  q_full_text?: string;
  q_verified?: boolean;
  retweet_count: number;
  screen_name: string;
  source?: string;
  place: string;
  full_text: string;
  url: string;
  verified: boolean;
}

export interface New_Media {
  aspect_ratio: number[];
  duration_millis: number;
  id_str: string;
  size: number[];
  thumb: string;
  type: string;
  url: string;
}
