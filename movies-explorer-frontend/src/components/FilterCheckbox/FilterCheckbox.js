const FilterCheckbox = ({ isToggled, keyword, onToggle }) => {

  function handleChange(evt) {
    onToggle(keyword, !evt.target.checked);
  }

  return (
    <label className="filter-checkbox search-form__filter-checkbox">
      <input className="filter-checkbox__el-chbox" type="checkbox" checked={isToggled} onChange={handleChange} />
      <span className="filter-checkbox__slider" />
    </label>
  );
}

export default FilterCheckbox;