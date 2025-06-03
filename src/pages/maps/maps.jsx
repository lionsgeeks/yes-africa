import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from 'axios';
import data from '../../json/data.json';
import indicatif from '../../json/indicatif.json';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Drawer from '../../components/Drawer';

const Maps = () => {
    const [openCardIndex, setOpenCardIndex] = useState(null);
    const [markersData, setMarkersData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedForm, setSelectedForm] = useState('');
    const [showOrgModal, setShowOrgModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [newPosition, setNewPosition] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedPhoneCode, setSelectedPhoneCode] = useState("");
    const [errors, setErrors] = useState({});
    const mapRef = useRef();
    const mapContainerRef = useRef();
    const initial_position = [20.9394, 6.6111];
    const initial_zoom = 2.5;
    const [position, setPosition] = useState(initial_position);
    const [zoom, setZoom] = useState(initial_zoom);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const { url } = useAppContext()
    const [openDrawer, setOpenDrawer] = useState(true);

    const markersRef = useRef([]);

    const handleGetLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition({ lat: latitude, lng: longitude });

                    if (mapRef.current) {
                        mapRef.current.flyTo({
                            center: [longitude, latitude],
                            zoom: 15,
                            essential: true
                        });

                        new mapboxgl.Marker({ color: 'red' })
                            .setLngLat([longitude, latitude])
                            .addTo(mapRef.current);
                    }
                },
                (err) => {
                    setError("Impossible d'obtenir votre position");
                    console.error(err);
                }
            );
        } else {
            setError("La géolocalisation n'est pas supportée par ce navigateur.");
        }
    };


    useEffect(() => {
        const fetchApprovedShows = async () => {
            try {
                const response = await axios.post('http://192.168.100.171:8000/api/approved');
                setMarkersData(response.data);
                console.log('response :', response?.data);
            } catch (error) {
                console.error('Error fetching approved shows:', error);
            }
        };

        fetchApprovedShows();
    }, []);



    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoiaGFtemFvZmsiLCJhIjoiY2x3MnN0cmRrMHJoYTJpb2N2OGQ2eTNnOSJ9.aLy9CQtGLr0A3rlH3x2TRg";
        mapRef.current = new mapboxgl.Map({
            style: 'mapbox://styles/hamzaofk/cmal8x5y8014m01qo11gd0w40',
            container: mapContainerRef.current,
            center: position,
            zoom: zoom,
        });

        mapRef.current.on("move", () => {
            const mapCenter = mapRef.current?.getCenter();
            const mapZoom = mapRef.current?.getZoom();
            setPosition([mapCenter.lng, mapCenter.lat]);
            setZoom(mapZoom);
        });

        mapRef.current.on("click", (e) => {

            const lat = e.lngLat.lat;
            const lng = e.lngLat.lng;
            setNewPosition({ lat, lng });
            setStep(1);
            setShowModal(true);
        });


        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    useEffect(() => {
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        if (!mapRef.current) return;

        Object.entries(markersData).forEach(([key, value]) => {
            value.forEach((marker, idx) => {
                if (marker.showable.lat && marker.showable.lng) {
                    const el = document.createElement('div');
                    el.className = 'custom-marker';

                    const img = document.createElement('img');
                    const logoPath =
                        marker.showable_type === 'App\\Models\\Organization' ||
                            marker.showable_type === 'App\\Models\\Entreprise' ||
                            marker.showable_type === 'App\\Models\\Agence' ||
                            marker.showable_type === 'App\\Models\\Publique' ||
                            marker.showable_type === 'App\\Models\\Academique'
                            ? marker.showable.logo
                            : marker.showable.logo_path;

                    img.src = logoPath
                        ? `http://192.168.100.171:8000/storage/${logoPath}`
                        : '/default_logo.png';
                    img.style.width = '25px';
                    img.style.height = '25px';
                    img.style.borderRadius = '50%';
                    img.style.border = '2px solid white';
                    img.style.objectFit = 'cover';

                    el.appendChild(img);

                    const mapMarker = new mapboxgl.Marker(el)
                        .setLngLat([marker.showable.lng, marker.showable.lat])
                        .addTo(mapRef.current);

                    markersRef.current.push(mapMarker);

                    const uniqueKey = `${key}-${idx}`;
                    el.addEventListener('click', (e) => {
                        e.stopPropagation();
                        setShowModal(false);
                        setOpenCardIndex(uniqueKey);
                    });
                }
            });
        });

        return () => {
            markersRef.current.forEach(marker => marker.remove());
            markersRef.current = [];
        };
    }, [markersData]);

    useEffect(() => {
        if (newPosition) {
            console.log("Nouvelle position:", newPosition);
        }
    }, [newPosition]);

    const handleCountryChange = (e) => setSelectedCountry(e.target.value);
    const handleRegionChange = (e) => setSelectedRegion(e.target.value);

    const handlePhoneCodeChange = (e) => {
        setSelectedPhoneCode(e.target.value)
        if (phoneNumber) {
            setFormData((prev) => ({
                ...prev,
                phone: e.target.value + phoneNumber,
            }))
        }
    }
    const handlePhoneChange = (e) => {
        setPhoneNumber(e.target.value)
        setFormData((prev) => ({
            ...prev,
            phone: selectedPhoneCode + e.target.value,
        }))
    }

    const [form, setForm] = useState({
        name: '',
        email: '',
        code: '',
    });

    const [formData, setFormData] = useState({

        name: '',
        logo: null,
        creation_year: '',
        legal_status: '',
        other_legal_status: '',
        country: [],
        regions: [],
        website: '',
        socials: {
            social_facebook: false,
            social_twitter: false,
            social_linkedin: false,
            social_instagram: false,
        },
        facebook_url: '',
        twitter_url: '',
        linkedin_url: '',
        instagram_url: '',
        main_email: '',
        phone1: '',
        telephone_code1: '',
        postal_address: '',
        contact_name: '',
        contact_function: '',
        contact_email: '',
        intervention_areas: [],
        target_groups: '',
        annual_beneficiaries: '',
        program_title: '',
        // program_description: '',
        // methodological_approach: '',
        // result1: '',
        // result2: '',
        // result3: '',
        technical_partners: '',
        financial_partners: ''
    });

    const [formDataEntreprise, setFormDataEntreprise] = useState({
        nom: '',
        logo: null,
        secteur: '',
        taille: '',
        pays_siege: '',
        regions_afrique: [],
        site_web: '',
        reseaux_sociaux2: {
            twitter: false,
            linkedin: false,
        },
        twitter_url: '',
        linkedin_url: '',
        email_contact: '',
        telephone_code: '',
        telephone_number: '',
        contact_rse: {
            nom: '',
            fonction: '',
            email: ''
        },
        politique_inclusion: '',
        programmes_integration: '',
        postes_stages_annuels: 0,
        dispositifs_formation: '',
        partenariats_osc: '',
        initiatives_mecenat: '',
        competences_pro_bono: [],
        profils_recherches: '',
        regions_recrutement: [],
        processus_integration: ''
    });
    const [formDataBailleur, setFormDataBailleur] = useState({
        nom: '',
        logo_path: null,
        type_institution: '',
        type_institution_autre: '',
        pays_origine: [],
        couverture_geographique: [],
        site_web: '',
        reseaux_sociaux: {
            linkedin: false,
            twitter: false
        },
        linkedin_url2: '',
        twitter_url2: '',
        email_contact: '',
        telephone_code: '',
        telephone_number: '',
        // representation_afrique: [],
        contact_responsable: {
            nom: '',
            fonction: '',
            email: ''
        },
        priorites_thematiques: '',
        // modalites_soutien: [],
        // financement_min: '',
        // financement_max: '',
        // budget_annuel: '',
        // criteres_eligibilite: '',
        // projets_phares: [],
        // approche_impact: '',
        // partenaires_actuels: '',
        // procedure_soumission: ''
    });

    const [formDataAgence, setFormDataAgence] = useState({
        nom: '',
        logo: null,
        type_organisation: '',
        pays_representes: '',
        couverture_afrique: '',
        site_web: '',
        email_institutionnel: '',
        bureaux_afrique: '',
        contact_jeunesse: {
            nom: '',
            fonction: '',
            email: ''
        },
        cadre_strategique: null,
        priorites_thematiques: '',
        budget: '',
        annee_debut: '',
        annee_fin: '',
        programmes_phares: [
            {
                publications: []
            }
        ],
        outils_methodologiques: null,
        opportunites_financement: '',
        type_partenaires: '',
        mecanismes_collaboration: '',
        domaines_expertise: ''
    });
    const [formDataPublique, setFormDataPublique] = useState({
        institution_name: '',
        institution_type: '',
        country: '',
        website: '',
        logo_path: null,
        email: '',
        phone_code: '',
        phone_number: '',
        address: '',
        youth_contact_name: '',
        youth_contact_position: '',
        youth_contact_email: '',
        policyFramework: '',
        strategicPriorities: '',
        annualBudget: '',
        flagshipProgram: '',
        targetAudience: '',
        supportMechanisms: '',
        expectedResults: ['', '', ''],
        executionPartners: '',
        coordinationMechanism: '',
        involvedActors: '',
        monitoringApproach: '',
        technicalAssistance: '',
        bestPractices: '',
        cooperationOpportunities: ''
    });
    const [formDataAcademique, setFormDataAcademique] = useState({
        nom: '',
        logo_path: null,
        type_institution: '',
        pays: '',
        site_web: '',
        departement: '',
        email: '',
        telephone_code: '',
        telephone_number: '',
        contact_chercheur: {
            nom: '',
            fonction: '',
            email: ''
        },
        axes_recherche: '',
        methodologies: '',
        zones_geographiques: [],
        publications: [],
        programmes_formation: '',
        public_cible: [],
        modalites: [],
        certifications: '',
        partenaires_recherche: '',
        ressources_disponibles: [],
        expertise: '',
        opportunites_collaboration: '',
        conferences: '',
        ateliers: ''
    });

    const handleSubmit = async (e, formType) => {
        e.preventDefault();

        const includeCoordinates = (formData) => {
            formData.append('lat', newPosition.lat);
            formData.append('lng', newPosition.lng);
        };

        const formDataOsc = new FormData();
        switch (formType) {
            case 'osc':
                includeCoordinates(formDataOsc);
                formDataOsc.append('name', formData.name);
                if (formData.logo) formDataOsc.append('logo', formData.logo);
                formDataOsc.append('creation_year', formData.creation_year);
                formDataOsc.append('legal_status', formData.legal_status);
                formDataOsc.append('other_legal_status', formData.other_legal_status || '');
                if (Array.isArray(formData.country)) {
                    formData.country.forEach(c => formDataOsc.append('country[]', c));
                }
                if (Array.isArray(formData.regions)) {
                    formData.regions.forEach(r => formDataOsc.append('regions[]', r));
                }
                if (Array.isArray(formData.intervention_areas)) {
                    formData.intervention_areas.forEach(area => { formDataOsc.append('intervention_areas[]', area); });
                }
                formDataOsc.append('social_facebook', formData.socials.social_facebook ? 1 : 0);
                formDataOsc.append('social_twitter', formData.socials.social_twitter ? 1 : 0);
                formDataOsc.append('social_linkedin', formData.socials.social_linkedin ? 1 : 0);
                formDataOsc.append('social_instagram', formData.socials.social_instagram ? 1 : 0);
                if (formData.socials.social_facebook) formDataOsc.append('facebook_url', formData.facebook_url);
                if (formData.socials.social_twitter) formDataOsc.append('twitter_url', formData.twitter_url);
                if (formData.socials.social_linkedin) formDataOsc.append('linkedin_url', formData.linkedin_url);
                if (formData.socials.social_instagram) formDataOsc.append('instagram_url', formData.instagram_url);
                formDataOsc.append('website', formData.website);
                formDataOsc.append('main_email', formData.main_email);

                const phoneNumberosc = `${formData.telephone_code1 || ''}${formData.phone1 || ''}`.trim();
                formDataOsc.append('phone', phoneNumberosc);
                formDataOsc.append('postal_address', formData.postal_address);
                formDataOsc.append('contact_name', formData.contact_name);
                formDataOsc.append('contact_function', formData.contact_function);
                formDataOsc.append('contact_email', formData.contact_email);
                formDataOsc.append('target_groups', formData.target_groups);
                formDataOsc.append('annual_beneficiaries', formData.annual_beneficiaries);
                formDataOsc.append('program_title', formData.program_title);
                // formDataOsc.append('program_description', formData.program_description);
                // formDataOsc.append('methodological_approach', formData.methodological_approach);
                // formDataOsc.append('result1', formData.result1);
                // formDataOsc.append('result2', formData.result2);
                // formDataOsc.append('result3', formData.result3);
                formDataOsc.append('technical_partners', formData.technical_partners);
                formDataOsc.append('financial_partners', formData.financial_partners);

                try {
                    const response = await axios.post('http://192.168.100.171:8000/api/organizations', formDataOsc, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });
                    alert('Organisation créée avec succès !');
                    setShowModal(true);
                    window.location.reload();
                } catch (error) {
                    console.error('Error:', error);
                    let errorMessage = 'Une erreur est survenue';

                    if (error.response) {
                        if (error.response.status === 422) {
                            const errors = error.response.data.errors;
                            const errorList = Object.values(errors).flat().join('\n');
                            alert(`Validation errors:\n${errorList}`);
                            return;
                        }
                        errorMessage = error.response.data.message || errorMessage;
                    }

                    alert(errorMessage);
                }
                break;
            case 'bailleurs':
                const formDataToSend = new FormData();
                includeCoordinates(formDataToSend);

                formDataToSend.append('nom', formDataBailleur.nom);
                formDataToSend.append('logo_path', formDataBailleur.logo_path);
                formDataToSend.append('type_institution', formDataBailleur.type_institution);
                formDataToSend.append('email_contact', formDataBailleur.email_contact);
                formDataToSend.append('site_web', formDataBailleur.site_web);

                const phoneNumber = `${formDataBailleur.telephone_code || ''}${formDataBailleur.telephone_number || ''}`.trim();
                formDataToSend.append('telephone', phoneNumber);

                formDataToSend.append('priorites_thematiques', formDataBailleur.priorites_thematiques);
                // formDataToSend.append('budget_annuel', formDataBailleur.budget_annuel);
                // formDataToSend.append('criteres_eligibilite', formDataBailleur.criteres_eligibilite);
                // formDataToSend.append('approche_impact', formDataBailleur.approche_impact);
                // formDataToSend.append('partenaires_actuels', formDataBailleur.partenaires_actuels);
                // formDataToSend.append('procedure_soumission', formDataBailleur.procedure_soumission);
                formDataToSend.append('pays_origine', formDataBailleur.pays_origine);
                // formDataToSend.append('couverture_geographique', formDataBailleur.couverture_geographique);
                if (Array.isArray(formDataBailleur.couverture_geographique)) {
                    formDataBailleur.couverture_geographique.forEach(r => formDataToSend.append('couverture_geographique[]', r));
                }
                // formDataToSend.append('representation_afrique', formDataBailleur.representation_afrique);

                const socials = {
                    linkedin: formDataBailleur.linkedin_url2 || '',
                    twitter: formDataBailleur.twitter_url2 || ''
                };
                formDataToSend.append('reseaux_sociaux', JSON.stringify(socials));
                formDataToSend.append('linkedin_url2', formDataBailleur.linkedin_url2 || '');
                formDataToSend.append('twitter_url2', formDataBailleur.twitter_url2 || '');
                formDataToSend.append('contact_responsable[nom]', formDataBailleur.contact_responsable.nom);
                formDataToSend.append('contact_responsable[fonction]', formDataBailleur.contact_responsable.fonction);
                formDataToSend.append('contact_responsable[email]', formDataBailleur.contact_responsable.email);

                // formDataBailleur.modalites_soutien.forEach(ms => {
                //     formDataToSend.append('modalites_soutien[]', ms);
                // });

                // formDataToSend.append('financement_min', formDataBailleur.financement_min);
                // formDataToSend.append('financement_max', formDataBailleur.financement_max);

                // formDataBailleur.projets_phares.forEach((projet, index) => {
                //     formDataToSend.append(`projets_phares[${index}]`, projet);
                // });

                try {
                    const response = await axios.post('http://192.168.100.171:8000/api/bailleurs',
                        formDataToSend,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            }
                        }
                    );
                    alert('Bailleur enregistré avec succès!');
                    setShowModal(false);
                    window.location.reload();

                } catch (error) {
                    console.error('Erreur:', error.response?.data);
                    if (error.response?.status === 422) {
                        const errors = error.response.data.errors;
                        const errorMessages = Object.entries(errors)
                            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                            .join('\n');
                        alert(`Erreurs de validation:\n${errorMessages}`);
                    } else {
                        alert('Une erreur est survenue: ' + (error.response?.data.message || error.message));
                    }
                }
                break;
            case 'entreprises':
                const formData2 = new FormData();
                includeCoordinates(formData2);
                formData2.append('nom', formDataEntreprise.nom);
                formData2.append('secteur', formDataEntreprise.secteur);
                formData2.append('taille', formDataEntreprise.taille);
                formData2.append('pays_siege', formDataEntreprise.pays_siege);
                formData2.append('site_web', formDataEntreprise.site_web);
                formData2.append('email_contact', formDataEntreprise.email_contact);
                const telephone = `${formDataEntreprise.telephone_code || ''}${formDataEntreprise.telephone_number || ''}`.trim();
                formData2.append('telephone', telephone);
                if (formDataEntreprise.logo) {
                    formData2.append('logo', formDataEntreprise.logo);
                }
                formData2.append('regions_afrique', formDataEntreprise.regions_afrique)
                formData2.append('regions_recrutement', formDataEntreprise.regions_recrutement)
                formData2.append('competences_pro_bono', formDataEntreprise.competences_pro_bono)
                const reseaux_sociaux2 = {
                    facebook: formDataEntreprise.facebook_url,
                    twitter: formDataEntreprise.twitter_url,
                    linkedin: formDataEntreprise.linkedin_url,
                    instagram: formDataEntreprise.instagram_url
                };

                formData2.append('twitter', formDataEntreprise.reseaux_sociaux2.twitter ? 1 : 0);
                formData2.append('linkedin', formDataEntreprise.reseaux_sociaux2.linkedin ? 1 : 0);
                formData2.append('twitter_url', formDataEntreprise.twitter_url);
                formData2.append('linkedin_url', formDataEntreprise.linkedin_url);
                formData2.append('contact_rse[nom]', formDataEntreprise.contact_rse.nom);
                formData2.append('contact_rse[fonction]', formDataEntreprise.contact_rse.fonction);
                formData2.append('contact_rse[email]', formDataEntreprise.contact_rse.email);
                formData2.append('politique_inclusion', formDataEntreprise.politique_inclusion);
                formData2.append('programmes_integration', formDataEntreprise.programmes_integration);
                formData2.append('postes_stages_annuels', formDataEntreprise.postes_stages_annuels);
                formData2.append('dispositifs_formation', formDataEntreprise.dispositifs_formation);
                formData2.append('partenariats_osc', formDataEntreprise.partenariats_osc);
                formData2.append('initiatives_mecenat', formDataEntreprise.initiatives_mecenat);
                formData2.append('profils_recherches', formDataEntreprise.profils_recherches);
                formData2.append('processus_integration', formDataEntreprise.processus_integration);


                try {
                    const response = await axios.post('http://192.168.100.171:8000/api/entreprises', formData2, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                    });

                    console.log('Réponse du serveur:', response.data);
                    alert('Formulaire soumis avec succès!');
                    setShowModal(false);
                    window.location.reload();

                } catch (error) {
                    console.error('Erreur lors de la soumission:', error.response?.data || error.message);
                    alert('Erreur lors de la soumission : ' + (error.response?.data.message || error.message));
                }
                break;
            case 'agences':
                if (!formDataAgence.nom ||
                    !formDataAgence.type_organisation ||
                    formDataAgence.pays_representes.length === 0 ||
                    formDataAgence.couverture_afrique.length === 0 ||
                    !formDataAgence.email_institutionnel) {
                    alert("Veuillez remplir tous les champs obligatoires");
                    return;
                }

                const formData3 = new FormData();
                includeCoordinates(formData3);
                formData3.append('nom', formDataAgence.nom);
                if (formDataAgence.logo instanceof File) {
                    formData3.append('logo', formDataAgence.logo);
                }
                formData3.append('type_organisation', formDataAgence.type_organisation);
                formData3.append('email_institutionnel', formDataAgence.email_institutionnel);
                formData3.append('pays_representes', formDataAgence.pays_representes);
                formData3.append('couverture_afrique', formDataAgence.couverture_afrique);
                formData3.append('type_partenaires', formDataAgence.type_partenaires);
                formData3.append('outils_methodologiques', formDataAgence.outils_methodologiques);
                if (formDataAgence.site_web) formData3.append('site_web', formDataAgence.site_web);
                if (formDataAgence.bureaux_afrique) formData3.append('bureaux_afrique', formDataAgence.bureaux_afrique);
                if (formDataAgence.priorites_thematiques) formData3.append('priorites_thematiques', formDataAgence.priorites_thematiques);
                if (formDataAgence.budget) formData3.append('budget', formDataAgence.budget);
                if (formDataAgence.annee_debut) formData3.append('annee_debut', formDataAgence.annee_debut);
                if (formDataAgence.annee_fin) formData3.append('annee_fin', formDataAgence.annee_fin);
                if (formDataAgence.opportunites_financement) formData3.append('opportunites_financement', formDataAgence.opportunites_financement);
                if (formDataAgence.mecanismes_collaboration) formData3.append('mecanismes_collaboration', formDataAgence.mecanismes_collaboration);
                if (formDataAgence.domaines_expertise) formData3.append('domaines_expertise', formDataAgence.domaines_expertise);
                if (formDataAgence.logo) formData3.append('logo', formDataAgence.logo);
                if (formDataAgence.cadre_strategique) formData3.append('cadre_strategique', formDataAgence.cadre_strategique);
                formData3.append('contact_jeunesse[nom]', formDataAgence.contact_jeunesse?.nom || '');
                formData3.append('contact_jeunesse[fonction]', formDataAgence.contact_jeunesse?.fonction || '');
                formData3.append('contact_jeunesse[email]', formDataAgence.contact_jeunesse?.email || '');
                formDataAgence.programmes_phares.forEach((program, index) => {
                    formData3.append(`programmes_phares[${index}][titre]`, program.titre || '');
                    formData3.append(`programmes_phares[${index}][objectifs]`, program.objectifs || '');
                    formData3.append(`programmes_phares[${index}][pays_intervention]`, program.pays_intervention || '');
                    formData3.append(`programmes_phares[${index}][partenaires]`, program.partenaires || '');
                    formData3.append(`programmes_phares[${index}][resultats]`, program.resultats || '');
                    formData3.append(`programmes_phares[${index}][publication]`, program.publications || '');


                });

                try {
                    const response = await axios.post('http://192.168.100.171:8000/api/agences', formData3, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });
                    alert('Enregistrement réussi!');
                    setShowModal(false);
                    window.location.reload();
                } catch (error) {
                    console.error('Erreur:', error.response?.data);
                    if (error.response?.status === 422) {
                        const errors = error.response.data.errors;
                        const errorMessages = Object.values(errors).flat().join('\n');
                        alert(`Erreurs de validation:\n${errorMessages}`);
                    } else {
                        alert('Une erreur est survenue');
                    }
                }
                break;
            case 'publiques':
                const formDataPubliqueForm = new FormData();
                includeCoordinates(formDataPubliqueForm);
                formDataPubliqueForm.append('institution_name', formDataPublique.institution_name);
                formDataPubliqueForm.append('institution_type', formDataPublique.institution_type);
                formDataPubliqueForm.append('country', formDataPublique.country);
                formDataPubliqueForm.append('website', formDataPublique.website || '');
                formDataPubliqueForm.append('email', formDataPublique.email);
                formDataPubliqueForm.append('phone_code', formDataPublique.phone_code);
                formDataPubliqueForm.append('phone_number', formDataPublique.phone_number);
                formDataPubliqueForm.append('address', formDataPublique.address || '');
                formDataPubliqueForm.append('youth_contact_name', formDataPublique.youthContact.name);
                formDataPubliqueForm.append('youth_contact_position', formDataPublique.youthContact.position);
                formDataPubliqueForm.append('youth_contact_email', formDataPublique.youthContact.email);
                if (formDataPublique.logo) {
                    formDataPubliqueForm.append('logo_path', formDataPublique.logo);
                }


                formDataPubliqueForm.append('policy_framework', formDataPublique.policyFramework);
                formDataPubliqueForm.append('strategic_priorities', formDataPublique.strategicPriorities);
                formDataPubliqueForm.append('annual_budget', formDataPublique.annualBudget);
                formDataPubliqueForm.append('flagship_program', formDataPublique.flagshipProgram);
                formDataPubliqueForm.append('target_audience', formDataPublique.targetAudience);
                formDataPubliqueForm.append('flagship_program', formDataPublique.supportMechanisms);
                formDataPubliqueForm.append('expected_result_1', formDataPublique.expectedResults[0]);
                formDataPubliqueForm.append('expected_result_2', formDataPublique.expectedResults[1]);
                formDataPubliqueForm.append('expected_result_3', formDataPublique.expectedResults[2]);
                formDataPubliqueForm.append('execution_partners', formDataPublique.executionPartners);
                formDataPubliqueForm.append('coordination_mechanism', formDataPublique.coordinationMechanism);
                formDataPubliqueForm.append('involved_actors', formDataPublique.involvedActors);
                formDataPubliqueForm.append('monitoring_approach', formDataPublique.monitoringApproach);
                formDataPubliqueForm.append('technical_assistance', formDataPublique.technicalAssistance);
                formDataPubliqueForm.append('best_practices', formDataPublique.bestPractices);
                formDataPubliqueForm.append('cooperation_opportunities', formDataPublique.cooperationOpportunities);

                try {
                    const response = await axios.post('http://192.168.100.171:8000/api/publique', formDataPubliqueForm, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });
                    console.log(response); alert('Enregistrement réussi!');
                    setShowModal(false);
                    window.location.reload();
                } catch (error) {
                    console.error('Erreur:', error.response?.data);
                    if (error.response?.status === 422) {
                        const errors = error.response.data.errors;
                        const errorMessages = Object.values(errors).flat().join('\n');
                        alert(`Erreurs de validation:\n${errorMessages}`);
                    } else {
                        alert('Une erreur est survenue');
                    }
                }
                break;
            case 'academiques':
                const formDataAcademiqueForm = new FormData();
                includeCoordinates(formDataAcademiqueForm);
                formDataAcademiqueForm.append('nom', formDataAcademique.nom);
                if (formDataAcademique.logo) {
                    formDataAcademiqueForm.append('logo_path', formDataAcademique.logo);
                }
                formDataAcademiqueForm.append('type_institution', formDataAcademique.type_institution);
                formDataAcademiqueForm.append('pays', formDataAcademique.pays);
                formDataAcademiqueForm.append('site_web', formDataAcademique.site_web || '');
                formDataAcademiqueForm.append('departement', formDataAcademique.departement || '');
                formDataAcademiqueForm.append('email', formDataAcademique.email);
                formDataAcademiqueForm.append('telephone', `${formDataAcademique.telephone_code}${formDataAcademique.telephone_number}`);
                formDataAcademiqueForm.append('contact_nom', formDataAcademique.contact_chercheur.nom || '');
                formDataAcademiqueForm.append('contact_fonction', formDataAcademique.contact_chercheur.fonction || '');
                formDataAcademiqueForm.append('contact_email', formDataAcademique.contact_chercheur.email || '');
                formDataAcademiqueForm.append('axes_recherche', formDataAcademique.axes_recherche || '');
                formDataAcademiqueForm.append('methodologies', formDataAcademique.methodologies || '');
                formDataAcademique.zones_geographiques.forEach(zone => {
                    formDataAcademiqueForm.append('zones_geographiques[]', zone);
                });
                if (formDataAcademique.publications) {
                    formDataAcademique.publications.forEach((file, index) => {
                        formDataAcademiqueForm.append(`publications[${index}]`, file);
                    });
                }
                formDataAcademiqueForm.append('programmes_formation', formDataAcademique.programmes_formation || '');
                formDataAcademique.public_cible.forEach(cible => {
                    formDataAcademiqueForm.append('public_cible[]', cible);
                });
                formDataAcademique.modalites.forEach(modalite => {
                    formDataAcademiqueForm.append('modalites[]', modalite);
                });
                formDataAcademiqueForm.append('certifications', formDataAcademique.certifications || '');
                formDataAcademiqueForm.append('partenaires_recherche', formDataAcademique.partenaires_recherche || '');
                formDataAcademique.ressources_disponibles.forEach(ressource => {
                    formDataAcademiqueForm.append('ressources_disponibles[]', ressource);
                });
                formDataAcademiqueForm.append('expertise', formDataAcademique.expertise || '');
                formDataAcademiqueForm.append('opportunites_collaboration', formDataAcademique.opportunites_collaboration || '');
                formDataAcademiqueForm.append('conferences', formDataAcademique.conferences || '');
                formDataAcademiqueForm.append('ateliers', formDataAcademique.ateliers || '');
                try {
                    const response = await axios.post('http://192.168.100.171:8000/api/academiques', formDataAcademiqueForm, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });
                    alert('Institution académique enregistrée avec succès!');
                    setShowModal(false);
                    window.location.reload();
                } catch (error) {
                    console.error('Erreur:', error.response?.data);
                    if (error.response?.status === 422) {
                        const errors = error.response.data.errors;
                        const errorMessages = Object.entries(errors)
                            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                            .join('\n');
                        alert(`Erreurs de validation:\n${errorMessages}`);
                    } else {
                        alert('Une erreur est survenue: ' + (error.response?.data.message || error.message));
                    }
                }
                break;
        }


    };


    const handleAcademiqueChange = (e) => {
        const { name, value } = e.target;
        setFormDataAcademique(prev => ({ ...prev, [name]: value }));
    };

    const handleContactChercheurChange = (e) => {
        const { name, value } = e.target;
        setFormDataAcademique(prev => ({
            ...prev,
            contact_chercheur: {
                ...prev.contact_chercheur,
                [name]: value
            }
        }));
    };

    const handleFileChange = (e) => {
        setFormDataAcademique(prev => ({
            ...prev,
            [e.target.name]: e.target.files[0]
        }));
    };

    const handleMultiFileChange = (e) => {
        setFormDataAcademique(prev => ({
            ...prev,
            [e.target.name]: Array.from(e.target.files)
        }));
    };

    const handleCheckboxChange = (field, value) => {
        setFormDataAcademique(prev => {
            const currentValues = prev[field] || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [field]: newValues };
        });
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        setLoading(true);
        setError('');
        try {
            await axios.post('http://192.168.100.171:8000/api/register-map', {
                name: form.name,
                email: form.email,
                lat: newPosition.lat,
                lng: newPosition.lng,
            });
            setStep(2);
            $
        } catch (err) {
            setError(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        setLoading(true);
        setError('');
        try {
            await axios.post('http://192.168.100.171:8000/api/verify-code', {
                email: form.email,
                code: form.code,
            });
            setStep(3);
        } catch (err) {
            setError(err.response?.data?.message || 'Code invalide ou expiré.');
        } finally {
            setLoading(false);
        }
    };

    const toggleSocialInput = (platform) => {
        const urlKey = `${platform}_url`;
        setFormData(prev => ({
            ...prev,
            socials: {
                ...prev.socials,
                [`social_${platform}`]: !prev.socials[`social_${platform}`],
            },
            [urlKey]: prev.socials[`social_${platform}`] ? '' : prev[urlKey],
        }));
    };
    const toggleSocialBailleur = (reseau) => {
        setFormDataBailleur(prev => ({
            ...prev,
            reseaux_sociaux: {
                ...prev.reseaux_sociaux,
                [reseau]: !prev.reseaux_sociaux[reseau]
            }
        }));
    };

    const Card = ({ details, onClose }) => {
        const navigate = useNavigate();

        const handleSeeMore = () => {
            navigate('/details', {
                state: {
                    details: details.showable,
                    type: details.showable_type
                }
            });
        };

        const renderContent = () => {
            switch (details.showable_type) {
                case 'App\\Models\\Organization':
                    return (
                        <div className="flex items-center bg-white/90 shadow-md rounded-xl p-4 gap-4 w-[40vw] mx-auto relative">
                            <div className='w-[70%]'>
                                <img
                                    src={`http://192.168.100.171:8000/storage/${details.showable.logo}`}
                                    alt={`${details.showable.name} logo`}
                                    className="w-80 h-52 object-cover rounded-md"
                                />
                            </div>

                            <div className="flex flex-col w-96 justify-between gap-1 text-sm text-gray-800">
                                <p className="font-bold text-lg text-beta">{details.showable.name}</p>
                                <p><span className="font-medium text-gray-500">Statut légal:</span> {details.showable.legal_status}</p>
                                {/* <p><span className="font-medium text-gray-500">Email:</span> {details.showable.main_email}</p> */}
                                {/* <p><span className="font-medium text-gray-500">Année de création:</span> {details.showable.creation_year}</p> */}
                                {/* <p><span className="font-medium text-gray-500">Pays:</span> {Array.isArray(details.showable.country) ? details.showable.country[0] : details.showable.country}</p> */}
                                <p className='truncate'><span className="font-medium text-gray-500 ">Pays d'interventions :</span> {details.showable.regions}</p>
                                <p><span className="font-medium text-gray-500">Groupes Cibles :</span> {details.showable.target_groups}</p>
                                <p className='truncate'><span className="font-medium text-gray-500">Bonnes Pratiques :</span> {details.showable.program_title}</p>
                                {/* <p><span className="font-medium text-gray-500">Site web:</span> <a href={details.showable.website} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.showable.website}</a></p>
                                <p><span className="font-medium text-gray-500">LinkedIn:</span> <a href={details.showable.linkedin_url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.showable.linkedin_url}</a></p>
                                <p><span className="font-medium text-gray-500">Twitter:</span> <a href={details.showable.twitter_url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.showable.twitter_url}</a></p> */}
                                <button
                                    onClick={handleSeeMore}
                                    className="mt-4 px-4 py-2 bg-beta text-white rounded hover:bg-[#a68513] w-fit"
                                >
                                    Voir plus de détails
                                </button>
                            </div>
                        </div>
                    );

                case 'App\\Models\\Bailleur':
                    return (
                        <div className="flex items-center bg-white/90 shadow-md rounded-xl p-4 gap-4 w-[40vw] mx-auto relative">
                            <div className='w-[70%]'>
                                <img
                                    src={`http://192.168.100.171:8000/storage/${details.showable.logo_path}`}
                                    alt={`${details.showable.nom} logo_path`}
                                    className="w-80 h-52 object-cover rounded-md"
                                />
                            </div>
                            <div className="flex flex-col w-full gap-2 text-sm text-gray-800">
                                <p className="font-bold text-lg text-beta">{details.showable.nom}</p>
                                <p><span className="font-medium text-gray-500">Email:</span> {details.showable.email_contact}</p>
                                <p><span className="font-medium text-gray-500">Type:</span> {details.showable.type_institution}</p>
                                <p><span className="font-medium text-gray-500">Pays:</span> {details.showable.pays_origine}</p>
                                <p className='truncate w-80'>
                                    <span className="font-medium text-gray-500">couverture geographique: </span>
                                    {Array.isArray(details.showable.couverture_geographique)
                                        ? details.showable.couverture_geographique.join(', ')
                                        : (details.showable.couverture_geographique || '')

                                    }
                                </p>                                <p><span className="font-medium text-gray-500">Site web:</span> <a href={details.showable.site_web} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.showable.website}</a></p>
                                <p className='truncate w-80'><span className="font-medium text-gray-500">Bonnes Pratiques :</span> {details.showable.priorites_thematiques}</p>
                                <button
                                    onClick={handleSeeMore}
                                    className="mt-4 px-4 py-2 bg-beta text-white rounded hover:bg-[#a68513] w-fit"
                                >
                                    Voir plus de détails
                                </button>
                            </div>
                        </div>
                    );
                case 'App\\Models\\Entreprise':
                    return (
                        <div className="flex items-center bg-white/90 shadow-md rounded-xl p-4 gap-4 w-[40vw] mx-auto relative">
                            <div className='w-[70%]'>
                                <img
                                    src={`http://192.168.100.171:8000/storage/${details.showable.logo}`}
                                    alt={`${details.showable.nom} logo`}
                                    className="w-80 h-52 object-cover rounded-md"
                                />
                            </div>
                            <div className="flex flex-col w-full gap-2 text-sm text-gray-800">
                                <p className="font-bold text-lg text-beta">{details.showable.nom}</p>
                                <p><span className="font-medium text-gray-500">Email:</span> {details.showable.email_contact}</p>
                                <p><span className="font-medium text-gray-500">Secteur :</span> {details.showable.secteur}</p>
                                <p><span className="font-medium text-gray-500">Taille de l'entreprise:</span> {details.showable.taille}</p>
                                <p><span className="font-medium text-gray-500">Site web:</span> <a href={details.showable.site_web} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.showable.website}</a></p>
                                <p><span className="font-medium text-gray-500">Pays:</span> {details.showable.pays_siege}</p>
                                <p><span className="font-medium text-gray-500">LinkedIn:</span> <a href={details.showable.linkedin_url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.showable.linkedin_url}</a></p>
                                <p><span className="font-medium text-gray-500">Twitter:</span> <a href={details.showable.twitter_url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.showable.twitter_url}</a></p>
                                <button
                                    onClick={handleSeeMore}
                                    className="mt-4 px-4 py-2 bg-beta text-white rounded hover:bg-[#a68513] w-fit"
                                >
                                    Voir plus de détails
                                </button>
                            </div>
                        </div>
                    );
                case 'App\\Models\\Agence':
                    return (
                        <div className="flex items-center bg-white/90 shadow-md rounded-xl p-4 gap-4 w-[40vw] mx-auto relative">
                            <div className='w-[70%]'>
                                <img
                                    src={`http://192.168.100.171:8000/storage/${details.showable.logo}`}
                                    alt={`${details.showable.nom} logo`}
                                    className="w-80 h-52 object-cover rounded-md"
                                />
                            </div>
                            <div className="flex flex-col w-full gap-2 text-sm text-gray-800">
                                <p className="font-bold text-lg text-beta">{details.showable.nom}</p>
                                <p><span className="font-medium text-gray-500">Email:</span> {details.showable.email_institutionnel}</p>
                                <p><span className="font-medium text-gray-500">Type:</span> {details.showable.type_organisation}</p>
                                <p><span className="font-medium text-gray-500">Site web:</span> <a href={details.showable.site_web} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.showable.website}</a></p>
                                <p><span className="font-medium text-gray-500">Pays:</span> {details.showable.pays_representes}</p>
                                <p><span className="font-medium text-gray-500">Couverture afrique:</span> <a href={details.showable.couverture_afrique} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.showable.website}</a></p>
                                <button
                                    onClick={handleSeeMore}
                                    className="mt-4 px-4 py-2 bg-beta text-white rounded hover:bg-[#a68513] w-fit"
                                >
                                    Voir plus de détails
                                </button>
                            </div>
                        </div>
                    );
                case 'App\\Models\\Publique':
                    return (
                        <div className="flex items-center bg-white/90 shadow-md rounded-xl p-4 gap-4 w-[40vw] mx-auto relative">
                            <div className='w-[70%]'>
                                <img
                                    src={`http://192.168.100.171:8000/storage/${details.showable.logo_path}`}
                                    alt={`${details.showable.institution_name} logo`}
                                    className="w-80 h-52 object-cover rounded-md"
                                />
                            </div>
                            <div className="flex flex-col w-full gap-2 text-sm text-gray-800">
                                <p className="font-bold text-lg text-beta">{details.showable.institution_name}</p>
                                <p><span className="font-medium text-gray-500">Email:</span> {details.showable.email}</p>
                                <p><span className="font-medium text-gray-500">Type:</span> {details.showable.institution_type}</p>
                                <p><span className="font-medium text-gray-500">Pays:</span> {details.showable.country}</p>
                                <p><span className="font-medium text-gray-500">Site web:</span> <a href={details.showable.website} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.showable.website}</a></p>
                                <button
                                    onClick={handleSeeMore}
                                    className="mt-4 px-4 py-2 bg-beta text-white rounded hover:bg-[#a68513] w-fit"
                                >
                                    Voir plus de détails
                                </button>
                            </div>
                        </div>
                    );
                case 'App\\Models\\Academique':
                    return (
                        <div className="flex items-center bg-white/90 shadow-md rounded-xl p-4 gap-4 w-[40vw] mx-auto relative">
                            <div className='w-[70%]'>
                                <img
                                    src={`http://192.168.100.171:8000/storage/${details.showable.logo_path}`}
                                    alt={`${details.showable.nom} logo`}
                                    className="w-80 h-52 object-cover rounded-md"
                                />
                            </div>
                            <div className="flex flex-col w-full gap-2 text-sm text-gray-800">
                                <p className="font-bold text-lg text-beta">{details.showable.nom}</p>
                                <p><span className="font-medium text-gray-500">Email:</span> {details.showable.email}</p>
                                <p><span className="font-medium text-gray-500">Type :</span> {details.showable.type_institution}</p>
                                <p><span className="font-medium text-gray-500">Site web:</span> <a href={details.showable.site_web} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.showable.website}</a></p>
                                <p><span className="font-medium text-gray-500">Pays:</span> {details.showable.pays}</p>
                                <p><span className="font-medium text-gray-500">Departement concerné:</span> <a href={details.showable.departement} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{details.showable.linkedin_url}</a></p>
                                <button
                                    onClick={handleSeeMore}
                                    className="mt-4 px-4 py-2 bg-beta text-white rounded hover:bg-[#a68513] w-fit"
                                >
                                    Voir plus de détails
                                </button>
                            </div>
                        </div>
                    );
                default:
                    return <div>Format non supporté</div>;
            }
        };

        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                <div className="w-[50vw]">
                    <div className="relative bg- rounded-xl p-6 shadow-lg">
                        <button
                            onClick={onClose}
                            className="absolute top-8 left-[43vw] text-2xl text-beta hover:text-red-600 z-50"
                        >
                            ×
                        </button>
                        {renderContent()}
                    </div>
                </div>
            </div>
        );
    };
    return (
        <>

            {
                openDrawer && (
                    <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
                )
            }

            <div
                className="w-full h-screen bg-white"
                id="map-container"
                ref={mapContainerRef}
            >
                <div className='fixed w-[65%] top-[15%] lg:w-[15%] right-[3%] z-20 bg-white rounded' >
                    <input onFocus={() => console.log('focus')} className='p-2 rounded w-full' type="text" placeholder='search' />
                    <div className='bg-white'>
                        <div className='bg-blue-400 h-14 flex flex-row items-start gap-2 p-2'><div className='w-10 aspect-square bg-black rounded-full '></div>
                            <div>
                                <p className='font-bold'>Lionsgeek </p>
                                <p>Morocco</p>
                            </div>
                        </div>
                        <div className='bg-blue-300 h-14'></div>
                        <div className='bg-blue-200 h-14'></div>
                        <div className='bg-blue-100 h-14'></div>
                        <div className='bg-blue-50 h-14'></div>
                    </div>
                </div>

            </div>

            <div className="fixed bottom-4 right-4 gap-3 flex flex-col items-end">
                <button onClick={() => setOpenDrawer(true)} className='p-2 aspect-square animate-bounce bg-alpha text-white rounded-full '>
                    <span className='font-bold text-xl'>?</span>
                </button>
                <button
                    onClick={handleGetLocation}
                    className="bg-alpha text-white p-3 rounded-full shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>


            <div>
                <div className='hidden' ref={mapRef} style={{ width: '100%', height: '500px' }} />
                {Object.entries(markersData).map(([category, markersArray]) =>
                    markersArray.map((element, idx) => {
                        const uniqueKey = `${category}-${idx}`;
                        const isOpen = openCardIndex === uniqueKey;
                        return (
                            <div key={uniqueKey}>
                                {isOpen && (
                                    <Card details={element} onClose={() => setOpenCardIndex(null)} />
                                )}
                            </div>
                        );
                    })
                )}
            </div>
            <div className="tip" />

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                        {step === 1 && (
                            <>
                                <h2 className="text-xl font-semibold mb-4 text-beta">Inscription</h2>

                                <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
                                    Nom
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    placeholder="Entrez votre nom"
                                    onChange={handleChange}
                                    className="mb-3 w-full p-2 border border-gray-300 rounded"
                                />

                                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    placeholder="Entrez votre email"
                                    onChange={handleChange}
                                    className="mb-3 w-full p-2 border border-gray-300 rounded"
                                />

                                <div className='flex mt-4 justify-between items-center'>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className=" px-4 py-2 border border-beta text-alpha rounded"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={handleRegister}
                                        disabled={loading}
                                        className="bg-beta text-white px-4 py-2 rounded  hover:bg-[#a68513] transition-colors duration-200"
                                    >
                                        {loading ? 'Envoi...' : 'Suivant'}
                                    </button>
                                </div>

                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h2 className="text-xl font-semibold mb-4 text-alpha">Vérification du Code</h2>

                                <p className="mb-3 text-sm text-gray-700">
                                    Un code a été envoyé à <strong className="text-beta">{form.email}</strong>
                                </p>

                                <input
                                    name="code"
                                    placeholder="Code de vérification"
                                    onChange={handleChange}
                                    className="mb-4 w-full p-2 border border-gray-300 rounded"
                                />

                                {error && <div className="text-red-500 mb-2">{error}</div>}

                                <button
                                    onClick={handleVerify}
                                    disabled={loading}
                                    className="bg-alpha text-white px-4 py-2 rounded w-full hover:bg-[#24447f] transition-colors duration-200"
                                >
                                    {loading ? 'Vérification...' : 'Vérifier'}
                                </button>
                            </>

                        )}

                        {step === 3 && (
                            <div className="bg-white p-6 rounded-lg shadow-md w-[42vw] ">
                                <h2 className="text-xl font-bold text-alpha mb-4">Type d’organisation</h2>

                                <select
                                    onChange={(e) => setSelectedForm(e.target.value)}
                                    className="mb-4 w-full p-3 border border-alpha rounded focus:outline-none focus:ring-2 focus:ring-beta"
                                >
                                    <option value="">-- Sélectionner un type --</option>
                                    <option value="osc">Organisation de la Société Civile (OSC)</option>
                                    <option value="bailleurs">Bailleur de Fonds</option>
                                    <option value="entreprises">Entreprise du Secteur Privé</option>
                                    <option value="agences">Agence des Nation Unies et de Coopération Internationale</option>
                                    <option value="publiques">Institution Publique</option>
                                    <option value="academiques">Institution Académique et de Recherche</option>
                                </select>

                                <button
                                    onClick={() => {
                                        if (selectedForm) {
                                            setShowOrgModal(true);
                                        }
                                    }}
                                    className="bg-beta hover:bg-[#a18213] text-white font-semibold px-4 py-2 rounded w-full transition"
                                >
                                    Suivant
                                </button>
                            </div>


                        )}

                        {showOrgModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded shadow-lg w-[80%] overflow-y-scroll ">
                                    <h2 className="text-xl font-bold mb-4">
                                        {
                                            {
                                                osc: 'Formulaire - Organisation de la Société Civile',
                                                bailleurs: 'Formulaire - Bailleur de Fonds',
                                                entreprises: 'Formulaire - Entreprise du Secteur Privé',
                                                agences: 'Formulaire - Agence des Nations Unies et Coopération',
                                                publiques: 'Formulaire - Institution Publique',
                                                academiques: 'Formulaire - Institution Académique et de Recherche'
                                            }[selectedForm]
                                        }
                                    </h2>

                                    {selectedForm === 'osc' && (
                                        <>
                                            <form className="w-[75vw]  bg-white rounded-lg shadow-md h-[78vh]" onSubmit={(e) => handleSubmit(e, 'osc')}>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-xl font-bold text-alpha mb-4">Informations Générales</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Nom de l'organisation <span className="text-red-500">*</span></label>
                                                            <input type="text" name='name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border rounded-md" />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Logo (PNG/JPG - max 5MB)</label>
                                                            <input name='logo' type="file" onChange={(e) => setFormData({ ...formData, logo: e.target.files[0] })} accept="image/png, image/jpeg" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Année de création <span className="text-red-500">*</span></label>
                                                            <input type="number" value={formData.creation_year} onChange={(e) => setFormData({ ...formData, creation_year: e.target.value })} min="1900" max="2025" name='creation_year' className="w-full p-2 border rounded-md" />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Statut juridique <span className="text-red-500">*</span></label>
                                                            <select className="w-full p-2 border rounded-md" id="legal-status" name='legal_status' value={formData.legal_status} onChange={(e) => setFormData({ ...formData, legal_status: e.target.value })}>
                                                                <option value="">Sélectionner...</option>
                                                                <option>Association</option>
                                                                <option>Fondation</option>
                                                                <option>Coopérative</option>
                                                                <option>Autre</option>
                                                            </select>
                                                            {formData.legal_status === "Autre" && (
                                                                <input
                                                                    type="text"
                                                                    placeholder="Précisez"

                                                                    className="w-full p-2 border rounded-md mt-2"
                                                                    name='other_legal_status'
                                                                    value={formData.other_legal_status}
                                                                    onChange={(e) => setFormData({ ...formData, other_legal_status: e.target.value })}
                                                                />
                                                            )}                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Pays d'implantations <span className="text-red-500">*</span></label>
                                                            <select onChange={(e) => setFormData({ ...formData, country: Array.from(e.target.selectedOptions, option => option.value) })} className="w-full  p-2 border rounded-md" name='country'>
                                                                <option value="">Sélectionner un pays...</option>
                                                                {data.map((item) => (
                                                                    <option className='' key={item.id} value={item.value} >
                                                                        {item.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="space-y-2 overflow-y-scroll h-32">
                                                            <label className="block text-sm font-medium text-gray-700">Pays d'interventions</label>
                                                            <div className="flex flex-col">
                                                                {data.map((item) => (
                                                                    <div key={item.name} className="flex items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={formData.regions.includes(item.name)}
                                                                            value={item.name}
                                                                            onChange={(e) => {
                                                                                const { checked, value } = e.target;
                                                                                setFormData((prev) => {
                                                                                    let updatedRegions = checked
                                                                                        ? [...prev.regions, value]
                                                                                        : prev.regions.filter((r) => r !== value);
                                                                                    return { ...prev, regions: updatedRegions };
                                                                                });
                                                                            }}
                                                                        />
                                                                        <label className="ml-2">{item.name}</label>
                                                                    </div>
                                                                ))}

                                                            </div>
                                                        </div>


                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Site web</label>
                                                            <input type="url" className="w-full p-2 border rounded-md" name='website' value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium mb-1">Réseaux sociaux</label>

                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    id="social_facebook"
                                                                    checked={formData.socials.social_facebook}
                                                                    onChange={() => toggleSocialInput('facebook')}
                                                                    className="form-checkbox h-4 w-4 text-[#1877F2]"
                                                                    name='social_facebook'
                                                                />
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                                </svg>
                                                            </div>
                                                            {formData.socials && formData.socials.social_facebook && (
                                                                <input
                                                                    type="url"
                                                                    placeholder="https://facebook.com/votre-page"
                                                                    value={formData.facebook_url}
                                                                    onChange={(e) => setFormData(prev => ({ ...prev, facebook_url: e.target.value }))}
                                                                    className="w-full p-2 border rounded-md mt-1"
                                                                    name='facebook_url'
                                                                />
                                                            )}

                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    id="social_twitter"
                                                                    checked={formData.socials.social_twitter}
                                                                    onChange={() => toggleSocialInput('twitter')}
                                                                    className="form-checkbox h-4 w-4 text-[#1DA1F2]"
                                                                    name='social_twitter'
                                                                />
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                                                </svg>

                                                            </div>
                                                            {formData.socials && formData.socials.social_twitter && (
                                                                <input
                                                                    type="url"
                                                                    placeholder="https://x.com/votre-compte"
                                                                    value={formData.twitter_url}
                                                                    onChange={(e) => setFormData(prev => ({ ...prev, twitter_url: e.target.value }))}
                                                                    className="w-full p-2 border rounded-md mt-1"
                                                                    name='twitter_url'
                                                                />
                                                            )}

                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    id="social_linkedin"
                                                                    checked={formData.socials.social_linkedin}
                                                                    onChange={() => toggleSocialInput('linkedin')}
                                                                    className="form-checkbox h-4 w-4 text-[#0A66C2]"
                                                                    name='social_linkedin'
                                                                />
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                                </svg>

                                                            </div>
                                                            {formData.socials && formData.socials.social_linkedin && (
                                                                <input
                                                                    type="url"
                                                                    placeholder="https://linkedin.com/in/votre-profil"
                                                                    value={formData.linkedin_url}
                                                                    onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                                                                    className="w-full p-2 border rounded-md mt-1"
                                                                    name='linkedin_url'
                                                                />
                                                            )}

                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    id="social_instagram"
                                                                    checked={formData.socials.social_instagram}
                                                                    onChange={() => toggleSocialInput('instagram')}
                                                                    className="form-checkbox h-4 w-4 text-[#E4405F]"
                                                                    name='social_instagram'
                                                                />
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                                                </svg>

                                                            </div>
                                                            {formData.socials.social_instagram && (
                                                                <input
                                                                    type="url"
                                                                    placeholder="https://instagram.com/votre-compte"
                                                                    value={formData.instagram_url}
                                                                    onChange={(e) => setFormData(prev => ({ ...prev, instagram_url: e.target.value }))}
                                                                    className="w-full p-2 border rounded-md mt-1"
                                                                    name='instagram_url'
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-xl font-bold text-alpha mb-4">Coordonnées</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Email principal <span className="text-red-500">*</span></label>
                                                            <input type="email" className="w-full p-2 border rounded-md" value={formData.main_email} onChange={(e) => setFormData({ ...formData, main_email: e.target.value })} />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Téléphone <span className="text-red-500">*</span></label>
                                                            <div className="flex">
                                                                <select
                                                                    value={formData.telephone_code1}
                                                                    onChange={(e) => setFormData(prev => ({
                                                                        ...prev,
                                                                        telephone_code1: e.target.value
                                                                    }))}
                                                                    className="w-[5rem] p-2 border rounded-l-md border-gray-300 bg-white"
                                                                >
                                                                    <option value="">+Indicatif</option>
                                                                    {indicatif.map((item) => (
                                                                        <option key={item.id} value={item.dial_code}>{item.dial_code}</option>
                                                                    ))}
                                                                </select>
                                                                <input
                                                                    type="tel"
                                                                    name="phone1"
                                                                    placeholder="Numéro"
                                                                    value={formData.phone1}
                                                                    onChange={(e) => setFormData(prev => ({
                                                                        ...prev,
                                                                        phone1: e.target.value
                                                                    }))}

                                                                    className="w-2/3 p-2 border border-l-0 rounded-r-md border-gray-300"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2 md:col-span-2">
                                                            <label className="block text-sm font-medium text-gray-700">Adresse postale</label>
                                                            <textarea className="w-full p-2 border rounded-md" rows="3" name='postal_address' value={formData.postal_address} onChange={(e) => setFormData({ ...formData, postal_address: e.target.value })}></textarea>
                                                        </div>

                                                        <div className="space-y-2 md:col-span-2">
                                                            <label className="block text-sm font-medium text-gray-700">Contact principal</label>
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                                <input type="text" placeholder="Nom" className="p-2 border rounded-md" name='contact_name' value={formData.contact_name} onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })} />
                                                                <input type="text" placeholder="Fonction" className="p-2 border rounded-md" name='contact_function' value={formData.contact_function} onChange={(e) => setFormData({ ...formData, contact_function: e.target.value })} />
                                                                <input type="email" placeholder="Email" className="p-2 border rounded-md" name='contact_email' value={formData.contact_email} onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-xl font-bold text-alpha mb-4">Profil d'activité</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                                                        <label className="block text-sm font-medium text-gray-700">intervention_areas</label>
                                                        {["Migration", "Sport", "Éducation", "Santé", "Formation professionnelle", "Entrepreneuriat"].map((area) => (
                                                            <label key={area} className="flex items-center ml-2">
                                                                <input
                                                                    type="checkbox"
                                                                    multiple
                                                                    checked={formData.intervention_areas.includes(area)}
                                                                    onChange={(e) => {
                                                                        const newAreas = e.target.checked
                                                                            ? [...formData.intervention_areas, area]
                                                                            : formData.intervention_areas.filter(a => a !== area);
                                                                        setFormData({ ...formData, intervention_areas: newAreas });
                                                                    }}
                                                                    className="mr-2 domaine-checkbox"
                                                                />
                                                                {area}
                                                            </label>
                                                        ))}


                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Groupes cibles</label>
                                                            <textarea className="w-full p-2 border rounded-md" rows="3" name='target_groups' value={formData.target_groups} onChange={(e) => setFormData({ ...formData, target_groups: e.target.value })}></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Nombre de bénéficiaires annuels (NEET)</label>
                                                            <input type="number" min="0" className="w-full p-2 border rounded-md" name='annual_beneficiaries' value={formData.annual_beneficiaries} onChange={(e) => setFormData({ ...formData, annual_beneficiaries: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-xl font-bold text-alpha mb-4">Programmes NET</legend>

                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Bonnes Pratiques (100 mots max)</label>
                                                            <textarea type="text" className="w-full p-2 border rounded-md" name='program_title' value={formData.program_title} onChange={(e) => setFormData({ ...formData, program_title: e.target.value })} />
                                                        </div>

                                                        {/* <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Description (100 mots max)</label>
                                                            <textarea className="w-full p-2 border rounded-md" rows="4" maxlength="500" name='program_description' value={formData.program_description} onChange={(e) => setFormData({ ...formData, program_description: e.target.value })}></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Approche méthodologique (50 mots max)</label>
                                                            <textarea className="w-full p-2 border rounded-md" rows="2" maxlength="250" name='methodological_approach' value={formData.methodological_approach} onChange={(e) => setFormData({ ...formData, methodological_approach: e.target.value })}></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Résultats clés</label>
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                                <input type="text" placeholder="Résultat 1" className="p-2 border rounded-md" name='result1' value={formData.result1} onChange={(e) => setFormData({ ...formData, result1: e.target.value })} />
                                                                <input type="text" placeholder="Résultat 2" className="p-2 border rounded-md" name='result2' value={formData.result2} onChange={(e) => setFormData({ ...formData, result2: e.target.value })} />
                                                                <input type="text" placeholder="Résultat 3" className="p-2 border rounded-md" name='result3' value={formData.result3} onChange={(e) => setFormData({ ...formData, result3: e.target.value })} />
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-xl font-bold text-alpha mb-4">Partenaires</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Partenaires techniques</label>
                                                            <textarea className="w-full p-2 border rounded-md" rows="3" name='technical_partners' value={formData.technical_partners} onChange={(e) => setFormData({ ...formData, technical_partners: e.target.value })}></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Partenaires financiers</label>
                                                            <textarea className="w-full p-2 border rounded-md" rows="3" name='financial_partners' value={formData.financial_partners} onChange={(e) => setFormData({ ...formData, financial_partners: e.target.value })}></textarea>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <div className="text-center">
                                                    <button type="submit" className="bg-alpha text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                                        Soumettre le formulaire
                                                    </button>
                                                </div>
                                            </form>


                                        </>
                                    )}

                                    {selectedForm === 'bailleurs' && (
                                        <>
                                            <form className="w-[75vw] bg-white rounded-lg shadow-md h-[78vh]" onSubmit={(e) => handleSubmit(e, 'bailleurs')}>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-xl font-bold text-alpha mb-4">Informations Générales</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Nom de l'institution <span className="text-red-500">*</span></label>
                                                            <input
                                                                type="text"
                                                                name='nom'
                                                                value={formDataBailleur.nom}
                                                                onChange={(e) => setFormDataBailleur({ ...formDataBailleur, nom: e.target.value })}

                                                                className="w-full p-2 border rounded-md"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Logo (PNG/JPG - max 5MB)</label>
                                                            <input
                                                                name='logo_path'
                                                                type="file"
                                                                onChange={(e) => setFormDataBailleur({ ...formDataBailleur, logo_path: e.target.files[0] })}
                                                                accept=".png,.jpg,.jpeg"
                                                                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Type d'institution <span className="text-red-500">*</span></label>
                                                            <select

                                                                className="w-full p-2 border rounded-md"
                                                                name='type_institution'
                                                                value={formDataBailleur.type_institution}
                                                                onChange={(e) => setFormDataBailleur({ ...formDataBailleur, type_institution: e.target.value })}
                                                            >
                                                                <option value="">Sélectionner...</option>
                                                                <option>Fondation privée</option>
                                                                <option>Agence de développement</option>
                                                                <option>Fonds d'investissement</option>
                                                                <option>Autre</option>
                                                            </select>
                                                            {formDataBailleur.type_institution === "Autre" && (
                                                                <input
                                                                    type="text"
                                                                    placeholder="Précisez"
                                                                    className="w-full p-2 border rounded-md mt-2"
                                                                    name='type_institution_autre'
                                                                    value={formDataBailleur.type_institution_autre}
                                                                    onChange={(e) => setFormDataBailleur({ ...formDataBailleur, type_institution_autre: e.target.value })}
                                                                />
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Pays d'origine <span className="text-red-500">*</span></label>
                                                            <select
                                                                onChange={(e) => setFormDataBailleur({ ...formDataBailleur, pays_origine: Array.from(e.target.selectedOptions, option => option.value) })}
                                                                className="w-full p-2 border rounded-md"
                                                                name='pays_origine'

                                                            >
                                                                <option value="">Sélectionner un pays...</option>
                                                                {data.map((item) => (
                                                                    <option key={item.id} value={item.value}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2 overflow-y-scroll h-32">
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                Couverture géographique <span className="text-red-500">*</span>
                                                            </label>
                                                            <div className="flex flex-col">
                                                                {data.map((item) => (
                                                                    <div key={item.name} className="flex items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={formDataBailleur.couverture_geographique.includes(item.name)}
                                                                            value={item.name}
                                                                            onChange={(e) => {
                                                                                const { checked, value } = e.target;
                                                                                setFormDataBailleur((prev) => {
                                                                                    let updatedcouverture_geographique = checked
                                                                                        ? [...prev.couverture_geographique, value]
                                                                                        : prev.couverture_geographique.filter((r) => r !== value);
                                                                                    return { ...prev, couverture_geographique: updatedcouverture_geographique };
                                                                                });
                                                                            }}
                                                                        />
                                                                        <label className="ml-2">{item.name}</label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>




                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Site web</label>
                                                            <input
                                                                type="url"
                                                                className="w-full p-2 border rounded-md"
                                                                name='site_web'
                                                                value={formDataBailleur.site_web}
                                                                onChange={(e) => setFormDataBailleur({ ...formDataBailleur, site_web: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium mb-1">Réseaux sociaux</label>

                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    id="linkedin"
                                                                    checked={formDataBailleur.reseaux_sociaux.linkedin}
                                                                    onChange={() => setFormDataBailleur(prev => ({
                                                                        ...prev,
                                                                        reseaux_sociaux: {
                                                                            ...prev.reseaux_sociaux,
                                                                            linkedin: !prev.reseaux_sociaux.linkedin
                                                                        }
                                                                    }))}
                                                                    className="form-checkbox h-4 w-4 text-[#0A66C2]"
                                                                />
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                                </svg>
                                                            </div>
                                                            {formDataBailleur.reseaux_sociaux.linkedin && (
                                                                <input
                                                                    type="url"
                                                                    placeholder="https://linkedin.com/company/..."
                                                                    value={formDataBailleur.linkedin_url2}
                                                                    onChange={(e) => setFormDataBailleur(prev => ({ ...prev, linkedin_url2: e.target.value }))}
                                                                    className="w-full p-2 border rounded-md mt-1"
                                                                />
                                                            )}

                                                            <div className="flex items-center gap-2 mt-2">
                                                                <input
                                                                    type="checkbox"
                                                                    id="twitter"
                                                                    checked={formDataBailleur.reseaux_sociaux.twitter}
                                                                    onChange={() => setFormDataBailleur(prev => ({
                                                                        ...prev,
                                                                        reseaux_sociaux: {
                                                                            ...prev.reseaux_sociaux,
                                                                            twitter: !prev.reseaux_sociaux.twitter
                                                                        }
                                                                    }))}
                                                                    className="form-checkbox h-4 w-4 text-[#1DA1F2]"
                                                                />
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                                                </svg>
                                                            </div>
                                                            {formDataBailleur.reseaux_sociaux.twitter && (
                                                                <input
                                                                    type="url"
                                                                    placeholder="https://twitter.com/..."
                                                                    value={formDataBailleur.twitter_url2}
                                                                    onChange={(e) => setFormDataBailleur(prev => ({ ...prev, twitter_url2: e.target.value }))}
                                                                    className="w-full p-2 border rounded-md mt-1"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-xl font-bold text-alpha mb-4">Coordonnées</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Email de contact <span className="text-red-500">*</span></label>
                                                            <input
                                                                type="email"

                                                                className="w-full p-2 border rounded-md"
                                                                name='email_contact'
                                                                value={formDataBailleur.email_contact}
                                                                onChange={(e) => setFormDataBailleur({ ...formDataBailleur, email_contact: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Téléphone <span className="text-red-500">*</span></label>
                                                            <div className="flex">
                                                                <select
                                                                    value={formDataBailleur.telephone_code}
                                                                    onChange={(e) => setFormDataBailleur(prev => ({
                                                                        ...prev,
                                                                        telephone_code: e.target.value
                                                                    }))}
                                                                    className="w-[5rem] p-2 border rounded-l-md border-gray-300 bg-white"
                                                                >
                                                                    <option value="">+Indicatif</option>
                                                                    {indicatif.map((item) => (
                                                                        <option key={item.id} value={item.dial_code}>{item.dial_code}</option>
                                                                    ))}
                                                                </select>
                                                                <input
                                                                    type="tel"
                                                                    name="telephone_number"
                                                                    placeholder="Numéro"
                                                                    value={formDataBailleur.telephone_number}
                                                                    onChange={(e) => setFormDataBailleur(prev => ({
                                                                        ...prev,
                                                                        telephone_number: e.target.value
                                                                    }))}

                                                                    className="w-2/3 p-2 border border-l-0 rounded-r-md border-gray-300"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* <div className="space-y-2 md:col-span-2">
                                                            <label className="block text-sm font-medium text-gray-700">Représentation en Afrique</label>
                                                            <select
                                                                onChange={(e) => setFormDataBailleur({ ...formDataBailleur, representation_afrique: Array.from(e.target.selectedOptions, option => option.value) })}
                                                                className="w-full p-2 border rounded-md"
                                                                name='representation_afrique'
                                                                multiple
                                                            >
                                                                <option value="">Sélectionner un pays...</option>
                                                                {data.map((item) => (
                                                                    <option key={item.id} value={item.value}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                        </div> */}

                                                        <div className="space-y-2 md:col-span-2">
                                                            <label className="block text-sm font-medium text-gray-700">Contact responsable</label>
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Nom"
                                                                    className="p-2 border rounded-md"
                                                                    name='contact_responsable.nom'
                                                                    value={formDataBailleur.contact_responsable?.nom || ''}
                                                                    onChange={(e) => setFormDataBailleur(prev => ({
                                                                        ...prev,
                                                                        contact_responsable: {
                                                                            ...prev.contact_responsable,
                                                                            nom: e.target.value
                                                                        }
                                                                    }))}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Fonction"
                                                                    className="p-2 border rounded-md"
                                                                    name='contact_responsable.fonction'
                                                                    value={formDataBailleur.contact_responsable?.fonction || ''}
                                                                    onChange={(e) => setFormDataBailleur(prev => ({
                                                                        ...prev,
                                                                        contact_responsable: {
                                                                            ...prev.contact_responsable,
                                                                            fonction: e.target.value
                                                                        }
                                                                    }))}
                                                                />
                                                                <input
                                                                    type="email"
                                                                    placeholder="Email"
                                                                    className="p-2 border rounded-md"
                                                                    name='contact_responsable.email'
                                                                    value={formDataBailleur.contact_responsable?.email || ''}
                                                                    onChange={(e) => setFormDataBailleur(prev => ({
                                                                        ...prev,
                                                                        contact_responsable: {
                                                                            ...prev.contact_responsable,
                                                                            email: e.target.value
                                                                        }
                                                                    }))}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-xl font-bold text-alpha mb-4">Programme NEET</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Bonnes Pratiques (100 mots max)<span className="text-red-500">*</span></label>
                                                            <textarea
                                                                className="w-full p-2 border rounded-md"
                                                                rows="3"
                                                                name='priorites_thematiques'
                                                                value={formDataBailleur.priorites_thematiques}
                                                                onChange={(e) => setFormDataBailleur({ ...formDataBailleur, priorites_thematiques: e.target.value })}

                                                            ></textarea>
                                                        </div>

                                                        {/* <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Modalités de soutiens <span className="text-red-500">*</span></label>
                                                            <div className="space-y-1">
                                                                {["Subventions", "Prêts", "Assistance technique", "Investissement"].map(option => (
                                                                    <label key={option} className="flex items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={formDataBailleur.modalites_soutien.includes(option)}
                                                                            onChange={(e) => {
                                                                                const newModalites = e.target.checked
                                                                                    ? [...formDataBailleur.modalites_soutien, option]
                                                                                    : formDataBailleur.modalites_soutien.filter(m => m !== option);
                                                                                setFormDataBailleur({
                                                                                    ...formDataBailleur,
                                                                                    modalites_soutien: newModalites
                                                                                });
                                                                            }}
                                                                            className="mr-2"
                                                                        />
                                                                        {option}
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        </div> */}

                                                        {/* <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Montant minimum (€)</label>
                                                            <input
                                                                type="number"
                                                                className="w-full p-2 border rounded-md"
                                                                name='financement_min'
                                                                value={formDataBailleur.financement_min}
                                                                onChange={(e) => setFormDataBailleur({ ...formDataBailleur, financement_min: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Montant maximum (€)</label>
                                                            <input
                                                                type="number"
                                                                className="w-full p-2 border rounded-md"
                                                                name='financement_max'
                                                                value={formDataBailleur.financement_max}
                                                                onChange={(e) => setFormDataBailleur({ ...formDataBailleur, financement_max: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Budget annuel (€)</label>
                                                            <input
                                                                type="number"
                                                                className="w-full p-2 border rounded-md"
                                                                name='budget_annuel'
                                                                value={formDataBailleur.budget_annuel}
                                                                onChange={(e) => setFormDataBailleur({ ...formDataBailleur, budget_annuel: e.target.value })}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Critères d'éligibilité</label>
                                                            <textarea
                                                                className="w-full p-2 border rounded-md"
                                                                rows="3"
                                                                name='criteres_eligibilite'
                                                                value={formDataBailleur.criteres_eligibilite}
                                                                onChange={(e) => setFormDataBailleur({ ...formDataBailleur, criteres_eligibilite: e.target.value })}
                                                            ></textarea>
                                                        </div> */}
                                                    </div>
                                                </fieldset>

                                                {/* <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-xl font-bold text-alpha mb-4">Portefeuille et Partenariats</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Projets phares soutenus</label>
                                                            <textarea
                                                                className="w-full p-2 border rounded-md"
                                                                rows="3"
                                                                name='projets_phares'
                                                                value={formDataBailleur.projets_phares.join('\n')}
                                                                onChange={(e) => setFormDataBailleur({
                                                                    ...formDataBailleur,
                                                                    projets_phares: e.target.value.split('\n').filter(p => p.trim() !== '')
                                                                })}
                                                                placeholder="Un projet par ligne"
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Approche d'impact</label>
                                                            <textarea
                                                                className="w-full p-2 border rounded-md"
                                                                rows="3"
                                                                name='approche_impact'
                                                                value={formDataBailleur.approche_impact}
                                                                onChange={(e) => setFormDataBailleur({ ...formDataBailleur, approche_impact: e.target.value })}
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Partenaires actuels</label>
                                                            <textarea
                                                                className="w-full p-2 border rounded-md"
                                                                rows="3"
                                                                name='partenaires_actuels'
                                                                value={formDataBailleur.partenaires_actuels}
                                                                onChange={(e) => setFormDataBailleur({ ...formDataBailleur, partenaires_actuels: e.target.value })}
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-medium text-gray-700">Procédure de soumission</label>
                                                            <textarea
                                                                className="w-full p-2 border rounded-md"
                                                                rows="3"
                                                                name='procedure_soumission'
                                                                value={formDataBailleur.procedure_soumission}
                                                                onChange={(e) => setFormDataBailleur({ ...formDataBailleur, procedure_soumission: e.target.value })}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </fieldset> */}

                                                <div className="text-center p-4">
                                                    <button type="submit" className="bg-alpha text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                                        Soumettre le formulaire
                                                    </button>
                                                </div>
                                            </form>
                                        </>
                                    )}
                                    {selectedForm === 'entreprises' && (
                                        <form
                                            className="w-[75vw] bg-white rounded-lg shadow-md h-[78vh] overflow-y-auto"
                                            onSubmit={(e) => handleSubmit(e, 'entreprises')}
                                        >
                                            <fieldset className="bg-gray-100 p-6 rounded-lg mb-4">
                                                <legend className="text-2xl font-bold text-blue-800 mb-6">Informations Générales</legend>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Nom de l'entreprise *</label>
                                                        <input
                                                            type="text"

                                                            value={formDataEntreprise.nom}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, nom: e.target.value }))}
                                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Logo (PNG/JPG - max 5MB)</label>
                                                        <input
                                                            type="file"
                                                            accept=".png,.jpg,.jpeg"
                                                            onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, logo: e.target.files[0] }))}
                                                            className="w-full text-sm file:bg-blue-100 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-blue-800 hover:file:bg-blue-200"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Secteur d'activité *</label>
                                                        <input
                                                            type="text"

                                                            value={formDataEntreprise.secteur}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, secteur: e.target.value }))}
                                                            className="w-full p-3 border rounded-lg"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Taille de l'entreprise *</label>
                                                        <select

                                                            value={formDataEntreprise.taille}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, taille: e.target.value }))}
                                                            className="w-full p-3 border rounded-lg"
                                                        >
                                                            <option value="">Sélectionner...</option>
                                                            <option>PME</option>
                                                            <option>ETI</option>
                                                            <option>Grande entreprise</option>
                                                            <option>Multinationale</option>
                                                        </select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Pays du siège *</label>
                                                        <select
                                                            value={formDataEntreprise.pays_siege}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, pays_siege: e.target.value }))}

                                                            className="w-full p-2 border rounded-md"
                                                        >
                                                            <option value="">Sélectionner un pays...</option>
                                                            {data.map((item) => (
                                                                <option key={item.id} value={item.value}>{item.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Site web</label>
                                                        <input
                                                            type="url"
                                                            value={formDataEntreprise.site_web}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, site_web: e.target.value }))}
                                                            className="w-full p-3 border rounded-lg"
                                                        />
                                                    </div>

                                                    <div className="space-y-2 overflow-y-scroll h-32">
                                                        <label className="block text-sm font-medium text-gray-700">Pays d'interventions</label>
                                                        <div className="flex flex-col">
                                                            {data.map((item) => (
                                                                <div key={item.name} className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={formDataEntreprise.regions_afrique.includes(item.name)}
                                                                        value={item.name}
                                                                        onChange={(e) => {
                                                                            const { checked, value } = e.target;
                                                                            setFormDataEntreprise((prev) => {
                                                                                let updatedregions_afrique = checked
                                                                                    ? [...prev.regions_afrique, value]
                                                                                    : prev.regions_afrique.filter((r) => r !== value);
                                                                                return { ...prev, regions_afrique: updatedregions_afrique };
                                                                            });
                                                                        }}
                                                                    />
                                                                    <label className="ml-2">{item.name}</label>
                                                                </div>
                                                            ))}

                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium mb-1">Réseaux sociaux</label>

                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={formDataEntreprise.reseaux_sociaux2.twitter}
                                                                onChange={() => setFormDataEntreprise(prev => ({
                                                                    ...prev,
                                                                    reseaux_sociaux2: {
                                                                        ...prev.reseaux_sociaux2,
                                                                        twitter: !prev.reseaux_sociaux2.twitter
                                                                    }
                                                                }))}
                                                                className="form-checkbox h-4 w-4 text-[#1877F2]"
                                                            />
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                                            </svg>
                                                        </div>
                                                        {formDataEntreprise.reseaux_sociaux2.twitter && (
                                                            <input
                                                                type="url"
                                                                placeholder="https://twitter.com/votre-page"
                                                                value={formDataEntreprise.twitter_url}
                                                                onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, twitter_url: e.target.value }))}
                                                                className="w-full p-2 border rounded-md mt-1"
                                                            />
                                                        )}
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={formDataEntreprise.reseaux_sociaux2.linkedin}
                                                                onChange={() => setFormDataEntreprise(prev => ({
                                                                    ...prev,
                                                                    reseaux_sociaux2: {
                                                                        ...prev.reseaux_sociaux2,
                                                                        linkedin: !prev.reseaux_sociaux2.linkedin
                                                                    }
                                                                }))}
                                                                className="form-checkbox h-4 w-4 text-[#1877F2]"
                                                            />
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                            </svg>
                                                        </div>
                                                        {formDataEntreprise.reseaux_sociaux2.linkedin && (
                                                            <input
                                                                type="url"
                                                                placeholder="https://linkedin.com/votre-page"
                                                                value={formDataEntreprise.linkedin_url}
                                                                onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, linkedin_url: e.target.value }))}
                                                                className="w-full p-2 border rounded-md mt-1"
                                                            />
                                                        )}

                                                    </div>
                                                </div>
                                            </fieldset>

                                            <fieldset className="bg-gray-100 p-6 rounded-lg mb-4">
                                                <legend className="text-2xl font-bold text-blue-800 mb-6">Coordonnées</legend>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Email de contact *</label>
                                                        <input
                                                            type="email"

                                                            value={formDataEntreprise.email_contact}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, email_contact: e.target.value }))}
                                                            className="w-full p-3 border rounded-lg"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Téléphone *</label>
                                                        <div className="flex">
                                                            <select
                                                                value={formDataEntreprise.telephone_code}
                                                                onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, telephone_code: e.target.value }))}
                                                                className="w-[5rem] p-2 border rounded-l-md border-gray-300 bg-white"
                                                            >
                                                                <option value="">+Indicatif</option>
                                                                {indicatif.map((item) => (
                                                                    <option key={item.id} value={item.dial_code}>{item.dial_code}</option>
                                                                ))}
                                                            </select>
                                                            <input
                                                                type="tel"
                                                                value={formDataEntreprise.telephone_number}
                                                                onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, telephone_number: e.target.value }))}
                                                                className="w-full p-2 border border-l-0 rounded-r-md border-gray-300"
                                                                placeholder="Numéro"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Contact RSE/RH</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Nom complet"
                                                            value={formDataEntreprise.contact_rse.nom}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({
                                                                ...prev,
                                                                contact_rse: { ...prev.contact_rse, nom: e.target.value }
                                                            }))}
                                                            className="w-full p-3 border rounded-lg mb-2"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Fonction"
                                                            value={formDataEntreprise.contact_rse.fonction}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({
                                                                ...prev,
                                                                contact_rse: { ...prev.contact_rse, fonction: e.target.value }
                                                            }))}
                                                            className="w-full p-3 border rounded-lg mb-2"
                                                        />
                                                        <input
                                                            type="email"
                                                            placeholder="Email professionnel"
                                                            value={formDataEntreprise.contact_rse.email}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({
                                                                ...prev,
                                                                contact_rse: { ...prev.contact_rse, email: e.target.value }
                                                            }))}
                                                            className="w-full p-3 border rounded-lg"
                                                        />
                                                    </div>
                                                </div>
                                            </fieldset>

                                            <fieldset className="bg-gray-100 p-6 rounded-lg mb-4">
                                                <legend className="text-2xl font-bold text-blue-800 mb-6">Engagement NEET</legend>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Politique d'inclusion</label>
                                                        <textarea
                                                            rows="4"
                                                            value={formDataEntreprise.politique_inclusion}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, politique_inclusion: e.target.value }))}
                                                            className="w-full p-3 border rounded-lg"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Programmes d'intégration</label>
                                                        <textarea
                                                            rows="4"
                                                            value={formDataEntreprise.programmes_integration}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, programmes_integration: e.target.value }))}
                                                            className="w-full p-3 border rounded-lg"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Postes/stages annuels</label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={formDataEntreprise.postes_stages_annuels}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({
                                                                ...prev,
                                                                postes_stages_annuels: parseInt(e.target.value) || 0
                                                            }))}
                                                            className="w-full p-3 border rounded-lg"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Dispositifs de formation</label>
                                                        <textarea
                                                            rows="3"
                                                            value={formDataEntreprise.dispositifs_formation}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, dispositifs_formation: e.target.value }))}
                                                            className="w-full p-3 border rounded-lg"
                                                        />
                                                    </div>
                                                </div>
                                            </fieldset>

                                            <fieldset className="bg-gray-100 p-6 rounded-lg mb-4">
                                                <legend className="text-2xl font-bold text-blue-800 mb-6">Collaborations Existantes</legend>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Partenariats OSC</label>
                                                        <textarea
                                                            rows="3"
                                                            value={formDataEntreprise.partenariats_osc}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, partenariats_osc: e.target.value }))}
                                                            className="w-full p-3 border rounded-lg"
                                                            placeholder="Organisations partenaires"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Initiatives de mécénat</label>
                                                        <textarea
                                                            rows="3"
                                                            value={formDataEntreprise.initiatives_mecenat}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, initiatives_mecenat: e.target.value }))}
                                                            className="w-full p-3 border rounded-lg"
                                                        />
                                                    </div>

                                                    <div className="space-y-2 md:col-span-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Compétences pro bono</label>
                                                        <select
                                                            multiple
                                                            value={formDataEntreprise.competences_pro_bono}
                                                            onChange={(e) => {
                                                                const selected = Array.from(e.target.selectedOptions, option => option.value);
                                                                setFormDataEntreprise(prev => ({ ...prev, competences_pro_bono: selected }));
                                                            }}
                                                            className="w-full p-3 border rounded-lg h-32"
                                                        >
                                                            <option value="mentorat">Mentorat professionnel</option>
                                                            <option value="formation">Formation technique</option>
                                                            <option value="coaching">Coaching carrière</option>
                                                            <option value="consulting">Consulting stratégique</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </fieldset>

                                            <fieldset className="bg-gray-100 p-6 rounded-lg mb-4">
                                                <legend className="text-2xl font-bold text-blue-800 mb-6">Besoins en Recrutement</legend>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Profils recherchés</label>
                                                        <textarea
                                                            rows="3"
                                                            value={formDataEntreprise.profils_recherches}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, profils_recherches: e.target.value }))}
                                                            className="w-full p-3 border rounded-lg"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Régions de recrutement</label>
                                                        <select
                                                            multiple
                                                            value={formDataEntreprise.regions_recrutement}
                                                            onChange={(e) => {
                                                                const selected = Array.from(e.target.selectedOptions, option => option.value);
                                                                setFormDataEntreprise(prev => ({ ...prev, regions_recrutement: selected }));
                                                            }}
                                                            className="w-full p-2 border rounded-md"
                                                        >
                                                            {data.map((item) => (
                                                                <option key={item.id} value={item.value}>{item.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-semibold text-gray-700">Processus d'intégration</label>
                                                        <textarea
                                                            rows="3"
                                                            value={formDataEntreprise.processus_integration}
                                                            onChange={(e) => setFormDataEntreprise(prev => ({ ...prev, processus_integration: e.target.value }))}
                                                            className="w-full p-3 border rounded-lg"
                                                        />
                                                    </div>
                                                </div>
                                            </fieldset>

                                            <div className="text-center p-6">
                                                <button
                                                    type="submit"
                                                    className="bg-blue-800 text-white px-12 py-4 rounded-xl hover:bg-blue-900 transition-all duration-300 transform hover:scale-105"
                                                >
                                                    Soumettre le Formulaire
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {selectedForm === 'agences' && (
                                        <>
                                            <form
                                                className="w-[75vw] bg-white rounded-lg shadow-md h-[78vh] overflow-y-auto"
                                                onSubmit={(e) => handleSubmit(e, 'agences')}
                                            >
                                                <fieldset className="bg-gray-100 p-6 rounded-lg mb-4">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Informations Générales</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Nom de l'agence <span className="text-red-500">*</span></label>
                                                            <input
                                                                type="text"
                                                                value={formDataAgence.nom}
                                                                onChange={(e) => setFormDataAgence(prev => ({ ...prev, nom: e.target.value.trim() }))}
                                                                className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"

                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Logo (PNG/JPG - max 5MB)</label>
                                                            <input
                                                                type="file"
                                                                name="logo"
                                                                accept=".png,.jpg,.jpeg"
                                                                className="w-full text-sm file:bg-blue-100 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-blue-800 hover:file:bg-blue-200"
                                                                onChange={(e) => setFormDataAgence(prev => ({ ...prev, logo: e.target.files[0] }))}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Type d'organisation <span className="text-red-500">*</span></label>
                                                            <select
                                                                name="type_organisation"

                                                                className="w-full p-3 border rounded-lg"
                                                                onChange={(e) => setFormDataAgence(prev => ({ ...prev, type_organisation: e.target.value }))}
                                                            >
                                                                <option value="">Sélectionner...</option>
                                                                <option>Agence ONU</option>
                                                                <option>Coopération bilatérale</option>
                                                                <option>Organisation régionale</option>
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Pays représentés</label>
                                                            <select
                                                                multiple
                                                                name="pays_representes"
                                                                onChange={(e) => setFormDataAgence(prev => ({ ...prev, pays_representes: e.target.value }))}

                                                            >
                                                                {data.map(item => (
                                                                    <option key={item.value} value={item.value}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2 md:col-span-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Couverture en Afrique</label>
                                                            <select
                                                                name="couverture_afrique"
                                                                multiple
                                                                className="w-full p-2 border rounded-md"
                                                                onChange={(e) => setFormDataAgence(prev => ({ ...prev, couverture_afrique: e.target.value }))}

                                                            >
                                                                {data.map((item) => (
                                                                    <option key={item.id} value={item.value}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Site web</label>
                                                            <input
                                                                type="url"
                                                                name="site_web"
                                                                className="w-full p-3 border rounded-lg"
                                                                onChange={(e) => setFormDataAgence(prev => ({ ...prev, site_web: e.target.value }))}
                                                            />
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg mb-4">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Coordonnées</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Email institutionnel <span className="text-red-500">*</span></label>
                                                            <input
                                                                type="email"
                                                                name="email_institutionnel"

                                                                className="w-full p-3 border rounded-lg"
                                                                onChange={(e) => setFormDataAgence(prev => ({ ...prev, email_institutionnel: e.target.value }))}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Bureaux en Afrique</label>
                                                            <textarea
                                                                name="bureaux_afrique"
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="4"
                                                                onChange={(e) => setFormDataAgence(prev => ({ ...prev, bureaux_afrique: e.target.value }))}
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Contact thématique jeunesse</label>
                                                            <div className='flex flex-col gap-3'>
                                                                <input
                                                                    type="text"
                                                                    name="contact_jeunesse[nom]"
                                                                    placeholder="Nom complet"
                                                                    className="w-full p-3 border rounded-lg"
                                                                    onChange={(e) => setFormDataAgence(prev => ({
                                                                        ...prev,
                                                                        contact_jeunesse: { ...prev.contact_jeunesse, nom: e.target.value }
                                                                    }))}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    name="contact_jeunesse[fonction]"
                                                                    placeholder="Fonction"
                                                                    className="w-full p-3 border rounded-lg"
                                                                    onChange={(e) => setFormDataAgence(prev => ({
                                                                        ...prev,
                                                                        contact_jeunesse: { ...prev.contact_jeunesse, fonction: e.target.value }
                                                                    }))}
                                                                />
                                                                <input
                                                                    type="email"
                                                                    name="contact_jeunesse[email]"
                                                                    placeholder="Email professionnel"
                                                                    className="w-full p-3 border rounded-lg"
                                                                    onChange={(e) => setFormDataAgence(prev => ({
                                                                        ...prev,
                                                                        contact_jeunesse: { ...prev.contact_jeunesse, email: e.target.value }
                                                                    }))}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg mb-4">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Stratégie Jeunesse</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Cadre stratégique</label>
                                                            <input
                                                                type="file"
                                                                name="cadre_strategique"
                                                                className="w-full text-sm file:bg-blue-100 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-blue-800 hover:file:bg-blue-200"
                                                                onChange={(e) => setFormDataAgence(prev => ({ ...prev, cadre_strategique: e.target.files[0] }))}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Priorités thématiques</label>
                                                            <textarea
                                                                name="priorites_thematiques"
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="4"
                                                                onChange={(e) => setFormDataAgence(prev => ({ ...prev, priorites_thematiques: e.target.value }))}
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Budget dédié (€)</label>
                                                            <input
                                                                type="number"
                                                                name="budget"
                                                                min="0"
                                                                className="w-full p-3 border rounded-lg"
                                                                onChange={(e) => setFormDataAgence(prev => ({ ...prev, budget: e.target.value }))}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Période du programme</label>
                                                            <div className="flex gap-4">
                                                                <input
                                                                    type="number"
                                                                    name="annee_debut"
                                                                    placeholder="Année début"
                                                                    className="w-full p-3 border rounded-lg"
                                                                    onChange={(e) => setFormDataAgence(prev => ({ ...prev, annee_debut: e.target.value }))}
                                                                />
                                                                <input
                                                                    type="number"
                                                                    name="annee_fin"
                                                                    placeholder="Année fin"
                                                                    className="w-full p-3 border rounded-lg"
                                                                    onChange={(e) => setFormDataAgence(prev => ({ ...prev, annee_fin: e.target.value }))}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg mb-4">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Programmes Phares</legend>

                                                    <div className="grid grid-cols-1 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Titre du programme</label>
                                                            <input
                                                                type="text"
                                                                name="programmes_phares[0][titre]"
                                                                className="w-full p-3 border rounded-lg"
                                                                onChange={(e) => setFormDataAgence(prev => ({
                                                                    ...prev,
                                                                    programmes_phares: [{
                                                                        ...prev.programmes_phares[0] || {},
                                                                        titre: e.target.value
                                                                    }]
                                                                }))}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Objectifs (50 mots max)</label>
                                                            <textarea
                                                                name="programmes_phares[0][objectifs]"
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="3"
                                                                maxLength="300"
                                                                onChange={(e) => setFormDataAgence(prev => ({
                                                                    ...prev,
                                                                    programmes_phares: [{
                                                                        ...prev.programmes_phares[0] || {},
                                                                        objectifs: e.target.value
                                                                    }]
                                                                }))}
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Pays d'intervention</label>
                                                            <select
                                                                name="programmes_phares[0][pays_intervention]"
                                                                className="w-full p-2 border rounded-md"
                                                                onChange={(e) => setFormDataAgence(prev => ({
                                                                    ...prev,
                                                                    programmes_phares: [{
                                                                        ...prev.programmes_phares[0] || {},
                                                                        pays_intervention: e.target.value
                                                                    }]
                                                                }))}
                                                            >
                                                                {data.map((item) => (
                                                                    <option key={item.id} value={item.value}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Partenaires de mise en œuvre</label>
                                                            <textarea
                                                                name="programmes_phares[0][partenaires]"
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="3"
                                                                onChange={(e) => setFormDataAgence(prev => ({
                                                                    ...prev,
                                                                    programmes_phares: [{
                                                                        ...prev.programmes_phares[0] || {},
                                                                        partenaires: e.target.value
                                                                    }]
                                                                }))}
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Résultats attendus</label>
                                                            <div className="space-y-2">
                                                                {[1, 2, 3].map((index) => (
                                                                    <input
                                                                        key={index}
                                                                        type="text"
                                                                        name={`programmes_phares[0][resultats][${index}]`}
                                                                        placeholder={`Résultat ${index}`}
                                                                        className="w-full p-3 border rounded-lg"
                                                                        onChange={(e) => setFormDataAgence(prev => {
                                                                            const resultats = prev.programmes_phares[0]?.resultats || [];
                                                                            resultats[index] = e.target.value;
                                                                            return {
                                                                                ...prev,
                                                                                programmes_phares: [{
                                                                                    ...prev.programmes_phares[0] || {},
                                                                                    resultats
                                                                                }]
                                                                            };
                                                                        })}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Publications clés</label>
                                                            <input
                                                                type="file"
                                                                name="programmes_phares[0][publications][]"
                                                                multiple
                                                                className="w-full text-sm file:bg-blue-100 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-blue-800 hover:file:bg-blue-200"
                                                                onChange={(e) => setFormDataAgence(prev => ({
                                                                    ...prev,
                                                                    programmes_phares: [
                                                                        {
                                                                            ...prev.programmes_phares[0],
                                                                            publications: [...prev.programmes_phares[0].publications, ...Array.from(e.target.files)]
                                                                        }
                                                                    ]
                                                                }))}
                                                            />

                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg mb-4">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Ressources Disponibles</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Outils méthodologiques</label>
                                                            <input
                                                                type="file"
                                                                name="outils_methodologiques[]"
                                                                multiple
                                                                className="w-full text-sm file:bg-blue-100 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-blue-800 hover:file:bg-blue-200"
                                                                onChange={(e) => setFormDataAgence(prev => ({ ...prev, outils_methodologiques: e.target.files[0] }))}

                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Opportunités de financement</label>
                                                            <textarea
                                                                name="opportunites_financement"
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="3"
                                                                onChange={(e) => setFormDataAgence(prev => ({ ...prev, opportunites_financement: e.target.value }))}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg mb-4">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Collaboration recherchée</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Type De partenaires</label>
                                                            <select
                                                                name="type_partenaires[]"
                                                                multiple
                                                                className="w-full p-3 border rounded-lg h-32"
                                                                onChange={(e) => setFormDataAgence(prev => ({ ...prev, type_partenaires: e.target.value }))}
                                                            >
                                                                <option value="ONG">ONG</option>
                                                                <option value="Entreprises privées">Entreprises privées</option>
                                                                <option value="Institutions gouvernementales">Institutions gouvernementales</option>
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Mécanismes de collaboration</label>
                                                            <input
                                                                type="text"
                                                                name="mecanismes_collaboration"
                                                                className="w-full p-2 border rounded-md"
                                                                placeholder="Mécanismes de collaboration"
                                                                onChange={(e) => setFormDataAgence(prev => ({ ...prev, mecanismes_collaboration: e.target.value }))}
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Domaines d'expertise</label>
                                                            <textarea
                                                                name="domaines_expertise"
                                                                rows="3"
                                                                className="w-full p-2 border rounded-md"
                                                                onChange={(e) => setFormDataAgence(prev => ({ ...prev, domaines_expertise: e.target.value }))}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <div className="text-center p-4">
                                                    <button
                                                        type="submit"
                                                        className="bg-blue-800 text-white px-12 py-4 rounded-xl hover:bg-blue-900 transition-all duration-300"
                                                    >
                                                        Soumettre le Formulaire
                                                    </button>
                                                </div>
                                            </form>
                                        </>
                                    )}

                                    {selectedForm === 'publiques' && (
                                        <>
                                            <form
                                                className="w-[75vw] bg-white rounded-lg shadow-md h-[78vh] overflow-y-auto"
                                                onSubmit={(e) => handleSubmit(e, 'publiques')}
                                            >
                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Informations Générales</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Nom de l'institution <span className="text-red-500">*</span></label>
                                                            <input
                                                                type="text"
                                                                name="institution_name"
                                                                value={formDataPublique.institution_name}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, institution_name: e.target.value })}

                                                                className="w-full p-3 border rounded-lg"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Logo/emblème (PNG/JPG)</label>
                                                            <input
                                                                type="file"
                                                                name="logo_path"
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, logo_path: e.target.files[0] })}
                                                                accept=".png,.jpg,.jpeg"
                                                                className="w-full text-sm file:bg-blue-100 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-blue-800 hover:file:bg-blue-200"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Type d'institution <span className="text-red-500">*</span></label>
                                                            <select
                                                                name="institution_type"
                                                                value={formDataPublique.institution_type}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, institution_type: e.target.value })}

                                                                className="w-full p-3 border rounded-lg"
                                                            >
                                                                <option value="">Sélectionner...</option>
                                                                <option value="Ministère">Ministère</option>
                                                                <option value="Agence gouvernementale">Agence gouvernementale</option>
                                                                <option value="Collectivité territoriale">Collectivité territoriale</option>
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Pays <span className="text-red-500">*</span></label>
                                                            <select
                                                                name="country"
                                                                value={formDataPublique.country}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, country: e.target.value })}

                                                                className="w-full p-2 border rounded-md"
                                                            >
                                                                <option value="">Sélectionner un pays...</option>
                                                                {data.map((item) => (
                                                                    <option key={item.id} value={item.value}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Site web</label>
                                                            <input
                                                                type="url"
                                                                name="website"
                                                                value={formDataPublique.website}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, website: e.target.value })}
                                                                className="w-full p-3 border rounded-lg"
                                                            />
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Coordonnées</legend>

                                                    <div className="grid grid-cols-1 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Email institutionnel <span className="text-red-500">*</span></label>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={formDataPublique.email}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, email: e.target.value })}

                                                                className="w-full p-3 border rounded-lg"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Téléphone <span className="text-red-500">*</span></label>
                                                            <div className="flex">
                                                                <select
                                                                    name="phoneCode"
                                                                    value={formDataPublique.phone_code}
                                                                    onChange={(e) => setFormDataPublique({ ...formDataPublique, phone_code: e.target.value })}

                                                                    className="w-[5rem] p-2 border rounded-l-md border-gray-300 bg-white"
                                                                >
                                                                    <option value="">+Indicatif</option>
                                                                    {indicatif.map((item) => (
                                                                        <option key={item.id} value={item.dial_code}>{item.dial_code}</option>
                                                                    ))}
                                                                </select>
                                                                <input
                                                                    type="tel"
                                                                    name="phoneNumber"
                                                                    placeholder="Numéro"
                                                                    value={formDataPublique.phone_number}
                                                                    onChange={(e) => setFormDataPublique({ ...formDataPublique, phone_number: e.target.value })}

                                                                    className="w-2/3 p-2 border border-l-0 rounded-r-md border-gray-300"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2 md:col-span-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Adresse officielle</label>
                                                            <textarea
                                                                name="address"
                                                                value={formDataPublique.address}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, address: e.target.value })}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="2"
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Contact département jeunesse</label>
                                                            <div className='flex flex-col md:flex-row gap-4'>
                                                                <input
                                                                    type="text"
                                                                    name="youthContact.name"
                                                                    onChange={(e) => setFormDataPublique({
                                                                        ...formDataPublique,
                                                                        youthContact: { ...formDataPublique, youth_contact_name: e.target.value }
                                                                    })}
                                                                    placeholder="Nom complet"
                                                                    className="w-full p-3 border rounded-lg"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    name="youthContact.position"
                                                                    onChange={(e) => setFormDataPublique({
                                                                        ...formDataPublique,
                                                                        youthContact: { ...formDataPublique, youth_contact_position: e.target.value }
                                                                    })}
                                                                    placeholder="Fonction"
                                                                    className="w-full p-3 border rounded-lg"
                                                                />
                                                                <input
                                                                    type="email"
                                                                    name="youthContact.email"
                                                                    onChange={(e) => setFormDataPublique({
                                                                        ...formDataPublique,
                                                                        youthContact: { ...formDataPublique, youth_contact_email: e.target.value }
                                                                    })}
                                                                    placeholder="Email professionnel"
                                                                    className="w-full p-3 border rounded-lg"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Politique Jeunesse</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Cadre politique national</label>
                                                            <input
                                                                type="text"
                                                                name="policyFramework"
                                                                value={formDataPublique.policyFramework}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, policyFramework: e.target.value })}
                                                                className="w-full p-3 border rounded-lg"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Priorités stratégiques</label>
                                                            <textarea
                                                                name="strategicPriorities"
                                                                value={formDataPublique.strategicPriorities}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, strategicPriorities: e.target.value })}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="3"
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Budget annuel (€)</label>
                                                            <input
                                                                type="number"
                                                                name="annualBudget"
                                                                value={formDataPublique.annualBudget}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, annualBudget: e.target.value })}
                                                                min="0"
                                                                className="w-full p-3 border rounded-lg"
                                                            />
                                                        </div>

                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Programmes Nationaux</legend>

                                                    <div className="grid grid-cols-1 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Programme phare</label>
                                                            <input
                                                                type="text"
                                                                name="flagshipProgram"
                                                                value={formDataPublique.flagshipProgram}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, flagshipProgram: e.target.value })}
                                                                className="w-full p-3 border rounded-lg"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Public cible</label>
                                                            <textarea
                                                                name="targetAudience"
                                                                value={formDataPublique.targetAudience}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, targetAudience: e.target.value })}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="2"
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Dispositifs d'accompagnement</label>
                                                            <textarea
                                                                name="supportMechanisms"
                                                                value={formDataPublique.supportMechanisms}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, supportMechanisms: e.target.value })}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="3"
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Résultats attendus</label>
                                                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                                                {formDataPublique.expectedResults.map((result, index) => (
                                                                    <input
                                                                        key={index}
                                                                        type="text"
                                                                        name={`expectedResults[${index}]`}
                                                                        value={result}
                                                                        onChange={(e) => {
                                                                            const newResults = [...formDataPublique.expectedResults];
                                                                            newResults[index] = e.target.value;
                                                                            setFormDataPublique({ ...formDataPublique, expectedResults: newResults });
                                                                        }}
                                                                        placeholder={`Résultat ${index + 1}`}
                                                                        className="w-full p-3 border rounded-lg"
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Partenaires d'exécution</label>
                                                            <textarea
                                                                name="executionPartners"
                                                                value={formDataPublique.executionPartners}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, executionPartners: e.target.value })}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="3"
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Coordination et Gouvernance</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Mécanisme de coordination</label>
                                                            <input
                                                                type="text"
                                                                name="coordinationMechanism"
                                                                value={formDataPublique.coordinationMechanism}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, coordinationMechanism: e.target.value })}
                                                                className="w-full p-3 border rounded-lg"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Acteurs impliqués</label>
                                                            <textarea
                                                                name="involvedActors"
                                                                value={formDataPublique.involvedActors}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, involvedActors: e.target.value })}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="2"
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Approche de suivi-évaluation</label>
                                                            <textarea
                                                                name="monitoringApproach"
                                                                value={formDataPublique.monitoringApproach}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, monitoringApproach: e.target.value })}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="3"
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Besoins Spécifiques</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Assistance technique</label>
                                                            <textarea
                                                                name="technicalAssistance"
                                                                value={formDataPublique.technicalAssistance}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, technicalAssistance: e.target.value })}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="3"
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Bonnes pratiques recherchées</label>
                                                            <textarea
                                                                name="bestPractices"
                                                                value={formDataPublique.bestPractices}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, bestPractices: e.target.value })}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="3"
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2 md:col-span-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Opportunités de coopération</label>
                                                            <textarea
                                                                name="cooperationOpportunities"
                                                                value={formDataPublique.cooperationOpportunities}
                                                                onChange={(e) => setFormDataPublique({ ...formDataPublique, cooperationOpportunities: e.target.value })}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="4"
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <div className="text-center p-6">
                                                    <button
                                                        type="submit"
                                                        className="bg-blue-800 text-white px-12 py-4 rounded-xl hover:bg-blue-900 transition-all duration-300 transform hover:scale-105"
                                                    >
                                                        Soumettre le Formulaire
                                                    </button>
                                                </div>
                                            </form>
                                        </>
                                    )}
                                    {selectedForm === 'academiques' && (
                                        <>
                                            <form
                                                className="w-[75vw] bg-white rounded-lg shadow-md h-[78vh] overflow-y-auto"
                                                onSubmit={(e) => handleSubmit(e, 'academiques')}
                                            >
                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Informations Générales</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Nom de l'institution <span className="text-red-500">*</span></label>
                                                            <input
                                                                type="text"
                                                                name="nom"
                                                                value={formDataAcademique.nom}
                                                                onChange={handleAcademiqueChange}

                                                                className="w-full p-3 border rounded-lg"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Logo (PNG/JPG - max 5MB)</label>
                                                            <input
                                                                type="file"
                                                                name="logo"
                                                                accept=".png,.jpg,.jpeg"
                                                                onChange={handleFileChange}
                                                                className="w-full text-sm file:bg-blue-100 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-blue-800 hover:file:bg-blue-200"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Type d'institution <span className="text-red-500">*</span></label>
                                                            <select
                                                                name="type_institution"
                                                                value={formDataAcademique.type_institution}
                                                                onChange={handleAcademiqueChange}

                                                                className="w-full p-3 border rounded-lg"
                                                            >
                                                                <option value="">Sélectionner...</option>
                                                                <option value="Université">Université</option>
                                                                <option value="Centre de recherche">Centre de recherche</option>
                                                                <option value="Think tank">Think tank</option>
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Pays <span className="text-red-500">*</span></label>
                                                            <select
                                                                name="pays"
                                                                value={formDataAcademique.pays}
                                                                onChange={handleAcademiqueChange}

                                                                className="w-full p-2 border rounded-md"
                                                            >
                                                                <option value="">Sélectionner un pays...</option>
                                                                {data.map((item) => (
                                                                    <option key={item.id} value={item.value}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Site web</label>
                                                            <input
                                                                type="url"
                                                                name="site_web"
                                                                value={formDataAcademique.site_web}
                                                                onChange={handleAcademiqueChange}
                                                                className="w-full p-3 border rounded-lg"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Département concerné</label>
                                                            <input
                                                                type="text"
                                                                name="departement"
                                                                value={formDataAcademique.departement}
                                                                onChange={handleAcademiqueChange}
                                                                className="w-full p-3 border rounded-lg"
                                                            />
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Coordonnées</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Email institutionnel <span className="text-red-500">*</span></label>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={formDataAcademique.email}
                                                                onChange={handleAcademiqueChange}

                                                                className="w-full p-3 border rounded-lg"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Téléphone <span className="text-red-500">*</span></label>
                                                            <div className="flex">
                                                                <select
                                                                    name="telephone_code"
                                                                    value={formDataAcademique.telephone_code}
                                                                    onChange={handleAcademiqueChange}

                                                                    className="w-[5rem] p-2 border rounded-l-md border-gray-300 bg-white"
                                                                >
                                                                    <option value="">+Indicatif</option>
                                                                    {indicatif.map((item) => (
                                                                        <option key={item.id} value={item.dial_code}>{item.dial_code}</option>
                                                                    ))}
                                                                </select>
                                                                <input
                                                                    type="tel"
                                                                    name="telephone_number"
                                                                    placeholder="Numéro"
                                                                    value={formDataAcademique.telephone_number}
                                                                    onChange={handleAcademiqueChange}

                                                                    className="w-2/3 p-2 border border-l-0 rounded-r-md border-gray-300"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2 md:col-span-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Contact chercheur principal</label>
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                <input
                                                                    type="text"
                                                                    name="nom"
                                                                    placeholder="Nom"
                                                                    value={formDataAcademique.contact_chercheur.nom}
                                                                    onChange={handleContactChercheurChange}
                                                                    className="p-3 border rounded-lg"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    name="fonction"
                                                                    placeholder="Fonction"
                                                                    value={formDataAcademique.contact_chercheur.fonction}
                                                                    onChange={handleContactChercheurChange}
                                                                    className="p-3 border rounded-lg"
                                                                />
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    placeholder="Email"
                                                                    value={formDataAcademique.contact_chercheur.email}
                                                                    onChange={handleContactChercheurChange}
                                                                    className="p-3 border rounded-lg"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Recherche sur les NEET</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Axes de recherche</label>
                                                            <textarea
                                                                name="axes_recherche"
                                                                value={formDataAcademique.axes_recherche}
                                                                onChange={handleAcademiqueChange}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="4"
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Méthodologies utilisées</label>
                                                            <textarea
                                                                name="methodologies"
                                                                value={formDataAcademique.methodologies}
                                                                onChange={handleAcademiqueChange}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="4"
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Zones géographiques</label>
                                                            <select
                                                                multiple
                                                                name="zones_geographiques"
                                                                value={formDataAcademique.zones_geographiques}
                                                                onChange={(e) => {
                                                                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                                                                    setFormDataAcademique(prev => ({ ...prev, zones_geographiques: selected }));
                                                                }}
                                                                className="w-full p-2 border rounded-md"
                                                            >
                                                                {data.map((item) => (
                                                                    <option key={item.id} value={item.value}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Publications récentes</label>
                                                            <input
                                                                type="file"
                                                                multiple
                                                                name="publications"
                                                                onChange={handleMultiFileChange}
                                                                className="w-full text-sm file:bg-blue-100 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-blue-800 hover:file:bg-blue-200"
                                                            />
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Formation et enseignement</legend>

                                                    <div className="flex flex-col gap-5">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Programmes de formation</label>
                                                            <textarea
                                                                name="programmes_formation"
                                                                value={formDataAcademique.programmes_formation}
                                                                onChange={handleAcademiqueChange}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="4"
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Public cible</label>
                                                            <div className="grid grid-cols-3 gap-2">
                                                                {['Étudiants', 'Professionnels', 'OSC'].map((option) => (
                                                                    <label key={option} className="flex items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={formDataAcademique.public_cible.includes(option)}
                                                                            onChange={() => handleCheckboxChange('public_cible', option)}
                                                                            className="mr-2"
                                                                        />
                                                                        {option}
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Modalités</label>
                                                            <div className="grid grid-cols-3 gap-2">
                                                                {['Présentiel', 'En ligne', 'Hybride'].map((option) => (
                                                                    <label key={option} className="flex items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={formDataAcademique.modalites.includes(option)}
                                                                            onChange={() => handleCheckboxChange('modalites', option)}
                                                                            className="mr-2"
                                                                        />
                                                                        {option}
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Certifications</label>
                                                            <input
                                                                type="text"
                                                                name="certifications"
                                                                value={formDataAcademique.certifications}
                                                                onChange={handleAcademiqueChange}
                                                                className="w-full p-3 border rounded-lg"
                                                                placeholder="Types de certificats/diplômes"
                                                            />
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Collaboration et ressources</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Partenaires de recherche</label>
                                                            <textarea
                                                                name="partenaires_recherche"
                                                                value={formDataAcademique.partenaires_recherche}
                                                                onChange={handleAcademiqueChange}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="3"
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Ressources disponibles</label>
                                                            <select
                                                                multiple
                                                                name="ressources_disponibles"
                                                                value={formDataAcademique.ressources_disponibles}
                                                                onChange={(e) => {
                                                                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                                                                    setFormDataAcademique(prev => ({ ...prev, ressources_disponibles: selected }));
                                                                }}
                                                                className="w-full p-3 border rounded-lg h-32"
                                                            >
                                                                <option value="Bases de données">Bases de données</option>
                                                                <option value="Outils d'analyse">Outils d'analyse</option>
                                                                <option value="Méthodologies">Méthodologies</option>
                                                                <option value="Publications">Publications</option>
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Expertise proposée</label>
                                                            <textarea
                                                                name="expertise"
                                                                value={formDataAcademique.expertise}
                                                                onChange={handleAcademiqueChange}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="3"
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Opportunités de collaboration</label>
                                                            <textarea
                                                                name="opportunites_collaboration"
                                                                value={formDataAcademique.opportunites_collaboration}
                                                                onChange={handleAcademiqueChange}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="3"
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset className="bg-gray-100 p-6 rounded-lg">
                                                    <legend className="text-2xl font-bold text-blue-800 mb-6">Événements</legend>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Conférences organisées</label>
                                                            <textarea
                                                                name="conferences"
                                                                value={formDataAcademique.conferences}
                                                                onChange={handleAcademiqueChange}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="4"
                                                            ></textarea>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-semibold text-gray-700">Ateliers de formation</label>
                                                            <textarea
                                                                name="ateliers"
                                                                value={formDataAcademique.ateliers}
                                                                onChange={handleAcademiqueChange}
                                                                className="w-full p-3 border rounded-lg"
                                                                rows="4"
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <div className="text-center p-6">
                                                    <button
                                                        type="submit"
                                                        className="bg-blue-800 text-white px-12 py-4 rounded-xl hover:bg-blue-900 transition-all duration-300 transform hover:scale-105"
                                                    >
                                                        Soumettre le Formulaire
                                                    </button>
                                                </div>
                                            </form>
                                        </>
                                    )}

                                </div>


                            </div>
                        )}


                    </div>

                </div >

            )}
        </>
    );
};

export default Maps;
