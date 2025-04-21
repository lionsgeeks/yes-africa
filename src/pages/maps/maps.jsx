import React from 'react';
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import axios from 'axios';

const initialData = [
    {
        name: "Villa de Luxe",
        description: "Superbe villa avec piscine",
        price: 4500000,
        image: { iconic: "https://via.placeholder.com/150" },
        position: { lat: 33.59723, lng: -7.54989 }
    }
];
const Maps = () => {
    const [openCardIndex, setOpenCardIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newPosition, setNewPosition] = useState(null);
    const [markersData, setMarkersData] = useState(initialData);

    const Card = ({ details }) => (
        <div className=" relative bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-gray-200">
            <div className="p-6 space-y-2 ">
                <div className="flex justify-between items-start">
                    <h3 className="text-[#b09417] text-xl font-semibold truncate pr-2">
                        {details.name}
                    </h3>
                    <button className="text-gray-400 hover:text-red-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <p className="text-gray-600 text-sm truncate">
                    {details.description}
                </p>

                <div className="pt-2">
                    <a
                        href={details.url}
                        target="_blank"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        <span className="truncate">{details.url}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{details.people_working}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">{details.email}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-mono">
                            {details.position.lat.toFixed(4)}, {details.position.lng.toFixed(4)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    const handleMapClick = (event) => {
        const lat = event.detail.latLng.lat;
        const lng = event.detail.latLng.lng;
        setNewPosition({ lat, lng });
        setShowModal(true);
    };


    const handleSubmit = async (formData) => {
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'logo') {

                    formDataToSend.append(key, value);
                }
            });
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('url', formData.url);
            formDataToSend.append('people_working', formData.people_working);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('logo', formData.logo[0]);
            formDataToSend.append('lat', newPosition.lat);
            formDataToSend.append('lng', newPosition.lng);

            const response = await axios.post('http://127.0.0.1:8000/api/maps', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                setMarkersData([...markersData, {
                    ...response.data.map,
                    position: {
                        lat: response.data.map.lat,
                        lng: response.data.map.lng
                    },

                }]);
                setShowModal(false);
                setNewPosition(null);
                router.reload();
            }
        } catch (error) {
            console.error('Erreur:', error.response?.data);
        }
    };

    const render = (param, index) => {
        const isOpen = openCardIndex === index;


        return (
            <>
                <div className={`custom-pin ${isOpen ? "clicked" : ""}`}>
                    <button className="close-button">
                        <span className="material-symbols-outlined"> close </span>
                    </button>

                    <div className="image-container">
                        <img
                            className={`aspect-square ${isOpen ? "w-[40%] aspect-square object-cover" : "w-full"
                                }`}
                            src={param.image.iconic}
                            alt=""
                        />
                        <div
                            className={`bg-white p-4 w-full h-full  ${isOpen ? "block " : "hidden"
                                }`}
                        >
                            <Card details={param} />
                        </div>
                    </div>
                </div>
                <div className="tip" />
            </>
        );
    };
    return (
        <>
            <style>{`
              .real-estate-marker {
                cursor: pointer;
                position: relative;
                transform: translateY(-5px);
                transition: all 0.2s ease-in-out;
              }
      
              .real-estate-marker .tip {
                position: absolute;
                bottom: 0;
                width: 0;
                height: 0;
                border: 8px solid #9e7d00;
                border-radius: 0;
                border-bottom-right-radius: 5px;
                z-index: -1;
                left: 50%;
                transform: translateY(22%) translateX(-50%) rotate(45deg);
                transition: all 0.2s ease-in-out;
              }
      
              @keyframes slideInFadeIn {
                0% { max-width: 0; opacity: 0; visibility: hidden; }
                75% { max-width: 380px; opacity: 0; visibility: hidden; }
                100% { max-width: 380px; opacity: 1; visibility: visible; }
              }
            `}</style>

            <APIProvider apiKey={"AIzaSyCPzUBNnsyqmpxkTwLb9VXKT6oZOJ6Ra04"}>
                <Map
                    onClick={handleMapClick}
                    mapId={"bf51a910020fa25a"}
                    className="w-full h-screen bg-white"
                    defaultCenter={{ lat: 6.6111, lng: 20.9394 }}
                    defaultZoom={3.7}
                    gestureHandling={"greedy"}
                    disableDefaultUI={true}
                >
                    {markersData.map((element, idx) => (
                        <AdvancedMarker
                            key={idx}
                            position={element.position}
                            onClick={() => setOpenCardIndex(openCardIndex === idx ? null : idx)}
                        >
                            <div className="relative flex items-center justify-center">
                                <div className="bg-[#b09417] w-10 h-10 rounded-full p-1 flex items-center justify-center shadow-lg">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4pEH4KwFQ2-0ecb91IHM4UVMXxrNXxcucPQ&s"
                                        alt=""
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>

                                {openCardIndex === idx && (
                                    <div className="absolute -top-64 left-9 transform -translate-x-1/2 z-50">
                                        <div className="flex gap-3 items-center bg-white p-2 rounded-xl shadow-lg border w-[40vw]">
                                            <img
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4pEH4KwFQ2-0ecb91IHM4UVMXxrNXxcucPQ&s"
                                                alt=""
                                                className="w-full h-full object-cover rounded-xl"
                                            />

                                            <div className="w-[28vw]">
                                                <Card details={element} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="tip" />
                        </AdvancedMarker>
                    ))}


                </Map>
            </APIProvider>

            {showModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[1000] ">
                    <div className="bg-white p-6 rounded-xl w-[40%] relative shadow-2xl ">
                        <button
                            className="absolute top-5 right-5 text-xl text-gray-500 hover:text-[#b09417] "
                            onClick={() => setShowModal(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-xl font-semibold mb-6">
                            <span className="text-[#b09417] pb-1">Ajouter une propriété</span>
                        </h2>

                        <form className="grid grid-cols-1 gap-4" onSubmit={(e) => {
                            e.preventDefault();
                            const formData = Object.fromEntries(new FormData(e.target));
                            handleSubmit(formData);
                        }}>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">Nom</label>
                                <input
                                    name="name"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#b09417] transition-all"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">Description</label>
                                <textarea
                                    name="description"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#b09417] h-24"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-600">URL</label>
                                    <input
                                        type="url"
                                        name="url"
                                        required
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#b09417]"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-600">Employés</label>
                                    <input
                                        type="number"
                                        name="people_working"
                                        required
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#b09417]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#b09417]"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">Logo</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        name="logo"
                                        required
                                        className="w-full opacity-0 absolute z-20 cursor-pointer"
                                    />
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-center hover:bg-gray-100">
                                        <span className="text-gray-500 text-sm">Cliquez pour uploader</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-4 bg-[#b09417] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#95811d] transform hover:scale-[1.02]"
                            >
                                Ajouter la propriété
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Maps;