import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebase from '../firebase/firebase.config';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { app } = firebase;
  const navigate = useNavigate();

  const auth = getAuth(app);
  const GoogleProvider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Connexion réussie");
      navigate('/');
    } catch (error) {
      console.error("Erreur de connexion:", error.message);
      setError(error.message);
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, GoogleProvider).then((result) => {
      console.log(result.user);
      navigate('/');
    }).catch((error) => {
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        setError('La fenêtre popup a été fermée avant la fin de la connexion.');
      } else {
        console.error("Erreur lors de la connexion avec Google:", error.message);
        setError(error.message);
      }
    });
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-blue-100'>
      <h2 className='text-2xl font-bold mb-4 text-blue-900'>Se connecter</h2>
      <form onSubmit={handleLogin} className='w-full max-w-md bg-white p-6 rounded-lg shadow-md'>
        {/* Champ Email */}
        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>
            Email
          </label>
          <input
            className='shadow border rounded w-full py-2 px-3 text-gray-700'
            id='email'
            type='email'
            placeholder='Votre email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Champ Mot de passe */}
        <div className='mb-4'>
          <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>
            Mot de passe
          </label>
          <input
            className='shadow border rounded w-full py-2 px-3 text-gray-700'
            id='password'
            type='password'
            placeholder='Votre mot de passe'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Bouton Connexion */}
        <div className='mb-4'>
          <button
            className=' hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full bg-blue'
            type='submit'
          >
            Se connecter
          </button>
        </div>
        {/* Bouton Connexion avec Google */}
        <div className='mb-4'>
          <button
            className='bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded flex items-center justify-center w-full'
            onClick={handleGoogleLogin}
          >
            <img src="./images/google.png" alt="Google Icon" className="w-6 h-6 mr-2" />
            Se connecter avec Google
          </button>
        </div>
        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
      </form>
      <p className="mt-4 text-blue-900">
        Pas encore inscrit ? <Link to="/sign-up" className="text-blue-500 hover:text-blue-700 un">Inscrivez-vous ici.</Link>
      </p>
    </div>
  );
};

export default Login;
