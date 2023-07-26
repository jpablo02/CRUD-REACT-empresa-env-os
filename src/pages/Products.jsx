// src/pages/Products.js

import React, { useState, useEffect } from 'react';
import firebase from '../services/firebase';
import ProductForm from '../components/ProductForm';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Obtener los productos de la base de datos de Firebase al cargar la página
    const unsubscribe = firebase.firestore().collection('products')
      .onSnapshot((snapshot) => {
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      });

    // Desuscribirse de los cambios de Firebase al desmontar el componente
    return () => unsubscribe();
  }, []);

  const handleDeleteProduct = (productId) => {
    // Eliminar el producto de la base de datos de Firebase
    firebase.firestore().collection('products').doc(productId).delete()
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
      });
  };

  return (
    <div>
      <h1>Productos</h1>
      <ProductForm />

      <h2>Lista de productos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Ciudad de origen</th>
            <th>Ciudad de destino</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td>{product.originCity}</td>
              <td>{product.destinationCity}</td>
              <td>
                <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
