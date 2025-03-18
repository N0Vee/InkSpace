import React from 'react';

const LoadingState = ({ title }) => {

    // if (title) {
    //     load
    // }

    return (
        <div className="loading-container flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="text-center">
                <h2 className="text-4xl font-bold mb-6 text-white">
                    <span className="inline-block">I</span>
                    <span className="inline-block animate-bounce delay-75">n</span>
                    <span className="inline-block animate-bounce delay-100">k</span>
                    <span className="inline-block animate-bounce delay-150">s</span>
                    <span className="inline-block animate-bounce delay-200">p</span>
                    <span className="inline-block animate-bounce delay-250">a</span>
                    <span className="inline-block animate-bounce delay-300">c</span>
                    <span className="inline-block animate-bounce delay-350">e</span>
                </h2>

                <div className="loading-indicator mb-8">
                    <div className="relative w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse w-full"></div>
                    </div>
                </div>

                <div className="loading-cards flex justify-center gap-4">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="w-24 h-32 rounded-lg bg-gray-800 border border-gray-700 animate-pulse flex items-center justify-center"
                            style={{ animationDelay: `${item * 100}ms` }}
                        >
                            <div className="w-16 h-4 bg-gray-700 rounded"></div>
                        </div>
                    ))}
                </div>

                <p className="text-gray-400 mt-8">Loading awesome content...</p>
            </div>
        </div>
    );
};

export default LoadingState;