import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { motorcycle } from "../interfaces/motorcycle";
import styled from "styled-components";
import axios from "axios";

const StyledImg = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const CardMotorcycle = (props: {
  motorcycle: motorcycle;
  setUpdateList: Function;
  updateList: Boolean;
  handleOpen: Function;
  setDataModal: Function;
}) => {
  const url = "http://localhost:3004/motorcycles";

  const handleDelete = async () => {
    const r = await axios.delete(`${url}/${props.motorcycle.id}`);
    if (r.status === 200) {
      alert(`${props.motorcycle.reference} se ha eliminado correctamente`);
      props.setUpdateList(!props.updateList);
    }
  };

  const handleEdit = () => {
    props.setDataModal(props.motorcycle);
    props.handleOpen();
  };

  return (
    <div className="col-5 mb-3">
      <Card>
        <Card.Body>
          <Card.Title className="text-center">
            {props.motorcycle.reference}
          </Card.Title>
          <StyledImg
            src={props.motorcycle.image}
            alt={props.motorcycle.reference}
            className="card-img-top"
          />
          <ListGroup className="mb-2">
            <ListGroupItem>
              <strong>Modelo: </strong>
              {props.motorcycle.model}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Marca: </strong>
              {props.motorcycle.trademark}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Precio: </strong>
              {props.motorcycle.price}
            </ListGroupItem>
          </ListGroup>
          <button className="btn btn-danger me-2" onClick={handleDelete}>
            Eliminar
          </button>
          <button className="btn btn-primary" onClick={handleEdit}>
            Editar
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardMotorcycle;
