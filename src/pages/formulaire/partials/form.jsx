import { useState } from "react";
import { useAppContext } from "../../../context/AppContext";

const Form = () => {
    const { url } = useAppContext();

    const [selectedFunding, setSelectedFunding] = useState('');
    const [otherFunding, setOtherFunding] = useState('');
    const [selectedPartner, setSelectedPartner] = useState('');
    const [otherPartner, setOtherPartner] = useState('');

    const [selectedFinancing, setSelectedFinancing] = useState('');
    const [otherFin, setOtherFin] = useState('')
    const [selectedTheme, setSelectedTheme] = useState('');
    const [otherTheme, setOtherTheme] = useState('');
    const handleSelectChange = (event, setter) => {
        setter(event.target.value);
    };


    const [legal, setLegal] = useState();
    const [internal, setInternal] = useState();
    const handleFileChange = (e, setter) => {
        setter(e.target.files[0]);
    }

    const tabs = ['General Information', 'Project Information', 'Previous Projects'];
    const [currentTab, setCurrentTab] = useState('General Information');

    const [formData, setFormData] = useState({
        name_organization: '',
        name_representative: '',
        position_representative: '',
        phone_representative: '',
        email_representative: '',
        linkedin_representative: '',
        name_tenderer: '',
        position_tenderer: '',
        phone_tenderer: '',
        email_tenderer: '',
        linkedin_tenderer: '',
        years_existence: '',
        country_registration: '',
        presentation: '',
        num_employees: '',
        num_volunteers: '',
        beneficiaries: '',
        country_intervention: '',
        area_intervention: '',
        project_description: '',
        funding_requirements: '',
        approached_funders: '',
        neet_project_example: '',
        project_reach: '',
        project_impact: '',
        project_duration: '',
        project_area: '',
        project_evaluation: '',
        other_projects: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const isFormComplete = Object.values(formData).every(value => value.trim() !== '') && selectedFunding && selectedPartner && selectedFinancing && selectedTheme && legal && internal;


    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const allData = {
            ...formData,
            sources_funding: selectedFunding == "other" ? otherFunding : selectedFunding,
            partners: selectedPartner == "other" ? otherPartner : selectedPartner,
            project_financing: selectedFinancing == "other" ? otherFin : selectedFinancing,
            themes_intervention: selectedTheme == "other" ? otherTheme : selectedTheme,
            legal_statutes: legal,
            internal_regulations: internal,
        }

        const newForm = new FormData();
        Object.keys(allData).forEach(key => {
            newForm.append(key, allData[key]);
        });


        const response = await fetch(url + '/api/formulaire', {
            method: 'POST',
            body: newForm,
        });

        const result = await response.json();
        if (result.message == "success") {
            window.location.reload();
            // TODO* Show the user that his form was received
            // TODO* (optional) do an else if there's an error
        }
    }

    return (
        <section className="p-4">
            <form
                onSubmit={handleSubmitForm}
                className="flex flex-col gap-3">
                <div className="w-full bg-gray-200 flex items-center gap-2">
                    {
                        tabs.map((tab, index) => (
                            <button type="button"
                                key={index} className={`${tab == currentTab ? 'bg-black text-white' : 'text-black'}  px-4 py-2 w-full rounded`}
                                onClick={() => { setCurrentTab(tab) }}
                            >
                                {tab}
                            </button>
                        ))
                    }
                </div>
                {
                    currentTab == "General Information" && <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="name_organization">Name of Organization: </label>
                            <input value={formData.name_organization} onChange={handleInputChange}
                                className="border rounded p-2" type="text" name="name_organization" id="name_organization" placeholder="Name of Organization" required />
                        </div>

                        <h2 className="text-xl font-bold">Reprensetative: </h2>
                        <div className="flex items-center gap-2 justify-around">

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="name_representative">Full Name of Legal Representative: </label>
                                <input
                                    value={formData.name_representative} onChange={handleInputChange}
                                    className="border rounded p-2" type="text" name="name_representative" id="name_representative" placeholder="Full name of Representative" required />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="position_representative">Position of Legal Representative: </label>
                                <input
                                    value={formData.position_representative} onChange={handleInputChange}
                                    className="border rounded p-2" type="text" name="position_representative" id="position_representative" placeholder="Position of Legal Representative" required />
                            </div>
                        </div>


                        <div className="flex items-start gap-2 justify-around">

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="phone_representative">Telephone Number of Legal Representative: </label>
                                <input
                                    value={formData.phone_representative} onChange={handleInputChange}
                                    className="border rounded p-2" type="tel" name="phone_representative" id="phone_representative" placeholder="Telephone Number" required />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="email_representative">Email Address of Legal Representative: </label>
                                <input
                                    value={formData.email_representative} onChange={handleInputChange}
                                    className="border rounded p-2" type="email" name="email_representative" id="email_representative" placeholder="Email Address" required />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="linkedin_representative">LinkedIn Profile of Legal Representative: </label>
                                <input
                                    value={formData.linkedin_representative} onChange={handleInputChange}
                                    className="border rounded p-2" type="url" name="linkedin_representative" id="linkedin_representative" placeholder="LinkedIn Profile URL" />
                            </div>
                        </div>



                        <h2 className="text-xl font-bold">Tenderer: </h2>

                        <div className="flex items-center gap-2 justify-around">
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="name_tenderer">Last Name and First Name of Tenderer (if other than legal representative): </label>
                                <input
                                    value={formData.name_tenderer} onChange={handleInputChange}
                                    className="border rounded p-2" type="text" name="name_tenderer" id="name_tenderer" placeholder="Name of Tenderer" />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="position_tenderer">Tenderer's Position: </label>
                                <input
                                    value={formData.position_tenderer} onChange={handleInputChange}
                                    className="border rounded p-2" type="text" name="position_tenderer" id="position_tenderer" placeholder="Tenderer's Position" />
                            </div>
                        </div>


                        <div className="flex items-center gap-2 justify-around">
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="phone_tenderer">Tenderer's Telephone Number: </label>
                                <input
                                    value={formData.phone_tenderer} onChange={handleInputChange}
                                    className="border rounded p-2" type="tel" name="phone_tenderer" id="phone_tenderer" placeholder="Tenderer's Telephone Number" />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="email_tenderer">Tenderer's Email Address: </label>
                                <input
                                    value={formData.email_tenderer} onChange={handleInputChange}
                                    className="border rounded p-2" type="email" name="email_tenderer" id="email_tenderer" placeholder="Tenderer's Email Address" />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="linkedin_tenderer">LinkedIn Profile of Tenderer: </label>
                                <input
                                    value={formData.linkedin_tenderer} onChange={handleInputChange}
                                    className="border rounded p-2" type="url" name="linkedin_tenderer" id="linkedin_tenderer" placeholder="LinkedIn Profile URL" />
                            </div>
                        </div>


                        <h2 className="text-xl font-bold mt-2">Other Information: </h2>
                        <div className="flex items-center gap-2 justify-around">
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="years_existence">Years of Existence: </label>
                                <input
                                    value={formData.years_existence} onChange={handleInputChange}
                                    className="border rounded p-2" type="number" name="years_existence" id="years_existence" placeholder="Years of Existence" required />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="country_registration">Country of Legal Registration of Association: </label>
                                <input
                                    value={formData.country_registration} onChange={handleInputChange}
                                    className="border rounded p-2" type="text" name="country_registration" id="country_registration" placeholder="Country" required />
                            </div>
                        </div>


                        <div className="flex items-center gap-2 justify-around">
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="legal_statutes">Legal Statutes: </label>
                                <input
                                    onChange={(e) => { handleFileChange(e, setLegal) }}
                                    className="border rounded p-2" type="file" name="legal_statutes" id="legal_statutes" placeholder="Legal Statutes" />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="internal_regulations">Internal Regulations: </label>
                                <input
                                    onChange={(e) => { handleFileChange(e, setInternal) }}
                                    className="border rounded p-2" type="file" name="internal_regulations" id="internal_regulations" placeholder="Internal Regulations" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="presentation">Presentation of the Association and its Activities: </label>
                            <textarea
                                onChange={handleInputChange}
                                className="border rounded p-2" name="presentation" id="presentation" placeholder="Include organization chart" required>{formData.presentation}</textarea>
                        </div>


                        <div className="flex items-center gap-2 justify-around">


                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="num_employees">Number of Employees: </label>
                                <input
                                    value={formData.num_employees} onChange={handleInputChange}
                                    className="border rounded p-2" type="number" name="num_employees" id="num_employees" placeholder="Number of Employees" required />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="num_volunteers">Number of Volunteers: </label>
                                <input
                                    value={formData.num_volunteers} onChange={handleInputChange}
                                    className="border rounded p-2" type="number" name="num_volunteers" id="num_volunteers" placeholder="Number of Volunteers" required />
                            </div>
                        </div>

                        {/* <div className="flex items-center gap-2 justify-around">

                        </div>
 */}


                        <div className="flex items-center gap-2 justify-around">
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="beneficiaries">Beneficiaries of Your Programs: </label>
                                <input
                                    value={formData.beneficiaries} onChange={handleInputChange}
                                    className="border rounded p-2" name="beneficiaries" id="beneficiaries" placeholder="Description of beneficiaries" required />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="country_intervention">Country of Intervention: </label>
                                <input
                                    value={formData.country_intervention} onChange={handleInputChange}
                                    className="border rounded p-2" type="text" name="country_intervention" id="country_intervention" placeholder="Country of Intervention" required />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="area_intervention">Area of Intervention: </label>
                                <input
                                    value={formData.area_intervention} onChange={handleInputChange}
                                    className="border rounded p-2" type="text" name="area_intervention" id="area_intervention" placeholder="Area of Intervention" required />
                            </div>
                        </div>




                        <div className="flex flex-col gap-1">
                            <label htmlFor="sources_funding">Sources of Funding: </label>

                            <select
                                id="sources_funding"
                                className="border rounded p-2"
                                value={selectedFunding}
                                onChange={(e) => { handleSelectChange(e, setSelectedFunding) }}
                                required
                            >
                                <option value="">Select an option</option>
                                <option value="international-donors">International donors</option>
                                <option value="domestic-funders">Domestic funders</option>
                                <option value="private-foundations">Private Foundations</option>
                                <option value="public-funds">Public funds</option>
                                <option value="equity">Equity</option>
                                <option value="crowdfunding">Crowdfunding</option>
                                <option value="other">Other (to be specified)</option>
                            </select>
                            {selectedFunding === 'other' && (
                                <input
                                    type="text"
                                    placeholder="Please specify"
                                    className="border rounded p-2"
                                    onChange={(e) => setOtherFunding(e.target.value)}
                                />
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="themes_intervention">Themes of Intervention: </label>

                            <select
                                id="themes_intervention"
                                className="border rounded p-2"
                                value={selectedTheme}
                                onChange={(e) => { handleSelectChange(e, setSelectedTheme) }}
                            >
                                <option value="">Select an option</option>
                                <option value="accessibility-to-education">Accessibility to Education</option>
                                <option value="vocational-training">Vocational Training and Skills</option>
                                <option value="alternative-jobs">Alternative Jobs and Micro-entrepreneurship</option>
                                <option value="mentoring-support">Mentoring and Support Initiatives</option>
                                <option value="social-inclusion">Social Inclusion and Equity</option>
                                <option value="digital-technologies">Use of Digital Technologies</option>
                                <option value="public-private-partnerships">Public-Private Partnerships</option>
                                <option value="gender-dynamics">Gender Dynamics and NEETs</option>
                                <option value="community-mobilization">Community Mobilization</option>
                                <option value="migration-of-neet">Migration of NEET</option>
                                <option value="other">Other</option>
                            </select>
                            {selectedTheme === 'other' && (
                                <input
                                    type="text"
                                    placeholder="Please specify"
                                    className="border rounded p-2"
                                    onChange={(e) => setOtherTheme(e.target.value)}
                                />
                            )}

                        </div>
                    </div>
                }


                {
                    currentTab == "Project Information" && <div className="flex flex-col gap-2">


                        <div className="flex flex-col gap-1">
                            <label htmlFor="project_description">Project Description (include target, activities, and impact):</label>
                            <textarea
                                onChange={handleInputChange}
                                className="border rounded p-2" name="project_description" id="project_description" placeholder="Describe the project..." required>{formData.project_description}</textarea>
                        </div>

                        {/* TODO: difference between themes of intervention and intervention themes */}
                        {/* <div className="flex flex-col gap-1">
                            <label htmlFor="intervention_themes">Intervention Themes:</label>
                            <input className="border rounded p-2" type="text" name="intervention_themes" id="intervention_themes" placeholder="List intervention themes..." required />
                        </div> */}

                        <div className="flex flex-col gap-1">
                            <label htmlFor="funding_requirements">Funding Requirements (budget):</label>
                            <input
                                value={formData.funding_requirements} onChange={handleInputChange}
                                className="border rounded p-2" type="text" name="funding_requirements" id="funding_requirements" placeholder="Specify funding requirements..." required />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="approached_funders">Have you already approached funders for this project? If so, can you name them?</label>
                            <input
                                value={formData.approached_funders} onChange={handleInputChange}
                                className="border rounded p-2" type="text" name="approached_funders" id="approached_funders" placeholder="List funders..." />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="partners">Do you have partners for this project? If yes, can you name them? (for each partner, include their involvement)</label>
                            <select
                                id="partners"
                                value={selectedPartner}
                                onChange={(e) => { handleSelectChange(e, setSelectedPartner) }}
                                className="border rounded p-2"
                            >
                                <option value="">Select an option</option>
                                <option value="public-institutions">Public institutions</option>
                                <option value="private-institutions">Private Institutions</option>
                                <option value="international-cooperation">International cooperation</option>
                                <option value="other-associations">Other associations</option>
                                <option value="other">Other</option>
                                <option value="no-partners">No partners</option>
                            </select>
                            {selectedPartner === 'other' && (
                                <input
                                    type="text"
                                    placeholder="Please specify"
                                    className="border rounded p-2"
                                    onChange={(e) => setOtherPartner(e.target.value)}
                                />
                            )}
                        </div>
                    </div>
                }

                {
                    currentTab == "Previous Projects" && <div className="flex flex-col gap-2">


                        <div className="flex flex-col gap-1">
                            <label htmlFor="neet_project_example">Describe an example of a N.E.E.T. youth project you've carried out:</label>
                            <textarea
                                onChange={handleInputChange}
                                className="border rounded p-2" name="neet_project_example" id="neet_project_example" placeholder="Project description...">
                                {formData.neet_project_example}
                            </textarea>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="project_reach">How many people did this project reach?</label>
                            <input
                                value={formData.project_reach} onChange={handleInputChange}
                                className="border rounded p-2" type="number" name="project_reach" id="project_reach" placeholder="Number of people reached..." />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="project_impact">What was the direct impact on the beneficiaries of this project?</label>
                            <textarea
                                onChange={handleInputChange}
                                className="border rounded p-2" name="project_impact" id="project_impact" placeholder="Describe the impact...">
                                {formData.project_impact}
                            </textarea>
                        </div>

                        <div className="flex items-center gap-2 justify-around">
                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="project_duration">How long did the project last?</label>
                                <input
                                    value={formData.project_duration} onChange={handleInputChange}
                                    className="border rounded p-2" type="text" name="project_duration" id="project_duration" placeholder="Project duration..." />
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <label htmlFor="project_area">What was the project's area of intervention?</label>
                                <input
                                    value={formData.project_area} onChange={handleInputChange}
                                    className="border rounded p-2" type="text" name="project_area" id="project_area" placeholder="Area of intervention..." />
                            </div>
                        </div>


                        <div className="flex flex-col gap-1">
                            <label htmlFor="project_financing">How did you finance this project?</label>

                            <select
                                id="project_financing"
                                value={selectedFinancing}
                                onChange={(e) => { handleSelectChange(e, setSelectedFinancing) }}
                                className="border rounded p-2"
                            >
                                <option value="">Select an option</option>
                                <option value="international-donors">International donors</option>
                                <option value="domestic-funders">Domestic funders</option>
                                <option value="private-foundations">Private Foundations</option>
                                <option value="public-funds">Public funds</option>
                                <option value="equity">Equity</option>
                                <option value="crowdfunding">Crowdfunding</option>
                                <option value="other">Other (to be specified)</option>
                            </select>
                            {selectedFinancing === 'other' && (
                                <input
                                    type="text"
                                    placeholder="Please specify"
                                    className="border rounded p-2"
                                    onChange={(e) => setOtherFin(e.target.value)}
                                />
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="project_evaluation">Project evaluation report (if applicable):</label>
                            <textarea
                                onChange={handleInputChange}
                                className="border rounded p-2" name="project_evaluation" id="project_evaluation" placeholder="Evaluation report...">
                                {formData.project_evaluation}
                            </textarea>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="other_projects">Would you like to share other projects targeting young people?</label>
                            <textarea
                                onChange={handleInputChange}
                                className="border rounded p-2" name="other_projects" id="other_projects" placeholder="Describe other projects...">{formData.other_projects}</textarea>
                        </div>
                    </div>
                }

                <button disabled={!isFormComplete} className={`w-full py-3 rounded transition-all ${isFormComplete ? 'bg-black text-white ' : 'bg-gray-300 text-black/60'}`} type="submit">
                    Submit
                </button>
            </form>

        </section>
    )
}

export default Form;