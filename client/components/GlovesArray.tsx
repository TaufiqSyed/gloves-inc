import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const GlovesArray: React.FC<{
  sport: string
}> = ({ sport }) => {
  return (
    <Box>
      <Text fontSize='26px'>{sport[0].toUpperCase() + sport.slice(1)}</Text>
    </Box>
  )
}

export default GlovesArray
