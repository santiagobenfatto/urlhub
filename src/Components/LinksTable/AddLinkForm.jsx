import React, { useState } from 'react'
import { IconButton, TableCell, TextField } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import { addLink as addLinkService } from '../../Service/linksList.service.js'
import { addLink as addLinkRedux } from '../../Redux/slices/links.slice.js'
import { useDispatch } from 'react-redux'
import { useLinksManager } from '../../Context/CustomHooks.jsx'

const AddLinkForm = () => {
    //seteo de error según respuesta del server si el alias existe.
    const [ error, setError ] = useState({
            error: false,
            message: ''
        })
        const [formData, setFormData] = useState({
            big_link: '',
            alias: '',
        })
    
        const { handleCancel } = useLinksManager()
        const dispatch = useDispatch()
    
        const handleInputChange = (field, value) => {
            setFormData(prevState => ({
                ...prevState,
                [field]: value,
            }))
        }
    
        const handleFormSubmit = async () => {
            try {
                //const result = await addLinkService(formData)
    
                dispatch(addLinkRedux(formData)) //Opción de prueba sin backend.
                setError({ error: false, message: '' })
                // if (result.status.ok) {
                //     // dispatch(addLinkRedux(result.data)) //Opción retorno del backend.
                //     handleCancel() 
                // } else {
                //     throw new Error(result.message || 'Error desconocido al añadir el enlace')
                // }
            } catch (err) {
                setError({
                    error: true,
                    message: err.response?.data?.message || 'El alias ya existe o hubo un error.',
                })
            }
        }


    const TextFieldProps = {
        '&.MuiTextField-root': {
            overflow: 'hidden',
            backgroundColor: 'white',
            fontFamily: 'Roboto',
            fontSize: '1rem',
            borderRadius: '12px',
        },
        'input': {
            py: '8px'
        },
        '& .MuiOutlinedInput-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent', // Elimina el hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent', // Elimina el focus
            }
        }
    }

    
    return (
        <>
            <TableCell>
            <TextField 
                size='small'
                variant='outlined'
                placeholder='Big Link'
                error={error.error}
                helperText={error.message}
                required 
                onChange={e => handleInputChange('big_link', e.target.value)}
                sx={TextFieldProps} />
            </TableCell>
            <TableCell>
                <TextField 
                    size='small'
                    variant='outlined'
                    placeholder='/alias'
                    error={error.error}
                    helperText={error.message}
                    required 
                    onChange={e => handleInputChange('alias', e.target.value)}
                    sx={TextFieldProps} />
                </TableCell>
            <TableCell>
                Icon options
            </TableCell>
            <TableCell>
                <QrCode2Icon />    
            </TableCell>
                <TableCell sx={{ textAlign: 'center'}} >
                <IconButton 
                    onClick={handleFormSubmit}
                    sx={{
                        fontWeight: 600,
                        color: 'green',
                        p: 0,
                        ':hover': {
                        filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 1))'
                    }
                    }}>
                <CheckIcon sx={{ fontSize: 'inherit' }}/>
                </IconButton>
                <IconButton 
                    onClick={handleCancel}
                    sx={{
                        fontWeight: 600,
                        color: 'red',
                        p: 0,
                        ':hover': {
                            filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 1))'
                        }
                    }}>
                <ClearIcon sx={{ fontSize: 'inherit' }}/> 
                </IconButton>                
            </TableCell>
        </>
        
    )
}

export default AddLinkForm
