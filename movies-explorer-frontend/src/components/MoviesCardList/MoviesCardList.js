import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ cards, isSavedList }) => {
  return (
    <section className="movies-card-list page__movies-card-list">
      {
        cards.map((card) => <MoviesCard key={card.id} imgSource={card.source} movieName={card.name} duration={card.duration} isLiked={card.isLiked} isSaved={isSavedList} />)
      }
    </section>
  );
}

export default MoviesCardList;
