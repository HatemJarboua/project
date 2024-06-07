import React from 'react';
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";

const Newsletter = () => {
  return (
    <div>
      <div>
        <h4 className='text-lg font-bold mb-2 flex items-center justify-center gap-2'>
            <FaEnvelopeOpenText className="text-2xl" />
            Restez informé des nouveaux projets !
        </h4>
        <p className='text-primary/75 text-base mb-4'>Inscrivez-vous à notre newsletter pour recevoir les dernières mises à jour sur les projets disponibles et les opportunités d&aposengagement.
         <br/> Ne manquez aucune opportunité qui s&apos;offre à vous.</p>

         <div className='w-full space-y-4'>
             <input type='email' name='email' id='email' placeholder='Votre adresse e-mail' className='w-full block py-2 p1-3 border focus:outline-none' />
             <input type='submit' value={"S'inscrire"} className='w-full block py-2 p1-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold' />
         </div>
      </div>

      <div className='mt-20'>
    <h4 className='text-lg font-bold mb-2 flex items-center justify-center gap-2'>
        <FaRocket className="text-2xl" />
        Soyez notifié plus vite !
    </h4>
    <p className='text-primary/75 text-base mb-4'>Abonnez-vous pour être parmi les premiers informés des nouveaux projets et opportunités de collaboration.
        <br/>Maximisez vos chances en restant à l&aposavant-garde.</p>

    <div className='w-full space-y-4'>
        <input type='submit' value={"Proposer un projet"} className='w-full block py-2 p1-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold' />
    </div>
</div>

    </div>
  );
};

export default Newsletter;
