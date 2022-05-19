import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import SearchAlbumsAPIs from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputNameSearch: '',
      buttonTrueSearch: true,
      carregaTelaSearch: false,
      albuns: [],
      artista: '',
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

  createClickSearch = async () => {
    const { inputNameSearch } = this.state;
    this.setState({
      carregaTelaSearch: true,
    });
    const newRequest = await SearchAlbumsAPIs(inputNameSearch);
    // console.log('eu', newRequest);
    const artista = inputNameSearch;
    // console.log('eu2', artista);
    this.setState({ artista });
    this.setState({
      carregaTelaSearch: false,
      inputNameSearch: '',
      albuns: newRequest,
    });
  }

  render() {
    const { inputNameSearch, buttonTrueSearch,
      carregaTelaSearch, albuns, artista } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          carregaTelaSearch ? <Loading /> : (
            <form>
              <label htmlFor="text">
                <input
                  name="inputNameSearch"
                  type="text"
                  data-testid="search-artist-input"
                  value={ inputNameSearch }
                  onChange={ this.onInput }
                />
              </label>
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ buttonTrueSearch }
                onClick={ this.createClickSearch }
              >
                Pesquisar
              </button>
            </form>
          )
        }
        {
          albuns.length === 0 && <div>Nenhum álbum foi encontrado</div>
        }
        { `Resultado de álbuns de: ${artista}`}
        {
          albuns.map((elemento, index) => (
            <div key={ index }>

              <Link
                data-testid={ `link-to-album-${elemento.collectionId}` }
                to={ `/album/${elemento.collectionId}` }
              >
                {
                  elemento.collectionName
                }
              </Link>
            </div>
          ))
        }
        ;
      </div>
    );
  }
}

export default Search;
