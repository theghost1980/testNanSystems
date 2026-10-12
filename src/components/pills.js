import React from "react";

// Pastillas de categorías (el campo `categories` del CMS es un texto separado por comas:
// pasarlo antes por `parseCategories`). Sin elementos, no pinta nada.
const Pills = ({ items }) =>
  items.length ? (
    <ul className="nx-pills">
      {items.map((c, i) => (
        <li key={`${c}-${i}`} className="nx-pill">
          {c}
        </li>
      ))}
    </ul>
  ) : null;

export default Pills;
