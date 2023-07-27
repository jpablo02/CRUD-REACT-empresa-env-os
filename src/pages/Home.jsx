// src/pages/Home.js

import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a la página de inicio</h1>
      {/* Aquí puedes agregar cualquier contenido que desees mostrar en la página de inicio */}
      {/* Por ejemplo, una imagen de fondo */}
      <div style={{ backgroundImage: 'url(path/to/your/image.jpg)', height: '500px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Contenido adicional */}
      </div>
    </div>
  );
};

export default Home;
