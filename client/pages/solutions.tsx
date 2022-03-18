import { Stack } from '@chakra-ui/layout'
import { Box, useColorMode } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { IUser } from '../constants/interfaces'

import Navbar from '../components/Navbar'
import axios from 'axios'
import { useRouter } from 'next/router'
import { bgColor } from '../constants/colors'

const Solutions = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<IUser | null>(null)
  const { colorMode } = useColorMode()
  const router = useRouter()

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/v1/auth/user', {
        withCredentials: true,
      })
      .then(response => {
        setUser(response.data.user)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const logOut = async () => {
    try {
      await axios.delete('http://localhost:3001/api/v1/auth', {
        withCredentials: true,
      })
      router.reload()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    document.body.style.backgroundColor = bgColor[colorMode]
    console.log(bgColor[colorMode])
  }, [colorMode])

  return (
    <Box height='100vh'>
      <Navbar user={user} logOut={logOut} url={router.asPath} />
    </Box>
  )
}

export default Solutions
