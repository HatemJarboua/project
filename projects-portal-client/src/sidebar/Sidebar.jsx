import React from 'react';
import Location from './Location';
import Department from './Department';
import ProjetPostingDate from './ProjetPostingDate';
import Category from './Category';

// Utilisez `props` ou déstructurez directement les props dans la signature de la fonction
const Sidebar = ({ handleChange, handleEducationLevelChange, selectedEducationLevel, handleDepartmentChange, setSelectedPostingDate,  selectedCategory }) => {
  return (
    <div className='space-y-5'>
        <h3 className='text-lg font-bold mb-2'>Filtres</h3>

        <Location handleChange={handleChange} />
        
        {/* Vous pouvez passer différentes props spécifiques à chaque composant de filtre */}
        <Department handleChange={handleDepartmentChange} handleEducationLevelChange={handleEducationLevelChange} selectedEducationLevel={selectedEducationLevel}/>
        <ProjetPostingDate setSelectedPostingDate={setSelectedPostingDate} />
        <Category selectedCategory={selectedCategory} handleChange={handleChange} />
    </div>
  );
}

export default Sidebar;
