import useTechnologies from '../../useTechnologies.js';
import StudyPlanForm from './StudyPlanForm.jsx';
import BulkStatusEditor from './BulkStatusEditor.jsx';
import DataImportExport from './DataImportExport.jsx';
import './Practice25.css';

function Practice25App() {
  const { technologies, updateStatus, setTechnologies } = useTechnologies();

  return (
    <div className="practice25">
      <h1>Практика 25</h1>

      <section>
        <h2>Форма планирования изучения</h2>
        <StudyPlanForm />
      </section>

      <section>
        <h2>Массовое изменение статусов</h2>
        <BulkStatusEditor
          technologies={technologies}
          onBulkUpdate={updateStatus}
        />
      </section>

      <section>
        <h2>Экспорт и импорт данных</h2>
        <DataImportExport
          technologies={technologies}
          onImport={setTechnologies}
        />
      </section>
    </div>
  );
}

export default Practice25App;
