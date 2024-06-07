import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import PageHeader from '../components/PageHeader';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/all-projects/${id}`)
            .then(res => res.json())
            .then(data => setProject(data));
    }, [id]);

    // Swal.fire pour recueillir une URL de l'utilisateur
    // L'URL est ensuite envoyée à votre serveur via une requête fetch à l'API /apply-project/:id
    const handleApply = async () => {
        const { value: url } = await Swal.fire({
            title: 'Postuler au projet',
            text: 'Veuillez entrer l\'URL de votre portfolio ou CV en ligne :',
            input: 'url',
            inputLabel: 'URL du portfolio ou CV',
            inputPlaceholder: 'Entrez l\'URL ici',
            inputAttributes: {
              autocapitalize: 'off',
              autocorrect: 'off'
            }
        });

        if (url) {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/apply-project/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectId: id, applicationUrl: url }),
            })
            .then(response => response.json())
            .then(data => Swal.fire('Candidature envoyée avec succès!'))
            .catch((error) => Swal.fire('Erreur lors de l\'envoi de la candidature'));
        }
    }

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <PageHeader title="Détails du projet" path="Détails du projet" />
    <div className=" mb-10">
        <h2 className="text-lg text-blue-600 font-semibold">Les détails du projet: {id}</h2>
        <h1 className="mt-2 text-4xl font-bold text-gray-800">{project.projectName}</h1>
    </div>

            <button className='bg-blue px-8 py-2 text-white' onClick={handleApply}>Postuler maintenant</button>

            <div className="flex mt-8">
                {/* Section sur les avantages et les bienfaits des PFA et PFE */}
                <section className="w-1/3 px-4">
                    <h2 className="text-2xl font-bold">Innovation et Créativité</h2>
                    <p className="mt-4">
                        Les Projets de Fin d&rsquo;Année (PFA) et les Projets de Fin d&rsquo;Études (PFE) sont des catalyseurs d&rsquo;innovation et de créativité, offrant un terrain fertile pour explorer de nouvelles idées, tester des théories en pratique, et pousser les limites de ce qui est possible.
                    </p>
                </section>

                {/* Section Plan */}
                <section className="w-1/3 px-4">
                    <h2 className="text-2xl font-bold">Approche Structurée</h2>
                    <p className="mt-4">
                        Chaque projet suit une approche méthodique, garantissant une gestion efficace et une expérience d&rsquo;apprentissage enrichissante, de la conceptualisation à la réalisation finale.
                    </p>
                </section>

                {/* Section Croissance future */}
                <section className="w-1/3 px-4">
                    <h2 className="text-2xl font-bold">Fondation pour l&rsquo;Avenir</h2>
                    <p className="mt-4">
                        Ces projets préparent les étudiants à des carrières réussies et innovantes, offrant une opportunité d&rsquo;initier des recherches qui pourraient conduire à de nouvelles découvertes ou technologies révolutionnaires.
                    </p>
                </section>
            </div>
            <div className="mt-8">
                <p className="mt-4">
                    Au-delà de l&rsquo;acquisition de compétences techniques, ces projets encouragent une démarche réfléchie sur les impacts sociétaux, économiques et environnementaux. Ils invitent les étudiants à réfléchir à la manière dont les innovations technologiques peuvent contribuer à un avenir durable et inclusif, marquant non seulement un tournant dans leur parcours éducatif mais aussi un engagement vers la résolution des défis mondiaux.
                </p>
            </div>
        </div>
    );
}

export default ProjectDetails;
