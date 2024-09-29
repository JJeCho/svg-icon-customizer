import React from 'react'
import DrawSvg from '../../components/DrawSvg'

const DrawPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-8 flex flex-col items-center justify-center overflow-hidden">
        <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-12 z-10">Draw an SVG</h1>
        <DrawSvg />
    </div>
  )
}

export default DrawPage