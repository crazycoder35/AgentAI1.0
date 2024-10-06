import React, { useState } from 'react';
import { useProject } from '../contexts/ProjectContext';
import { useAgents } from '../contexts/AgentContext';
import { Project, Task } from '../types';
import { PlusCircle, Edit3, ChevronDown, ChevronUp, FolderPlus } from 'lucide-react';

const ProjectCreation: React.FC = () => {
  const { setProject } = useProject();
  const { agents, updateAgentStatus } = useAgents();
  const [projectName, setProjectName] = useState('');
  const [projectPath, setProjectPath] = useState('');
  const [template, setTemplate] = useState('');
  const [generatedTasks, setGeneratedTasks] = useState<Task[]>([]);
  const [showTaskReview, setShowTaskReview] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);
  const [creatingFolder, setCreatingFolder] = useState(false);

  const generateTasks = (projectName: string, template: string): Task[] => {
    // ... (generateTasks implementation remains the same)
  };

  const handleGenerateTasks = () => {
    const tasks = generateTasks(projectName, template);
    setGeneratedTasks(tasks);
    setShowTaskReview(true);
  };

  const handleCreateProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectName,
      path: projectPath,
      tasks: generatedTasks,
      submodules: ['Setup', 'Frontend', 'Backend', 'Database', 'Testing'],
    };
    setProject(newProject);
    // Assign tasks to agents (simplified version)
    agents.forEach((agent, index) => {
      if (index < generatedTasks.length) {
        updateAgentStatus(agent.id, 'working', generatedTasks[index].description);
      }
    });
  };

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Project</h3>
        <div className="mt-5 grid grid-cols-1 gap-5">
          <div>
            <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              name="project-name"
              id="project-name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="project-path" className="block text-sm font-medium text-gray-700">
              Project Path
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="project-path"
                id="project-path"
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                value={projectPath}
                onChange={(e) => setProjectPath(e.target.value)}
              />
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-r-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setCreatingFolder(true)}
              >
                <FolderPlus className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                Create Folder
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="template" className="block text-sm font-medium text-gray-700">
              Project Template
            </label>
            <select
              id="template"
              name="template"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
            >
              <option value="">Select a template</option>
              <option value="e-commerce">E-commerce</option>
              <option value="ai">AI/Machine Learning</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <button
              type="button"
              onClick={handleGenerateTasks}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusCircle className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Generate Tasks
            </button>
          </div>
        </div>
        {showTaskReview && (
          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-900">Review Generated Tasks</h4>
            <ul className="mt-3 divide-y divide-gray-200">
              {generatedTasks.map((task) => (
                <li key={task.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{task.description}</p>
                    <button
                      type="button"
                      onClick={() => toggleTaskExpansion(task.id)}
                      className="ml-2 text-gray-400 hover:text-gray-500"
                    >
                      {expandedTasks.includes(task.id) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {expandedTasks.includes(task.id) && (
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Assigned to: {task.assignedTo}</p>
                      <p>Priority: {task.priority}</p>
                      <p>Submodule: {task.submodule}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {showTaskReview && (
          <div className="mt-5">
            <button
              type="button"
              onClick={handleCreateProject}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Edit3 className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Create Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCreation;