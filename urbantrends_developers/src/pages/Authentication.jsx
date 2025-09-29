import React from 'react'
import logo from '../assets/urbantrends.svg'
import sexy from '../assets/sexy.jpg'
import coding from '../assets/coding.jpg'
import prog from '../assets/prog.jpg'
import tri from '../assets/tri.jpg'
import circle from '../assets/accircle.jpg'
import { SiFacebook, SiGoogle } from "react-icons/si"


function Authentication() {
    return (
        <div className='min-h-screen flex justify-center items-center space-y-3 dark:bg-gray-900'>
            {/* custom images container */}

            <div className="hidden md:flex flex-col md:flex-row md:justify-center md:gap-6 p-3 ml-8">
                {/* first column */}
                <div className="flex flex-col gap-3">
                    <div className="w-40 h-56 md:w-52 md:h-72 overflow-hidden rounded-lg">
                        <img
                            src={sexy}
                            alt="sexy"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="w-64 h-40 md:w-92 md:h-64 overflow-hidden rounded-lg">
                        <img
                            src={tri}
                            alt="triangle"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* second column */}
                <div className="flex flex-col gap-3">
                    <div className="w-40 h-56 md:w-52 md:h-72 overflow-hidden rounded-lg">
                        <img
                            src={coding}
                            alt="coding"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="w-64 h-40 md:w-92 md:h-64 overflow-hidden rounded-lg">
                        <img
                            src={prog}
                            alt="programming"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>



            {/* custom form container */}
            {/* custom form container */}
            <div className="w-full max-w-lg mx-auto p-6 bg-[#F5F5F5] dark:bg-gray-800 space-y-6 rounded-lg">
                {/* main content */}
                {/* company logo */}
                <div className="flex items-center justify-center gap-2">
                    <img src={logo} alt="UrbanTrends Logo" className="w-12" />

                </div>

                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl dark:text-white font-bold">
                        Urbantrends Developers
                    </h1>
                    <h2 className="text-xl md:text-2xl dark:text-white underline">
                        Register
                    </h2>
                </div>

                {/* form box */}
                <div className="space-y-6">
                    {/* circle */}
                    <div className="w-24 h-24 md:w-32 md:h-32 mx-auto overflow-hidden rounded-full">
                        <img src={circle} alt="" className="w-full h-full object-cover" />
                    </div>

                    <div className="grid gap-4">
                        <input
                            type="text"
                            className="h-12 bg-white px-3 rounded border-2 border-gray-600 dark:border-gray-400"
                            placeholder="Username"
                        />
                        <input
                            type="password"
                            className="h-12 bg-white px-3 rounded border-2 border-gray-600 dark:border-gray-400"
                            placeholder="Password"
                        />
                        <button className="w-full px-6 py-2 bg-gray-600 text-white font-medium rounded-xl shadow-md hover:bg-gray-700 hover:shadow-lg transition-all duration-300">
                            Done
                        </button>
                    </div>

                    <hr className="border border-black dark:border-white rounded" />

                    {/* third party signins */}
                    <div className="flex flex-col gap-3">
                        <button className="w-full h-10 flex items-center justify-center gap-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors duration-300">
                            <SiGoogle className="text-lg" />
                            <span>Sign in with Google</span>
                        </button>
                        <button className="w-full h-10 flex items-center justify-center gap-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-300">
                            <SiFacebook className="text-lg" />
                            <span>Sign in with Facebook</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default Authentication