// src/components/ClientForm.js

import React, { useState } from 'react';
import firebase from '../services/firebase';

const ClientForm = ({ clientToEdit }) => {
  const [clientDetails, setClientDetails] = useState({
    name: clientToEdit ? clientToEdit.name : '',
    email: clientToEdit ? clientToEdit.email : '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!clientDetails.name || !clientDetails.email) {
      setErrorMessage('Por favor, ingresa el nombre y correo electrónico del cliente.');
      return;
    }

    const collectionRef = firebase.firestore().collection('clients');

    if (clientToEdit) {
      // Si es una edición, actualizamos el cliente en la base de datos de Firebase
      collectionRef
        .doc(clientToEdit.id)
        .update({ ...clientDetails })
        .then(() => {
          setClientDetails({ name: '', email: '' });
          setErrorMessage('');
          // Mostrar mensaje de éxito al usuario si lo deseas
        })
        .catch((error) => {
          console.error('Error al editar el cliente:', error);
          setErrorMessage('Error al editar el cliente. Por favor, intenta nuevamente.');
        });
    } else {
      // Si es un registro nuevo, guardamos el cliente en la base de datos de Firebase
      collectionRef
        .add({ ...clientDetails })
        .then(() => {
          setClientDetails({ name: '', email: '' });
          setErrorMessage('');
          // Mostrar mensaje de éxito al usuario si lo deseas
        })
        .catch((error) => {
          console.error('Error al registrar el cliente:', error);
          setErrorMessage('Error al registrar el cliente. Por favor, intenta nuevamente.');
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientDetails({
      ...clientDetails,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>{clientToEdit ? 'Editar cliente' : 'Registrar nuevo cliente'}</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Nombre del cliente"
          name="name"
          value={clientDetails.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          name="email"
          value={clientDetails.email}
          onChange={handleInputChange}
        />
        <button type="submit">{clientToEdit ? 'Guardar cambios' : 'Registrar cliente'}</button>
      </form>
    </div>
  );
};

export default ClientForm;
