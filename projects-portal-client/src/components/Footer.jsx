import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className='text-white bg-[#1d4ed8] mt-20'>
      <div className='container px-5 py-10 mx-auto'>
        <div className='flex flex-wrap justify-between'>
          {/* Liens Utiles */}
          <div className="footer-section">
            <h2 className="text-lg mb-4">Liens Utiles</h2>
            <ul>
              <li><a href="/">Accueil</a></li>
              <li><a href="/about">À Propos</a></li>
              <li><a href="/services">Services</a></li> {/* Ligne modifiée */}
            </ul>
          </div>
          {/* Réseaux Sociaux */}
          <div className="footer-section">
            <h2 className="text-lg mb-4">Réseaux Sociaux</h2>
            <ul className="flex gap-4">
              <li><a href="https://facebook.com"><FaFacebookF /></a></li>
              <li><a href="https://twitter.com"><FaTwitter /></a></li>
              <li><a href="https://linkedin.com"><FaLinkedinIn /></a></li>
              <li><a href="https://instagram.com"><FiInstagram /></a></li>
            </ul>
          </div>
          {/* Contact Info */}
          <div className="footer-section">
            <h2 className="text-lg mb-4">Contactez-nous</h2>
            <ul>
              <li>École Polytechnique de Monastir</li>
              <li>Adresse: 5000 Monastir, Tunisie</li>
              <li>Email: contact@polytech.monastir.tn</li>
              <li>Tél: +216 73 500 276</li>
            </ul>
          </div>
        </div>
        <div className='text-center pt-10 mt-10 border-t border-gray-700'>
          <p>© {new Date().getFullYear()} Polytech Monastir - Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
