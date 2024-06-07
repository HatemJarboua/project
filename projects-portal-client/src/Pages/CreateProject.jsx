import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import CreatableSelect from "react-select/creatable"

const CreateProject = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const {
        register, reset, 
        handleSubmit,
        formState: { errors },
      } = useForm()
      const onSubmit= (data) => {
        data.skills = selectedOption;
         // Vérifier si projectLogo est vide et attribuer une image par défaut
    if (!data.projectLogo) {
      // Remplacer 'URL_DE_VOTRE_IMAGE_PAR_DÉFAUT' par l'URL de votre image logo par défaut
      data.projectLogo = '/images/polytech.png';
  }
        console.log(data);
        // Send the data to the server
    fetch(`${process.env.REACT_APP_API_BASE_URL}/post-projet`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json' ,
        },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      if(result.acknowledged === true){
      alert ("Projet Posté avec succés !!!")
      console.log(result)
    }
    reset();
   })
    //.catch((error) => console.error('Error:', error));
    
  };
      const options = [
        {value: "JavaScript", label: "JavaScript"},
        {value: "Python", label: "Python"},
        {value: "C++", label: "C++"},
        {value: "SpringBoot", label: "SpringBoot"},
        {value: "Angular", label: "Angular"},
        {value: ".Net", label: ".Net"},
        {value: "Java", label: "Java"},
        {value: "React", label: "React"},
        {value: "Vue", label: "Vue"},
        {value: "Django", label: "Django"},
        {value: "Flask", label: "Flask"},
        {value: "Ruby on Rails", label: "Ruby on Rails"},
        {value: "Swift", label: "Swift"},
        {value: "Kotlin", label: "Kotlin"},
        {value: "TypeScript", label: "TypeScript"},
        {value: "SQL", label: "SQL"},
        {value: "NoSQL", label: "NoSQL"},
        {value: "PHP", label: "PHP"},
        {value: "MongoDB", label: "MongoDB"},
        {value: "HTML", label: "HTML"},
    ];
    
  return (
    <div className='max-w-screen-2xl container max-auto xl:px-4'>
        {/*form */}
        <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16 '>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            {/*1st row */}
        <div className='create-projet-flex '>
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Titre du Projet:</label>
                <input type="text" placeholder='Saisissez le titre de votre projet'
                 {...register("projectName")} className='create-projet-input'/>
            </div>
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Domaine du Projet:</label>
                <input type="text"placeholder="Spécifiez le domaine du projet"
                 {...register("projectType")} className='create-projet-input'/>
            </div>
        </div>
        {/*2nd row */}
        <div className='create-projet-flex '>
        <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Nom de l&apos;encadrant:</label>
                <input type="text" placeholder="Nom de l'encadrant académique"
                 {...register("mentorName")} className='create-projet-input'/>
            </div>
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Email de l&apos;encadrant:</label>
                <input type="email" placeholder="exemple@domaine.com"
                 {...register("mentorContact")} className='create-projet-input'/>
            </div>
       </div>
       {/*3rd row */}
       <div className='create-projet-flex '>
        <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Département:</label>
                <select {...register("department")} className='create-projet-input'>
        <option value="">Choisissez  le département académique concerné</option>
        <option value="Informatique">Informatique</option>
        <option value="Électrique">Électrique</option>
        
      </select>
            </div>
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Catégorie du Projet:</label>
                <select {...register("projectCategory" )} className='create-projet-input'>
        <option value="">Choisissez la Catégorie</option>
        <option value="PFA">PFA</option>
        <option value="PFE">PFE</option>
        <option value="PPE">PPE</option>
        
      </select>
            </div>
       </div>
       {/*4th row */}
       <div className='create-projet-flex '>
        <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Date de publication du projet:</label>
                <input 
                type='date'
                placeholder='Ex: 2023-11-03'
                {...register("postingDate")}
                className='create-projet-input'
              />
            </div>
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Niveau d&apos;études:</label>
                <select {...register("educationLevel" )} className='create-projet-input'>
        <option value="">Choisissez le niveau d&apos;etudes</option>
        <option value="3éme année">3éme année</option>
        <option value="4éme année">4éme année</option>
        <option value="5éme année">5éme année</option>
        <option value="3éme année licence">3éme année licence</option>
        
      </select>
      
            </div>
       </div>
       {/**5th row */}
       <div>
       <label className='block mb-2 text-lg'>Compétences requises:</label>
        <CreatableSelect className='create-projet-input py-4 '
         defaultValue={selectedOption} onChange={setSelectedOption}
          options={options} isMulti/>
       </div>
        {/*6th row */}
        <div className='create-projet-flex '>
        <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Logo du Projet:</label>
                <input 
                type='url'
                placeholder="Coller l'URL du logo de votre projet : https://projet.com/img1 "
                {...register("projectLogo")}
                className='create-projet-input'
              />
            </div>
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Niveau d&apos;expériences:</label>
                <select {...register("experienceLevel" )} className='create-projet-input'>
        <option value="">Choisissez le niveau d&apos;expériences demandé</option>
        <option value=">Débutant">Débutant</option>
        <option value="Intermédiare">Intermédiare</option>
        <option value="Avancé">Avancé</option>
        <option value="Tous niveaux">Tous niveaux</option>
       
        
        
      </select>
            </div>
       </div>
        {/*7th row */}
        <div className='create-projet-flex '>
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Université:</label>
                <input type="text" defaultValue={"Polytech Monastir"}
                 {...register("universityLocation")} className='create-projet-input'/>
            </div>
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Nom de L&apos;entreprise: (En cas de PFE)</label>
                <input type="text"placeholder=" tapez le nom de l'entreprise au sein de laquelle l'etudiant va réaliser son PFE"
                 {...register("companyLocation")} className='create-projet-input'/>
            </div>
            
        </div>
        {/*8th row */}
        <div className='create-projet-flex '>
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Emplacement du Projet:</label>
                <input type="text" placeholder='Ex: Monastir / France / Sousse ...'
                 {...register("projectLocation")} className='create-projet-input'/>
            </div>
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Charge de travail estimée (en heures) :</label>
                <input type="text" placeholder='Ex: 20heures/semaine..'
                 {...register("estimatedWorkload")} className='create-projet-input'/>
            </div>
           
        </div>
        {/**9th row */}
        <div className='w-full'>
    <label className='block mb-2 text-lg'>Description du Projet:</label>
    <textarea 
        className='w-full pl-3 py-1.5 focus:outline-none' 
        rows={6} 
        placeholder="Description du Projet"
        defaultValue="Développer une plateforme web qui permet aux étudiants de coder ensemble en temps réel, facilitant ainsi l'apprentissage collaboratif et le pair-programming."
        {...register("description")} 
    />
        </div>
        {/*last row */}
        <div className='w-full'>
        <label className='block mb-2 text-lg'>Projet Proposé par:</label>
        <input 
        type='text'
        placeholder='tapez votre adresse e-mail'
        {...register("posterEmail")}
        className='create-projet-input'
        />
        </div>

      <input type="submit" value="submit" className='block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer'/>
    </form>


        </div>
      
    </div>
  );
};

export default CreateProject;
