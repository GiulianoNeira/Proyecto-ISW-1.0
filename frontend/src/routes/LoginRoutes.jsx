import Login from '../components/login.jsx';
import Register from '../components/register.jsx';

const login = () => {
    return (
      <Router>
        <ChakraProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Register />} />
          </Routes>
        </ChakraProvider>
      </Router>
    );
  };