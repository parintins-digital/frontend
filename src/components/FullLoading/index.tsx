import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {Button, CircularProgress, Fade} from '@mui/material'
import React, {useState} from 'react'
import {useCustomNavigate} from '../../hooks/useRedirect'
import {PATHS} from '../../routes'
import {Container} from './styles'

interface Props {
  goBack?: boolean
}

const FullLoading: React.FC<Props> = ({goBack = true}) => {
  const {navigateTo} = useCustomNavigate()
  const [showGoBack, setShowGoBack] = useState(false)

  setTimeout(() => setShowGoBack(true), 5000)

  function handleClick() {
    navigateTo(PATHS.MAIN)
  }

  return (
    <Container>
      <CircularProgress color="secondary" />
      {goBack && showGoBack && (
        <Fade in>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClick}
            startIcon={<ArrowBackIcon />}
          >
            Voltar para a página inicial
          </Button>
        </Fade>
      )}
    </Container>
  )
}

export default FullLoading
