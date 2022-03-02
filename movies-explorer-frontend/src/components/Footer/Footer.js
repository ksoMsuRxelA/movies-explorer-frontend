const Footer = ({ inMain }) => {
  const footerClassName = `footer ${inMain ? 'main__footer' : 'movies__footer'}`;
  return (
    <section className={footerClassName}>
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatMovie.</h2>
      <div className="footer__content">
        <p className="footer__copyright">&copy; 2022</p>
        <ul className="footer__links">
          <li className="footer__link">
            <a href="https://practicum.yandex.ru/" className="footer__link-item" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__link">
            <a href="https://github.com/ksoMsuRxelA" className="footer__link-item" target="_blank" rel="noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;
