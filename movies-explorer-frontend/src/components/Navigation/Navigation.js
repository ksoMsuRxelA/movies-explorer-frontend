import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="navigation header__navigation">
      <Link to="/movies" className="navigation__link navigation__link_type_bold">Фильмы</Link>
      <Link to="/saved-movies" className="navigation__link navigation__link_type_normal">Сохранённые фильмы</Link>
    </div>
  );
};

export default Navigation;
