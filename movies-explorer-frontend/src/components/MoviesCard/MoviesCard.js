const MoviesCard = ({ imgSource, movieName, duration, isLiked, isSaved }) => {
  let buttonClassName = '';
  if (isSaved) {
    buttonClassName = 'movies-card__delete';
  } else {
    buttonClassName = 'movies-card__like';
    buttonClassName += isLiked ? ' movies-card__like_active' : '';
  }

  return (
    <div className="movies-card">
      <button className={buttonClassName} type="button" aria-label="Кнопка Нравится" onClick={() => {}} />
      <div className="movies-card__img" style={{backgroundImage: `url(${imgSource})`}} ></div>
      <p className="movies-card__name">{ movieName }</p>
      <p className="movies-card__duration">{ duration }</p>
    </div>
  );
};

export default MoviesCard;
