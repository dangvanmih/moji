import { BrowserRouter, Route, Routes } from 'react-router';
import SignInPage from './pages/SignInPage';
import SingUpPage from './pages/SingUpPage';
import ChatAppPage from './pages/ChatAppPage';
import {Toaster} from 'sonner';

function App() {

  return <>
    <Toaster richColors/>
    <BrowserRouter>
      <Routes>
        {/* public routes  */}
        <Route
          path='/signin'
          element={<SignInPage />}
        />

        <Route
          path='/signup'
          element={<SingUpPage />}
        />
        {/* protect routes  */}
        <Route
          path='/'
          element={<ChatAppPage />}
        />
      </Routes>
    </BrowserRouter>
  </>
}

export default App
