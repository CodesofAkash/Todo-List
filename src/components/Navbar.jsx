import React from 'react'

function Navbar() {
  return (
    <div>
      <nav className='flex justify-between bg-violet-900 text-white p-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-9'>iTask</span>
        </div>
        <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:underline hover:font-bold transition-all duration-50'>Home</li>
            <li className='cursor-pointer hover:underline hover:font-bold transition-all duration-50'>Your Tasks</li>
            <li className='cursor-pointer hover:underline hover:font-bold transition-all duration-50'>Your Account</li>
            <li className='cursor-pointer hover:underline hover:font-bold transition-all duration-50'>Help & Support</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
