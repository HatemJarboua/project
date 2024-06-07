import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout, role} = useAuth(); // Utilisez useAuth pour accéder à l'utilisateur et à ses rôles
    console.log(user); // Vérifiez les détails de l'utilisateur ici
    const handleMenuToggler = () => setIsMenuOpen(!isMenuOpen);

    const navItems = [
        { path: "/", title: " Rechercher" },
        { path: "/my-project", title: "Mes Projets " },
        { path: "/workload", title: "Charge de travail estimée" },
        { path: "/post-projet", title: "Proposer un Projet" },
    ];

    return (
        <header className="max-w-screen-2xl container max-auto xl:px-24 px-4">
      
            <nav className="flex items-center justify-between py-6">
                <a href="/" className="flex items-center gap-4 text-2xl text-black"> {/* Increase the gap here */}
                    <img src="/images/logo.png" alt="Logo PolyProjets" style={{ height: '40px', borderRadius: '10px', width: '40px' }} />
                    <span>PolyProjets</span>
                </a>
                {/*nav items for large devices */}
                <ul className="hidden md:flex gap-12">
                    {navItems.map(({ path, title }) => (
                        <li key={path} className="text-base text-primary">
                            <NavLink
                                to={path}
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                {/*signup and login button*/}
                {/*signup and login button*/}
                <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
                    {!user ? (
                        <>
                            <Link to="/login" className="py-2 px-5 border rounded">Se Connecter</Link>
                            <Link to="/sign-up" className="py-2 px-5 border rounded text-white bg-blue">S&rsquo;inscrire</Link>
                        </>
                    ) : (
                        <button onClick={logout} className="py-2 px-5 border rounded">Se Déconnecter</button>
                    )}
                </div>
                {/*mobile menu */}
                <div className="md:hidden block">
                    <button onClick={handleMenuToggler}>
                    {
                        isMenuOpen ? <FaXmark className="w-5 h-5 text-primary"/> : <FaBarsStaggered className="w-5 h-5 text-primary"/>                    }
                    </button>
                </div>
            </nav>
            {/* navitems for mobile */}
            <div className={`px-4 bg-black py-5 rounded-sm  ${isMenuOpen ? "" : "hidden"} `}>
            <ul>
                    {navItems.map(({ path, title }) => (
                        <li key={path} className="text-base text-white first:text-white py-1">
                            <NavLink
                                to={path}
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                   <li className="text-white py-1"><Link to="/login" >Se Connecter</Link></li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;