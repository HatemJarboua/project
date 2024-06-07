import React from 'react'
import { Link } from 'react-router-dom';
import {FiBarChart, FiCalendar, FiClock, FiMail, FiMapPin, FiTool, FiUser} from "react-icons/fi"
const Card = ({data}) => {
    const {_id, projectName, projectLogo, projectCategory, requiredSkills, projectLocation, projectType, experienceLevel, postingDate,
        description, department, mentorName, educationLevel, mentorContact} = data;
       
  return (
<section className='card'>
    <Link to={`/project/${_id}`} className='flex gap-4 flex-col sm:flex-row items-start'>
        
        <img src={projectLogo} alt="" className="w-12 h-12 rounded-lg"/>
        <div >
            <h4 className='text-primary font-semibold mb-1'>{projectType}</h4>
            <span className='flex items-center mb-2'>
        <FiUser className='inline-block mr-2'/> {/* Ajout de l'icône FiUser pour représenter l'encadrant */}
        <h5 className='text-lg text-primary '>{mentorName}</h5> {/* Style du nom de l'encadrant */}
        </span>
        <h6 className='flex items-center gap-1 text-sm' style={{ color: 'gray', marginBottom: '6px' }}>
        <FiMail/><span style={{ color: 'gray' }}>{mentorContact}</span>
    </h6>
    <div>
            <h3 className='text-lg font-semibold mb-2 text-blue-500'>{projectCategory}</h3></div>
            <div className='text-primary/70 text-base flex flex-wrap gap-2 mb-2'>
                <span className='flex items-center gap-1 text-sm'><FiMapPin/>{projectLocation}</span>
                <span className='flex items-center gap-1 text-sm'><FiTool/>{department}</span>
                <span className='flex items-center gap-1 text-sm'><FiBarChart/>{educationLevel}</span>
                <span className='flex items-center gap-1 text-sm'><FiCalendar/>{postingDate}</span>
            </div>
            <p className='text-base text-primary/70'>{description}</p>
        </div>
    </Link>

</section>
  )
}

export default Card
