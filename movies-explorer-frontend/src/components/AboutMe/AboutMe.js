import Me from '../../images/me-tiny.jpg';

const AboutMe = () => {
  return (
    <section id="about-me" className="about-me main__about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__text">
          <div className="about-me__info">
            <p className="about-me__name">Руслан</p>
            <p className="about-me__spec">Фронтенд-разработчик, 29 лет</p>
            <p className="about-me__description">Я учился в МФТИ, думал что буду заниматься наукой. Со временем, я осознал что для науки у меня не хватает чувства авантюризма. При этом я любитель логической строгости и технического подхода к делу. Решил стать разработчиком и свой путь я начал с Веба. После прохождения соответствующего курса Я.Практикума планирую сразу начать работать и набивать реальный "боевой" опыт. Обожаю симметрию в вещах.</p>
          </div>
          <div className="about-me__socials">
            <a href="https://github.com/ksoMsuRxelA" target="_blank" className="about-me__social-link" rel="noreferrer">Github.com</a>
          </div>
        </div>
        <img src={Me} alt="Фото меня" className="about-me__photo" />
      </div>
    </section>
  );
}

export default AboutMe;

