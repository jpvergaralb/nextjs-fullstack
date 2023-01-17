import { auth, db } from '../../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// Handle collections from db in firestore
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore'
// Notifications
import { toast } from 'react-toastify'


function Post() {
  // router
  const router = useRouter()  
  // data when updating
  const routeData = router.query
  //user auth state
  const [user, loading] = useAuthState(auth)
  //form state
  const [post, setPost] = useState({
    description: ''
  })
  //constant 
  const maxLength = 500
  // submit post to firestore 
  const submitPost = async (e) => {
    // prevent refresh
    e.preventDefault()
    // check if description is empty
    if(!post.description.length) {
      return toast.error('Description is required.', {
        position: 'top-center',
        autoClose: 3000,
      }) 
    }
    // check if description is too long
    if(post.description.length > maxLength) {
      return toast.error(`Description is too long. Max length is ${maxLength} characters.`, {
        position: 'top-center',
        autoClose: 3000,
      })
    }
    // if post exists then update it
    if (post.id) {
      // update post
      const docRef = doc(db, 'posts', post.id)
      await updateDoc(docRef, {
        description: post.description,
        timestamp: serverTimestamp(),
      })
      toast.success('Post updated successfully.', {
        position: 'top-center',
        autoClose: 3000,
      })
      return router.push('/dashboard')
    }
    else {
      const collectionRef = collection(db, 'posts') // get collection
      // add post to firestore
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        username: user.displayName,
        avatar: user.photoURL,
    })}
    // reset form
    setPost({
      description: '',
      timestamp: null
    })
    toast.success('Post created successfully.', {
      position: 'top-center',
      autoClose: 3000,
    })
    return router.push('/dashboard')
  }

  // check user if he wants to update post
  //first we check user is logged in
  const checkUser = () => {
    if (loading) return (<h1> Loading... </h1>)
    if (!user) return router.push('/auth/login')
    // if user is logged in check if he wants to update post
    if (routeData.id) {
      setPost({
        description: routeData.description,
        timestamp: routeData.timestamp,
        id: routeData.id
      })
      }
    }
  
  useEffect(() => {
    checkUser()
  }, [user, loading])

  return (
    <div className='my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto'>
      
      <form  onSubmit={submitPost}>
        <h1 className='text-2xl font-bold'> 
        { post.id ? "Edit your post" : "Create a new post "}
        </h1>
        <div> 
          <h3 className='text-lg font-medium py-2'> Description </h3>
          <textarea value={post.description} onChange={(e) => setPost({...post, description: e.target.value})} className='bg-slate-800 text-white rounded-lg w-full h-48 p-2'/> 
          <p className={`text-sm font-medium ${post.description.length > 500 ? 'text-red-600 font-bold' : ''}`}> 
            {post.description.length}/{maxLength}
          </p>
        </div>
        <button type="submit" className='w-full p-2 my-4 rounded-lg shadow-lg'> Submit </button>
      </form>

    </div>
  )
}

export default Post