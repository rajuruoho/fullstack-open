const listHelper = require("../utils/list_helper");
const { manyBlogs } = require('./blogsForTesting.js')

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("blog likes", () => {
    const result = listHelper.totalLikes(manyBlogs);
    expect(result).toBe(36);
  });
});

describe("Favorite Blog", () => {
  test("Favorite Blog is", () => {
    const result = listHelper.favoriteBlog(manyBlogs);
    expect(result).toEqual(manyBlogs[2]);
  });
});

describe("Most Blogs", () => {
  test("Most Blogs", () => {
    const result = listHelper.mostBlogs(manyBlogs);
    expect(result.auth).toEqual("Robert C. Martin");
    expect(result.blogs).toEqual(3);
  });
});

describe("Most Likes", () => {
  test("Most Likes", () => {
    const result = listHelper.mostLikes(manyBlogs);
    expect(result.auth).toEqual("Edsger W. Dijkstra");
    expect(result.likes).toEqual(17);
  });
});
