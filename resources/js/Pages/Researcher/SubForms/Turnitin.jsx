import React, { useState } from "react";

const TurnitinScore = () => {
  // State to hold the score value
  const [score, setScore] = useState("");
  
  // Function to update the score
  const handleScoreChange = (event) => {
    setScore(event.target.value);
  };

  // Function to determine Pass/Fail and background color
  const getStatus = () => {
    const numericScore = parseInt(score);
    if (numericScore >= 0 && numericScore <= 100) {
      return {
        text: numericScore >= 60 ? "Pass" : "Fail",
        color: numericScore >= 60 ? "bg-green-500" : "bg-red-500",
      };
    } else {
      return {
        text: "Invalid Score",
        color: "bg-gray-500",
      };
    }
  };

  const { text, color } = getStatus();

  return (
    <div className="bg-gray-100 font-sans">
      <div className="bg-white p-6 rounded-lg shadow-lg  w-full">
        {/* Turnitin Score Input Section */}
        <div className="mb-4">
          <label htmlFor="turnitin-score" className="text-xl font-semibold text-gray-800">
            Enter Turnitin Score
          </label>
          <input
            type="number"
            id="turnitin-score"
            name="turnitin-score"
            value={score}
            onChange={handleScoreChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter score (0-100)"
            min="0"
            max="100"
          />
        </div>

        {/* Pass or Fail Card */}
        <div className={`flex items-center justify-between py-4 px-6 rounded-lg text-white ${color}`}>
          <div className="text-lg font-semibold">Status</div>
          <div className="text-xl font-bold">{text}</div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-4 text-sm text-gray-600">
          <p>Your Turnitin score indicates the similarity percentage detected in your work compared to existing sources.</p>
          <p className="mt-2">To ensure originality, aim for a lower percentage.</p>
        </div>
      </div>
    </div>
  );
};

export default TurnitinScore;
