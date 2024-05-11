import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs/*  removeSong  */ }
from '../services/favoriteSongsAPI';
// import { getMusics } from '../services/musicsAPI';

// console.log('sereieu', getFavoriteSongs());

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      carregaTela: false,
      listaFavorita: [],

    };
  }

  async componentDidMount() {
    await this.newListaFavoritas();
  }

  // componentDidUpdate() {
  //   removeSong();
  // }

  newListaFavoritas = async () => {
    const listaFav = await getFavoriteSongs();
    this.setState({
      listaFavorita: listaFav,
    });
  }

  checkOnChange = async () => {
    this.setState({
      carregaTela: true,
    });
    const { musica } = this.props;
    /*   if (checked !== trackId) {
      await removeSong(musica);
    } else { */
    await addSong(musica);
    /*  } */
    await this.newListaFavoritas();
    this.setState({
      carregaTela: false,
    });
  }

  render() {
    const { resumo, nome, trackId } = this.props;
    const { carregaTela, listaFavorita } = this.state;

    return (
      <div>
        <p>{nome}</p>
        <audio data-testid="audio-component" src={ resumo } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        {
          carregaTela ? <Loading /> : (
            <label htmlFor="input">
              Favorita
              <input
                name="inputFavorita"
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                checked={ listaFavorita.some((disco) => disco.trackId === trackId) }
                onChange={ this.checkOnChange }
                // removeSong={ removeSong() }
              />
            </label>
          )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.objectOf().isRequired,
  resumo: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
