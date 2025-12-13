function TechnologyNotes({ notes, onNotesChange, techId }) {
  const handleAddNote = () => {
    const value = prompt('Введите текст заметки:');
    if (!value) return;

    const next = notes ? notes + '\n' + value : value;
    onNotesChange(techId, next);
  };

  return (
    <div className="notes-section">
      <h4>Мои заметки:</h4>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        placeholder="Записывайте сюда важные моменты..."
        rows={3}
      />
      <div className="notes-footer">
        <span>
          Заметка сохранена ({notes?.length || 0} символов)
        </span>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleAddNote}
        >
          Добавить заметку
        </button>
      </div>
    </div>
  );
}

export default TechnologyNotes;
