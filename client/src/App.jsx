import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'

import JoinRoom from './pages/JoinRoom';
import Room from './pages/Room';

const pagesRouter = createBrowserRouter([
  { path: '/', element: <JoinRoom /> },
  { path: '/room/:roomId', element: <Room /> },
])

function App() {

  return (
    <RouterProvider router={pagesRouter} />
  )
}

export default App
