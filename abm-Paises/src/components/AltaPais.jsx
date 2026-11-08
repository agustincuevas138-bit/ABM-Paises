export default function AltaPais({ inputValue, setInputValue, onAceptar, onCancelar }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Alta País</h4>
        <div className="modal-body">
          <div className="input-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
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