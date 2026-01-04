import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotes, createNote, deleteNote, updateNote, clearAllNotes } from '../api/personsApi';
import { message } from 'antd';
import { v4 } from 'uuid';
const useNotesData = ({ pnum, taxId }) => {
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data, isFetching } = useQuery(
    ['notes', { pnum, taxId }],
    () => getNotes({ pnum, taxId }),
    {
      keepPreviousData: true,
      enabled: !!pnum || !!taxId,
    }
  );

  const draftNote = {
    color: 'yellow',
    x: 24,
    y: data ? 24 + data.length * 50 : 24,
    w: 200,
    h: 150,
    folded: false,
    pnum,
    taxId,
    isDraft: true,
    uuid: v4(),
  };

  const updateNoteMutation = useMutation(
    ({ id, noteData }) => {
      updateNote(id, noteData);
    },
    {
      onMutate: async (updatedNoteData) => {
        const { id, noteData } = updatedNoteData;

        // Cancel outgoing fetches for this note
        await queryClient.cancelQueries({ queryKey: ['notes', id] });

        // Snapshot previous value
        const previousNotes = queryClient.getQueryData(['notes', { pnum, taxId }]);
        const updatedNote = previousNotes?.find((note) => note.id === id);
        queryClient.setQueryData(['notes', { pnum, taxId }], (old) => {
          if (!old) return old;
          return old.map((note) => {
            return note.id === updatedNote.id ? { ...note, ...noteData } : note;
          });
        });
        return previousNotes;
      },
      onError: (error, variables, context, mutation) => {
        message.error('Ինչ-որ բան այնպես չէ');
      },
      // 3️⃣ After success or error → re-sync
      onSettled: (data, error, variables) => {
        queryClient.invalidateQueries({ queryKey: ['notes', { pnum, taxId }] });
        queryClient.invalidateQueries({ queryKey: ['notes'] });
      },
    }
  );

  const clearAllNotesMutation = useMutation(
    () => {
      clearAllNotes({ pnum, taxId });
    },
    {
      onMutate: async () => {
        // Cancel outgoing fetches for this note
        await queryClient.cancelQueries({ queryKey: ['notes', { pnum, taxId }] });

        // Snapshot previous value
        // const previousNotes = queryClient.getQueryData(['notes', { pnum, taxId }]);
        queryClient.setQueryData(['notes', { pnum, taxId }], (old) => {
          if (!old) return old;
          return [];
        });
        return [];
      },
      onError: (error, variables, context, mutation) => {
        message.error('Ինչ-որ բան այնպես չէ');
      },
      // 3️⃣ After success or error → re-sync
      onSettled: (data, error, variables) => {
        queryClient.invalidateQueries({ queryKey: ['notes', { pnum, taxId }] });
        queryClient.invalidateQueries({ queryKey: ['notes'] });
      },
    }
  );

  const deleteNoteMutation = useMutation((id) => deleteNote(id), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['notes', { pnum, taxId }]);
      message.success('Հաջողությամբ Հեռացվել է');
    },
    onError: (error, variables, context, mutation) => {
      message.error('Ինչ-որ բան այնպես չէ');
    },
  });

  const createNoteMutation = useMutation((noteData) => createNote(noteData), {
    onMutate: async (newNoteData) => {
      // Cancel outgoing fetches for this note
      await queryClient.cancelQueries({ queryKey: ['notes', { pnum, taxId }] });

      // Snapshot previous value
      const previousNotes = queryClient.getQueryData(['notes', { pnum, taxId }]);
      // const updatedNote = previousNotes?.find((note) => note.id === id);
      queryClient.setQueryData(['notes', { pnum, taxId }], (old) => {
        if (!old) return old;
        console.log('old', old);
        old.push(newNoteData);
        return old;
      });
      return previousNotes;
    },
    onError: (error, variables, context, mutation) => {
      message.error('Ինչ-որ բան այնպես չէ');
    },
    // 3️⃣ After success or error → re-sync
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notes', { pnum, taxId }] });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleNoteDelete = (id) => {
    deleteNoteMutation.mutate(id);
  };

  const handleNoteCreate = () => {
    createNoteMutation.mutate(draftNote);
  };

  const handleNoteUpdate = (id, noteData) => {
    updateNoteMutation.mutate({ id, noteData });
  };

  const handleClearAllNotes = () => {
    clearAllNotesMutation.mutate();
  };

  return {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    draftNote,
    handleNoteDelete,
    handleNoteCreate,
    handleNoteUpdate,
    handleClearAllNotes,
  };
};

export default useNotesData;
