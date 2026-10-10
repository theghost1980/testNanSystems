import React, { useState, useEffect } from "react";
import iconSystemsES from "../media-imgs/es.png";
import iconSystemsEN from "../media-imgs/en.png";

import { useTranslation } from "react-i18next";

const Selector = (props) => {
  const { i18n } = useTranslation();
  const _classMobile = props.classMobile || "";
  // El HTML estático se genera en español y la hidratación de React corrige el
  // texto pero no atributos (class, src, title): el primer render debe coincidir
  // con ese HTML y el idioma real se aplica justo después de montar.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const lang = mounted && i18n.language === "en" ? "en" : "es";

  return (
    <div
      className={`selectorCont ${_classMobile}`}
      onClick={() => i18n.changeLanguage(lang === "es" ? "en" : "es")}
    >
      <img
        src={lang === "en" ? iconSystemsEN : iconSystemsES}
        alt="click to slide"
        className={`iconSelector ${
          lang === "en" ? "selectorRight" : "selectorLeft"
        }`}
        title={lang === "en" ? "Change the language" : "Cambia el Idioma"}
      />
    </div>
  );
};

export default Selector;
