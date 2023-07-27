// src/components/CityForm.js

import React, { useState } from 'react';
import firebase from '../services/firebase';

const CityForm = ({ cityToEdit }) => {
  const [cityName, setCityName] = useState(cityToEdit ? cityToEdit.name : '');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!cityName) {
      setErrorMessage('Por favor, ingresa el nombre de la ciudad.');
      return;
    }

    if (cityToEdit) {
      firebase
        .firestore()
        .collection('cities')
        .doc(cityToEdit.id)
        .update({ name: cityName })
        .then(() => {
          setCityName('');
          setErrorMessage('');
          // Mostrar mensaje de éxito al usuario si lo deseas
        })
        .catch((error) => {
          console.error('Error al editar la ciudad:', error);
          setErrorMessage('Error al editar la ciudad. Por favor, intenta nuevamente.');
        });
    } else {
      firebase
        .firestore()
        .collection('cities')
        .add({ name: cityName })
        .then(() => {
          setCityName('');
          setErrorMessage('');
          // Mostrar mensaje de éxito al usuario si lo deseas
        })
        .catch((error) => {
          console.error('Error al registrar la ciudad:', error);
          setErrorMessage('Error al registrar la ciudad. Por favor, intenta nuevamente.');
        });
    }
  };

  return (
    <div>
      <h2>{cityToEdit ? 'Editar ciudad' : 'Registrar nueva ciudad'}</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Nombre de la ciudad"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button type="submit">{cityToEdit ? 'Guardar cambios' : 'Registrar ciudad'}</button>
      </form>
    </div>
  );
};

export default CityForm;
