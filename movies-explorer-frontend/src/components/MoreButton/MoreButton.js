const MoreButton = ({ handleClick, isHidden }) => {
  return (
    <div className={`more-button page__more-button ${isHidden ? 'more-button_hidden' : ''}`}>
      <button className="more-button__btn" type="button" aria-label="Кнопка Еще" onClick={ handleClick }>Ещё</button>
    </div>
  );
}

export default MoreButton;