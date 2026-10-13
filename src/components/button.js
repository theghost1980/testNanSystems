import React from "react";
import { Link } from "gatsby";
import { useDialog } from "../hooks/useDialog";

// Botón del sitio. Mantiene la API anterior (value, type, action, pathname,
// data, extraclass) y la traduce a las clases del rediseño:
//   type "btnFilled"  → primario;  cualquier otro → fantasma
//   action "quote"    → abre el diálogo de cotización con data.title
//   cualquier otra    → enlace interno a `pathname` (con `data` como state)
const Button = ({ value, type, pathname, data, action, extraclass }) => {
  const { open } = useDialog();
  const variant = type === "btnFilled" ? "primary" : "ghost";
  const className = `nx-btn nx-btn--${variant}${extraclass ? ` ${extraclass}` : ""}`;

  if (action === "quote") {
    return (
      <button
        type="button"
        className={className}
        onClick={() => open("nx-quote", (data && data.title) || null)}
      >
        {value}
      </button>
    );
  }

  return (
    <Link to={pathname || "/"} state={data || undefined} className={className}>
      {value}
    </Link>
  );
};

export default Button;
