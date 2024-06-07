import React, { useState } from 'react';
import InputField from '../components/InputField';

const Location = ({ handleChange }) => {
    const [country, setCountry] = useState('');

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
        handleChange(e); // Continue to handle change up the chain
    };

    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Emplacement</h4>
            <InputField 
                handleChange={handleCountryChange} 
                value="all"
                title="Tous" 
                name="location" 
                className="radio-button-large"
            />
            <InputField 
                handleChange={handleCountryChange} 
                value="France" 
                title="France" 
                name="location" 
                className="radio-button-large"
            />
            <InputField 
                handleChange={handleCountryChange} 
                value="Allemagne" 
                title="Allemagne" 
                name="location" 
                className="radio-button-large"
            />
             <InputField 
                        handleChange={handleChange} 
                        value="Canada" 
                        title="Canada" 
                        name="location" 
                        className="radio-button-large"
                    />
            <InputField 
                handleChange={handleCountryChange} 
                value="Tunisie" 
                title="Tunisie" 
                name="location" 
                className="radio-button-large"
            />
            
            {country === "Tunisie" && (
                <div className="ml-4">
                    <InputField 
                        handleChange={handleChange} 
                        value="Tunis" 
                        title="Tunis" 
                        name="location" 
                        className="radio-button-small"
                    />
                    <InputField 
                        handleChange={handleChange} 
                        value="Monastir" 
                        title="Monastir" 
                        name="location" 
                        className="radio-button-small"
                    />
                    <InputField 
                        handleChange={handleChange} 
                        value="Sousse" 
                        title="Sousse" 
                        name="location" 
                        className="radio-button-small"
                    />
                   
                </div>
            )}
        </div>
    );
};

export default Location;
