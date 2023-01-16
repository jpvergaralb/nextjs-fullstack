import '@/styles/globals.css'
import Layout from '@/components/layout'
//Notifications and their styles
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }) {
  return( 
    <Layout>
      <ToastContainer  limit={1}/>
      <Component {...pageProps} />
    </Layout>
  )
}
