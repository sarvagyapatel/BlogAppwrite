import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className="w-8 h-8">
      <img className="bg-gray-400" src="https://www.svgrepo.com/show/2605/blogger-big-logo.svg" alt="Logo" />
    </div>
  )
}

export default Logo