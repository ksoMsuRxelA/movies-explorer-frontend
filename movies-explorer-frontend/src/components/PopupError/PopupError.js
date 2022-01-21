const PopupError = ({ isOpen, message, onClose }) => {
  let popupClassName = `popup-error${isOpen ? ' popup-error_opened' : ''}`;

  function handleClose() {
    onClose();
  }

  return (
    <section className={popupClassName}>
      <div className="popup-error__container">
        <h2 className="popup-error__message">{message}</h2>
        <button className="popup-error__close-button" type="button" aria-label="Кнопка закрытия" onClick={handleClose} />
      </div>
    </section>
  );
}

export default PopupError;