import './App.css'
import CharactersDetails from './components/CharactersDetails'
import DisplayCharacters from './components/DisplayCharacters'
import NavBar from './components/NavBar'
import { AppProvider } from './Contexts/AppContexts'
import { BrowserRouter, Routes, Route } from 'react-router'

function App() {

  return (
    <BrowserRouter>
      <AppProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<DisplayCharacters />} />
          <Route path="/character/:id" element={<CharactersDetails />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
