import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      inputName: '',
      buttonTrue: true,
      carregaTela: false,
    };
  }

  onInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { inputName } = this.state;
      const numberThree = 3;
      if (inputName.length >= numberThree) {
        this.setState({ buttonTrue: false });
      } else {
        this.setState({ buttonTrue: true });
      }
    });
  }

  createClick = async () => {
    const { inputName } = this.state;
    this.setState({
      carregaTela: true,
      redir: false,
    });
    await createUser({ name: inputName });
    this.setState({
      carregaTela: false,
      redir: true,
    });
  }

  render() {
    const { inputName, buttonTrue, carregaTela, redir } = this.state;
    return (
      <div data-testid="page-login">
        {
          carregaTela ? <Loading /> : (
            <form>
              <label htmlFor="name">
                <input
                  name="inputName"
                  data-testid="login-name-input"
                  type="text"
                  value={ inputName }
                  onChange={ this.onInput }
                />
                <button
                  data-testid="login-submit-button"
                  type="button"
                  disabled={ buttonTrue }
                  onClick={ this.createClick }
                >
                  Entrar
                </button>
              </label>
            </form>
          )
        }
        {
          redir && <Redirect to="/search" />
        }
      </div>
    );
  }
}

export default Login;
