import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      artista: '',
      album: '',
      listaMusicas: [],
      carregaTela: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.setState({
      carregaTela: true,
    });
    const listaAlbuns = await getMusics(id);
    const informacao = listaAlbuns[0];
    this.setState({
      listaMusicas: listaAlbuns,
      carregaTela: false,
      artista: informacao.artistName,
      album: informacao.collectionName,
    });
  }

  render() {
    const { artista, album, listaMusicas, carregaTela } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {
          carregaTela ? <Loading /> : (
            <>
              <h3
                data-testid="artist-name"
              >
                {artista}
              </h3>
              <h3
                data-testid="album-name"
              >
                {album}
              </h3>
              {
                listaMusicas.slice(1).map((musica) => (
                  <MusicCard
                    musica={ musica }
                    nome={ musica.trackName }
                    key={ musica.trackId }
                    resumo={ musica.previewUrl }
                    trackId={ musica.trackId }
                  />
                ))
              }
            </>
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Album;
