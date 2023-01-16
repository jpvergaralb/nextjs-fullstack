// these two imports are needed for the logout
import {auth} from '../../utils/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// to fix the flashing data when redirecting 
//https://theodorusclarence.com/blog/nextjs-redirect-no-flashing
//https://stackoverflow.com/questions/70297964/next-js-how-to-prevent-flash-of-the-unauthorized-route-page-prior-to-redirect-w

function Dashboard() {
  // Firebase hooks
  const [user, loading] = useAuthState(auth)
  
  // Router
  const router = useRouter()

  const getData = async () => {
    if (loading) return (<h1> Loading... </h1>)
    if (!user) return router.push('/auth/login')

  }

  useEffect(() => {
    getData()
  }, [user, loading])

  return (
    <div>

    <h1> Your posts </h1>

    <div>
      <h2> Posts </h2>
    </div>

    <button onClick={() => {
      auth.signOut()
    }}> 
      Sign out 
    </button>

    </div>
  )
}

export default Dashboard