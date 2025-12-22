import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotes, createNote, deleteNote, updateNote } from '../api/personsApi';

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

  const updateNoteMutation = useMutation(({ id, noteData }) => updateNote(id, noteData), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['notes', { id }]);
      message.success('Հաջողությամբ կատարվել է');
    },
    onError: (error, variables, context, mutation) => {
      message.error('Ինչ-որ բան այնպես չէ');
    },
  });

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
    onSuccess: (data) => {
      queryClient.invalidateQueries(['notes', { pnum, taxId }]);
      message.success('Հաջողությամբ կատարվել է');
    },
    onError: (error, variables, context, mutation) => {
      message.error('Ինչ-որ բան այնպես չէ');
    },
  });

  const handleNoteDelete = (id) => {
    deleteNoteMutation.mutate(id);
  };

  const handleNoteCreate = (noteData) => {
    createNoteMutation.mutate(noteData);
  };

  const handleNoteUpdate = (id, notedata) => {
    updateNoteMutation.mutate({ id, notedata });
  };

  return {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    handleNoteDelete,
    handleNoteCreate,
    handleNoteUpdate,
  };
};

export default useNotesData;
