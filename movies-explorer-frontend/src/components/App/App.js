import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import { api } from '../../utils/Api';
import * as Auth from '../../utils/Auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser ] = useState({ _id: '', name: '', email: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  useEffect(() => { // данным эффектом проверяем валидность токена авторизации и если он оказался валидным, то получаем данные пользователя.
    api.getCurrentUserData()
    .then((currentUserData) => {
      setCurrentUser({
        _id: currentUserData.data._id,
        name: currentUserData.data.name,
        email: currentUserData.data.email,
      });
      setLoggedIn(true);
      history.push('/movies');
    })
    .catch((err) => {
      console.log(`${err.message} (${err.status})`);
      history.push('/');
    });
  }, [history]);

  const authenticateToMovies = (email, password, submitButtonRef) => {
    return Auth.authorize(email, password)
      .then((authRes) => {
        setCurrentUser({
          _id: authRes._id,
          name: authRes.name,
          email: authRes.email,
        });
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        disableSubmitButton(submitButtonRef);
        setIsAuthError(true);
        setErrorMsg(`${err.message}`);
        console.log(`${err.message} (${err.status})`);
        submitButtonRef.current.textContent = 'Войти';
      });
  }

  const disableSubmitButton = (submitButtonRef) => {
    submitButtonRef.current.classList.add('info-form__save-button_disabled');
    submitButtonRef.current.setAttribute('disabled', true);
  };

  const handleRegister = (name, email, password, submitButtonRef) => {
    submitButtonRef.current.textContent = 'Зарегистрироваться...';
    Auth.register(name, email, password,)
      .then((res) => { // объект res: {name, email, _id};
        authenticateToMovies(email, password);
      })
      .catch((err) => {
        disableSubmitButton(submitButtonRef);
        setIsAuthError(true);
        setErrorMsg(`${err.message}`);
        console.log(`${err.message} ${err.status}`);
      })
      .finally(() => {
        submitButtonRef.current.textContent = 'Зарегистрироваться';
      })
  };

  const handleLogin = (email, password, submitButtonRef) => {
    submitButtonRef.current.textContent = 'Войти...';
    authenticateToMovies(email, password, submitButtonRef);
  };

  return (
    <div className="wrapper">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
          />
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/signup">
            <Register
              onRegister={handleRegister}
              isAuthError={isAuthError}
              errorMsg={errorMsg}
              setIsAuthError={setIsAuthError}
            />
          </Route>
          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              isAuthError={isAuthError}
              errorMsg={errorMsg}
              setIsAuthError={setIsAuthError}
            />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
