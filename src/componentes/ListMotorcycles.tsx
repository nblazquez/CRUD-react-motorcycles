import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { Container, Modal, Row } from "react-bootstrap";
import { motorcycle } from "../interfaces/motorcycle";
import CardMotorcycle from "./CardMotorcycle";

const ListMotorcycles = () => {
  //Obtener datos----
  const url = "http://localhost:3004/motorcycles";

  const getData = async () => {
    const response = axios.get(url);
    return response;
  };

  //Estados----
    //Lista de motos en BD
  const [list, setList] = useState([]);
    //Si la lista se ha actualizado
  const [updateList, setUpdateList] = useState(false);
    //Modal de edición mostrado/oculto
  const [showModal, setShowModal] = useState(false);
    //Datos en el formulario del modal de edición
  const [dataModal, setDataModal] = useState<motorcycle>({
    id: 0,
    trademark: "",
    model: "",
    reference: "",
    price: 0,
    image: ""
  });

  //Funciones----
    //Cierra el modal de edición
  const handleClose = () => {
    setShowModal(false);
  };
    //Abre el modal de edición
  const handleOpen = () => {
    setShowModal(true);
  };
    //Permite y maneja los cambios realizados en el formulario de edición
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setDataModal({
      ...dataModal, [e.target.name]:e.target.value
    })
  };

  //Permite utilizar funciones cuando se renderiza el componente
  //Se volverá a ejecutar cada vez que el array del segundo parámetro cambie
  useEffect(() => {
    //Como getData es async, se utiliza 'then'
    getData().then((respuesta) => {
      setList(respuesta.data);
    });
  }, [updateList]);

  return (
    <Container className="mb-5">
      <Row>
        {list.map((moto: motorcycle, index) => (
          <CardMotorcycle
            key={index}
            motorcycle={moto}
            setUpdateList={setUpdateList}
            updateList={updateList}
            handleOpen={handleOpen}
            setDataModal={setDataModal}
          />
        ))}
      </Row>
      <Modal show={showModal} onHide={handleClose}>
        <Formik 
          initialValues={dataModal}
          onSubmit={async (values) => {
            const r = await axios.put(`${url}/${values.id}`, dataModal);
            if (r.status === 200) {
              alert(`${dataModal.reference} se ha actualizado correctamente`);
              setUpdateList(!updateList);
              handleClose();
            } else{
              alert(`Se ha producido un error al actualizar ${dataModal.reference}`);
            }
          }}>
          {({errors, touched}) => (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>Actualizar Datos</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group mb-3">
                  <label 
                    htmlFor="reference"
                    className="form-label"
                  >Referencia</label>
                  <Field
                    className="form-control"
                    type="text"
                    value={dataModal.reference}
                    name="reference"
                    id='reference'
                    onChange={handleChange}
                  />
                  {touched.reference && errors.reference && (
                    <div className="error">{errors.reference}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label 
                    htmlFor="trademark"
                    className="form-label"
                  >Marca</label>
                  <Field 
                    className="form-select" 
                    as="select" 
                    name="trademark" 
                    id='trademark' 
                    value={dataModal.trademark}
                    onChange={handleChange}
                  >
                    <option>Seleccione Marca</option>
                    <option value="Honda">Honda</option>
                    <option value="Yamaha">Yamaha</option>
                    <option value="Suzuki">Suzuki</option>
                  </Field>
                  {touched.trademark && errors.trademark && (
                    <div className="error">{errors.trademark}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label 
                    htmlFor="model"
                    className="form-label"
                  >Modelo</label>
                  <Field
                    className="form-control"
                    type="text"
                    value={dataModal.model}
                    name="model"
                    id='model'
                    onChange={handleChange}
                  />
                  {touched.model && errors.model && (
                    <div className="error">{errors.model}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label 
                    htmlFor="precio"
                    className="form-label"
                  >Precio</label>
                  <Field
                    className="form-control"
                    type="number"
                    value={dataModal.price}
                    name="price"
                    id='precio'
                    onChange={handleChange}
                  />
                  {touched.price && errors.price && (
                    <div className="error">{errors.price}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label 
                    htmlFor="image"
                    className="form-label"
                  >URL de imagen</label>
                  <Field
                    className="form-control"
                    type="text"
                    value={dataModal.image}
                    name="image"
                    id='image'
                    onChange={handleChange}
                  />
                  {touched.image && errors.image && (
                    <div className="error">{errors.image}</div>
                  )}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="reset"
                  onClick={handleClose}
                  className="btn btn-secondary"
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Guardar
                </button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </Container>
  );
};

export default ListMotorcycles;
