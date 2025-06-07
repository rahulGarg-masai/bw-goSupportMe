import axios from 'axios';

const BASE_URL = 'https://your-project-default-rtdb.firebaseio.com';

export const projectService = {
  getAll: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}/projects.json`);
      return response.data ? Object.keys(response.data).map(key => ({
        id: key,
        ...response.data[key]
      })) : [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  },

  create: async (userId, project) => {
    try {
      const projectData = {
        ...project,
        createdAt: new Date().toISOString(),
        tasks: {}
      };
      const response = await axios.post(`${BASE_URL}/users/${userId}/projects.json`, projectData);
      return { id: response.data.name, ...projectData };
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  update: async (userId, projectId, project) => {
    try {
      await axios.patch(`${BASE_URL}/users/${userId}/projects/${projectId}.json`, project);
      return { id: projectId, ...project };
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  delete: async (userId, projectId) => {
    try {
      await axios.delete(`${BASE_URL}/users/${userId}/projects/${projectId}.json`);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  getById: async (userId, projectId) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}/projects/${projectId}.json`);
      return response.data ? { id: projectId, ...response.data } : null;
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  }
};

export const taskService = {
  getAll: async (userId, projectId) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}/projects/${projectId}/tasks.json`);
      return response.data ? Object.keys(response.data).map(key => ({
        id: key,
        ...response.data[key]
      })) : [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  },

  create: async (userId, projectId, task) => {
    try {
      const taskData = {
        ...task,
        createdAt: new Date().toISOString(),
        completed: false
      };
      const response = await axios.post(`${BASE_URL}/users/${userId}/projects/${projectId}/tasks.json`, taskData);
      return { id: response.data.name, ...taskData };
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  update: async (userId, projectId, taskId, task) => {
    try {
      await axios.patch(`${BASE_URL}/users/${userId}/projects/${projectId}/tasks/${taskId}.json`, task);
      return { id: taskId, ...task };
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  delete: async (userId, projectId, taskId) => {
    try {
      await axios.delete(`${BASE_URL}/users/${userId}/projects/${projectId}/tasks/${taskId}.json`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};
