import React, { useState } from "react";
import Icon from "./icons";
import { useNx } from "../hooks/useNx";
import { prepareCmsHtml } from "../utils/content";

// "Leer más": el texto completo (HTML del CMS) queda oculto hasta pedirlo. El botón lleva
// `aria-expanded`/`aria-controls`; su nombre accesible incluye el título del ítem.
const ReadMore = ({ id, title, content }) => {
  const { t } = useNx();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="nx-btn nx-btn--ghost nx-btn--sm nx-acc__toggle"
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${t("a11y.readMoreAbout")} ${title}`}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="plus" size={18} className="nx-ico-plus" />
        <Icon name="minus" size={18} className="nx-ico-minus" />
        <span>{t("button.readmore")}</span>
      </button>
      <div className="nx-acc__panel nx-acc__panel--flush" id={id} hidden={!open}>
        <div className="nx-prose" dangerouslySetInnerHTML={{ __html: prepareCmsHtml(content) }} />
      </div>
    </>
  );
};

export default ReadMore;
