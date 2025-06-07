import { database } from '../firebase';
import { ref, push, set, get, update, remove, onValue } from 'firebase/database';

export const saveStudyEntry = async (userId, entryData) => {
  const entriesRef = ref(database, `studyEntries/${userId}`);
  const newEntryRef = push(entriesRef);
  await set(newEntryRef, {
    ...entryData,
    timestamp: Date.now(),
    date: new Date().toISOString().split('T')[0]
  });
  return newEntryRef.key;
};

export const getStudyEntries = async (userId) => {
  const entriesRef = ref(database, `studyEntries/${userId}`);
  const snapshot = await get(entriesRef);
  if (snapshot.exists()) {
    return Object.entries(snapshot.val()).map(([key, value]) => ({
      id: key,
      ...value
    }));
  }
  return [];
};

export const updateStudyEntry = async (userId, entryId, updates) => {
  const entryRef = ref(database, `studyEntries/${userId}/${entryId}`);
  await update(entryRef, updates);
};

export const deleteStudyEntry = async (userId, entryId) => {
  const entryRef = ref(database, `studyEntries/${userId}/${entryId}`);
  await remove(entryRef);
};

export const saveMentorComment = async (userId, entryId, comment) => {
  const commentRef = ref(database, `mentorComments/${userId}/${entryId}`);
  await set(commentRef, {
    comment,
    timestamp: Date.now(),
    mentorId: 'mentor'
  });
};

export const getMentorComments = async (userId, entryId) => {
  const commentRef = ref(database, `mentorComments/${userId}/${entryId}`);
  const snapshot = await get(commentRef);
  return snapshot.exists() ? snapshot.val() : null;
};

export const getAnonymizedEntries = async () => {
  const entriesRef = ref(database, 'studyEntries');
  const snapshot = await get(entriesRef);
  if (snapshot.exists()) {
    const allEntries = [];
    Object.entries(snapshot.val()).forEach(([userId, userEntries]) => {
      Object.entries(userEntries).forEach(([entryId, entry]) => {
        allEntries.push({
          id: entryId,
          userId: userId.substring(0, 8),
          ...entry
        });
      });
    });
    return allEntries;
  }
  return [];
};

export const saveUserProfile = async (userId, profileData) => {
  const profileRef = ref(database, `userProfiles/${userId}`);
  await set(profileRef, profileData);
};

export const getUserProfile = async (userId) => {
  const profileRef = ref(database, `userProfiles/${userId}`);
  const snapshot = await get(profileRef);
  return snapshot.exists() ? snapshot.val() : null;
};
