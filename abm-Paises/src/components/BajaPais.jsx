export default function BajaPais({ pais, onAceptar, onCancelar }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Baja de País</h4>
        <div className="modal-body">
          <p>¿Está seguro que desea dar de baja el país {pais?.nombre}?</p>
        </div>
        <div className="modal-footer">
          <button className="btn-modal" onClick={onAceptar}>
            Aceptar
          </button>
          <button className="btn-modal" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}