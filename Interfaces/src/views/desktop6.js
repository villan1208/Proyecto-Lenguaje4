import React from 'react'

import { Helmet } from 'react-helmet'

import './desktop6.css'

const Desktop6 = (props) => {
  return (
    <div className="desktop6-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <div className="desktop6-desktop6">
        <button className="desktop6-button1">
          <span className="desktop6-text10">
            <span>
              Programación
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <br></br>
            <span>y Tecnologíaa</span>
          </span>
        </button>
        <button className="desktop6-button2">
          <span className="desktop6-text14">
            <span>
              Marketing Digital
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <br></br>
            <span>y Ventas</span>
          </span>
        </button>
        <button className="desktop6-button3">
          <span className="desktop6-text18">
            <span>
              Redacción y
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <br></br>
            <span>Traducción</span>
          </span>
        </button>
        <button className="desktop6-button4">
          <span className="desktop6-text22">
            <span>
              Diseño y
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <br></br>
            <span>Multimedia</span>
          </span>
        </button>
        <span className="desktop6-text26">
          Elige el área en la que te especializas:
        </span>
        <img
          src="/external/gtranslate1095-lofa.svg"
          alt="gtranslate1095"
          className="desktop6-gtranslate"
        />
        <button className="desktop6-button5">
          <span className="desktop6-text27">Continuar</span>
        </button>
        <button className="desktop6-button6">
          <span className="desktop6-text28">Atrás</span>
        </button>
        <div className="desktop6-group1">
          <img
            src="/external/rectangle181564-3bhb-200h.png"
            alt="Rectangle181564"
            className="desktop6-rectangle18"
          />
          <span className="desktop6-text29">WorkFolio</span>
        </div>
        <span className="desktop6-text30">
          Comencemos creando tu portafolio
        </span>
        <img
          src="/external/rectangle271095-y27o.svg"
          alt="Rectangle271095"
          className="desktop6-rectangle27"
        />
      </div>
    </div>
  )
}

export default Desktop6
