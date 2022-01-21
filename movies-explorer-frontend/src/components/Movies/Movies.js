import { useState } from 'react';
import Header from '../Header/Header';
import SearchFrom from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import Footer from '../Footer/Footer';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { cards } from '../../utils/Consts'; // временное решение.

const Movies = () => {
  const [ isBurgerActive, setIsBurgerActive ] = useState(false);

  function handleBurgerClick() {
    setIsBurgerActive(!isBurgerActive);
  }

  return (
    <section className="movies">
      <Header inMain={false} onBurgerBtnClick={ handleBurgerClick }/>
      <BurgerMenu isBurgerActive={ isBurgerActive } onCloseBurgerBtnClick={ handleBurgerClick } />
      <SearchFrom />
      <MoviesCardList cards={cards} isSavedList={false} />
      <MoreButton />
      <Footer inMain={false} />
    </section>
  );
}

export default Movies;
