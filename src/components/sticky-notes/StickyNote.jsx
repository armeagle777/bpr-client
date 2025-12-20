import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import {
  Paper,
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
  Tooltip,
  Divider,
} from '@mui/material';
import { Edit, Save, Delete, Palette, DragIndicator } from '@mui/icons-material';
import colors from './colors';

const StickyNote = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(note.text);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleEditToggle = () => {
    if (isEditing) {
      onUpdate({ ...note, text, updatedAt: Date.now() });
    }
    setIsEditing(!isEditing);
  };

  const handleColorChange = (color) => {
    onUpdate({ ...note, color, updatedAt: Date.now() });
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete(note.id);
  };

  const handleDragStop = (e, d) => {
    onUpdate({ ...note, x: d.x, y: d.y });
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    onUpdate({ ...note, w: ref.offsetWidth, h: ref.offsetHeight, x: position.x, y: position.y });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <>
      <Rnd
        size={{ width: note.w, height: note.h }}
        position={{ x: note.x, y: note.y }}
        onDragStop={handleDragStop}
        onResizeStop={handleResizeStop}
        minWidth={180}
        minHeight={140}
        dragHandleClassName="drag-handle"
        disableDragging={isEditing}
        enableResizing={!isEditing}
        bounds="parent"
      >
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: colors[note.color],
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            '&:hover': {
              elevation: 6,
            },
          }}
        >
          <Box
            className="drag-handle"
            sx={{ display: 'flex', alignItems: 'center', p: 1, cursor: 'move' }}
          >
            <DragIndicator sx={{ mr: 1 }} />
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title={isEditing ? 'Save' : 'Edit'}>
              <IconButton size="small" onClick={handleEditToggle}>
                {isEditing ? <Save /> : <Edit />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Color">
              <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Palette />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" onClick={handleDelete}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider />
          <Box sx={{ flexGrow: 1, p: 1, overflow: 'auto' }}>
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                value={text}
                onChange={(e) => setText(e.target.value)}
                variant="standard"
                InputProps={{ disableUnderline: true }}
                sx={{ backgroundColor: 'transparent' }}
              />
            ) : (
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {note.text}
              </Typography>
            )}
          </Box>
          <Divider />
          <Box sx={{ p: 0.5, textAlign: 'right' }}>
            <Typography variant="caption" color="textSecondary">
              {formatTime(note.updatedAt)}
            </Typography>
          </Box>
        </Paper>
      </Rnd>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {Object.entries(colors).map(([key, value]) => (
          <MenuItem key={key} onClick={() => handleColorChange(key)}>
            <Box sx={{ width: 20, height: 20, backgroundColor: value, mr: 1, borderRadius: 1 }} />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default StickyNote;
