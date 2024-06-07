import Button from "../components/Button";

const Department = ({ handleChange, handleDepartmentChange, handleEducationLevelChange, selectedEducationLevel }) => {

  const handleClick = (value) => {
    handleChange(value);
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    if (name === "department") {
      handleDepartmentChange(value);
    } else if (name === "educationLevel") {
      handleEducationLevelChange(value);
    }
  };

  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>Départements</h4>
      <div className='mb-4'>
        <Button onClickHandler={() => handleClick("Électrique")} title="Électrique"/>
        <Button onClickHandler={() => handleClick("Informatique")} title="Informatique"/>
      </div>
      <div>
        <label className='sidebar-label-container'>
    
        </label>
        {["3éme année", "4éme année", "5éme année", "3éme année licence"].map((level) => (
          <label key={level} className='sidebar-label-container'>
            <input 
                type='radio' 
                name="educationLevel"
                value={level}
                onChange={handleRadioChange}
                checked={selectedEducationLevel === level}
            />
            <span className='checkmark'></span>{level}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Department;
