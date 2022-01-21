import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = ({ inMain, onBurgerBtnClick }) => {
  const className = inMain ? 'main__header' : 'page__header';

  return (
    <header className={`header ${className}`}>
      <Link to="/" className="header__logo" />
      {inMain ?
        <>
          <Link to="/signup" className="header__link header__link_type_signup">Регистрация</Link>
          <Link to="/signin" className="header__link header__link_type_signin">Войти</Link>
        </> :
        <>
          <Navigation />
          <Link to="/profile" className="header__profile" />
          <button className="header__burger-button" type="button" aria-label="Кнопка меню" onClick={ onBurgerBtnClick } />
        </>
      }
    </header>
  );
}

export default Header;