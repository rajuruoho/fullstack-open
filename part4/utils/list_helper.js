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

const mostBlogs = (blogs) => {
  const map1 = new Map();

  blogs.map(blog => map1.set(blog.author, (map1.get(blog.author) ? map1.get(blog.author) : 0) + 1));

  let returnObj = { auth:"", blogs:0};
  map1.forEach((value, key) => {
    if (value > returnObj.blogs)
      returnObj = { auth:key, blogs:value };
  });
  return returnObj;
}

const mostLikes = (blogs) => {
  const map1 = new Map();

  blogs.map(blog => map1.set(blog.author, (map1.get(blog.author) ? map1.get(blog.author) : 0) + blog.likes));

  let returnObj = { auth:"", likes:0};
  map1.forEach((value, key) => {
    if (value > returnObj.likes)
      returnObj = { auth:key, likes:value };
  });
  return returnObj;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
