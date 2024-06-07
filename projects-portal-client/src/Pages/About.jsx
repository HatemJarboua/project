import React from 'react';

const About = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl mb-4 font-bold text-blue-600'>À Propos de PolyProjets</h1>
      
      <p className='mb-4'>Bienvenue sur <strong>PolyProjets</strong>, le portail de projets exclusif à la faculté Polytech Monastir. Notre mission est de promouvoir l&rsquo;innovation, la créativité et la collaboration entre étudiants, enseignants et partenaires industriels.</p>
      
      <p className='mb-4'>PolyProjets offre une plateforme unique où les étudiants peuvent proposer, collaborer sur et réaliser des projets concrets dans divers domaines de l&rsquo;ingénierie et des sciences appliquées. Notre objectif est de préparer nos étudiants aux défis réels du monde professionnel en leur donnant l&rsquo;opportunité de travailler sur des projets pratiques et pertinents.</p>
      
      <section className="mb-8">
        <h2 className='text-2xl mb-4 font-semibold text-blue-600'>Fonctionnalités Clés de PolyProjets</h2>
        <ul className='list-disc pl-5'>
          <li>Publication et partage de projets innovants</li>
          <li>Collaboration entre étudiants, enseignants et industriels</li>
          <li>Accès à des ressources éducatives et des outils de gestion de projet</li>
          <li>Opportunités de stage et de partenariat avec des entreprises locales et internationales</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className='text-2xl mb-4 font-semibold text-blue-600'>Témoignages</h2>
        <p>« PolyProjets a été une expérience enrichissante pour moi. J&rsquo;ai pu collaborer sur des projets réels et acquérir des compétences pratiques inestimables pour ma carrière. » - <em>Amina Ben Ali, Étudiante en Génie Informatique</em></p>
      </section>
      
      <section className="mb-8">
        <h2 className='text-2xl mb-4 font-semibold text-blue-600'>Notre Vision</h2>
        <p>Nous aspirons à faire de PolyProjets une référence en matière de collaboration universitaire-industrie et à contribuer activement au développement technologique et économique de la région et du pays.</p>
      </section>
      
      <section>
        <h2 className='text-2xl mb-4 font-semibold text-blue-600'>Rejoignez-Nous</h2>
        <p>Pour en savoir plus sur PolyProjets et comment vous pouvez participer ou bénéficier de cette initiative, contactez-nous ou visitez notre portail en ligne.</p>
      </section>
    </div>
  );
}

export default About;
