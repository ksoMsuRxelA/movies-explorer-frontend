import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { api } from '../../utils/MainApi';
import { SHORT_MOVIE } from '../../utils/Consts';

const SavedMovies = ({ loggedIn }) => {
  const [ isBurgerActive, setIsBurgerActive ] = useState(false);
  const [ savedMovies, setSavedMovies ] = useState([]);
  const [ keywordInSaved, setKeywordInSaved ] = useState('');
  const [ desiredMovies, setDesiredMovies ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isResolve, setIsResolve ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ toggleInSaved, setToggleInSaved ] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.getSavedMovies()
      .then((movies) => {
        if (movies.length === 0) {
          setIsResolve(false);
          setErrorMsg('У вас нет сохраненных фильмов.');
          return;
        } else {
          setIsResolve(true);
          setErrorMsg('');
        }
        setSavedMovies(movies.data);
        localStorage.setItem('savedMoviesInSaved', JSON.stringify(movies.data));
        localStorage.setItem('desiredMoviesInSaved', JSON.stringify(desiredMovies));
        setDesiredMovies(movies.data);
      })
      .catch((err) => {
        setIsResolve(false);
        setErrorMsg('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      })
      .finally(() => {
        setIsLoading(false);
      })
      return () => {
        localStorage.removeItem('savedMoviesInSaved');
        localStorage.removeItem('desiredMoviesInSaved');
      };
  }, []);

  useEffect(() => {
    if (keywordInSaved === '') {
      setDesiredMovies(savedMovies.map((movie) => movie));
      setIsLoading(false);
      setIsResolve(true);
      setErrorMsg('');
    }
  }, [keywordInSaved]);

  function handleBurgerClick() {
    setIsBurgerActive(!isBurgerActive);
  }

  function handleDeleteSavedMovies(movieId) {
    api.deleteSavedMovie(movieId)
    .then(() => {
      const desiredMoviesLS = JSON.parse(localStorage.getItem('desiredMoviesInSaved'));
      const savedMoviesLS = JSON.parse(localStorage.getItem('savedMoviesInSaved'));
      setDesiredMovies(desiredMoviesLS.filter((movie) => movie._id !== movieId));
      localStorage.setItem('desiredMoviesInSaved', JSON.stringify(desiredMoviesLS.filter((movie) => movie._id !== movieId)));
      setSavedMovies(savedMoviesLS.filter((movie) => movie._id !== movieId));
      localStorage.setItem('savedMoviesInSaved', JSON.stringify(savedMoviesLS.filter((movie) => movie._id !== movieId)));
      handleToggle(keywordInSaved, toggleInSaved);
    })
    .catch((err) => {
      console.log(`${err.message} ${err.status}`);
    });
  }

  function handleSubmit(keyword, isShort) {
    if (keyword === '') {
      setIsResolve(false);
      setIsLoading(false);
      setErrorMsg('Нужно ввести ключевое слово');
      return;
    } else {
      const movies = filter(JSON.parse(localStorage.getItem('savedMoviesInSaved')), keyword, isShort);
      if (movies.length === 0) {
        setIsResolve(false);
        setErrorMsg('Ничего не найдено');
        return;
      } else {
        setIsLoading(false);
        setIsResolve(true);
        setErrorMsg('');
        setDesiredMovies(movies);
        localStorage.setItem('desiredMoviesInSaved', JSON.stringify(movies));
      }
    }
  }

  function filter(movies, keyword, isShort) {
    const regEx = new RegExp(keyword, 'i');
    return movies.filter((movie) => {
      if (isShort) {
        return movie.duration <= SHORT_MOVIE && regEx.test(movie.nameRU);
      } else {
        return regEx.test(movie.nameRU);
      }
    });
  }

  function handleToggle(keyword, isShort) {
    if (keywordInSaved === '') {
      const filmsList = JSON.parse(localStorage.getItem('savedMoviesInSaved'));
      const filteredSavedMovies = isShort ? filmsList.filter((movie) => movie.duration <= SHORT_MOVIE) : filmsList;
      if (filteredSavedMovies.length === 0) {
        setIsResolve(false);
        setErrorMsg('Ничего не найдено');
        return;
      } else {
        setIsResolve(true);
        setErrorMsg('');
        setSavedMovies(filteredSavedMovies);
      }
    } else {
      const filmsList = JSON.parse(localStorage.getItem('desiredMoviesInSaved'));
      const filteredDesiredMovies = filter(filmsList, keyword, isShort);
      if (filteredDesiredMovies.length === 0) {
        setIsResolve(false);
        setErrorMsg('Ничего не найдено');
        return;
      } else {
        setIsResolve(true);
        setErrorMsg('');
        setDesiredMovies(filteredDesiredMovies);
      }
    }
  }

  return (
    <section className="saved-movies">
      <Header isLoggedIn={loggedIn} onBurgerBtnClick={ handleBurgerClick } />
      <BurgerMenu
        isBurgerActive={ isBurgerActive }
        onCloseBurgerBtnClick={ handleBurgerClick }
      />
      <SearchForm
        word={''}
        toggle={false}
        onSubmit={handleSubmit}
        onToggle={handleToggle}
        setKeywordInSaved={setKeywordInSaved}
        setToggleInSaved={setToggleInSaved}
        inSaved={true}
      />
      <MoviesCardList
        cards={keywordInSaved === '' ? savedMovies : desiredMovies}
        isSavedList={true}
        isLoading={isLoading}
        isResolve={isResolve}
        errorMsg={errorMsg}
        onDeleteSavedMovie={handleDeleteSavedMovies}
      />
      <Footer inMain={false} />
    </section>
  );
}

export default SavedMovies;
