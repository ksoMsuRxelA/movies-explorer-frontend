import { useState } from 'react';

const MoviesCard = ({ id, imgSource, movieName, duration, isLiked, isSavedList, trailer, onSaveMovie, onDeleteSavedMovie, movie }) => {
  const [ isActive, setIsActive ] = useState(isLiked);
  let buttonClassName = '';
  if (isSavedList) {
    buttonClassName = 'movies-card__delete';
  } else {
    buttonClassName = 'movies-card__like';
    buttonClassName += isActive ? ' movies-card__like_active' : '';
  }

  function handleButtonClick(evt) {
    if (isSavedList) {
      onDeleteSavedMovie(id);
    } else {
      if (isActive) {
        onDeleteSavedMovie(id);
        setIsActive(false);
      } else {
        onSaveMovie({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          thumbnail: movie.thumbnail,
          image: movie.image,
          trailer: movie.trailer,
          movieId: movie.movieId,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        });
        setIsActive(true);
      }
    }
  }

  return (
    <div className="movies-card">
      <button className={buttonClassName} type="button" aria-label="Кнопка Нравится" onClick={handleButtonClick} />
      <div className="movies-card__img" style={{backgroundImage: `url(${imgSource})`}} onClick={() => {return window.open(trailer)}}></div>
      <p className="movies-card__name">{ movieName }</p>
      <p className="movies-card__duration">{ duration % 60 === 0 ? `${duration / 60} ч` : duration > 60 ? `${Math.floor(duration / 60)} ч ${duration % 60} мин` : `${duration} мин`}</p>
    </div>
  );
};

export default MoviesCard;
