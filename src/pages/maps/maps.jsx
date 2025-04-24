import React from 'react';
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import axios from 'axios';


const Maps = () => {
    const [openCardIndex, setOpenCardIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newPosition, setNewPosition] = useState(null);
    const [markersData, setMarkersData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [options, setOptions] = useState([]);

    // const customMapStyle = [
    //     {
    //         "featureType": "administrative",
    //         "elementType": "geometry.fill",
    //         "stylers": [
    //             {
    //                 "color": "#ff0a0a"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "administrative.country",
    //         "elementType": "geometry.stroke",
    //         "stylers": [
    //             {
    //                 "visibility": "simplified"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "administrative.country",
    //         "elementType": "labels.text.fill",
    //         "stylers": [
    //             {
    //                 "saturation": "34"
    //             },
    //             {
    //                 "visibility": "off"
    //             },
    //             {
    //                 "hue": "#ff0000"
    //             },
    //             {
    //                 "lightness": "-100"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "administrative.country",
    //         "elementType": "labels.text.stroke",
    //         "stylers": [
    //             {
    //                 "visibility": "off"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "administrative.country",
    //         "elementType": "labels.icon",
    //         "stylers": [
    //             {
    //                 "visibility": "on"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "landscape",
    //         "elementType": "geometry.fill",
    //         "stylers": [
    //             {
    //                 "color": "#ffffff"
    //             },
    //             {
    //                 "visibility": "off"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "landscape",
    //         "elementType": "geometry.stroke",
    //         "stylers": [
    //             {
    //                 "color": "#000"
    //             },
    //             {
    //                 "visibility": "on"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "landscape",
    //         "elementType": "labels.text",
    //         "stylers": [
    //             {
    //                 "visibility": "off"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "landscape",
    //         "elementType": "labels.text.fill",
    //         "stylers": [
    //             {
    //                 "color": "#ffffff"
    //             },
    //             {
    //                 "visibility": "simplified"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "landscape",
    //         "elementType": "labels.text.stroke",
    //         "stylers": [
    //             {
    //                 "color": "#ffffff"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "landscape.man_made",
    //         "elementType": "geometry.fill",
    //         "stylers": [
    //             {
    //                 "color": "#e1e1e1"
    //             },
    //             {
    //                 "visibility": "on"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "landscape.man_made",
    //         "elementType": "geometry.stroke",
    //         "stylers": [
    //             {
    //                 "color": "#cebc93"
    //             },
    //             {
    //                 "visibility": "on"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "landscape.man_made",
    //         "elementType": "labels.text",
    //         "stylers": [
    //             {
    //                 "color": "#ff0a0a"
    //             },
    //             {
    //                 "visibility": "on"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "landscape.natural.landcover",
    //         "elementType": "geometry.fill",
    //         "stylers": [
    //             {
    //                 "visibility": "off"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "poi",
    //         "elementType": "labels.text",
    //         "stylers": [
    //             {
    //                 "visibility": "off"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "poi.business",
    //         "elementType": "all",
    //         "stylers": [
    //             {
    //                 "visibility": "off"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "road",
    //         "elementType": "labels.icon",
    //         "stylers": [
    //             {
    //                 "visibility": "off"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "road.highway",
    //         "elementType": "geometry.fill",
    //         "stylers": [
    //             {
    //                 "color": "#aaaaaa"
    //             },
    //             {
    //                 "visibility": "on"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "road.highway",
    //         "elementType": "geometry.stroke",
    //         "stylers": [
    //             {
    //                 "color": "#dadada"
    //             },
    //             {
    //                 "visibility": "on"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "transit",
    //         "elementType": "all",
    //         "stylers": [
    //             {
    //                 "visibility": "off"
    //             }
    //         ]
    //     },
    //     {
    //         "featureType": "transit.station.bus",
    //         "elementType": "geometry.fill",
    //         "stylers": [
    //             {
    //                 "color": "#fbdc0e"
    //             },
    //             {
    //                 "visibility": "on"
    //             }
    //         ]
    //     }
    // ];

    const [form, setForm] = useState({
        category: '',
        type: '',
        option: ''
    });
    const Card = ({ details }) => (
        <div className=" relative bg-white rounded-xl hover:shadow-xl border border-gray-100 hover:border-gray-200 ">
            {details.is_approved && (
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
                            <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            <svg class="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z" />
                            </svg>

                            <span className="truncate">{details.category}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <svg class="w-4 h-4 mr-2 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
                            </svg>

                            <span className="truncate">{details.type}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <svg class="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9" />
                            </svg>

                            <span className="truncate">{details.option}</span>
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
            )}
        </div>
    );

    useEffect(() => {
        const fetchApprovedMaps = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/maps', {
                    params: { approved: true }
                });
                setMarkersData(response.data.data.map(map => ({
                    ...map,
                    logo: map.logo,
                    position: { lat: map.lat, lng: map.lng },
                })));
            } catch (error) {
                console.error('Error fetching maps:', error);
            }
        };

        fetchApprovedMaps();
    }, []);

    useEffect(() => {
        const fetchSelects = async (type, setter) => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/selects', {
                    params: { type }
                });
                setter(response.data);
            } catch (error) {
                console.error('Error fetching selects:', error);
            }
        };

        fetchSelects('category', setCategories);
        fetchSelects('type', setTypes);
        fetchSelects('option', setOptions);
    }, []);

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
            formDataToSend.append('category', formData.category);
            formDataToSend.append('type', formData.type);
            formDataToSend.append('option', formData.option);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('logo', formData.logo[0]);
            formDataToSend.append('lat', newPosition.lat);
            formDataToSend.append('lng', newPosition.lng);
            console.log(formData)

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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    
    return (
        <>

            <APIProvider apiKey={"AIzaSyCPzUBNnsyqmpxkTwLb9VXKT6oZOJ6Ra04"}>
                <Map
                    onClick={handleMapClick}
                    mapId={"bf51a910020fa25a"}
                    className="w-full h-screen bg-white"
                    defaultCenter={{ lat: 6.6111, lng: 20.9394 }}
                    defaultZoom={3.7}
                    gestureHandling={"greedy"}
                    disableDefaultUI={true}
                    // styles={customMapStyle}
                >
                    {markersData.filter(map => map.is_approved).map((element, idx) => (
                        <AdvancedMarker
                            key={idx}
                            position={element.position}
                            onClick={() => setOpenCardIndex(openCardIndex === idx ? null : idx)}
                        >
                            <div className="relative flex items-center justify-center">
                                <div className="bg-[#b09417] w-7 h-7 rounded-full p-1 flex items-center justify-center shadow-lg">
                                    <img
                                        src={'http://127.0.0.1:8000' + element.logo}
                                        alt=""
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>

                                {openCardIndex === idx && (
                                    <div className="absolute -top-64 left-9 transform -translate-x-1/2 z-50">
                                        <div className="flex gap-3 items-center bg-white p-2 rounded-xl shadow-lg border w-[40vw]">
                                            <img
                                                src={'http://127.0.0.1:8000' + element.logo}
                                                alt=""
                                                className="w-[20vw] h-60 object-cover rounded-xl"
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
                <div className="fixed inset-0 bg-black/30 flex items-center  justify-center z-[1000] ">
                    <div className="bg-white p-6 rounded-xl w-[40%] relative shadow-2xl ">
                        <button
                            className="absolute top-5 right-5 text-xl text-gray-500 hover:text-[#b09417] "
                            onClick={() => setShowModal(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-xl font-semibold mb-3">
                            <span className="text-[#b09417]">Ajouter une propriété</span>
                        </h2>

                        <form className="grid grid-cols-1 gap-4" onSubmit={(e) => {
                            e.preventDefault();
                            const formData = Object.fromEntries(new FormData(e.target));
                            handleSubmit(formData);
                        }}>
                            <div className="">
                                <label className="text-sm font-medium text-gray-600">Nom</label>
                                <input
                                    name="name"
                                    required
                                    className="w-full px-4 py-1.5 border border-gray-200 rounded-lg focus:border-[#b09417] transition-all"
                                />
                            </div>

                            <div className="">
                                <label className="text-sm font-medium text-gray-600">Description</label>
                                <textarea
                                    name="description"
                                    required
                                    className="w-full px-4 py-1.5 border border-gray-200 rounded-lg focus:border-[#b09417] h-16"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="">
                                    <label className="text-sm font-medium text-gray-600">URL</label>
                                    <input
                                        type="url"
                                        name="url"
                                        required
                                        className="w-full px-4 py-1.5 border border-gray-200 rounded-lg focus:border-[#b09417]"
                                    />
                                </div>

                                <div className="">
                                    <label className="text-sm font-medium text-gray-600">Employés</label>
                                    <input
                                        type="number"
                                        name="people_working"
                                        required
                                        className="w-full px-4 py-1.5 border border-gray-200 rounded-lg focus:border-[#b09417]"
                                    />
                                </div>
                            </div>

                            <div className="">
                                <label className="text-sm font-medium text-gray-600">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-1.5 border border-gray-200 rounded-lg focus:border-[#b09417]"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="">
                                    <label className="text-sm font-medium text-gray-600">Category</label>
                                    <div className="relative">
                                        <select
                                            className="w-full px-4 py-1.5 border border-gray-200 rounded-lg focus:border-[#b09417] appearance-none"
                                            name="category"
                                            onChange={handleChange}
                                            value={form.category}
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(c => (
                                                <option key={c.id} value={c.name}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="">
                                    <label className="text-sm font-medium text-gray-600">Type</label>
                                    <div className="relative">
                                        <select
                                            className="w-full px-4 py-1.5 border border-gray-200 rounded-lg focus:border-[#b09417] appearance-none"
                                            name="type"
                                            onChange={handleChange}
                                            value={form.type}
                                        >
                                            <option value="">Select Type</option>
                                            {types.map(t => (
                                                <option key={t.id} value={t.name}>{t.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <label className="text-sm font-medium text-gray-600">Option</label>
                                <div className="relative">
                                    <select
                                        className="w-full px-4 py-1.5 border border-gray-200 rounded-lg focus:border-[#b09417] appearance-none"
                                        name="option"
                                        onChange={handleChange}
                                        value={form.option}
                                    >
                                        <option className='' value="">Select Option</option>
                                        {options.map(o => (
                                            <option key={o.id} value={o.name}>{o.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="">
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
                                className="mt-1 bg-[#b09417] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#95811d] transform hover:scale-[1.02]"
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