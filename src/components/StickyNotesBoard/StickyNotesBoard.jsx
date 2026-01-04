import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Add } from '@mui/icons-material';
import StickyNote from './StickyNote';
import useNotesData from '../../hooks/useNotesData';

const StickyNotesBoard = ({ pnum, taxId }) => {
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    draftNote,
    handleNoteDelete,
    handleNoteCreate,
    handleNoteUpdate,
    handleAddDraftNote,
    handleClearAllNotes,
  } = useNotesData({ pnum, taxId });

  const addNote = () => {
    const newNote = {
      color: 'yellow',
      x: 24,
      y: data ? 24 + data.length * 50 : 24,
      w: 200,
      h: 150,
      folded: false,
      pnum,
      taxId,
    };
    handleNoteCreate(newNote);
  };
  const mixedData = [...(data ?? []), ...(draftNote ? [draftNote] : [])];
  const clearAll = () => {
    handleClearAllNotes();
    setClearDialogOpen(false);
  };
  if (!taxId && !pnum) return null;
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        p: 2,
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Button
          disabled={!!draftNote}
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddDraftNote}
        >
          New Note
        </Button>
        {data?.length > 0 && (
          <Button variant="outlined" sx={{ ml: 2 }} onClick={() => setClearDialogOpen(true)}>
            Clear All
          </Button>
        )}
      </Box>
      {mixedData?.map((note, index) => (
        <StickyNote
          note={note}
          key={(note.id || 0) + index}
          onUpdate={handleNoteUpdate}
          onDelete={handleNoteDelete}
        />
      ))}
      <Dialog open={clearDialogOpen} onClose={() => setClearDialogOpen(false)}>
        <DialogTitle>Հեռացնել բոլոր գրառումները</DialogTitle>
        <DialogContent>Հոմոզվա՞ծ եք, որ ցանկանում եք հեռացնել բոլոր գրառումները</DialogContent>
        <DialogActions>
          <Button onClick={() => setClearDialogOpen(false)}>Չեղարկել</Button>
          <Button onClick={clearAll} color="error">
            Հեռացնել
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StickyNotesBoard;
