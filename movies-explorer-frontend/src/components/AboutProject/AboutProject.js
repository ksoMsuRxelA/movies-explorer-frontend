

const AboutProject = () => {
  return (
    <section id="about-project" className="about-project main__about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__info">
        <div className="about-project__info-part">
          <p className="about-project__subtitle">Дипломный проект включал 5 этапов</p>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__info-part">
          <p className="about-project__subtitle">На выполнение диплома ушло 5 недель</p>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__structure">
        <p className="about-project__week about-project__week_type_white">1 неделя</p>
        <p className="about-project__week">4 недели</p>
        <p className="about-project__cite">Back-end</p>
        <p className="about-project__cite">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
