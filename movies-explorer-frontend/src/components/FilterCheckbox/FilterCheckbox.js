const FilterCheckbox = ({ isToggled, onToggle }) => {
  return (
    <label className="filter-checkbox search-form__filter-checkbox">
      <input className="filter-checkbox__el-chbox" type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="filter-checkbox__slider" />
    </label>
  );
}

export default FilterCheckbox;