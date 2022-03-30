import { useState, useEffect } from 'react'
import styles from '../src/App.css'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import AddPost from './pages/AddPost/AddPost'
import PostList from './pages/PostList/PostList'
import EditPost from './pages/EditPost/EditPost'
import * as postService from './services/postService'
import PostDetails from './pages/PostDetails'
import BucketList from './pages/BucketList/BucketList'
import * as bucketlistService from './services/bucketlistService'



const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }


  // const handleAddPost = newPostData => {
  //   console.log('NEW POST DATA', newPostData)
  //   postService.create(newPostData)
  //   .then(newPost => setPosts([...posts, newPost]))
  //   navigate('/')
  // }

  const handleAddPost = async(data) => {
    console.log('NEW POST DATA', data)
    const newPost = await postService.create(data)
    console.log(newPost)
    setPosts([...posts, newPost])
    navigate('/')
  }

  const handleDeletePost = async (postId) => {
    console.log('oneParamId', postId)
    try {
      await  postService.deletePost(postId)
      //filter through postsState, only return the posts
      //where _id does not match postId
      setPosts(posts.filter((post) => post._id !== postId))
      navigate('/')
    } catch (error) {
      throw error
    }
  }


  useEffect(() => {
    postService.getAll()
    .then(allPosts => {
      setPosts(allPosts)
    }) 
  }, [])

  const handleUpdate = updatedPostData => {
    
    const newPostArray = posts.map(post => 
      post._id === updatedPostData._id ? updatedPostData : post
    )
    setPosts(newPostArray)
		navigate('/')
  }


  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<PostList posts={posts} />}/>
        <Route path="/addPost" element={<AddPost handleAddPost={handleAddPost}/>} />
        <Route path="/post/:id" element={<PostDetails user={user} handleDeletePost={handleDeletePost} />}/>
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={user ? <Profiles /> : <Navigate to="/login" />}
        />
        <Route
          path="/changePassword"
          element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin} /> : <Navigate to="/login" />}
        />
        <Route path='/edit' element={<EditPost handleUpdate={handleUpdate}/>}/>
        <Route path="/createBucketList" element={<BucketList />}/>
      </Routes>
    </>
  )
}

export default App
