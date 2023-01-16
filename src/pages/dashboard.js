// these two imports are needed for the logout
import {auth} from '../../utils/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, doc, docRef, deleteDoc, orderBy } from 'firebase/firestore'
import { db} from '../../utils/firebase'
import Message from '@/components/message'
import {BsTrash2Fill} from 'react-icons/bs'
import {AiFillEdit} from 'react-icons/ai'
import {GoSignOut} from 'react-icons/go'

// to fix the flashing data when redirecting 
//https://theodorusclarence.com/blog/nextjs-redirect-no-flashing
//https://stackoverflow.com/questions/70297964/next-js-how-to-prevent-flash-of-the-unauthorized-route-page-prior-to-redirect-w

function Dashboard() {
  // state with all posts
  const [allPosts, setAllPosts] = useState([])

  // Firebase hooks
  const [user, loading] = useAuthState(auth)
  
  // Router
  const router = useRouter()

  // Delete posts
  const deletePost = async (id) => {
    const docRef = doc(db, 'posts', id)
    await deleteDoc(docRef)
  }


  const getData = async () => {
    if (loading) return (<h1> Loading... </h1>)
    if (!user) return router.push('/auth/login')
    // if user is logged in get all their posts
    if (user) {
      console.log(user)
      const collectionRef = collection(db, 'posts')
      const q = query(collectionRef, where('user', '==', user.uid), orderBy('timestamp', 'desc')) 
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setAllPosts(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      })
      return unsubscribe
    }
  }

  useEffect(() => {
    getData()
  }, [user, loading])

  return (
    <div>

    <h1> Your posts </h1>

    <div>
      {allPosts.map((post) =>
                          <Message key={post.id} {...post}>
                              <div className='flex flex-start items-center my-3 '> 
                                <button className='flex items-center gap-3 px-4  bg-gradient-to-r from-indigo-400 to-slate-600 rounded-md p-1 text-[#f0f0f0]' onClick={() => deletePost(post.id)}> Delete <BsTrash2Fill className='text-md' /> </button> 
                                <button className='flex items-center gap-3 px-4 mx-4 bg-gradient-to-r from-indigo-400 to-slate-600 rounded-md p-1 text-[#f0f0f0]' onClick={() => { }}> Edit <AiFillEdit/></button> 
                              </div>
                            </Message>
                              )}
    </div>

    <button onClick={() => {
      auth.signOut()
    }}
      className="flex items-center gap-3 p-2 bg-slate-900 rounded-md text-[#f0f0f0] my-10 "> 
      Sign out 
      <GoSignOut className='text-md' />
    </button>

    </div>
  )
}

export default Dashboard