import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import firebase from '../firebase/firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import { 
  getFirestore, 
  doc, 
  setDoc 
} from "firebase/firestore";  // Importez Firestore ici
const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const { app } = firebase;
  const navigate = useNavigate(); // Hook pour la navigation
  

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
   const db = getFirestore(app);  // Initialisez Firestore ici

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`
      });
      // Stocker des informations supplémentaires dans Firestore
    const userProfileRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userProfileRef, {
      email,
      firstName,
      lastName,
      role, // Ici, vous stockez le rôle de l'utilisateur
    });

     // Afficher un message d'alerte pour confirmer l'inscription réussie
     alert("Inscription réussie ! Bienvenue sur notre plateforme.");
      console.log("Inscription réussie avec l'utilisateur:", userCredential.user);
      navigate('/'); // Rediriger vers la page d'accueil après inscription réussie
    } catch (error) {
      console.error("Erreur d'inscription:", error.message);
      setError(error.message);
    }
  };

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      alert("Inscription réussie avec Google ! Bienvenue sur notre plateforme.");
      console.log(result.user);
      navigate('/'); // Rediriger vers la page d'accueil après l'inscription réussie
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
      <h2 className='text-2xl font-bold mb-4 text-blue-900'>Créer un compte</h2>
      <form onSubmit={handleSignUp} className='w-full max-w-md bg-white p-6 rounded-lg shadow-md'>
        {/* Champ Prénom */}
        <div className='mb-4'>
          <label htmlFor='firstName' className='block text-gray-700 text-sm font-bold mb-2'>
            Prénom
          </label>
          <input
            className='shadow border rounded w-full py-2 px-3 text-gray-700'
            id='firstName'
            type='text'
            placeholder='Votre prénom'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        {/* Champ Nom */}
        <div className='mb-4'>
          <label htmlFor='lastName' className='block text-gray-700 text-sm font-bold mb-2'>
            Nom
          </label>
          <input
            className='shadow border rounded w-full py-2 px-3 text-gray-700'
            id='lastName'
            type='text'
            placeholder='Votre nom'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
            placeholder='Créez un mot de passe'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Ajout du champ Rôle */}
        <div className='mb-4'>
          <label htmlFor='role' className='block text-gray-700 text-sm font-bold mb-2'>
            Vous êtes :
          </label>
          <select
            className='shadow border rounded w-full py-2 px-3 text-gray-700'
            id='role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value=''>Sélectionnez votre rôle</option>
            <option value='etudiant'>Étudiant</option>
            <option value='enseignant'>Enseignant</option>
            <option value='administration'>Administration</option>
          </select>
        </div>
        {/* Bouton Inscription */}
        <div className='mb-4'>
          <button
            className=' hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full bg-blue '
            type='submit'
          >
            S&rsquo;inscrire
          </button>
        </div>
        {/* Bouton Inscription avec Google */}
        <div className='mb-4'>
          <button
            className='bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded flex items-center justify-center w-full'
            onClick={handleGoogleSignUp}
          >
            <img src="./images/google.png" alt="Google Icon" className="w-6 h-6 mr-2" />
            S&rsquo;inscrire avec Google
          </button>
        </div>
        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
      </form>
      <p className="mt-4 text-blue-900">
        Déjà inscrit ? <Link to="/login" className="text-blue-500 hover:text-blue-700">Connectez-vous ici.</Link>
      </p>
    </div>
  );
};

export default SignUp;
