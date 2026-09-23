import { useState, useEffect, useCallback } from 'react';
import roadmapService from '../services/roadmapService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

/**
 * Reusable hook for managing student roadmap milestone progress, completion percentages,
 * and background persistence with the backend API.
 */
export const useRoadmapProgress = (roadmapId = null, semester = null) => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [completedItemIds, setCompletedItemIds] = useState([]);
  const [progressRecord, setProgressRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProgress = useCallback(async () => {
    if (!isAuthenticated) {
      setCompletedItemIds([]);
      setProgressRecord(null);
      return;
    }

    setIsLoading(true);
    try {
      const res = await roadmapService.getProgress();
      const list = res.data || [];
      const current = list.find(
        (p) =>
          (roadmapId && p.roadmap && (p.roadmap._id === roadmapId || p.roadmap === roadmapId)) ||
          (semester && p.roadmap && p.roadmap.semester === Number(semester))
      );

      if (current) {
        setProgressRecord(current);
        if (current.completedItems) {
          setCompletedItemIds(current.completedItems.map((i) => (typeof i === 'string' ? i : i._id)));
        }
      } else {
        setCompletedItemIds([]);
      }
    } catch {
      // Non-blocking
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, roadmapId, semester]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const toggleMilestone = useCallback(
    async (milestoneId, currentRoadmapId, totalMilestonesCount = 0) => {
      if (!isAuthenticated) {
        showToast('Please sign in to track and save your milestone progress.', 'info');
        return false;
      }

      const isCompleted = completedItemIds.includes(milestoneId);
      const updated = isCompleted
        ? completedItemIds.filter((id) => id !== milestoneId)
        : [...completedItemIds, milestoneId];

      setCompletedItemIds(updated);

      try {
        const targetId = currentRoadmapId || roadmapId;
        await roadmapService.saveProgress({
          roadmapId: targetId,
          completedItemIds: updated,
        });
        showToast(isCompleted ? 'Milestone unmarked.' : 'Milestone marked as completed!', 'success');
        return true;
      } catch (err) {
        // Revert on failure
        fetchProgress();
        showToast('Failed to sync progress with the server.', 'error');
        return false;
      }
    },
    [isAuthenticated, completedItemIds, roadmapId, showToast, fetchProgress]
  );

  return {
    completedItemIds,
    progressRecord,
    isLoading,
    toggleMilestone,
    refetchProgress: fetchProgress,
  };
};

export default useRoadmapProgress;
