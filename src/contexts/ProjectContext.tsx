import React, { createContext, useState, useContext } from 'react';
import { Project, ProjectContextType, Task } from '../types';

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<Project | null>(null);

  const addTask = (task: Task) => {
    if (project) {
      setProject({ ...project, tasks: [...project.tasks, task] });
    }
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    if (project) {
      setProject({
        ...project,
        tasks: project.tasks.map(task =>
          task.id === taskId ? { ...task, status } : task
        ),
      });
    }
  };

  return (
    <ProjectContext.Provider value={{ project, setProject, addTask, updateTaskStatus }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};