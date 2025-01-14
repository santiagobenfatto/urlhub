import React, { useState } from 'react'
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { addLink as addLinkService } from '../../Service/linksList.service.js'
import DynamicIcon from '../Icons/DynamicIcon.jsx'
import AddIcon from '@mui/icons-material/Add'
import { addLink as addLinkRedux } from '../../Redux/slices/links.slice.js'
import { useDispatch } from 'react-redux'
import { validateUrl, validateAlias } from '../../Utils/validateRegex.js'


const AddLinkForm = () => {
    const [ bigLinkError, setBigLinkError ] = useState({
            error: false,
            message: ''
        })
    
    const [ aliasError, setAliasError ] = useState({
        error: false,
        message: ''
    })
    const [ nameError, setNameError ] = useState({
        error: false,
        message: ''
    })

    const [formData, setFormData] = useState({
        big_link: '',
        alias: '',
        name: '',
        icon: ''
    })


    const dispatch = useDispatch()

    const handleInputChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value,
        }))
        if(field === 'big_link') {
            if (!validateUrl(value)) {
                setBigLinkError({
                    error: true,
                    message: 'La URL no es válida.',
                })
            }
        }
        if(field === 'alias') {
            if (!validateAlias(value)) {
                setAliasError({
                    error: true,
                    message: 'Máx 5 caracteres, letras y números'
                })
            }
        }
        if (field === 'name') {
            if (value.length > 15) {
                setNameError({
                    error: true,
                    message: 'Máximo 15 caracteres.',
                })
            } else {
                setNameError({ error: false, message: '' })
            }
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            //const result = await addLinkService(formData)

            dispatch(addLinkRedux(formData)) //Opción de prueba sin backend.
            setBigLinkError({ error: false, message: '' })
            setAliasError({ error: false, message: '' })
            setNameError({ error: false, message: '' })
            // if (result.status.ok) {
            //     // dispatch(addLinkRedux(result.data)) //Opción retorno del backend.
            //     handleCancel() 
            // } else {
            //     throw new Error(result.message || 'Error desconocido al añadir el enlace')
            // }
        } catch (err) {
            setBigLinkError({
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
            borderColor: 'transparent', // Elimina el hover
        },
        '& .MuiOutlinedInput-root': {
            '.MuiOutlinedInput-notchedOutline': {
                border: 'none'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent', // Elimina el hover
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent', // Elimina el focus
            }
        }
    }
    const CheckboxProps = {
        color: '#ffffff'
    }

    
    return (
        <Stack 
            component='form'
            onSubmit={handleFormSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: 'auto',
                mt: '24px'
            }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '12px'
            }}>
                <TextField 
                    size='small'
                    variant='outlined'
                    placeholder='Big Link'
                    error={bigLinkError.error}
                    helperText={bigLinkError.message}
                    required 
                    onChange={e => handleInputChange('big_link', e.target.value)}
                    sx={{...TextFieldProps,
                        width: '40%'
                    }} />
                <TextField 
                    size='small'
                    variant='outlined'
                    placeholder='/alias'
                    error={aliasError.error}
                    helperText={aliasError.message}
                    required 
                    onChange={e => handleInputChange('alias', e.target.value)}
                    startadornment={<InputAdornment position="start">/</InputAdornment>}
                    sx={{...TextFieldProps, width: '20%'}} />
                <TextField 
                    size='small'
                    variant='outlined'
                    placeholder='Name'
                    error={nameError.error}
                    helperText={nameError.message}
                    required 
                    onChange={e => handleInputChange('name', e.target.value)}
                    sx={{...TextFieldProps, width: '20%'}} />
                <FormControl>
                    <FormControlLabel 
                        sx={{ color: '#ffffff', fontFamily: 'Roboto', width: '20%'}}
                        control={<Checkbox 
                            color='secondary'
                            defaultChecked 
                            label='QR select'
                            sx={CheckboxProps } /> }
                        label='QR?' />
                    
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="Select Icon"
                    // value={icon}
                    label="Icon"
                    //onChange={handleChange}
                >{ DynamicIcon.map( icon => (
                    <MenuItem 
                        key={icon.icon}
                        value={icon.icon}
                        >Ten</MenuItem>
                ))
                    
                }
                </Select>
                </FormControl>
                <Button 
                    type='submit'
                    endIcon={<AddIcon/>}
                    sx={{
                        alignSelf: 'flex-end',
                        width: '150px'
                    }}>
                    Add
                </Button>
            </Box>
                
        </Stack>
        
    )
}

export default AddLinkForm
