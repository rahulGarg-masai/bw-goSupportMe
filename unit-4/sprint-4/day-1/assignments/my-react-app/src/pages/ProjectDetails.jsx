import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { projectService, taskService } from '../services/firebaseService';
import { debounce } from '../utils/debounce';

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTask, setEditingTask] = useState(null);
  const { currentUser } = useAuth();
  const { id } = useParams();

  const tasksPerPage = 5;

  const fetchData = async () => {
    try {
      const [projectData, tasksData] = await Promise.all([
        projectService.getById(currentUser.uid, id),
        taskService.getAll(currentUser.uid, id)
      ]);
      setProject(projectData);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser && id) {
      fetchData();
    }
  }, [currentUser, id]);

  const debouncedSearch = useCallback(
    debounce((term) => {
      filterAndSortTasks(tasks, term, filterBy, sortBy);
    }, 300),
    [tasks, filterBy, sortBy]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    filterAndSortTasks(tasks, searchTerm, filterBy, sortBy);
  }, [tasks, filterBy, sortBy]);

  const filterAndSortTasks = (taskList, search, filter, sort) => {
    let filtered = [...taskList];

    if (search) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter !== 'all') {
      if (filter === 'completed') {
        filtered = filtered.filter(task => task.completed);
      } else if (filter === 'pending') {
        filtered = filtered.filter(task => !task.completed);
      } else {
        filtered = filtered.filter(task => task.priority === filter);
      }
    }

    filtered.sort((a, b) => {
      if (sort === 'createdAt') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sort === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

    setFilteredTasks(filtered);
    setCurrentPage(1);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const newTask = await taskService.create(currentUser.uid, id, {
        title: newTaskTitle.trim(),
        priority: newTaskPriority
      });
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskPriority('medium');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleToggleTask = async (taskId, completed) => {
    try {
      await taskService.update(currentUser.uid, id, taskId, { completed: !completed });
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, completed: !completed } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.delete(currentUser.uid, id, taskId);
        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleEditTask = async (taskId, newTitle, newPriority) => {
    try {
      await taskService.update(currentUser.uid, id, taskId, {
        title: newTitle,
        priority: newPriority
      });
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, title: newTitle, priority: newPriority } : task
      ));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const getPaginatedTasks = () => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    return filteredTasks.slice(startIndex, startIndex + tasksPerPage);
  };

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  if (!project) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Project not found</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>← Back to Dashboard</Link>
        <h1 style={{ margin: '1rem 0' }}>{project.title}</h1>
        <p style={{ color: '#666' }}>{project.description}</p>
      </div>

      <form onSubmit={handleAddTask} style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Task</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Task Title</label>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task title"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Priority</label>
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
              style={{
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add Task
          </button>
        </div>
      </form>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            minWidth: '200px'
          }}
        />
        
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        >
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Tasks ({filteredTasks.length})</h3>
        {getPaginatedTasks().length === 0 ? (
          <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>No tasks found</p>
        ) : (
          <div>
            {getPaginatedTasks().map((task) => (
              <div
                key={task.id}
                style={{
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: task.completed ? '#f8f9fa' : 'white'
                }}
              >
                {editingTask === task.id ? (
                  <EditTaskForm
                    task={task}
                    onSave={handleEditTask}
                    onCancel={() => setEditingTask(null)}
                  />
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.id, task.completed)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <div>
                        <h4 style={{
                          margin: 0,
                          textDecoration: task.completed ? 'line-through' : 'none',
                          color: task.completed ? '#666' : 'black'
                        }}>
                          {task.title}
                        </h4>
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#666' }}>
                          <span>Priority: <strong style={{ color: getPriorityColor(task.priority) }}>{task.priority}</strong></span>
                          <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => setEditingTask(task.id)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: '#ffc107',
                          color: 'black',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.75rem'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.75rem'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentPage === 1 ? '#e9ecef' : '#007bff',
              color: currentPage === 1 ? '#6c757d' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Previous
          </button>
          
          <span style={{ padding: '0.5rem 1rem', alignSelf: 'center' }}>
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentPage === totalPages ? '#e9ecef' : '#007bff',
              color: currentPage === totalPages ? '#6c757d' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const EditTaskForm = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(task.id, title.trim(), priority);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          flex: 1,
          padding: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{
          padding: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Save
      </button>
      <button
        type="button"
        onClick={onCancel}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Cancel
      </button>
    </form>
  );
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return '#dc3545';
    case 'medium': return '#ffc107';
    case 'low': return '#28a745';
    default: return '#6c757d';
  }
};

export default ProjectDetails;
