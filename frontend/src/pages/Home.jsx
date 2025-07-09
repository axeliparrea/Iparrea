import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Bienvenido a Mi Portafolio</h1>
        <p>Descubre mis proyectos y habilidades</p>
      </header>
      
      <section className="about-section">
        <h2>Sobre Mí</h2>
        <p>Soy un desarrollador web apasionado por crear soluciones digitales innovadoras.</p>
      </section>
      
      <section className="projects-section">
        <h2>Mis Proyectos</h2>
        <div className="projects-grid">
          {/* Aquí puedes agregar tus proyectos */}
          <div className="project-card">
            <h3>Proyecto 1</h3>
            <p>Descripción del proyecto</p>
          </div>
          <div className="project-card">
            <h3>Proyecto 2</h3>
            <p>Descripción del proyecto</p>
          </div>
        </div>
      </section>
      
      <section className="skills-section">
        <h2>Mis Habilidades</h2>
        <ul>
          <li>React</li>
          <li>JavaScript</li>
          <li>HTML/CSS</li>
          <li>Node.js</li>
        </ul>
      </section>
      
      <footer>
        <p>&copy; {new Date().getFullYear()} - Mi Portafolio Personal</p>
      </footer>
    </div>
  );
};

export default Home;