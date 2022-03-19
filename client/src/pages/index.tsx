import { Box, useColorMode } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { IUser } from '../constants/interfaces'
import { Text } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useRouter } from 'next/router'
import { bgColor } from '../constants/colors'
import GlovesArray from '../components/GlovesArray'

const Index = () => {
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
    <Box>
      <Navbar user={user} logOut={logOut} url={router.asPath} />
      <Flex id='home' mt='100px' flexWrap='wrap' h='100vh'>
        <Box display='inline-block' w='800px' ml='120px' mt='60px' mb='50px'>
          <Text fontSize='110px' fontWeight='bold'>
            Gloves Inc.
          </Text>
          <Text fontSize='70px' mt='50px'>
            {"Design the glove you'll love."}
          </Text>
        </Box>
        <Box display='inline-block' w='100px'></Box>
        <Box w='calc(100%-800px)' h='auto' display='inline-block'>
          <Image
            src='/black_glove.png'
            alt='black glove'
            m='0 auto 0 auto'
            w='330px'
            h='auto'
          />
        </Box>
      </Flex>
      <Box id='products'>
        <Text fontSize='31px'>Our Signature Collection</Text>
        <GlovesArray sport='skiing' />
      </Box>
    </Box>
  )
}

export default Index
