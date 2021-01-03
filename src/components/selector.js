import React, { useState, useEffect } from 'react';
//media-imgs
import iconSystemsES from '../media-imgs/es.png';
import iconSystemsEN from '../media-imgs/en.png';

//translations
import { useTranslation } from "react-i18next";

const Selector = (props) => {
    const { i18n } = useTranslation();
    // console.log('Lang received from i18n:',i18n.language);
    const [selectedLang, setSelectedLang] = useState(i18n.language);
    const _classMobile = props.classMobile || '';

    // useEffect(() => {
    //     ///////////
    //     console.log('Setting Initial Language -- only once');
    //     i18n.language = 'es';
    //     i18n.changeLanguage(selectedLang); 
    //     ///////////
    // },[]);

    useEffect(()=> {
        ///////////////////////////
        i18n.changeLanguage(selectedLang);
        // console.log('changing Lang from Selector');  
        //////////////////////////
    },[selectedLang,i18n]);

    // console.log('SelectedLang', selectedLang);
    return (
        <div className={`selectorCont ${_classMobile}`} 
            onClick={() => setSelectedLang((selectedLang === 'es') ? 'en': 'es')}
        >
            <img src={(selectedLang === 'en') ? iconSystemsEN : iconSystemsES} alt="click to slide" 
                className={`iconSelector ${(selectedLang === 'en') ? 'selectorRight' : 'selectorLeft'}`} 
                title={(selectedLang === 'en') ? 'Change the language' : 'Cambia el Idioma'}/>
        </div>
    )
}

export default Selector;