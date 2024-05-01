import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css'

import JoinRoom from './pages/JoinRoom';
import Room from './pages/Room';
import SocketWrapper from './pages/SocketWrapper';

const pagesRouter = createBrowserRouter([
  { path: '/', element: <JoinRoom /> },
  { path: '/room/:roomId', element: <Room /> },
])

function App() {

  return (<>
    <Toaster />
    <RouterProvider router={pagesRouter} />
  </>
  )
}

export default App
