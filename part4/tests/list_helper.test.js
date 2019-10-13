const listHelper = require('../utils/list_helper') // Require Test helper functions

// Define various variables to be acquired by test conditions

const listWithNoBlog = []

const listWithOneBlog = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }
]

const listWithManyBlogsAndOneFavorite = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  }
]

const listWithMoreThanOneTopBlogger = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17f6",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422b899b54a676234d17f1",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  }
]

const listWithOneBlogButNoLikes = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 0,
    __v: 0
  }
]

const listWithManyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  },
  {
    _id: "5a4227c61b54a676234d17fc",
    title: "Getting Started",
    author: "Facebook Inc",
    url: "https://jestjs.io/docs/en/getting-started.html",
    likes: 12,
    __v: 0
  }    
]




// TESTS

// Dummy test
test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1) 
})

// Total Likes
describe('total likes', ()=>{
  test('of empty list is zero', () =>{
    expect(listHelper.totalLikes(listWithNoBlog)).toBe(0)
  })

  test('when list has only one blog equals the likes of that', ()=>{
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(7)
  })

  test('of a bigger list is calculated right', ()=>{
    expect(listHelper.totalLikes(listWithManyBlogs)).toBe(48)
  })

})

// Favorite Blog
describe('favorite blog', ()=>{
  test('of empty list is none', () =>{
    const empty ={}
    expect(listHelper.favoriteBlog(listWithNoBlog)).toEqual(empty)
  })

  test('of one blog with no likes is none', ()=>{
    const result = {}
    expect(listHelper.favoriteBlog(listWithOneBlogButNoLikes)).toEqual(result)
  })

  test('of one blog with likes equal to itself', ()=>{
    const result = {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7
    }
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(result)
  })

  test('of a bigger list is the blog with the most likes', ()=>{
    const result = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
    expect(listHelper.favoriteBlog(listWithManyBlogsAndOneFavorite)).toEqual(result)
  })

  test('of list with more than one equally-liked blogs is one of the most liked blogs', ()=>{
    const result = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
    expect(listHelper.favoriteBlog(listWithManyBlogs)).toEqual(result)
  })

})

// Author with with most blogs
describe('most blogs', ()=>{
  test('of empty list is empty', ()=>{
    const result = {}
    expect(listHelper.mostBlogs(listWithNoBlog)).toEqual(result)
  })

  test('of one blog is itself', ()=>{
    const result = {
      author: 'Michael Chan',
      blogs: 1
    }
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(result)
  })

  test('of many blogs is the top blogger', ()=>{
    const result = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(listHelper.mostBlogs(listWithManyBlogs)).toEqual(result)
  })
  test('of more than one top blogger is at least one of them', ()=>{
    const result = {
      author: 'Edsger W. Dijkstra',
      blogs: 2
    }
    expect(listHelper.mostBlogs(listWithMoreThanOneTopBlogger)).toEqual(result)
  })  
})

// Author with with most likes
describe('most likes', ()=>{
  test('of empty list is empty', ()=>{
    const result = {}
    expect(listHelper.mostLikes(listWithNoBlog)).toEqual(result)
  })

  test('of one blog is itself', ()=>{
    const result = {
      author: 'Michael Chan',
      likes: 7
    }
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual(result)
  })
  
  test('of more than one top blogger is at least one of them', ()=>{
    const result = {
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(listHelper.mostLikes(listWithManyBlogs)).toEqual(result)
  })  

  test('of one blog with no likes is empty', ()=>{
    const result = {}
    expect(listHelper.mostLikes(listWithOneBlogButNoLikes)).toEqual(result)
  })  

})
