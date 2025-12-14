import { useEffect, useState } from 'react';

const initialData = {
  title: '',
  description: '',
  category: 'frontend',
  difficulty: 'beginner',
  deadline: '',
  resources: [''],
};

function isValidUrl(string) {
  try {
    // eslint-disable-next-line no-new
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

function StudyPlanForm() {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    const title = formData.title.trim();
    const description = formData.description.trim();

    if (!title) {
      newErrors.title = 'Название обязательно.';
    } else if (title.length < 2) {
      newErrors.title = 'Минимум 2 символа.';
    } else if (title.length > 50) {
      newErrors.title = 'Максимум 50 символов.';
    }

    if (!description) {
      newErrors.description = 'Описание обязательно.';
    } else if (description.length < 10) {
      newErrors.description = 'Минимум 10 символов.';
    }

    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today) {
        newErrors.deadline = 'Дедлайн не может быть в прошлом.';
      }
    }

    formData.resources.forEach((resource, index) => {
      const trimmed = resource.trim();
      if (trimmed && !isValidUrl(trimmed)) {
        newErrors[`resource${index}`] = 'Введите корректный URL.';
      }
    });

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResourceChange = (index, value) => {
    const newResources = [...formData.resources];
    newResources[index] = value;
    setFormData((prev) => ({
      ...prev,
      resources: newResources,
    }));
  };

  const addResourceField = () => {
    setFormData((prev) => ({
      ...prev,
      resources: [...prev.resources, ''],
    }));
  };

  const removeResourceField = (index) => {
    if (formData.resources.length === 1) return;
    const newResources = formData.resources.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      resources: newResources,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const cleanedData = {
      ...formData,
      resources: formData.resources.filter((r) => r.trim()),
    };

    console.log('План изучения:', cleanedData);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);

    setFormData(initialData);
  };

  return (
    <div className="study-plan-form">
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {submitSuccess && 'План успешно сохранён.'}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="title" className="required">
            Название технологии
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="React, Node.js, TypeScript"
            aria-required="true"
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && (
            <span
              id="title-error"
              className="error-message"
              role="alert"
            >
              {errors.title}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="required">
            Описание целей изучения
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Кратко опиши, зачем и что хочешь изучить."
            aria-required="true"
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : undefined}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && (
            <span
              id="description-error"
              className="error-message"
              role="alert"
            >
              {errors.description}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="devops">DevOps</option>
            <option value="other">Другое</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Уровень сложности</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="beginner">Начальный</option>
            <option value="intermediate">Средний</option>
            <option value="advanced">Продвинутый</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Дедлайн изучения</label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            aria-invalid={!!errors.deadline}
            aria-describedby={errors.deadline ? 'deadline-error' : undefined}
            className={errors.deadline ? 'error' : ''}
          />
          {errors.deadline && (
            <span
              id="deadline-error"
              className="error-message"
              role="alert"
            >
              {errors.deadline}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="required">Дополнительные ресурсы (URL)</label>
          {formData.resources.map((resource, index) => {
            const key = `resource${index}`;
            return (
              <div key={key} className="resource-field">
                <input
                  type="url"
                  value={resource}
                  onChange={(e) =>
                    handleResourceChange(index, e.target.value)
                  }
                  placeholder="https://example.com"
                  aria-invalid={!!errors[key]}
                  aria-describedby={errors[key] ? `${key}-error` : undefined}
                  className={errors[key] ? 'error' : ''}
                />
                {formData.resources.length > 1 && (
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeResourceField(index)}
                    aria-label={`Удалить ресурс ${index + 1}`}
                  >
                    ✕
                  </button>
                )}
                {errors[key] && (
                  <span
                    id={`${key}-error`}
                    className="error-message"
                    role="alert"
                  >
                    {errors[key]}
                  </span>
                )}
              </div>
            );
          })}

          <button
            type="button"
            className="btn-add-resource"
            onClick={addResourceField}
          >
            Добавить ресурс
          </button>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={!isFormValid}
          >
            Сохранить план
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudyPlanForm;
