// src/pages/Cities.js

import React, { useState, useEffect } from 'react';
import firebase from '../services/firebase';
import CityForm from '../components/CityForm';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Obtener las ciudades de la base de datos de Firebase al cargar la página
    const unsubscribe = firebase.firestore().collection('cities')
      .onSnapshot((snapshot) => {
        const citiesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCities(citiesData);
      });

    // Desuscribirse de los cambios de Firebase al desmontar el componente
    return () => unsubscribe();
  }, []);

  const handleDeleteCity = (cityId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta ciudad?')) {
      // Eliminar la ciudad de la base de datos de Firebase
      firebase.firestore().collection('cities').doc(cityId).delete()
        .then(() => {
          setMessage('Ciudad eliminada correctamente.');
        })
        .catch((error) => {
          console.error('Error al eliminar la ciudad:', error);
          setMessage('Error al eliminar la ciudad. Por favor, intenta nuevamente.');
        });
    }
  };

  return (
    <div>
      <h1>Ciudades</h1>
      <CityForm />

      <h2>Lista de ciudades</h2>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de la ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.id}>
              <td>{city.id}</td>
              <td>{city.name}</td>
              <td>
                <button onClick={() => handleDeleteCity(city.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cities;
