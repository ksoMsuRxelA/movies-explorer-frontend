const Techs = () => {
  return (
    <section id="techs" className="techs main__techs">
      <div className="techs__content">
        <h2 className="techs__title">Технологии</h2>
        <p className="techs__subtitle">7 технологий</p>
        <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__tools">
          <p className="techs__tool">HTML</p>
          <p className="techs__tool">CSS</p>
          <p className="techs__tool">JS</p>
          <p className="techs__tool">React</p>
          <p className="techs__tool">Git</p>
          <p className="techs__tool">Express.js</p>
          <p className="techs__tool">mongoDB</p>
        </ul>
      </div>
    </section>
  );
}

export default Techs;