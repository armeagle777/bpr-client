import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Add } from '@mui/icons-material';
import StickyNote from './StickyNote';

const STORAGE_KEY = 'sticky_notes_v1';

const defaultNotes = [
  {
    id: crypto.randomUUID(),
    text: 'Welcome to Sticky Notes!',
    color: 'yellow',
    x: 24,
    y: 24,
    w: 200,
    h: 150,
    folded: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    text: 'Drag me around!',
    color: 'blue',
    x: 250,
    y: 24,
    w: 200,
    h: 150,
    folded: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    text: 'Resize me!',
    color: 'green',
    x: 24,
    y: 200,
    w: 200,
    h: 150,
    folded: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

const StickyNotesBoard = () => {
  const [notes, setNotes] = useState([]);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setNotes(JSON.parse(stored));
    } else {
      setNotes(defaultNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: crypto.randomUUID(),
      text: 'New Note',
      color: 'yellow',
      x: 24 + notes.length * 50,
      y: 24 + notes.length * 50,
      w: 200,
      h: 150,
      folded: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const clearAll = () => {
    setNotes([]);
    setClearDialogOpen(false);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '500px',
        backgroundColor: '#fafafa',
        p: 2,
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" startIcon={<Add />} onClick={addNote}>
          New Note
        </Button>
        {notes.length > 0 && (
          <Button variant="outlined" sx={{ ml: 2 }} onClick={() => setClearDialogOpen(true)}>
            Clear All
          </Button>
        )}
      </Box>
      {notes.map((note) => (
        <StickyNote key={note.id} note={note} onUpdate={updateNote} onDelete={deleteNote} />
      ))}
      <Dialog open={clearDialogOpen} onClose={() => setClearDialogOpen(false)}>
        <DialogTitle>Clear All Notes?</DialogTitle>
        <DialogContent>This action cannot be undone.</DialogContent>
        <DialogActions>
          <Button onClick={() => setClearDialogOpen(false)}>Cancel</Button>
          <Button onClick={clearAll} color="error">
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StickyNotesBoard;
