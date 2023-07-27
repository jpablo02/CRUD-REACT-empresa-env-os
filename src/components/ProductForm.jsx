// src/components/ProductForm.js

import React, { useState } from 'react';
import firebase from '../services/firebase';

const ProductForm = ({ productToEdit }) => {
  const [productDetails, setProductDetails] = useState({
    productName: productToEdit ? productToEdit.productName : '',
    originCity: productToEdit ? productToEdit.originCity : '',
    destinationCity: productToEdit ? productToEdit.destinationCity : '',
    originClient: productToEdit ? productToEdit.originClient : '',
    destinationClient: productToEdit ? productToEdit.destinationClient : '',
    shippingDate: productToEdit ? productToEdit.shippingDate : '',
    deliveryDate: productToEdit ? productToEdit.deliveryDate : '',
    packagePhoto: productToEdit ? productToEdit.packagePhoto : '',
    clientsPhoto: productToEdit ? productToEdit.clientsPhoto : '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!productDetails.productName || !productDetails.originCity || !productDetails.destinationCity) {
      setErrorMessage('Por favor, ingresa el nombre del producto, ciudad de origen y ciudad de destino.');
      return;
    }

    // Puedes agregar aquí validaciones adicionales, por ejemplo, para las fechas de envío y entrega.

    const collectionRef = firebase.firestore().collection('products');

    if (productToEdit) {
      // Si es una edición, actualizamos el producto en la base de datos de Firebase
      collectionRef
        .doc(productToEdit.id)
        .update({ ...productDetails })
        .then(() => {
          setProductDetails({
            productName: '',
            originCity: '',
            destinationCity: '',
            originClient: '',
            destinationClient: '',
            shippingDate: '',
            deliveryDate: '',
            packagePhoto: '',
            clientsPhoto: '',
          });
          setErrorMessage('');
          // Mostrar mensaje de éxito al usuario si lo deseas
        })
        .catch((error) => {
          console.error('Error al editar el producto:', error);
          setErrorMessage('Error al editar el producto. Por favor, intenta nuevamente.');
        });
    } else {
      // Si es un registro nuevo, guardamos el producto en la base de datos de Firebase
      collectionRef
        .add({ ...productDetails })
        .then(() => {
          setProductDetails({
            productName: '',
            originCity: '',
            destinationCity: '',
            originClient: '',
            destinationClient: '',
            shippingDate: '',
            deliveryDate: '',
            packagePhoto: '',
            clientsPhoto: '',
          });
          setErrorMessage('');
          // Mostrar mensaje de éxito al usuario si lo deseas
        })
        .catch((error) => {
          console.error('Error al registrar el producto:', error);
          setErrorMessage('Error al registrar el producto. Por favor, intenta nuevamente.');
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>{productToEdit ? 'Editar producto' : 'Registrar nuevo producto'}</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Producto"
          name="productName"
          value={productDetails.productName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Ciudad de origen"
          name="originCity"
          value={productDetails.originCity}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Ciudad de destino"
          name="destinationCity"
          value={productDetails.destinationCity}
          onChange={handleInputChange}
        />
        {/* Agregar más campos de entrada aquí si es necesario */}
        <button type="submit">{productToEdit ? 'Guardar cambios' : 'Registrar producto'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
