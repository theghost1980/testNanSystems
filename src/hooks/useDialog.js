import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// Estado global de los diálogos del sitio (cotización, boletín…). Solo hay uno
// abierto a la vez; abrir otro mientras hay uno abierto lo sustituye y el foco
// vuelve al botón que abrió el primero.
const DialogContext = createContext({
  id: null,
  detail: null,
  open: () => {},
  close: () => {},
});

export const DialogProvider = ({ children }) => {
  const [state, setState] = useState({ id: null, detail: null });
  const openRef = useRef(false);
  const openerRef = useRef(null);

  const open = useCallback((id, detail = null) => {
    if (!openRef.current) openerRef.current = document.activeElement;
    openRef.current = true;
    setState({ id, detail });
  }, []);

  const close = useCallback(() => {
    openRef.current = false;
    setState({ id: null, detail: null });
  }, []);

  // El resto de la página (marcado con data-nx-page) queda inerte mientras haya
  // un diálogo abierto, para que ni el teclado ni los lectores de pantalla salgan.
  useEffect(() => {
    if (!state.id) return undefined;
    const parts = document.querySelectorAll("[data-nx-page]");
    parts.forEach((p) => p.setAttribute("inert", ""));
    return () => parts.forEach((p) => p.removeAttribute("inert"));
  }, [state.id]);

  // Al cerrar, el foco vuelve al elemento que lo abrió.
  useEffect(() => {
    if (state.id || !openerRef.current) return;
    const opener = openerRef.current;
    openerRef.current = null;
    if (opener && typeof opener.focus === "function") opener.focus();
  }, [state.id]);

  return (
    <DialogContext.Provider value={{ ...state, open, close }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);

export default useDialog;
