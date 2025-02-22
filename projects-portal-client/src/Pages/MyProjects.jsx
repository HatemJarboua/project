import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const MyProjects = () => {
    const [projects, setProjects] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useAuth(); // Utilisation de useAuth pour accéder au contexte d'authentification
    const userEmail = user ? user.email : ''; // Utiliser l'email de l'utilisateur connecté

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API_BASE_URL}/myProjects/${userEmail}`)
        .then(res => res.json())
        .then(data => {
            setProjects(data);
            setIsLoading(false);
        });
    }, [userEmail]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (indexOfLastItem < projects.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSearch = () => {
        const filter = projects.filter((project) => project.projectName.toLowerCase().includes(searchText.toLowerCase()));
        setProjects(filter);
        setIsLoading(false);
    };

    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/project/${id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.acknowledged) {
                alert("Projet supprimé avec succès!");
            } else {
                alert("Erreur lors de la suppression du projet: " + data.message);
            }
            setProjects(prevProjects => prevProjects.filter(project => project._id !== id));
        })
        .catch(error => {
            console.error("Erreur lors de la suppression du projet:", error);
            alert("Erreur technique lors de la suppression du projet.");
        });
    };
  

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <div className='my-projects-container'>
                <h1 className="text-center p-4 text-2xl bg-gray-150 font-bold text-gray-800 dark:text-white shadow-lg transition-all duration-300 hover:text-blue-500">
                    Tous mes Projets
                </h1>

                <div className='search-box p-2 text-center mb-2'>
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        type='text'
                        name='search'
                        id='search'
                        className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full'
                    />
                    <button className='bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4' onClick={handleSearch}>
                        Rechercher
                    </button>
                </div>
            </div>

            <section className="py-1 bg-blueGray-50">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">Tous les projets</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <Link to="/post-projet">
                                        <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                            Ajouter un nouveau projet
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Num.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Titre
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Catégorie
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Département
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Modifier
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Supprimer
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                <div className='flex items-center justify-center h-20'>
                                                    <p>Loading..</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        currentProjects.map((project, index) => (
                                            <tr key={index}>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                    {index + 1}
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {project.projectName}
                                                </td>
                                                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {project.projectCategory}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {project.department}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <Link to={`/edit-project/${project._id}`}>
                                                        Modifier
                                                    </Link>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button onClick={() => handleDelete(project._id)} className='bg-red-700 py-2 px-6 text-white rounded-sm'>
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center text-black space-x-8 mb-8'>
                    {currentPage > 1 && (
                        <button className='hover:underline' onClick={prevPage}>Précédent</button>
                    )}
                    {indexOfLastItem < projects.length && (
                        <button className='hover:underline' onClick={nextPage}>Suivant</button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default MyProjects;
