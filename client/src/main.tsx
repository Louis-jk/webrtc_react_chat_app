import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { RoomProvider } from './context/RoomContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Room } from './pages/Room';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RoomProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/room/:id' element={<Room />} />
        </Routes>
      </RoomProvider>
    </BrowserRouter>
  </StrictMode>
);
