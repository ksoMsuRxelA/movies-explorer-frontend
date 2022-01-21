import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <section className="search-form page__search-form">
      <div className="search-form__content">
        <form className="search-form__form" name="search" onSubmit={() => {}}>
          <div className="search-form__icon"></div>
          <input className="search-form__input" type="text" placeholder="Фильм" name="movie" required />
          <button className="search-form__submit-button" type="submit" aria-label="Кнопка поиска">Найти</button>
        </form>
      </div>
      <div className="search-form__filter">
        <FilterCheckbox isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
        <p className="search-form__checkbox-text">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
