import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { api } from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';
import { SHORT_MOVIE } from '../../utils/Consts';

const Movies = ({ loggedIn }) => {
  const [ isBurgerActive, setIsBurgerActive ] = useState(false);
  const [ desiredFilms, setDesiredFilms ] = useState([]); // здесь содержатся фильмы, отфильтрованные по ключевому слову.
  const [ savedMovies, setSavedMovies ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isResolve, setIsResolve ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ toggle, setToggle ] = useState(false);
  const [ word, setWord ] = useState('');

  useEffect(() => { // эффект монтирования данных поиска из lS и получение сохраненных фильмов.
    api.getSavedMovies()
      .then((savedMoviesRes) => {
        localStorage.setItem('savedMoviesActualList', JSON.stringify(savedMoviesRes.data));
        if (localStorage.getItem('keyword') !== null) {
          setIsResolve(true);
          const desiredMoviesLS = JSON.parse(localStorage.getItem('desiredMovies'));
          setActualLikes(desiredMoviesLS);
          setDesiredFilms(desiredMoviesLS);
          setWord(localStorage.getItem('keyword'));
          setToggle(localStorage.getItem('toggleState'));
        }
      })
      .catch((err) => {
        console.log(`${err.message} ${err.status}`);
      });
  }, []);

  function setActualLikes(moviesList) {
    const savedMoviesActualList = JSON.parse(localStorage.getItem('savedMoviesActualList'));
    moviesList.forEach((movie) => {
      if (isMovieSaved(movie, savedMoviesActualList)) {
        movie.isLiked = true;
      } else {
        movie.isLiked = false;
      }
    })
  }

  function isMovieSaved(movieForCheck, savedMoviesActualList) {
    return savedMoviesActualList.some((movie) => {
      if (movie.nameRU === movieForCheck.nameRU) {
        movieForCheck._id = movie._id;
        return true;
      }
      return false;
    });
  }

  function handleBurgerClick() {
    setIsBurgerActive(!isBurgerActive);
  }

  function handleSubmit(keyword, isShort) {
    MoviesApi.getMovies()
      .then((movies) => {
        return movies.filter((movie) => {
          return movie.country &&
          movie.director &&
          movie.duration &&
          movie.year &&
          movie.description &&
          movie.image &&
          movie.trailerLink &&
          movie.id &&
          movie.nameRU &&
          movie.nameEN
        })
        .map(({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailerLink,
          id,
          nameRU,
          nameEN
        }) => ({
          country,
          director,
          duration,
          year,
          description,
          thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
          image: `https://api.nomoreparties.co${image.url}`,
          trailer: trailerLink,
          movieId: id,
          nameRU,
          nameEN
        }))
      })
      .then((movies) => {
        localStorage.setItem('moviesFullList', JSON.stringify(movies));
        const filteredMovies = filter(movies, keyword, isShort);
        setActualLikes(filteredMovies);
        if (filteredMovies.length === 0) {
          setIsResolve(false);
          setErrorMsg('Ничего не найдено');
          return;
        }
        setIsResolve(true);
        setErrorMsg('');
        saveInLocalStorage(filteredMovies, keyword, isShort);
        setDesiredFilms(filteredMovies);
      })
      .catch((err) => {
        setIsResolve(false);
        setErrorMsg('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function saveInLocalStorage(filteredOnes, keyword, isShort) {
    localStorage.setItem('desiredMovies', JSON.stringify(filteredOnes));
    localStorage.setItem('keyword', keyword);
    localStorage.setItem('toggleState', isShort);
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

  function handleSaveMovie(movie) {
    api.postNewSavedMovie(movie)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie]);
        setDesiredFilms((desiredFilms) => {
          return desiredFilms.map((tmpFilm) => {
            return tmpFilm.nameRU === movie.nameRU ? newMovie.data : tmpFilm;
          });
        });
      })
      .catch((err) => {
        console.log(`${err.message} ${err.status}`);
      });
  }

  function handleDeleteSavedMovie(movieId) {
    api.deleteSavedMovie(movieId)
      .then(() => setSavedMovies(
        savedMovies.filter((movie) => movie._id !== movieId)
      ))
      .catch((err) => {
        console.log(`${err.message} ${err.status}`);
      });
  }

  function handleToggle(keyword, isToggled) {
    const filmsList = JSON.parse(localStorage.getItem('moviesFullList'));
    const filteredMovies = filter(filmsList, keyword, isToggled);
    if (filteredMovies.length === 0) {
      setIsResolve(false);
      setErrorMsg('Ничего не найдено');
      return;
    }
    setIsResolve(true);
    setErrorMsg('');
    setActualLikes(filteredMovies);
    saveInLocalStorage(filteredMovies, keyword, isToggled)
    setDesiredFilms(filteredMovies);
  }

  return (
    <section className="movies">
      <Header isLoggedIn={loggedIn} onBurgerBtnClick={handleBurgerClick}/>
      <BurgerMenu
        isBurgerActive={ isBurgerActive }
        onCloseBurgerBtnClick={handleBurgerClick}
      />
      <SearchForm
        word={word}
        toggle={toggle}
        onSubmit={handleSubmit}
        onToggle={handleToggle}
      />
      <MoviesCardList
        cards={desiredFilms}
        isSavedList={false}
        isLoading={isLoading}
        isResolve={isResolve}
        errorMsg={errorMsg}
        onSaveMovie={handleSaveMovie}
        onDeleteSavedMovie={handleDeleteSavedMovie}
      />
      <Footer inMain={false} />
    </section>
  );
}

export default Movies;
