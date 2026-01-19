import React, { useState, useEffect } from "react";
import iconSystemsES from "../media-imgs/es.png";
import iconSystemsEN from "../media-imgs/en.png";

import { useTranslation } from "react-i18next";

const Selector = (props) => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const _classMobile = props.classMobile || "";

  useEffect(() => {
    i18n.changeLanguage(selectedLang);
  }, [selectedLang, i18n]);

  return (
    <div
      className={`selectorCont ${_classMobile}`}
      onClick={() => setSelectedLang(selectedLang === "es" ? "en" : "es")}
    >
      <img
        src={selectedLang === "en" ? iconSystemsEN : iconSystemsES}
        alt="click to slide"
        className={`iconSelector ${
          selectedLang === "en" ? "selectorRight" : "selectorLeft"
        }`}
        title={
          selectedLang === "en" ? "Change the language" : "Cambia el Idioma"
        }
      />
    </div>
  );
};

export default Selector;
