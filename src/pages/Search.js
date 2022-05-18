import React, { Component } from 'react';
import Header from '../Components/Header';
// import Loading from '../Components/Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputNameSearch: '',
      buttonTrueSearch: true,
    };
  }

  onInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { inputNameSearch } = this.state;
      const numberTwo = 2;
      if (inputNameSearch.length >= numberTwo) {
        this.setState({ buttonTrueSearch: false });
      } else {
        this.setState({ buttonTrueSearch: true });
      }
    });
  }

  render() {
    const { inputNameSearch, buttonTrueSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {/*   {
          carregaTelaSearch ? <Loading /> : ( */}
        <form>
          <label htmlFor="text">
            <input
              name="inputNameSearch"
              type="text"
              data-testid="search-artist-input"
              value={ inputNameSearch }
              onChange={ this.onInput }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ buttonTrueSearch }
              onClick={ this.createClickSearch }
            >
              Pesquisar
            </button>
          </label>
        </form>
        {/*    )
        } */}
      </div>
    );
  }
}

export default Search;
