const Portfolio = () => {
  return (
    <section className="portfolio main__portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <p className="portfolio__link-text">Статичный сайт</p>
          <a href="https://ksomsurxela.github.io/how-to-learn/" className="portfolio__link" target="_blank" rel="noreferrer"/>
        </li>
        <li className="portfolio__list-item">
          <p className="portfolio__link-text">Адаптивный сайт</p>
          <a href="https://ksomsurxela.github.io/russian-travel/" className="portfolio__link" target="_blank" rel="noreferrer"/>
        </li>
        <li className="portfolio__list-item">
          <p className="portfolio__link-text">Одностраничное приложение</p>
          <a href="https://xmesto.nomoredomains.rocks/signin" target="_blank" className="portfolio__link" rel="noreferrer"/>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
