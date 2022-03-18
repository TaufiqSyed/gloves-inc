import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const Gloves = dynamic(() => import('../components/Gloves'), {
  ssr: false,
  loading: () => <div>loading...</div>,
})

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>🎃 HAPPY HALLOWEEN 2021 🎃</title>
      </Head>
      <Gloves />
    </div>
  )
}

export default Home
