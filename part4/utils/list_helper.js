const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  let totalLikes = 0;
  for (let i = 0; i < blogs.length; i++) {
    totalLikes += blogs[i].likes;
  }
  return totalLikes;
};

const favoriteBlog = (blogs) => {
  let favorite = blogs[0];

  if (blogs.length === 1) return;

  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > favorite.likes)
    favorite = blogs[i];
  }
  return favorite;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
