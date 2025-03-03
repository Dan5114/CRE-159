import React from 'react'

function Cre() {
  return (
    <div>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Widget 1 - Research Progress */}
          <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-start">
            <div className="flex items-center space-x-3">
              {/* SVG for Research Progress */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-700">Research Progress</h2>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">Current Status: <span className="font-bold text-green-500">In Progress</span></p>
              {/* Add content like progress bars, graphs, or other data */}
            </div>
          </div>
          
          {/* Widget 2 - Research Stats */}
          <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-start">
            <div className="flex items-center space-x-3">
              {/* SVG for Research Stats */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-700">Research Stats</h2>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">Total Studies: <span className="font-bold text-gray-800">15</span></p>
              <p className="text-gray-600">Completed: <span className="font-bold text-blue-500">8</span></p>
              {/* Add charts or statistical data */}
            </div>
          </div>

          {/* Widget 3 - Recent Updates */}
          <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-start">
            <div className="flex items-center space-x-3">
              {/* SVG for Recent Updates */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v10M16 7v10" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-700">Recent Updates</h2>
            </div>
            <div className="mt-4">
              <ul className="space-y-2 text-gray-600">
                <li>Research A completed Phase 1</li>
                <li>Research B approved by review committee</li>
                {/* List of updates */}
              </ul>
            </div>
          </div>

          {/* Widget 4 - Upcoming Deadlines */}
          <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-start">
            <div className="flex items-center space-x-3">
              {/* SVG for Upcoming Deadlines */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 12h.01M14 12h.01M10 16h4m1-7h4m-7 0h-4m0 4H7m3 0H4" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-700">Upcoming Deadlines</h2>
            </div>
            <div className="mt-4">
              <ul className="space-y-2 text-gray-600">
                <li>Research C phase 2 due on March 10th</li>
                <li>Research D review deadline: March 15th</li>
                {/* List of upcoming deadlines */}
              </ul>
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default Cre
