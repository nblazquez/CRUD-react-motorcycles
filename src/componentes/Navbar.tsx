import { Container, Nav, Navbar as NavBar} from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <NavBar bg='dark' variant='dark'>
      <Container fluid>
        <Link to='/' className='navbar-brand'>Inicio</Link>
        <Nav className='me-auto'>
          <Link to='/new' className='nav-link'>Nuevo</Link>
        </Nav>
        
      </Container>
    </NavBar>
  );
};

export default Navbar;
