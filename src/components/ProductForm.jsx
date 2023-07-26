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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (productToEdit) {
      // Si es una edición, actualizamos el producto en la base de datos de Firebase
      firebase.firestore().collection('products').doc(productToEdit.id).update({
        ...productDetails,
      })
        .then(() => {
          // Limpiar los campos después de editar el producto
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
        })
        .catch((error) => {
          console.error('Error al editar el producto:', error);
        });
    } else {
      // Si es un registro nuevo, guardamos el producto en la base de datos de Firebase
      firebase.firestore().collection('products').add({
        ...productDetails,
      })
        .then(() => {
          // Limpiar los campos después de registrar el producto
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
        })
        .catch((error) => {
          console.error('Error al registrar el producto:', error);
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
        {/* ... Y así para los demás campos */}
        <button type="submit">{productToEdit ? 'Guardar cambios' : 'Registrar producto'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
