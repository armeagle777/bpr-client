import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

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
    handleClearAllNotes,
  } = useNotesData({ pnum, taxId });

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
        <Button variant="contained" startIcon={<Add />} onClick={handleNoteCreate}>
          New Note
        </Button>
        {data?.length > 0 && (
          <Button variant="outlined" sx={{ ml: 2 }} onClick={() => setClearDialogOpen(true)}>
            Clear All
          </Button>
        )}
      </Box>
      {data?.map((note, index) => {
        return (
          <StickyNote
            note={note}
            key={note.id || note.uuid}
            onUpdate={handleNoteUpdate}
            onDelete={handleNoteDelete}
          />
        );
      })}
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
