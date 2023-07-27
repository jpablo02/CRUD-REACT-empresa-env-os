// src/pages/Clients.js

import React, { useState, useEffect } from 'react';
import firebase from '../services/firebase';
import ClientForm from '../components/ClientForm';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Obtener los clientes de la base de datos de Firebase al cargar la página
    const unsubscribe = firebase.firestore().collection('clients')
      .onSnapshot((snapshot) => {
        const clientsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClients(clientsData);
      });

    // Desuscribirse de los cambios de Firebase al desmontar el componente
    return () => unsubscribe();
  }, []);

  return (
    <div className="page-container">
      <h1>Clientes</h1>
      <ClientForm setMessage={setMessage} />

      <h2>Lista de clientes</h2>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
