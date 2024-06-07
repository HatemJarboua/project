import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth, AuthProvider } from './context/AuthProvider'; // Assurez-vous que le chemin est correct

function App() {
  return (
    <AuthProvider> {/* AuthProvider enveloppe l'application */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Outlet /> {/* Ceci rend les composants correspondants à la route actuelle */}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
