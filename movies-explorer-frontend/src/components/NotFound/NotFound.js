import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();

  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button className="not-found__back-btn" type="button" aria-label="Кнопка Назад" onClick={() => history.goBack()}>Назад</button>
    </section>
  );
}

export default NotFound;