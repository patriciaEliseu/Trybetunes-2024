import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Loading from './Loading';
// import { addSong } from '../services/favoriteSongsAPI';

// console.log('sereieu', getFavoriteSongs());

class MusicCard extends Component {
  /*  constructor() {
    super();
    this.state = {
      favorita: false,
      carregaTela: false,
    };
 */
  /* checkOnChange = ({ target }) => {
      // console.log('judas', target);
      const { musica } = this.props;
      this.setState({
        favorita: target.checked,
      }, async () => {
        const { favorita } = this.state;
        // console.log(favorita);
        if (favorita === true) {
          this.setState({
            carregaTela: true,
          });
          await addSong(musica);
          console.log('sim', addSong(musica));
          this.setState({
            carregaTela: false,
          });
        }
      });
    };

    componentDidMount(() => {
      this.setState({
        favorita: checked.some((musica) => musica.trackId === trackId),
      });
    });
  }
 */
  render() {
    const { resumo, nome/*  trackId */ } = this.props;
    // const { carregaTela, favorita } = this.state;

    return (
      <div>
        <p>{ nome }</p>
        <audio data-testid="audio-component" src={ resumo } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        {/*  {
          carregaTela ? <Loading /> : (
            <label htmlFor={ trackId }>
              Favorita
              <input
                name="inputFavorita"
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                checked={ favorita }
                onChange={ this.checkOnChange() }
              />
            </label>
          )
        } */}
      </div>
    );
  }
}

MusicCard.propTypes = {
  resumo: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  // trackId: PropTypes.number.isRequired,
  // musica: PropTypes.string.isRequired,
};

export default MusicCard;
