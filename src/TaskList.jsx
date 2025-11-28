function TaskList() {
  const tasks = [
    { id: 1, title: 'Изучить JSX', completed: true },
    { id: 2, title: 'Props', completed: false },
    { id: 3, title: 'Список задач', completed: false },
    { id: 4, title: 'Technology Tracker', completed: false }
  ];

  return (
    <div className="task-list">
      <h2>Список задач</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : 'pending'}>
            <span>{task.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TaskList;

