export type NewTweet = {
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
  media: NewMedia[];
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
};

export type TweetUser = {
  name: string;
  screen_name: string;
  verified: boolean;
  followers_count: number;
  friends_count: number;
  favorites_count: number;
  profile_image_url_https: string;
};

export type LoginUser = {
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  description: string;
  url: string;
  protected: false;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  created_at: string;
  favourites_count: number;
  verified: false;
  statuses_count: number;
  profile_image_url_https: string;
  default_profile: boolean;
  default_profile_image: boolean;
  follow_request_sent: boolean;
};

export type NewMedia = {
  aspect_ratio: number[];
  duration_millis: number;
  id_str: string;
  size: number[];
  thumb: string;
  type: string;
  url: string;
};
