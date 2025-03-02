import React from 'react'

import { Helmet } from 'react-helmet'

import './desktop12.css'

const Desktop12 = (props) => {
  return (
    <div className="desktop12-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <div className="desktop12-desktop12">
        <img
          alt="Rectangle331453"
          src="/external/rectangle331453-1qso-700h.png"
          className="desktop12-rectangle33"
        />
        <button className="desktop12-button">
          <span className="desktop12-text1">Ir al comienzo</span>
        </button>
        <span className="desktop12-text2">
          Perfil completado, ¡felicitaciones!
        </span>
        <span className="desktop12-text3">
          {' '}
          Ahora solo falta que nuestro equipo de moderadores lo apruebe para que
          puedas empezar a trabajar.
        </span>
        <img
          alt="gtranslate1242"
          src="/external/gtranslate1242-krcx.svg"
          className="desktop12-gtranslate"
        />
      </div>
    </div>
  )
}

export default Desktop12
