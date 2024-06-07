import React from 'react'

const Projets = ({result}) => {
  return (
    <>
    <div>
    <h3 className="text-lg font-bold mb-2">{result.length} Projets</h3>
    </div>
      <section >{result}</section>
    </>
  )
}

export default Projets
