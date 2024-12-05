import React from 'react';
import { TransText } from '../../components';

export const SponsorsForm = () => {
    return (
        <>
            <div className="w-full flex justify-center ">
                <div className="pb-36 pt-3 flex flex-col items-center w-[80%]">
                    <h1 className='text-[37px] '>Youth Empowerment Summit Y.E.S. Africa</h1>
                    <div className="flex flex-col gap-3 text-muted-foreground w-[60%] py-6 text-center ">
                        <TransText  
                        fr="Jadara Foundation et l'Union Panafricaine de la Jeunesse co-organisent en partenariat avec CGLU, LionsGeek et Epic Africa le 1er sommet dédié aux jeunes en situation de NEET en Afrique. Cette première édition se tiendra au Maroc, la prochaine dans un pays de l’Afrique australe."
                        ar='مؤسسة جدارة والاتحاد الإفريقي للشباب ينظمان بالشراكة مع CGLU، LionsGeek و Epic Africa القمة الأولى المخصصة للشباب في وضعية NEET في إفريقيا. ستقام هذه النسخة الأولى في المغرب، والنسخة القادمة في إحدى دول جنوب إفريقيا.'
                        en='Jadara Foundation and the Pan-African Youth Union are co-organizing, in partnership with CGLU, LionsGeek, and Epic Africa, the first summit dedicated to NEET youth in Africa. This first edition will be held in Morocco, with the next in a southern African country.'
                        pr='A Fundação Jadara e a União Pan-Africana da Juventude estão a coorganizar, em parceria com a CGLU, LionsGeek e Epic Africa, a primeira cimeira dedicada aos jovens em situação de NEET em África. Esta primeira edição será realizada em Marrocos, com a próxima num país da África Austral.'
                        sw='Shirika la Jadara na Umoja wa Vijana wa Pan-Afrika wanashirikiana, kwa ushirikiano na CGLU, LionsGeek, na Epic Africa, kuandaa mkutano wa kwanza wa kilele unaowalenga vijana walio katika hali ya NEET barani Afrika. Toleo hili la kwanza litafanyika Morocco, na lile linalofuata katika nchi ya Kusini mwa Afrika.'
                        />
                        <p>
                            Veuillez remplir ce formulaire pour soumettre vos informations personnelles,
                            un mail de confirmation vous sera adressé une fois votre demande approuvée.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-[17px] font-bold ">
                        <p>Y.E.S. Africa</p>
                        <p>12 & 13 février 2025 - Marrakech</p>
                    </div>
                    <form
                        className='w-[70%] py-6 '
                        action=""
                    >
                        <div className="flex flex-col gap-3">
                            <label className='text-[18px] ' htmlFor="">Civility<span className='text-red-700 '>*</span></label>
                            <div className="flex gap-3">
                                <div className="flex items-center gap-2">
                                    <label htmlFor="mr">Mr</label>
                                    <input type="radio" name="Civility" id="mr" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label htmlFor="mme">Mme</label>
                                    <input type="radio" name="Civility" id="mme" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
};

