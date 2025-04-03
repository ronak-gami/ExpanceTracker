import React from "react";
import { SIDEBAR_WIDTH, MAIN_CONTENT_WIDTH } from "../../utils/Constants";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className={`w-[${MAIN_CONTENT_WIDTH}] ml-[${SIDEBAR_WIDTH}]`}>
        <div className="flex justify-center items-center min-h-screen p-8">
          <main className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
            <div className="flex justify-around w-full mb-6">
              <div className="bg-sky-500 text-white text-center p-6 rounded-lg shadow-md w-1/3 mx-3">
                <p className="text-xl font-bold">Pending Task</p>
                <hr className="my-2" />
              </div>
              <div className="bg-sky-500 text-white text-center p-6 rounded-lg shadow-md w-1/3 mx-3">
                <p className="text-xl font-bold">Recent Expenses</p>
                <hr className="my-2" />
              </div>
            </div>

            <div className="bg-sky-500 text-white text-center p-6 rounded-lg shadow-md w-full mb-6">
              <p className="text-xl font-bold">Quick Access</p>
              <hr className="my-2" />
            </div>

            <div className="bg-sky-500 text-white text-center p-6 rounded-lg shadow-md w-full">
              <p className="text-xl font-bold">Monthly Report</p>
              <hr className="my-2" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
