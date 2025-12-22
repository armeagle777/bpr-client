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
    handleNoteDelete,
    handleNoteCreate,
    handleNoteUpdate,
  } = useNotesData({ pnum, taxId });

  const addNote = () => {
    const newNote = {
      color: 'yellow',
      x: 24,
      y: 24 + notes.length * 50,
      w: 200,
      h: 150,
      folded: false,
    };
    setNotes([...notes, newNote]);
  };

  const clearAll = () => {
    setNotes([]);
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
      {/* <Box sx={{ mb: 2 }}>
        <Button variant="contained" startIcon={<Add />} onClick={addNote}>
          New Note
        </Button>
        {notes.length > 0 && (
          <Button variant="outlined" sx={{ ml: 2 }} onClick={() => setClearDialogOpen(true)}>
            Clear All
          </Button>
        )}
      </Box> */}
      {data?.map((note) => (
        <StickyNote
          note={note}
          key={note.id}
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
