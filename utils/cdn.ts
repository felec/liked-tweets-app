export const cdn = (url: string) => {
  const regex = /\bliked-tweets-108136115.s3.amazonaws.com\b/;
  let cdn = url;
  cdn = cdn.replace(regex, 'liked-tweets.b-cdn.net');
  return cdn;
};
