import React from 'react'

import { Helmet } from 'react-helmet'

import './desktop5.css'

const Desktop5 = (props) => {
  return (
    <div className="desktop5-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <div className="desktop5-desktop5">
        <img
          src="/external/image31464-je8n-1500h.png"
          alt="image31464"
          className="desktop5-image3"
        />
        <img
          src="/external/rectangle221464-lij-1000w.png"
          alt="Rectangle221464"
          className="desktop5-rectangle22"
        />
        <button className="desktop5-button">
          <span className="desktop5-text1">CREAR CUENTA</span>
        </button>
        <span className="desktop5-text2">REGÍSTRATE</span>
        <span className="desktop5-text3">
          <span className="desktop5-text4">
            ¿Ya tienes una cuenta?
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
          <span>Inicia Sesión</span>
        </span>
        <div className="desktop5-group1">
          <img
            src="/external/rectangle181464-nhdr-200h.png"
            alt="Rectangle181464"
            className="desktop5-rectangle18"
          />
          <span className="desktop5-text6">WorkFolio</span>
        </div>
        <img
          src="/external/rectangle251464-7skd-200h.png"
          alt="Rectangle251464"
          className="desktop5-rectangle25"
        />
        <img
          src="/external/rectangle261464-4ov-200h.png"
          alt="Rectangle261464"
          className="desktop5-rectangle26"
        />
        <span className="desktop5-text7">NOMBRE COMPLETO</span>
        <span className="desktop5-text8">CORREO ELECTRÓNICO</span>
        <img
          src="/external/rectangle271464-1ggx-200h.png"
          alt="Rectangle271464"
          className="desktop5-rectangle27"
        />
        <span className="desktop5-text9">CONTRASEÑA</span>
      </div>
    </div>
  )
}

export default Desktop5
