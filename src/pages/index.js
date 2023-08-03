import Head from 'next/head'
import Link from 'next/link'
//Message component
import Message from '../components/message'
// hooks
import { useEffect, useState } from 'react'
//db from firebase | onSnapshot to listen to changes and update state in real time
import { db } from '../../utils/firebase'
import { collection, query, onSnapshot, orderBy} from 'firebase/firestore'

export default function Home() {
  // state with all posts
  const [allPosts, setAllPosts] = useState([])

  // get all posts from firestore
  const getPosts = async () => {
    const collectionRef = collection(db, 'posts')
    const q = query(collectionRef, orderBy('timestamp', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setAllPosts(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
    })
    return unsubscribe
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <Head>
        <title>Nextjs fullstack</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='my-12 text-lg font-medium '>
        <h2 className='text-2xl mb-5 text-start text-slate-200'> See what other people are saying </h2>
        {allPosts.map((post) => 

        <Message key={post.id} {...post}> 
          <Link href={{pathname:`/${post.id}`, query: {...post}}}>
            <button className='text-sm text-indigo-200 hover:underline'> {post.comments?.length ? post.comments.length : "0"} comments</button>
          </Link>
        </Message>
         )}
      </div>
    </>
  )
}
