import React from 'react'
import './styles.css'

export class Header extends React.PureComponent {
  render () {
    return (
      <header className="header">
        <div className="header__container">
          <h1>
            <a href="/" title="Creditas">
              <img className="logo" src="https://staging.creditas.com.br/static/images/logo-creditas-white-3cd22a2808.svg" alt="Creditas" />
            </a>
          </h1>
          <a className="help" href="https://ajuda.creditas.com.br/hc/pt-br">Ajuda</a>
        </div>
      </header>
    )
  }
}
