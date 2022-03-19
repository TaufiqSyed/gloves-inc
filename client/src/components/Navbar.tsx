import {
  Box,
  Image,
  useColorMode,
  Text,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  MenuGroup,
  MenuDivider,
  Link,
} from '@chakra-ui/react'
import { MdPerson, MdExpandMore } from 'react-icons/md'
import { IoPersonCircle, IoChevronDown } from 'react-icons/io5'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import React from 'react'
import { IUser } from '../constants/interfaces'
import { primaryBorderColor, primaryComponentColor } from '../constants/colors'
import LoginFormModal from './LoginFormModal'
import RegisterFormModal from './RegisterFormModal'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

const Navbar: React.FC<{
  user: IUser | null
  logOut: () => void
  url: string
}> = ({ user, logOut, url }) => {
  const { colorMode } = useColorMode()

  const router = useRouter()

  return (
    <Flex
      bgColor={primaryComponentColor[colorMode]}
      h='56px'
      w='100%'
      position='fixed'
      top='0'
      right='0'
      alignItems='center'
      borderBottom='1px solid'
      borderColor={primaryBorderColor[colorMode]}
      zIndex='4'
    >
      <Text
        m='5px 30px 0 80px'
        pb='3px'
        boxSizing='border-box'
        borderBottom='1px solid rgba(0,0,0,0)'
        fontWeight={url === '/solutions' ? 'bold' : 'normal'}
        _hover={{ borderBottom: '1px solid white' }}
      >
        Gloves Inc.
      </Text>
      <NextLink href='/' passHref>
        <Link
          m='5px 30px 0 auto'
          pb='3px'
          boxSizing='border-box'
          borderBottom='1px solid rgba(0,0,0,0)'
          fontWeight={url === '/' ? 'bold' : 'normal'}
          _hover={{ borderBottom: '1px solid white' }}
        >
          Home
        </Link>
      </NextLink>
      <NextLink href='/solutions' passHref>
        <Link
          m='5px 30px 0 30px'
          pb='3px'
          boxSizing='border-box'
          borderBottom='1px solid rgba(0,0,0,0)'
          fontWeight={url === '/solutions' ? 'bold' : 'normal'}
          _hover={{ borderBottom: '1px solid white' }}
        >
          Solutions
        </Link>
      </NextLink>
      <NextLink href='/#products' scroll={false} passHref>
        <Link
          m='5px 80px 0 30px'
          pb='3px'
          boxSizing='border-box'
          borderBottom='1px solid rgba(0,0,0,0)'
          fontWeight={url === '/#products' ? 'bold' : 'normal'}
          _hover={{ borderBottom: '1px solid white' }}
        >
          Products
        </Link>
      </NextLink>
      {!!user ? (
        <>
          <Button
            colorScheme='blue'
            variant='solid'
            borderRadius='16px'
            w='120px'
            h='32px'
            lineHeight='30px'
            fontSize='15px'
            fontWeight='bold'
            m='0 8px'
            onClick={() => logOut()}
          >
            Log Out
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              w='150px'
              h='40px'
              m='0 30px 0 8px'
              p='0'
              variant='outline'
            >
              <Box
                position='relative'
                h='40px'
                w='150px'
                display='inline-flex'
                flexDir='row'
                justifyContent='space-between'
                alignItems='center'
              >
                <Box
                  display='inline-flex'
                  flexDir='row'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Icon as={IoPersonCircle} ml='6px' fontSize='25px' />
                  <Text
                    fontSize='14px'
                    m='-3px 0px 0 6px'
                    display='inline-flex'
                    alignItems='center'
                  >
                    {user.username}
                  </Text>
                </Box>

                <Icon as={IoChevronDown} m='0 8px 0 0' fontSize='15px' />
              </Box>
            </MenuButton>

            <MenuList>
              <MenuGroup title='Settings'>
                <MenuItem>
                  Dark Mode
                  <Box m='0 0 0 auto'>
                    <DarkModeSwitch />
                  </Box>
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title='Account'>
                <MenuItem onClick={() => logOut()}>Log out</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </>
      ) : (
        <>
          <LoginFormModal />
          <RegisterFormModal />
          <Menu>
            <MenuButton
              as={Button}
              fontSize='20px'
              w='70px'
              h='32px'
              m='0 30px 0 8px'
              colorScheme='blue'
              variant='ghost'
              display='inline-flex'
              alignItems='center'
              justifyContent='center'
            >
              <Icon as={MdPerson} />
              <Icon as={MdExpandMore} />
            </MenuButton>

            <MenuList>
              <MenuGroup title='Settings'>
                <MenuItem>
                  Dark Mode
                  <Box m='0 0 0 auto'>
                    <DarkModeSwitch />
                  </Box>
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </>
      )}
    </Flex>
  )
}
export default Navbar
