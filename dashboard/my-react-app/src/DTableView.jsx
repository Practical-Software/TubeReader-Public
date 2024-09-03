import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Divider from '@mui/material/Divider';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Tooltip from '@mui/material/Tooltip';

import './table.css';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

const darkTheme = createTheme({
    palette: {
      mode: 'light',
    },
});


const initialRows = [
    
];
  

function EditToolbar() {
  return (
    <GridToolbarContainer>
    </GridToolbarContainer>
  );
}

function capitalizeTitle(title) {
    const nonImportantWords = new Set([
        'a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'so', 'yet',
        'in', 'on', 'at', 'to', 'with', 'of', 'by', 'from'
    ]);

    return title.split(' ').map((word, index) => {
        // Capitalize the first and last word, and any word not in the non-important words list
        if (index === 0 || index === title.split(' ').length - 1 || !nonImportantWords.has(word.toLowerCase())) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return word.toLowerCase();
    }).join(' ');
}

export default function DTableView() {

    const getArticleUrl = import.meta.env.VITE_GET_ARTICLE_URL;  
    const updateArticleUrl = import.meta.env.VITE_UPDATE_ARTICLE_URL;
    const deleteArticleUrl = import.meta.env.VITE_DELETE_ARTICLE_URL

    const [pageSize, setPageSize] = useState(5); // Default page size
    const [page, setPage] = useState(0); // Default page index
    const [totalRows, setTotalRows] = useState(3); // State to hold the total row count

    const [rows, setRows] = React.useState(initialRows);

    const [rowModesModel, setRowModesModel] = React.useState({});

    const [open, setOpen] = React.useState(false);

    const [delRow, setDelRow] = React.useState({});

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
      // Function to update the state based on screen width
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      // Add event listener
      window.addEventListener('resize', handleResize);
  
      // Call the handler once to set the initial value
      handleResize();
  
      // Cleanup event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array ensures this effect runs only once
  
    useEffect(() => {
      if (isMobile) {
        showAlert('warning', 'Table View may not work properly on smaller devices.');
      }
    }, [isMobile]); // Only re-run this effect when `isMobile` changes

    const handleClickOpen = () => {
        setOpen(true);
    };
    
      const handleClose = () => {
        setOpen(false);
    };
  
    const handleRowEditStop = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };
  
    const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
  
    const handleSaveClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      //console.log(rows);
      //console.log(rowModesModel);
    };
  
    const handleDeleteClick = (id) => {
      handleClickOpen();      
      
      setDelRow(rows.find((row) => row.id === id));

      //setRows(rows.filter((row) => row.id !== id));
    };

    const handleDelete = async () => {

        const endpoint = `${deleteArticleUrl}`;
        const formData = new URLSearchParams();
        formData.append('title', capitalizeTitle(delRow.title));
        formData.append('visibility', delRow.visibility);
        formData.append('file_name', delRow.file_name);

        console.log(formData.toString());
      
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()

          });
      
          if (!response.ok) {
            throw new Error('Failed to delete row');
          }
      
          const result = await response.json();
          if (result.success) {
            showAlert('success', 'Article was successfully deleted.');
          } else {
            throw new Error;
          }

          setRows(rows.filter((row) => row.id !== delRow.id));

          return result;
        } catch (error) {
          console.error('Error updating row:', error);
          showAlert('error', "Error Deleting Article: Please try again later.");
          return error;
        }
    };
  
    const handleCancelClick = (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
  
    const editedRow = rows.find((row) => row.id === id);
      if (editedRow.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
    };

    const showAlert = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setAlertOpen(true);
        setTimeout(() => setAlertOpen(false), 4000); // Fade out after 3 seconds
    };
  
    const processRowUpdate = async (newRow) => {
        const { id, title, visibility, youtube_id } = newRow; // Extract only necessary fields
        const updatedRow = { id, title, visibility, youtube_id };
        
        try {
          // Call API to update row in database
          const result = await updateRowInDatabase(updatedRow);
          if (!result.success) {
            throw new Error;
          }
          showAlert('success', 'Article was successfully updated!');
          // Update local state if API call is successful
          setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));

          return newRow;
        } catch (error) {
          // Handle error
          console.error('Error updating row:', error);
          showAlert('error', "Error Updating Article: Please try again later.");

          return newRow;
        }
      };
    
      const updateRowInDatabase = async (updatedRow) => {
        const endpoint = `${updateArticleUrl}`;

        
        const formData = new URLSearchParams();
        formData.append('title', capitalizeTitle(updatedRow.title));
        formData.append('visibility', updatedRow.visibility);
        formData.append('youtube_id', updatedRow.youtube_id);
      
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()

          });
      
          if (!response.ok) {
            throw new Error('Failed to update row');
          }
      
          const result = await response.json();
          return result;
        } catch (error) {
          console.error('Error updating row:', error);
          return error;
        }
      };
      
  
    const handleRowModesModelChange = (newRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };
  
    useEffect(() => {
        const endpoint = `${getArticleUrl}?index=${page}&pageSize=${pageSize}`;
        
        fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(response => response.json())
          .then(data => {
            setRows(data.rows); // Assuming the data returned has a `rows` property
            setTotalRows(data.totalRows); // Assuming the total number of rows is returned
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, [page, pageSize, getArticleUrl]); // Update when page or pageSize changes
      
      
      

  const columns = [
    { field: 'title', headerName: 'Title', width: 410, editable: true },
    {
      field: 'youtube_author',
      headerName: 'YouTube Channel',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      cellClassName: (params) => rowModesModel[params.id]?.mode === GridRowModes.Edit ? 'non-editable-cell' : '',
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 130,
      editable: false,
      cellClassName: (params) => rowModesModel[params.id]?.mode === GridRowModes.Edit ? 'non-editable-cell' : '',
    },
    {
      field: 'language',
      headerName: 'Language',
      width: 140,
      editable: false,
      cellClassName: (params) => rowModesModel[params.id]?.mode === GridRowModes.Edit ? 'non-editable-cell' : '',
    },
    {
      field: 'view_count',
      headerName: 'Views',
      width: 107,
      editable: false,
      cellClassName: (params) => rowModesModel[params.id]?.mode === GridRowModes.Edit ? 'non-editable-cell' : '',
    },
    {
      field: 'mature_flag',
      headerName: 'Flagged',
      width: 120,
      editable: false,
      renderCell: (params) => (
        <Checkbox
          checked={!!params.value}
          disabled
        />
      ),
      cellClassName: (params) => rowModesModel[params.id]?.mode === GridRowModes.Edit ? 'non-editable-cell' : '',
    },
    {
      field: 'visibility',
      headerName: 'Visibility',
      width: 130,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Public', 'Unlisted', 'Private'],
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 140,
        cellClassName: 'actions',
        getActions: (params) => {
          const { id, file_name } = params.row; // Destructure youtube_id from params.row
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      
          if (isInEditMode) {
            return [
              <GridActionsCellItem
                key={`save-${id}`}
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: 'primary.main',
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                key={`cancel-${id}`}
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }
      
          return [
            <Tooltip key={`open-${id}`} title='Open Article'>
              <GridActionsCellItem
                icon={<OpenInNewIcon style={{ color: '#1982c4' }} />}
                label="Open Article"
                className="textPrimary"
                onClick={() => window.open(`https://tubereader.practicalsoftware.com/article/${file_name}.php`, '_blank')}
                color="inherit"
              />
            </Tooltip>,  
            // <Divider
            //   key={`divider-${id}`}
            //   orientation="vertical"
            //   flexItem
            //   sx={{
            //     borderColor: 'rgba(0, 0, 0, 0.6)',
            //   }} 
            // />,
            <Tooltip key={`edit-${id}`} title='Edit'>
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
              />
            </Tooltip>,
            <Tooltip key={`delete-${id}`} title='Delete'>
              <GridActionsCellItem
                icon={<DeleteIcon style={{ color: '' }} />}
                label="Delete"
                onClick={() => handleDeleteClick(id)}
                color="inherit"
              />
            </Tooltip>,
          ];
        },
      }
      
  ];
  
  

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        '& .non-editable-cell': {
          color: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
    <Dialog
    open={open}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
    >
    { /* eslint-disable-next-line react/no-unescaped-entities*/ }
    <DialogTitle>Delete "{delRow.title}"?</DialogTitle>
    <DialogContent>
        <DialogContentText color='black' id="alert-dialog-slide-description">
        Warning: This article will be gone forever!
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
        <Button variant='outlined' color='error' onClick={() => { handleDelete(); handleClose(); }}>Delete</Button>
    </DialogActions>
    </Dialog>



      <Fade in={alertOpen} timeout={300}>
        <Alert
          severity={alertType}
          style={{
            position: 'fixed',
            top: 70,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
          }}
        >
          {alertMessage}
        </Alert>
      </Fade>

    <div 
        style={{ 
            height: '60vh',
            width: '90%'
        }}
    >
        <DataGrid
            pagination
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            paginationMode="server"
            pageSizeOptions={[5, 10, 25]}
            onPaginationModelChange={(model) => {
                setPage(model.page);
                setPageSize(model.pageSize);
            }}
            rowCount={totalRows} // Total row count from server
            initialState={{ 
                pagination: { paginationModel: { pageSize: 5 } } 
            }}
            slots={{
                toolbar: EditToolbar,
            }}
            slotProps={{
                toolbar: { setRows, setRowModesModel },
            }}
        />


    </div>
    </Box>
    </ThemeProvider>

  );
  
}
