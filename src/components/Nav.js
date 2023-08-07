import Link from 'next/link'
// Note: if i ever need to use the user object, I must import the auth object from firebase and use the useAuthState hook
import { auth } from '../../utils/firebase'
import { useAuthState  } from 'react-firebase-hooks/auth'
import {GoSignOut} from 'react-icons/go'

import Image from 'next/image'



function Nav() {
  // Firebase hooks
  const [user, loading] = useAuthState(auth)


  return (
    <div className="flex justify-between items-center py-10 text-slate-200">
      <Link href="/">
      <button className='text-lg font-medium'> Twutter </button>
      </Link>

      <ul className='flex items-center gap-10'>
        {!user &&  (<Link href={"/auth/login"}>
          <button className='py-2 px-4 text-sm  bg-cool-dark-2 bg-opacity-50 shadow-lg backdrop-blur-md rounded-xl text-slate-200 font-medium ml-8'> 
            Sign in
          </button>
        </Link>)}

        {user && (
          <div className="flex items-center gap-6">

          <Link href="/dashboard" className='flex items-center'>
            <Image src={user.photoURL} width={60} height={65} className='rounded-full' alt="u shouldn't see this"/> 
            <h3 className='mx-2'> {user.displayName} </h3>
          </Link>

          <Link href="/post">
            <button className='py-2 px-4 text-sm bg-cool-dark-2 bg-opacity-50 shadow-lg backdrop-blur- rounded-xl text-slate-200 font-medium'>
              Post
            </button>
          </Link>

          <button onClick={() => {
          auth.signOut()
        }}
          className='flex justify-around items-center py-2 px-4 text-sm bg-cool-dark-2 bg-opacity-50 shadow-lg backdrop-blur-md rounded-xl text-slate-200 font-medium'>
          Sign out 
          <GoSignOut className='text-md ml-2' />
        </button>

          </div>


        )}

      </ul>
    </div>
  )
}

export default Nav