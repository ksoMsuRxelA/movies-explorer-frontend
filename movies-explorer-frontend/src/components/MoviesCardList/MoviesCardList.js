import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import MoreButton from '../MoreButton/MoreButton';
import { WINDOW_WIDTH } from '../../utils/Consts';

const MoviesCardList = ({ cards, isSavedList, isLoading, isResolve, errorMsg, onSaveMovie, onDeleteSavedMovie }) => {
  const [ cardsList, setCardsList ] = useState([]);
  const [visibleCards, setVisibleCards] = useState(window.innerWidth > WINDOW_WIDTH.sizeL ? 12 : window.innerWidth > WINDOW_WIDTH.sizeM ? 8 : 5 );
  const [moreCards, setMoreCards] = useState(window.innerWidth > WINDOW_WIDTH.sizeL ? 3 : 2);

  window.onresize = () => {
    if (window.innerWidth > WINDOW_WIDTH.sizeL) {
      setMoreCards(3);
    } else if (window.innerWidth > WINDOW_WIDTH.sizeM) {
      setMoreCards(2);
    } else {
      setMoreCards(5);
    }
  }

  useEffect(() => {
    setCardsList(cards);
  }, [cards]);

  return (isLoading ?
    <Preloader />
    : (isResolve ?
        <>
          <section className="movies-card-list page__movies-card-list">
            {cardsList.slice(0, visibleCards).map((card) =>
            <MoviesCard
              key={card.movieId}
              id={card._id}
              imgSource={card.image}
              movieName={card.nameRU}
              duration={card.duration}
              isLiked={card.isLiked}
              isSavedList={isSavedList}
              trailer={card.trailer}
              onSaveMovie={onSaveMovie}
              onDeleteSavedMovie={onDeleteSavedMovie}
              movie={card}
            />
            )}
          </section>
          {!isSavedList && <MoreButton handleClick={ () => setVisibleCards(visibleCards + moreCards) } isHidden={ visibleCards >= cardsList.length } />}
        </>
        : <p className="movies-card-list__error">{errorMsg}</p>));
}

export default MoviesCardList;
