import { useState, useEffect, useCallback } from 'react';
import projectService from '../services/projectService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const useProjectProgress = (projectIdOrSlug = null) => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [progress, setProgress] = useState(null);
  const [allProgress, setAllProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProgress = useCallback(async () => {
    if (!isAuthenticated) {
      setProgress(null);
      setAllProgress([]);
      return;
    }

    setIsLoading(true);
    try {
      if (projectIdOrSlug) {
        const res = await projectService.getProjectProgress(projectIdOrSlug);
        setProgress(res.data || null);
      } else {
        const res = await projectService.getUserProjectProgress();
        setAllProgress(res.data || []);
      }
    } catch {
      // Ignore network errors
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, projectIdOrSlug]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const updateProgress = useCallback(
    async (updateData) => {
      if (!isAuthenticated) {
        showToast('Please sign in to track your project progress.', 'info');
        return null;
      }

      setIsSaving(true);
      try {
        const targetId = projectIdOrSlug || updateData.projectId;
        const res = await projectService.updateProjectProgress(targetId, updateData);
        const updated = res.data || res;
        setProgress(updated);
        showToast('Project progress saved to your account!', 'success');
        return updated;
      } catch (err) {
        showToast('Failed to save project progress.', 'error');
        return null;
      } finally {
        setIsSaving(false);
      }
    },
    [isAuthenticated, projectIdOrSlug, showToast]
  );

  const deleteProgress = useCallback(
    async (targetId) => {
      try {
        await projectService.deleteProjectProgress(targetId || projectIdOrSlug);
        setProgress(null);
        showToast('Project removed from your tracker.', 'info');
        fetchProgress();
        return true;
      } catch {
        showToast('Failed to remove project progress.', 'error');
        return false;
      }
    },
    [projectIdOrSlug, showToast, fetchProgress]
  );

  return {
    progress,
    allProgress,
    isLoading,
    isSaving,
    updateProgress,
    deleteProgress,
    refetchProgress: fetchProgress,
  };
};

export default useProjectProgress;
