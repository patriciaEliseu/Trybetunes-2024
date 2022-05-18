import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      carregaTela: false,
    };
  }

componentDidMount = async () => {
  this.setState({
    carregaTela: true,
  });
  const userAPI = await getUser();
  this.setState({ user: userAPI.name, carregaTela: false });
}

render() {
  const { user, carregaTela } = this.state;
  return (
    <header data-testid="header-component">
      {
        carregaTela ? <Loading /> : (
          <h3 data-testid="header-user-name">
            { user }
          </h3>
        )
      }
    </header>
  );
}
}

export default Header;
