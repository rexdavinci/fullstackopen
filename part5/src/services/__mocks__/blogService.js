const blogs = [
  {
    id : '5dd5547e088cbe1384afbbb1',
    likes : 8,
    author : 'Johnny Chain',
    title : 'Title 1',
    url : 'www.google.com',
    user : {
      username: 'bigman1',
      name: 'Big Small Man',
      _id: '5dd355a2a1969d3b5c99baa6'
    }
  },
  {
    id : '5dd51394a1969d3b5c99bacf',
    likes : 15,
    author : 'Charles Darwin',
    title : 'Origin of Species',
    url : 'www.google.com',
    user : {
      username: 'bigman1',
      name: 'Big Small Man',
      _id: '5dd355a2a1969d3b5c99baa7'
    }
  },
  {
    id : '5dd55145088cbe1384afbbb0',
    likes : 10,
    author : 'Johnny Chain',
    title : 'Origin of Species',
    url : 'www.google.com',
    user : {
      username: 'bigman',
      name: 'Big Man Rex',
      _id: '5dd27283a1969d3b5c99ba88'
    }
  }
]

const getBlogs = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken)=> {
  return `bearer ${newToken}`
}

export default { getBlogs, setToken }