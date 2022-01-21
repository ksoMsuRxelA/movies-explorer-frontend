import { useState } from 'react';
import Header from '../Header/Header';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import Footer from '../Footer/Footer';
import { savedCards } from '../../utils/Consts'

const SavedMovies = () => {
  const [ isBurgerActive, setIsBurgerActive ] = useState(false);

  function handleBurgerClick() {
    setIsBurgerActive(!isBurgerActive);
  }

  return (
    <section className="saved-movies">
      <Header inMain={false} onBurgerBtnClick={ handleBurgerClick } />
      <BurgerMenu isBurgerActive={ isBurgerActive } onCloseBurgerBtnClick={ handleBurgerClick } />
      <SearchForm />
      <MoviesCardList cards={savedCards} isSavedList={true} />
      {/* <MoreButton /> */}
      <Footer />
    </section>
  );
}

export default SavedMovies;
