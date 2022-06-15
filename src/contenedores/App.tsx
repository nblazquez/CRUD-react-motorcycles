import { Container } from "react-bootstrap";
import ListMotorcycles from "../componentes/ListMotorcycles";

const App = () => {
  return (
    <Container fluid>
      <h1 className='text-center'>Listado de Motos</h1>
      <ListMotorcycles />
    </Container>
  );
}

export default App;
