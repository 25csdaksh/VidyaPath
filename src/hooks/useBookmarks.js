import { useState, useEffect, useCallback } from 'react';
import bookmarkService from '../services/bookmarkService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

/**
 * Reusable hook for fetching and managing user bookmarks across modules
 * with optimistic UI updates and toast feedback.
 */
export const useBookmarks = (resourceType = null) => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [bookmarksList, setBookmarksList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBookmarks = useCallback(async () => {
    if (!isAuthenticated) {
      setBookmarkedIds([]);
      setBookmarksList([]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await bookmarkService.getUserBookmarks({
        resourceType: resourceType || undefined,
      });
      const list = res.data || [];
      setBookmarksList(list);

      const ids = list.map((b) => (b.resourceId?._id || b.resourceId || b._id));
      setBookmarkedIds(ids);
    } catch {
      // Non-blocking for unauthenticated or network glitches
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, resourceType]);

  const [collections, setCollections] = useState([]);

  const fetchCollections = useCallback(async () => {
    if (!isAuthenticated) {
      setCollections([]);
      return;
    }
    try {
      const res = await bookmarkService.getUserCollections();
      setCollections(res.data || []);
    } catch {
      // Ignore
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchBookmarks();
    fetchCollections();
  }, [fetchBookmarks, fetchCollections]);

  const toggleBookmark = useCallback(
    async (item, typeOverride = null, collectionId = null) => {
      if (!isAuthenticated) {
        showToast('Please sign in to save items to your bookmarks.', 'info');
        return false;
      }

      const itemId = item._id || item.id;
      const type = typeOverride || resourceType || item.resourceType || 'Resource';
      const isCurrentlySaved = bookmarkedIds.includes(itemId);

      // Find the bookmark document ID if exists
      const existingBm = bookmarksList.find(
        (b) => (b.resourceId?._id || b.resourceId || b._id) === itemId || b._id === itemId
      );
      const bookmarkDocId = existingBm ? existingBm._id : itemId;

      // Optimistic state update
      if (isCurrentlySaved) {
        setBookmarkedIds((prev) => prev.filter((id) => id !== itemId));
        setBookmarksList((prev) => prev.filter((b) => (b.resourceId?._id || b.resourceId || b._id) !== itemId));
      } else {
        setBookmarkedIds((prev) => [...prev, itemId]);
      }

      try {
        if (isCurrentlySaved) {
          await bookmarkService.deleteBookmark(bookmarkDocId);
          showToast('Removed from saved bookmarks.', 'success');
        } else {
          await bookmarkService.createBookmark({
            resourceType: type,
            resourceId: itemId,
            collectionId: collectionId || null,
          });
          showToast('Saved to your bookmarks!', 'success');
        }
        fetchBookmarks();
        return true;
      } catch (err) {
        // Revert on failure
        fetchBookmarks();
        showToast('Failed to update bookmark status.', 'error');
        return false;
      }
    },
    [isAuthenticated, bookmarkedIds, bookmarksList, resourceType, showToast, fetchBookmarks]
  );

  const assignToCollection = useCallback(
    async (bookmarkId, collectionId) => {
      try {
        await bookmarkService.updateBookmark(bookmarkId, { collectionId });
        showToast('Collection updated.', 'success');
        fetchBookmarks();
        return true;
      } catch {
        showToast('Failed to assign bookmark to collection.', 'error');
        return false;
      }
    },
    [showToast, fetchBookmarks]
  );

  const createCollection = useCallback(
    async (collectionData) => {
      try {
        const res = await bookmarkService.createCollection(collectionData);
        showToast('Collection created successfully!', 'success');
        fetchCollections();
        return res.data || res;
      } catch {
        showToast('Failed to create collection.', 'error');
        return null;
      }
    },
    [showToast, fetchCollections]
  );

  const deleteCollection = useCallback(
    async (collectionId) => {
      try {
        await bookmarkService.deleteCollection(collectionId);
        showToast('Collection deleted.', 'success');
        fetchCollections();
        fetchBookmarks();
        return true;
      } catch {
        showToast('Failed to delete collection.', 'error');
        return false;
      }
    },
    [showToast, fetchCollections, fetchBookmarks]
  );

  const isBookmarked = useCallback(
    (itemId) => {
      return bookmarkedIds.includes(itemId);
    },
    [bookmarkedIds]
  );

  return {
    bookmarkedIds,
    bookmarksList,
    collections,
    isLoading,
    isBookmarked,
    toggleBookmark,
    assignToCollection,
    createCollection,
    deleteCollection,
    refetchBookmarks: fetchBookmarks,
    refetchCollections: fetchCollections,
  };
};

export default useBookmarks;
