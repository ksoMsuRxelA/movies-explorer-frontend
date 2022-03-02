import { useState, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({ word, toggle, onSubmit, onToggle, setKeywordInSaved, setToggleInSaved, inSaved }) => {
  const [keyword, setKeyword] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  useEffect(() => {
    setKeyword(word);
    setIsToggled(toggle === 'false' || toggle === false ? false : true);
  }, [word, toggle]);

  function handleKeywordChange(evt) {
    setKeyword(evt.target.value);
    if (inSaved) {
      setKeywordInSaved(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(keyword, isToggled);
  }

  function handleToggleChange(keyword, isToggled) {
    setIsToggled(!isToggled);
    if (inSaved) {
      setToggleInSaved(!isToggled);
    }
    onToggle(keyword, !isToggled);
  }

  return (
    <section className="search-form page__search-form">
      <div className="search-form__content">
        <form className={inSaved ? 'search-form__form search-form__form_saved' : 'search-form__form'} name="search" onSubmit={handleSubmit} noValidate>
          <div className="search-form__icon"></div>
          <input className="search-form__input" type="text" value={keyword} onChange={handleKeywordChange} placeholder="Фильм" name="movie" required />
          <button className="search-form__submit-button" type="submit" aria-label="Кнопка поиска">Найти</button>
        </form>
      </div>
      <div className="search-form__filter">
        <FilterCheckbox isToggled={isToggled} keyword={keyword} onToggle={handleToggleChange} />
        <p className="search-form__checkbox-text">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
