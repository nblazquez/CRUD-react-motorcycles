import { BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "../componentes/Navbar";
import App from "../contenedores/App";
import NewMotorcycle from "../contenedores/NewMotorcycle";

const Router = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/new' element={<NewMotorcycle />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
