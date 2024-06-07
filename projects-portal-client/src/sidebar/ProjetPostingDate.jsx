import React from 'react';

const ProjetPostingDate = ({ setSelectedPostingDate }) => {
    const handleRadioChange = (event) => {
        setSelectedPostingDate(event.target.value);
    };

    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Date de publication</h4>
            <div>
                <label className='sidebar-label-container'>
                    <input 
                        type='radio'
                        name='postingDate'
                        value='all'
                        onChange={handleRadioChange} 
                    />
                    <span className='checkmark'></span>Toutes les dates
                </label>
                <label className='sidebar-label-container'>
                    <input 
                        type='radio'
                        name='postingDate'
                        value='24hours'
                        onChange={handleRadioChange} 
                    />
                    <span className='checkmark'></span>Dernières 24 heures
                </label>
                <label className='sidebar-label-container'>
                    <input 
                        type='radio'
                        name='postingDate'
                        value='7days'
                        onChange={handleRadioChange} 
                    />
                    <span className='checkmark'></span>Derniers 7 jours
                </label>
                <label className='sidebar-label-container'>
                    <input 
                        type='radio'
                        name='postingDate'
                        value='30days'
                        onChange={handleRadioChange} 
                    />
                    <span className='checkmark'></span>Dernier mois
                </label>
            </div>
        </div>       
    );
};

export default ProjetPostingDate;
