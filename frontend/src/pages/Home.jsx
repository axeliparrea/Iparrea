import React from 'react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Bienvenido a Mi Portafolio</h1>
        <p className="text-xl text-gray-600">Descubre mis proyectos y habilidades</p>
      </header>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 inline-block">Sobre Mí</h2>
        <p className="text-gray-700">Soy un desarrollador web apasionado por crear soluciones digitales innovadoras.</p>      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 inline-block">Mis Proyectos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Aquí puedes agregar tus proyectos */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <h3 className="text-xl font-medium mb-2 text-blue-600">Proyecto 1</h3>
            <p className="text-gray-700">Descripción del proyecto</p>
          </div>
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <h3 className="text-xl font-medium mb-2 text-blue-600">Proyecto 2</h3>
            <p className="text-gray-700">Descripción del proyecto</p>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 inline-block">Mis Habilidades</h2>
        <ul className="flex flex-wrap gap-3 mt-4">
          <li className="bg-blue-500 text-white px-4 py-2 rounded-full">React</li>
          <li className="bg-yellow-500 text-white px-4 py-2 rounded-full">JavaScript</li>
          <li className="bg-orange-500 text-white px-4 py-2 rounded-full">HTML/CSS</li>
          <li className="bg-green-500 text-white px-4 py-2 rounded-full">Node.js</li>
        </ul>
      </section>
      
      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} - Mi Portafolio Personal</p>
      </footer>
    </div>
  );
};

export default Home;