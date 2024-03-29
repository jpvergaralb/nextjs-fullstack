import { FcGoogle } from 'react-icons/fc'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../../utils/firebase'
import { useRouter } from 'next/router'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect } from 'react'

function Login() {
  // Firebase hooks
  // If i ever need to use the user object, I can use the user variable
  const [user, loading] = useAuthState(auth) 

  // Redirect to home page if user is logged in
  const router = useRouter()

  // Sign in with Google
  const googleProvider = new GoogleAuthProvider()
  const GoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  // If a logged in user tries to access the login page, redirect them to the home page
  useEffect(() => {
    if (user) {
      router.push('/')
    } else {
      return
    }
  }, [user])

  return (
    <div className="mt-32 p-10 text-slate-300  border border-cool-dark-2 bg-cool-dark-2 bg-opacity-20 shadow-lg backdrop-blur- rounded-xl">
      <h2 className="text-2xl font-medium"> You Can Login Using Google </h2>

      <div className="py-4">
        <h3 className="py-4"> try it</h3>
        <button  onClick={GoogleLogin} className="text-[#f0f0f0] bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4"> 
        <FcGoogle className="mr-2 text-2xl" /> 
          Sign in with Google 
        </button>
      </div>
    </div>
  )
}

export default Login