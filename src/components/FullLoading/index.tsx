import {CircularProgress} from '@mui/material'
import React from 'react'
import {Container} from './styles'

const FullLoading: React.FC = () => {
  return (
    <Container>
      <CircularProgress color="secondary" />
    </Container>
  )
}

export default FullLoading
