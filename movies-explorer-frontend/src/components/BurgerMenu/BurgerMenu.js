import { NavLink, Link } from 'react-router-dom';

const BurgerMenu = ({ isBurgerActive, onCloseBurgerBtnClick }) => {
  const burgerClassName = `burger-menu ${isBurgerActive ? 'burger-menu_active' : ''}`;
  return (
    <div className={burgerClassName}>
      <div className="burger-menu__content">
        <button className="burger-menu__close-btn" onClick={ onCloseBurgerBtnClick } />
        <ul className="burger-menu__links">
          <NavLink exact to="/" className="burger-menu__link" activeClassName="burger-menu__link_active">Главная</NavLink>
          <NavLink to="/movies" className="burger-menu__link" activeClassName="burger-menu__link_active">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="burger-menu__link" activeClassName="burger-menu__link_active">Сохранённые фильмы</NavLink>
        </ul>
        <Link to="/profile" className="burger-menu__profile" />
      </div>
    </div>
  );
};

export default BurgerMenu;