import { auth, db } from '../../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// Handle collections  
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'


function Post() {
  // router
  const router = useRouter()  
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
    const collectionRef = collection(db, 'posts') // get collection
    // add post to firestore
    await addDoc(collectionRef, {
      ...post,
      timestamp: serverTimestamp(),
      user: user.uid,
      username: user.displayName,
      avatar: user.photoURL,
    })
    // reset form
    setPost({
      description: '',
      timestamp: null
    })
    return router.push('/dashboard')
  }

  return (
    <div className='my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto'>
      
      <form  onSubmit={submitPost}>
        <h1 className='text-2xl font-bold'> Create a new post </h1>
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