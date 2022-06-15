import { Container } from "react-bootstrap";
import { motorcycle } from "../interfaces/motorcycle";
import { Formik, Form, Field } from "formik";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const initialValues: motorcycle = {
  id: 0,
  trademark: "",
  model: "",
  reference: "",
  price: 0,
  image: "",
};

const NewMotorcycle = () => {

  const url = 'http://localhost:3004/motorcycles';

  const navigate = useNavigate();

  return (
    <Container>
      <h1 className="text-center">Alta de motos</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          const r = await axios.post(url, values);
          if(r.status === 201){
            navigate('/');
          }
        }}
        validate={(values) => {
          let errores : any = {};

          if(!values.image){
            errores.image = 'Introduce una imagen'
          }

          if(!values.trademark){
            errores.trademark = 'Selecciona una marca'
          }
          
          if(!values.model){
            errores.model = 'Introduce un modelo'
          }
          
          if(!values.reference){
            errores.reference = 'Introduce una referencia'
          }

          if(!values.price){
            errores.price = 'Introduce un precio'
          }

          return errores;
        }}
      >
        {({errors, touched}) => (
          <Form>
            <div className="form-group mb-3">
              <Field
                className="form-control"
                type="text"
                placeholder="Referencia"
                name="reference"
              />
              {touched.reference && errors.reference && <div className='error'>{errors.reference}</div>}
            </div>
            <div className="form-group mb-3">
              <Field className="form-select" as="select" name="trademark">
                <option>Seleccione Marca</option>
                <option value="Honda">Honda</option>
                <option value="Yamaha">Yamaha</option>
                <option value="Suzuki">Suzuki</option>
              </Field>
              {touched.trademark && errors.trademark && <div className='error'>{errors.trademark}</div>}
            </div>
            <div className="form-group mb-3">
              <Field
                className="form-control"
                type="text"
                placeholder="Modelo"
                name="model"
              />
              {touched.model && errors.model && <div className='error'>{errors.model}</div>}
            </div>
            <div className="form-group mb-3">
              <Field
                className="form-control"
                type="number"
                placeholder="Precio"
                name="price"
              />
              {touched.price && errors.price && <div className='error'>{errors.price}</div>}
            </div>
            <div className="form-group mb-3">
              <Field
                className="form-control"
                type="text"
                placeholder="URL de la imagen"
                name="image"
              />
              {touched.image && errors.image && <div className='error'>{errors.image}</div>}
            </div>
            <button type="submit" className="btn btn-success">
              Dar de alta
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default NewMotorcycle;
