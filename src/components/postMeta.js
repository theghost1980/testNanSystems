import React from "react";
import { useNx } from "../hooks/useNx";
import { formatDate } from "../utils/content";

// "12 de marzo de 2026 · 6 min de lectura" (fecha absoluta por idioma).
const PostMeta = ({ date, minutes }) => {
  const { t, lang } = useNx();
  return (
    <span className="nx-mono">
      <time dateTime={String(date).slice(0, 10)}>{formatDate(date, lang)}</time>
      {minutes > 0 && ` · ${minutes} ${t("blog.readTime")}`}
    </span>
  );
};

export default PostMeta;
