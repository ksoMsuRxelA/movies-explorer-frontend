import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="navigation header__navigation">
      <NavLink to="/movies" className="navigation__link" activeClassName="navigation__link_active">Фильмы</NavLink>
      <NavLink to="/saved-movies" className="navigation__link" activeClassName="navigation__link_active">Сохранённые фильмы</NavLink>
    </div>
  );
};

export default Navigation;
