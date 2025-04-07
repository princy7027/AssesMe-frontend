import React, { useState } from "react";

const CExam = () => {
    const [selectedChoice, setSelectedChoice] = useState(null);

  return (
    <div className="p-6 w-[1300px] ml-[230px] bg-[#f8f9fc] min-h-screen overflow-y-auto">
      <div className="mt-10">
        {/* Greeting */}

        {/* Choice */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Active exam takers</p>
              <h3 className="text-4xl font-bold text-[#6985f7]">0</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex justify-around h-[100px]">
            <div className="text-center">
              <p className="text-sm text-gray-500">Exams</p>
              <h3 className="text-4xl font-bold text-[#6985f7]">1</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex justify-around h-[100px]">
            <div className="text-center">
              <p className="text-sm text-gray-500">Exams</p>
              <h3 className="text-4xl font-bold text-[#6985f7]">1</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CExam;
