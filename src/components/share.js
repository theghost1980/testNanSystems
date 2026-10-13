import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Icon from "./icons";
import { useNx } from "../hooks/useNx";
import { parseCategories } from "../utils/content";
import { SHARE_VIA_HANDLE } from "../config/site";

// Compartir con enlaces normales a cada red (sin SDK ni ventanas emergentes): se abren en
// pestaña nueva con `noopener`. La URL sale de `siteUrl` + la ruta de la página, así el
// HTML estático y el del navegador llevan exactamente los mismos enlaces.
const hashtags = (categories) =>
  parseCategories(categories)
    .map((c) => c.replace(/[^A-Za-z0-9_áéíóúñÁÉÍÓÚÑ]/g, ""))
    .filter(Boolean)
    .join(",");

const NETWORKS = [
  {
    icon: "facebook",
    name: "Facebook",
    href: ({ url }) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  },
  {
    icon: "linkedin",
    name: "LinkedIn",
    href: ({ url }) => `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  },
  {
    icon: "x",
    name: "X",
    href: ({ url, text, tags }) =>
      `https://twitter.com/intent/tweet?url=${url}&text=${text}&via=${SHARE_VIA_HANDLE}` +
      (tags ? `&hashtags=${encodeURIComponent(tags)}` : ""),
  },
  {
    icon: "whatsapp",
    name: "WhatsApp",
    href: ({ url, text }) => `https://wa.me/?text=${text}%20${url}`,
  },
];

const Share = ({ path, title, categories, labelKey = "blog.share" }) => {
  const { t } = useNx();
  const {
    site: {
      siteMetadata: { siteUrl },
    },
  } = useStaticQuery(graphql`
    query ShareSiteUrl {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  const parts = {
    url: encodeURIComponent(`${siteUrl}${path}`),
    text: encodeURIComponent(title || ""),
    tags: hashtags(categories),
  };

  return (
    <div className="nx-share" role="group" aria-label={t(labelKey)}>
      <span className="nx-mono">{t(labelKey)}</span>
      {NETWORKS.map((n) => (
        <a
          key={n.name}
          className="nx-share__btn"
          href={n.href(parts)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("a11y.shareOn")} ${n.name} ${t("a11y.externalLink")}`}
        >
          <Icon name={n.icon} />
        </a>
      ))}
    </div>
  );
};

export default Share;
