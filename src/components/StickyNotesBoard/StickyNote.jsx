import { useState } from 'react';
import { Rnd } from 'react-rnd';
import {
  Box,
  Menu,
  Paper,
  Tooltip,
  Divider,
  MenuItem,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Edit,
  Save,
  Delete,
  Palette,
  Minimize,
  UnfoldMore,
  DragIndicator,
} from '@mui/icons-material';
import colors from './colors';

const StickyNote = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(note.text);
  const [anchorEl, setAnchorEl] = useState(null);
  const isFolded = note.folded ?? false;
  const foldedSize = 56;

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

  const toggleFold = () => {
    if (isEditing) {
      onUpdate({ ...note, text, updatedAt: Date.now() });
      setIsEditing(false);
    }
    onUpdate({ ...note, folded: !isFolded, updatedAt: Date.now() });
  };

  return (
    <>
      <Rnd
        size={{ width: isFolded ? foldedSize : note.w, height: isFolded ? foldedSize : note.h }}
        position={{ x: note.x, y: note.y }}
        onDragStop={handleDragStop}
        onResizeStop={handleResizeStop}
        minWidth={isFolded ? foldedSize : 180}
        minHeight={isFolded ? foldedSize : 140}
        dragHandleClassName={isFolded ? undefined : 'drag-handle'}
        disableDragging={isEditing}
        enableResizing={!isEditing && !isFolded}
        bounds="parent"
      >
        {isFolded ? (
          <Paper
            elevation={3}
            onClick={toggleFold}
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: colors[note.color],
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Tooltip title="Expand note">
              <IconButton size="small" sx={{ color: '#fff' }}>
                <UnfoldMore />
              </IconButton>
            </Tooltip>
          </Paper>
        ) : (
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
              <Tooltip title={isEditing ? 'Պահպանել' : 'Խմբագրել'}>
                <IconButton size="small" onClick={handleEditToggle}>
                  {isEditing ? <Save /> : <Edit />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Գույնը">
                <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <Palette />
                </IconButton>
              </Tooltip>
              <Tooltip title="Ծածկել">
                <IconButton size="small" onClick={toggleFold}>
                  <Minimize />
                </IconButton>
              </Tooltip>
              <Tooltip title="Հեռացնել">
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
        )}
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
