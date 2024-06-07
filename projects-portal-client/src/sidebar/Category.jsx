import React from 'react';

const Category = ({ selectedCategory, handleChange }) => {
  const categories = ["PFA", "PFE", "PPE"];

  return (
    <div>
       <h4 className='text-lg font-medium mb-2'>Catégorie de Projet</h4>
       {categories.map(category => (
         <label key={category} className='sidebar-label-container'>
             <input 
                 type='radio'
                 name='catégorie'
                 value={category}
                 checked={selectedCategory === category}
                 onChange={handleChange} 
             />
             <span className='checkmark'></span>{category}
         </label>
       ))}
    </div>
  );
}

export default Category;
