import axios from 'axios';

export const likedTweets = axios.create({
  baseURL: 'https://peaceful-reef-54258.herokuapp.com/api/v1/',
});
