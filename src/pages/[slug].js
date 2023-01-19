// whatever url you type in, it will be the slug. So this works as a dynamic route
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Message from '@/components/message'
import {auth, db} from '../../utils/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify'
import { collection, query, where, onSnapshot, doc, docRef, deleteDoc, orderBy, updateDoc, arrayUnion, getDoc } from 'firebase/firestore'
import Image from 'next/image'

function Details() {
  const router = useRouter()
  const routeData = router.query
  const [message, setMessage] = useState('')
  const [allMessages, setAllMessages] = useState([])

  const submitMessage = async () => {
    //check if user is logged in
    if (!auth.currentUser) return toast.error('You must be logged in to comment') // q: whats stored in auth.currentUser?  a: the user object from firebase auth (email, uid, etc) 
    if (!message) return toast.error('You must enter a message', {position: toast.POSITION.TOP_CENTER, autoClose: 3000}) 
    // if user is logged in, add message to db
    const docRef = doc(db, 'posts', routeData.id)
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        user: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        timestamp: Date.now()
      })
    })
    setMessage('')
    toast.success('Comment added', {position: toast.POSITION.TOP_CENTER, autoClose: 3000})
  }
  
  // get all comments
  const getComments = async () => {
    const docRef = doc(db, 'posts', routeData.id)
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data().comments);
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [router.isReady]);

  return (
    <div>
      <Message {...routeData}></Message>

      <div>
        <div className='flex'>
          <input className='bg-slate-800 text-white fond-medium p-2 w-full shadow-md rounded-md' type={"text"} placeholder={"Add a comment"} value={message} onChange={(e) => setMessage(e.target.value) }/>
          <button onClick={submitMessage} className='bg-gradient-to-r from-indigo-900 to-slate-900 mx-2 text-white font-medium p-2 rounded-md'> Submit </button>
        </div>

        <div>
          <h2 className='my-5 font-medium'> Comments </h2>
          <h2 className='my-5 bg-gradient-to-r from-gray-900 to-slate-900 text-white font-medium p-2 rounded-md'> 
            {allMessages?.map((message) => (
              <div key={message.id} className="p-4">
                <div className='flex items-center flex-start'>
                <Image src={message.avatar} height={32} width={32} alt="avatar" className="rounded-full" />
                <h1 className='mx-2'> {message.user} </h1>
                </div>
    
                <div className='font-light p-2 my-2'> 
                  {message.message}
                </div>
              </div>
            ))}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Details