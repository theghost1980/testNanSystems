import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Traducción y idioma "estables" para el primer render.
//
// El HTML estático se genera siempre en español y React 17 corrige el texto al
// hidratar pero NO los atributos (aria-label, title, alt, href, class…). Si el
// primer render del navegador ya usara otro idioma, esos atributos quedarían en
// español hasta recargar (ver A7 en docs/dev-log.md). Por eso hasta montar se
// usa español y después el idioma real.
export const useNx = () => {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return {
    t: mounted ? t : i18n.getFixedT("es"),
    lang: mounted && i18n.language === "en" ? "en" : "es",
    i18n,
    mounted,
  };
};

export default useNx;
