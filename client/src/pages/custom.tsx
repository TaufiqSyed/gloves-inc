import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  Button,
  useColorMode,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { critz } from '../lib/percentileToZscore'
import { SliderPicker } from 'react-color'

import {
  bgColor,
  inputColor,
  primaryBorderColor,
  primaryComponentColor,
  secondaryComponentColor,
} from '../constants/colors'
import Gloves from '../components/Gloves'

// const Gloves = dynamic(() => import('../components/Gloves'), {
//   ssr: false,
//   loading: () => <div>loading...</div>,
// })

const Home = ({ sport: initialSport }) => {
  const [color, setColor] = useState(0x8a5f3b)
  const [count, setCount] = useState(0)
  const [hexCode, setHexCode] = useState(0xff0000)
  const [sport, setSport] = useState(initialSport)
  const [gender, setGender] = useState(null)
  const [size, setSize] = useState(50)
  const { colorMode } = useColorMode()

  useEffect(() => {
    document.body.style.backgroundColor = bgColor[colorMode]
    console.log(bgColor[colorMode])
  }, [colorMode])

  // useEffect(() => {}, [hexCode])

  const percentileToInches = percent => {
    const MEAN = gender == 'male' ? 19.48 : 18.15
    const SD = gender == 'male' ? 0.9213 : 0.9079

    return MEAN + SD * critz(percent / 100)
  }

  const handleChangeComplete = (color, event) => {
    // console.log(color.hex)
    setHexCode(color.hex)
  }

  return (
    <Flex>
      <Head>
        <title>Design your glove!</title>
      </Head>
      <Gloves hexCode={color} key={count} />
      <Box
        w='560px'
        h='600px'
        bgColor={primaryComponentColor[colorMode]}
        borderRadius='7px'
        p='26px'
        fontSize='17px'
        border={'1px solid ' + primaryBorderColor[colorMode]}
        m='70px 120px 0 auto'
        // position='absolute'
        // zIndex='2'
        // top='70px'
        // right='120px'
      >
        <Text fontSize='22px' fontWeight='bold' mb='20px'>
          Design your own glove
        </Text>
        <FormControl mb='20px'>
          <FormLabel>Sport</FormLabel>
          <Box
            border={'0.37px solid ' + inputColor[colorMode]}
            p='10px 20px 10px 10px'
            borderRadius='8px'
          >
            <RadioGroup onChange={setSport} value={sport}>
              <Radio value='skiing' m='0 10px'>
                Skiing
              </Radio>
              <Radio value='motorcycling' m='0 10px'>
                Motorcycling
              </Radio>
              <Radio value='baseball' m='0 10px'>
                Baseball
              </Radio>
              <Radio value='golf' m='0 10px'>
                Golf
              </Radio>
            </RadioGroup>
          </Box>
        </FormControl>
        <FormControl mb='20px'>
          <FormLabel>Gender</FormLabel>
          <Box
            border={'0.37px solid ' + inputColor[colorMode]}
            p='10px 20px 10px 10px'
            borderRadius='8px'
          >
            <RadioGroup onChange={setGender} value={gender}>
              <Radio value='male' m='0 10px'>
                Male
              </Radio>
              <Radio value='female' m='0 10px'>
                Female
              </Radio>
            </RadioGroup>
          </Box>
        </FormControl>

        {gender && (
          <FormControl mb='20px'>
            <FormLabel>Size</FormLabel>
            <Box
              border={'0.37px solid ' + inputColor[colorMode]}
              p='10px 20px 10px 20px'
              borderRadius='8px'
            >
              <Slider aria-label='slider-ex-6' onChange={val => setSize(val)}>
                <SliderMark value={25} mt='1' ml='-2.5' fontSize='xs'>
                  S
                </SliderMark>
                <SliderMark value={50} mt='1' ml='-2.5' fontSize='xs'>
                  M
                </SliderMark>
                <SliderMark value={75} mt='1' ml='-2.5' fontSize='xs'>
                  L
                </SliderMark>
                <SliderMark
                  value={size}
                  textAlign='center'
                  bg='blue.500'
                  color='white'
                  mt='-10'
                  ml='-5'
                  w='12'
                >
                  {percentileToInches(size).toFixed(1) + '"'}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </FormControl>
        )}
        <FormControl mb='20px'>
          <FormLabel>Color</FormLabel>
          <Box
            border={'0.37px solid ' + inputColor[colorMode]}
            p='10px 20px 10px 10px'
            borderRadius='8px'
          >
            <SliderPicker
              color={hexCode}
              onChangeComplete={handleChangeComplete}
            />
          </Box>
          <Button
            onClick={() => {
              console.log(hexCode)
              console.log(count)
              setColor(hexCode)
              setCount(count + 1)
            }}
          >
            Set color
          </Button>
        </FormControl>
      </Box>
    </Flex>
  )
}

Home.getInitialProps = async ctx => {
  // const router = useRouter()
  return { sport: ctx.query.sport }
}

export default Home
