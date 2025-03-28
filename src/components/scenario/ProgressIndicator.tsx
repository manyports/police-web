import React from 'react';

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ totalSteps, currentStep }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Сцена {currentStep + 1} из {totalSteps}</span>
        <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator; 