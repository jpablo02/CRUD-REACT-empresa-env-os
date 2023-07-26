// src/components/CityForm.js

import React, { useState } from 'react';
import firebase from '../services/firebase';

const CityForm = ({ cityToEdit }) => {
  const [cityName, setCityName] = useState(cityToEdit ? cityToEdit.name : '');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (cityToEdit) {
      // Si es una edición, actualizamos la ciudad en la base de datos de Firebase
      firebase.firestore().collection('cities').doc(cityToEdit.id).update({
        name: cityName,
      })
      .then(() => {
        // Limpiar el campo de nombre de ciudad después de editarla
        setCityName('');
      })
      .catch((error) => {
        console.error('Error al editar la ciudad:', error);
      });
    } else {
      // Si es un registro nuevo, guardamos la ciudad en la base de datos de Firebase
      firebase.firestore().collection('cities').add({
        name: cityName,
      })
      .then(() => {
        // Limpiar el campo de nombre de ciudad después de registrarla
        setCityName('');
      })
      .catch((error) => {
        console.error('Error al registrar la ciudad:', error);
      });
    }
  };

  return (
    <div>
      <h2>{cityToEdit ? 'Editar ciudad' : 'Registrar nueva ciudad'}</h2>
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
