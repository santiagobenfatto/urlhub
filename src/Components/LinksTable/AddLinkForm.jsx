import React, { useState } from 'react'
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputAdornment, MenuItem, Select, Stack, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import DynamicIcon from '../Icons/DynamicIcon.jsx'
import Icons from '../Icons/Icons.jsx'
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
            } else {
                setBigLinkError({error: false, message: '',})
            }
        }
        if(field === 'alias') {
            if (!validateAlias(value)) {
                setAliasError({
                    error: true,
                    message: 'Máx 5 caracteres, letras y números'
                })
            }  else {
                setAliasError({ error: false, message: '' })
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
            toast.success('Formulario enviado', { theme: 'dark'})
        } catch (err) {
            setBigLinkError({
                error: true,
                message: err.response?.data?.message || 'El alias ya existe o hubo un error.',
            })
        }
    }

    
    return (
        <Stack 
            component='form'
            onSubmit={handleFormSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
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
                    sx={{ width: '40%' }} />
                <TextField 
                    size='small'
                    variant='outlined'
                    placeholder='/alias'
                    error={aliasError.error}
                    helperText={aliasError.message}
                    required 
                    onChange={e => handleInputChange('alias', e.target.value)}
                    startadornment={<InputAdornment position="start">/</InputAdornment>}
                    sx={{ width: '20%'}} />
                <TextField 
                    size='small'
                    variant='outlined'
                    placeholder='Name'
                    error={nameError.error}
                    helperText={nameError.message}
                    required 
                    onChange={e => handleInputChange('name', e.target.value)}
                    sx={{ width: '20%'}} />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                gap: '16px'
            }}>
            {/* <FormControl sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                <FormControlLabel 
                    sx={{ color: '#ffffff', fontFamily: 'Roboto', width: '20%'}}
                    control={<Checkbox 
                        color='secondary'
                        defaultChecked 
                        label='QR select'
                        /> 
                    }
                    label='QR?' />
                </FormControl> */}
                
                <FormControl>
                <Select
                    size="small"
                    value={formData.icon}
                    inputProps={{ 'aria-label': 'Without label' }}
                    displayEmpty
                    onChange={e => handleInputChange('icon', e.target.value)}
                    renderValue={(selected) => (
                        selected ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <DynamicIcon iconName={selected} />
                            {selected}
                        </Box>
                        ) : (
                        'None' // Valor por defecto
                        )
                    )}
                    >
                    <MenuItem value="">
                        None
                    </MenuItem>
                    {Icons.map((icon) => (
                        <MenuItem key={icon.name} value={icon.name} sx={{ display: 'flex', gap: '4px' }}>
                        <DynamicIcon iconName={icon.name} />
                        {icon.name}
                        </MenuItem>
                    ))}
                    </Select>
                    </FormControl>

                <Button 
                        type='submit'
                        endIcon={<AddIcon/>}
                        disabled={
                            bigLinkError.error || aliasError.error || nameError.error || 
                            !formData.big_link || !formData.alias || !formData.name
                        }
                        sx={{
                            width: '150px'
                        }}>
                        Add
                </Button>
            </Box>
        </Stack>
        
    )
}

export default AddLinkForm
