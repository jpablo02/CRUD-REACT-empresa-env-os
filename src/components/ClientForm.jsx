// src/components/ClientForm.js

import React, { useState } from 'react';
import firebase from '../services/firebase';

const ClientForm = ({ clientToEdit }) => {
  const [clientDetails, setClientDetails] = useState({
    name: clientToEdit ? clientToEdit.name : '',
    email: clientToEdit ? clientToEdit.email : '',
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (clientToEdit) {
      // Si es una edición, actualizamos el cliente en la base de datos de Firebase
      firebase.firestore().collection('clients').doc(clientToEdit.id).update({
        ...clientDetails,
      })
        .then(() => {
          // Limpiar los campos después de editar el cliente
          setClientDetails({
            name: '',
            email: '',
          });
        })
        .catch((error) => {
          console.error('Error al editar el cliente:', error);
        });
    } else {
      // Si es un registro nuevo, guardamos el cliente en la base de datos de Firebase
      firebase.firestore().collection('clients').add({
        ...clientDetails,
      })
        .then(() => {
          // Limpiar los campos después de registrar el cliente
          setClientDetails({
            name: '',
            email: '',
          });
        })
        .catch((error) => {
          console.error('Error al registrar el cliente:', error);
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
