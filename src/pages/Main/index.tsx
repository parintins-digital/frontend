import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance'
import QrCodeIcon from '@mui/icons-material/QrCode'
import TimelineIcon from '@mui/icons-material/Timeline'
import {Button} from '@mui/material'
import React from 'react'
import {useCustomNavigate} from '../../hooks/useRedirect'
import {PATHS} from '../../routes'
import {Container, ContainerResponsive} from './styles'

const Main: React.FC = () => {
  const {createHandler} = useCustomNavigate()

  return (
    <ContainerResponsive>
      <Container>
        <header className="header">
          <a href="#about">
            <Button variant="text" color="primary">
              Sobre
            </Button>
          </a>
          <Button
            variant="text"
            color="primary"
            onClick={createHandler(PATHS.LOGIN)}
          >
            Fazer Login
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={createHandler(PATHS.SIGNUP)}
          >
            Fazer Cadastro
          </Button>
        </header>

        <main className="main">
          <div className="introduction">
            <h1 className="title">Parintins Digital</h1>
            <label className="subtitle">
              Uma aplicação para gerenciamento de visitas à pontos turísticos,
              culturais, points da cidade e comunidades
            </label>
            <div className="button-group">
              <Button
                variant="contained"
                color="secondary"
                onClick={createHandler(PATHS.LOGIN)}
              >
                Já tenho uma conta
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={createHandler(PATHS.SIGNUP)}
              >
                Criar uma conta
              </Button>
            </div>
          </div>

          <div className="about" id="about">
            <div className="cards">
              <div className="card">
                <CameraEnhanceIcon />
                <h2 className="card-title">Colecione figuras</h2>
                <p className="card-description">
                  Colecione figuras dos locais que você visitou. Acompanhe as
                  novas figuras que vão sendo adicionadas e conheça um pouco
                  mais sobre Parintins!
                </p>
              </div>
              <div className="card">
                <QrCodeIcon />
                <h2 className="card-title">Registro de visita inteligente</h2>
                <p className="card-description">
                  A partir da leitura de um QRCode, você consegue registrar
                  todas as suas visitas pela cidade de Parintins de forma
                  simples e eficaz!
                </p>
              </div>
              <div className="card">
                <TimelineIcon />
                <h2 className="card-title">
                  Acompanhe seu histórico de visitas
                </h2>
                <p className="card-description">
                  Acompanhe todo o histórico de visitas pela cidade de
                  Parintins, tendo acesso a data e hora em que você realizou sua
                  visita.
                </p>
              </div>
            </div>

            <div className="divisor">
              <h2 className="divisor-title">
                Conheça a cidade de Parintins de uma forma difente!
              </h2>
              <p className="divisor-description">
                Colecione figuras dos principais pontos turísticos, centros
                culturais e/ou pontos importantes da cidade de Parintins de
                forma digital!
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31884.805564212093!2d-56.75589504026822!3d-2.6347129567227836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92639ccda9fcd291%3A0x1a917b7066f1554!2sParintins%2C%20State%20of%20Amazonas!5e0!3m2!1sen!2sbr!4v1653590547537!5m2!1sen!2sbr"
                style={{
                  border: 0,
                }}
                className="map"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </main>
        <footer className="footer">
          <label className="footer-title">
            © Parintins Digital {new Date().getFullYear()}
          </label>
          <label className="footer-title">Parintins, AM</label>
        </footer>
      </Container>
    </ContainerResponsive>
  )
}

export default Main
