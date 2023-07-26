// src/components/ProductForm.js

import React, { useState } from 'react';
import firebase from '../services/firebase';
import 'firebase/storage';
import './productForm.css';

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

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(imageFile.name);

    imageRef.put(imageFile).then(() => {
      // Obtener la URL de la imagen subida
      imageRef.getDownloadURL().then((url) => {
        setProductDetails({
          ...productDetails,
          packagePhoto: url,
        });
      });
    });
  };

  return (
    <div className="form-container">
      <h2>{productToEdit ? 'Editar producto' : 'Registrar nuevo producto'}</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-column">
          <label htmlFor="productName">Producto</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={productDetails.productName}
            onChange={handleInputChange}
          />
          <label htmlFor="originCity">Ciudad de origen</label>
          <input
            type="text"
            id="originCity"
            name="originCity"
            value={productDetails.originCity}
            onChange={handleInputChange}
          />
          <label htmlFor="destinationCity">Ciudad de destino</label>
          <input
            type="text"
            id="destinationCity"
            name="destinationCity"
            value={productDetails.destinationCity}
            onChange={handleInputChange}
          />
          {/* ... Otros campos relacionados con el producto */}
        </div>
        <div className="form-column">
          <label htmlFor="originClient">Cliente de origen</label>
          <input
            type="text"
            id="originClient"
            name="originClient"
            value={productDetails.originClient}
            onChange={handleInputChange}
          />
          <label htmlFor="destinationClient">Cliente de destino</label>
          <input
            type="text"
            id="destinationClient"
            name="destinationClient"
            value={productDetails.destinationClient}
            onChange={handleInputChange}
          />
          <label htmlFor="shippingDate">Fecha de envío</label>
          <input
            type="date"
            id="shippingDate"
            name="shippingDate"
            value={productDetails.shippingDate}
            onChange={handleInputChange}
          />
          <label htmlFor="deliveryDate">Fecha de entrega</label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            value={productDetails.deliveryDate}
            onChange={handleInputChange}
          />
          <label htmlFor="packagePhoto">Foto del paquete</label>
          <input
            type="file"
            id="packagePhoto"
            name="packagePhoto"
            onChange={handleImageChange}
          />
          {/* ... Otros campos relacionados con el cliente */}
        </div>
        <button type="submit">{productToEdit ? 'Guardar cambios' : 'Registrar producto'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
