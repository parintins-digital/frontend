import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {Button, Fade, Typography} from '@mui/material'
import React from 'react'
import LogoImage from '../../assets/Logo.png'
import {useCustomNavigate} from '../../hooks/useRedirect'
import {PATHS} from '../../routes'
import {Container} from './styles'

const PageNotFound: React.FC = () => {
  const {navigateTo} = useCustomNavigate()

  function handleClick() {
    navigateTo(PATHS.MAIN)
  }

  return (
    <Container>
      <div className="info">
        <img onClick={handleClick} src={LogoImage} alt="Logo" />
        <Typography variant="h1" component="h1">
          404
        </Typography>
        <Typography variant="h2" component="h2">
          Ops! Essa página não existe!
        </Typography>
        <Typography variant="h6" component="h6">
          Verifique se o endereço está digitado corretamente. Clique no botão
          abaixo para voltar para a página inicial.
        </Typography>
      </div>
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
    </Container>
  )
}

export default PageNotFound
