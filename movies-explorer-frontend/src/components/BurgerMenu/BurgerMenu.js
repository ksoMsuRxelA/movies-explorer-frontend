import { Link } from 'react-router-dom';

const BurgerMenu = ({ isBurgerActive, onCloseBurgerBtnClick }) => {
  const burgerClassName = `burger-menu ${isBurgerActive ? 'burger-menu_active' : ''}`;
  return (
    <div className={burgerClassName}>
      <div className="burger-menu__content">
        <button className="burger-menu__close-btn" onClick={ onCloseBurgerBtnClick } />
        <ul className="burger-menu__links">
          <Link to="/" className="burger-menu__link">Главная</Link>
          <Link to="/movies" className="burger-menu__link">Фильмы</Link>
          <Link to="/saved-movies" className="burger-menu__link">Сохранённые фильмы</Link>
        </ul>
        <Link to="/profile" className="burger-menu__profile" />
      </div>
    </div>
  );
};

export default BurgerMenu;