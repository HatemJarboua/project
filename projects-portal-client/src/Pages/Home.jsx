import React, { useEffect, useState, useMemo } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../components/Newsletter";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedDepartment, setSelectedDepartment] = useState("all");
    const [projets, setProjets] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [selectedEducationLevel, setSelectedEducationLevel] = useState("all");
    const [showProjectCount, setShowProjectCount] = useState(false);
    const [selectedPostingDate, setSelectedPostingDate] = useState("all");

    useEffect(() => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API_BASE_URL}/all-projects`)
            .then(res => res.json())
            .then(data => {
                setProjets(data);
                setIsLoading(false);
            });
    }, []);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
        setShowProjectCount(false);
        console.log("Query:", event.target.value); // Vérification de l'état query
    };

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1);
        setShowProjectCount(true);
    };

    const handleDepartmentChange = (department) => {
        setSelectedDepartment(department);
        setCurrentPage(1);
        setShowProjectCount(true);
    };

    const handleEducationLevelChange = (educationLevel) => {
        setSelectedEducationLevel(educationLevel);
        setCurrentPage(1);
        setShowProjectCount(true);
    };

    const nextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const prevPage = () => {
        setCurrentPage((prev) => prev - 1);
    };

    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const ThirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
    const sevenDaysAgoDate = sevenDaysAgo.toISOString().slice(0, 10);
    const ThirtyDaysAgoDate = ThirtyDaysAgo.toISOString().slice(0, 10);

    const filteredProjets = useMemo(() => {
        return projets
            .filter(projet => 
                query ? 
                projet.requiredSkills && projet.requiredSkills.some(skill => skill.toLowerCase().includes(query.toLowerCase())) 
                : true
            )
            .filter(projet => {
                const projetDate = new Date(projet.postingDate);
                switch(selectedPostingDate) {
                    case "24hours":
                        return projetDate >= twentyFourHoursAgo;
                    case "7days":
                        return projetDate >= sevenDaysAgo;
                    case "30days":
                        return projetDate >= ThirtyDaysAgo;
                    default:
                        return true;
                }
            })
            .filter(projet => {
                if (selectedCategory === "all") return true;
                return (
                    projet.projectLocation.toLowerCase() === selectedCategory.toLowerCase() ||
                    projet.projectType.toLowerCase() === selectedCategory.toLowerCase() ||
                    projet.projectCategory.toLowerCase() === selectedCategory.toLowerCase() ||
                    projet.requiredSkills && projet.requiredSkills.some(skill => skill.toLowerCase() === selectedCategory.toLowerCase())
                );
            })
            .filter(projet => {
                if (selectedDepartment === "all") return true;
                return projet.department.toLowerCase() === selectedDepartment.toLowerCase();
            })
            .filter(projet => {
                if (selectedEducationLevel === "all") return true;
                return projet.educationLevel && projet.educationLevel.toLowerCase() === selectedEducationLevel.toLowerCase();
            });
    }, [projets, query, selectedCategory, selectedDepartment, selectedEducationLevel, selectedPostingDate, twentyFourHoursAgo, sevenDaysAgo, ThirtyDaysAgo]);

    const displayedProjects = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredProjets.slice(startIndex, endIndex);
    }, [filteredProjets, currentPage, itemsPerPage]);

    console.log("Query:", query); // Vérification de l'état query

    return (
        <div>
            <Banner
                query={query}
                handleInputChange={handleInputChange}
            />
            {/* main content */}
            <div className=" bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
                {/* Left side */}
                <div className="bg-white p-4 rounded">
                    <Sidebar
                        handleChange={handleChange}
                        handleDepartmentChange={handleDepartmentChange}
                        handleEducationLevelChange={handleEducationLevelChange}
                        selectedEducationLevel={selectedEducationLevel}
                        setSelectedPostingDate={setSelectedPostingDate} // Ajout de cette prop pour gérer la date de publication
                    />
                </div>
                {/* projets cards */}
                <div className="col-span-2 bg-white p-4 rounded-sm">
                    {isLoading ? (
                        <p>Chargement en cours...</p>
                    ) : displayedProjects.length > 0 ? (
                        <>
                            {showProjectCount && <p className="text-lg font-bold mb-4">{filteredProjets.length} Projets trouvés</p>}
                            {displayedProjects.map((projet, index) => <Card key={index} data={projet} />)}
                            <div className="flex justify-center mt-4">
                                <button onClick={prevPage} disabled={currentPage === 1}>
                                    Précédent
                                </button>
                                <span className="mx-4">
                                    Page {currentPage} de {Math.ceil(filteredProjets.length / itemsPerPage)}
                                </span>
                                <button
                                  onClick={nextPage}
                                  disabled={currentPage >= Math.ceil(filteredProjets.length / itemsPerPage)}
                                  className={`${currentPage >= Math.ceil(filteredProjets.length / itemsPerPage) ? "opacity-50 cursor-not-allowed" : "hover:underline"}`}
                                >
                                Suivant
                                </button>
                            </div>
                        </>
                    ) : (
                        <p>Aucune donnée trouvée !</p>
                    )}
                </div>
                {/* right side */}
                <div className="bg-white p-4 rounded"><Newsletter/></div>
            </div>
        </div>
    );
};

export default Home;
