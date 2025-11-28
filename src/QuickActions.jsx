import { useState } from 'react';
import Modal from './Modal';

function QuickActions({ onMarkAllCompleted, onResetAll, technologies }) {
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportData, setExportData] = useState('');

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies
    };
    const dataStr = JSON.stringify(data, null, 2);
    setExportData(dataStr);
    setShowExportModal(true);
  };

  return (
    <div className="quick-actions block">
      <h3>Быстрые действия</h3>
      <div className="action-buttons">
        <button className="btn btn-success" onClick={onMarkAllCompleted}>
          Отметить все как выполненные
        </button>
        <button className="btn btn-warning" onClick={onResetAll}>
          Сбросить все статусы
        </button>
        <button className="btn btn-info" onClick={handleExport}>
          Экспорт данных
        </button>
      </div>

      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспортированные данные"
      >
        <p>Скопируйте эти данные, чтобы сохранить прогресс.</p>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
          {exportData}
        </pre>
        <button onClick={() => setShowExportModal(false)}>
          Закрыть
        </button>
      </Modal>
    </div>
  );
}

export default QuickActions;
