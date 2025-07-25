import React, { useState } from 'react'
import { Box, Button, FormControl, InputAdornment, MenuItem, Select, Stack, TextField, Tooltip } from '@mui/material'
import { toast } from 'react-toastify'
import DynamicIcon from '../Icons/DynamicIcon.jsx'
import Icons from '../Icons/Icons.jsx'
import AddIcon from '@mui/icons-material/Add'
import { addLink as addLinkRedux } from '../../Redux/slices/links.slice.js'
import { useDispatch } from 'react-redux'
import { validateUrl, validateAlias } from '../../Utils/validateRegex.js'
import { addLinkAdapter } from '../../Adapters/links.adapter.js'


const AddLinkForm = () => {
    const [ bigLinkError, setBigLinkError ] = useState({
            error: false,
            message: ''
        })
    
    const [ aliasError, setAliasError ] = useState({
        error: false,
        message: ''
    })
    const [ titleError, setTitleError ] = useState({
        error: false,
        message: ''
    })


    const [formData, setFormData] = useState({
        bigLink: '',
        alias: '',
        title: '',
        icon: ''
    })


    const dispatch = useDispatch()

    const handleInputChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value,
        }))
        if(field === 'bigLink') {
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
                    message: 'Máx 5 caracteres, letras y números.'
                })
            }  else {
                setAliasError({ error: false, message: '' })
            }
        }
        if (field === 'title') {
            if (value.length > 15) {
                setTitleError({
                    error: true,
                    message: 'Máximo 15 caracteres.',
                })
            } else {
                setTitleError({ error: false, message: '' })
            }
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await addLinkService(formData)
            const linkAdapted = await addLinkAdapter(result)
            
            setBigLinkError({ error: false, message: '' })
            setAliasError({ error: false, message: '' })
            setTitleError({ error: false, message: '' })
            if (result.status.ok) {
                dispatch(addLinkRedux(linkAdapted))
            } else {
                throw new Error(result.message || 'Error desconocido al añadir el enlace')
            }
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
                alignItems: 'flex-start',
                gap: '12px'
            }}>
            <Tooltip title='Enter the long URL you want to shorten'>
            <TextField 
                size='small'
                variant='outlined'
                placeholder='Big Link'
                error={bigLinkError.error}
                helperText={bigLinkError.message}
                required 
                onChange={e => handleInputChange('bigLink', e.target.value)}
                sx={{ width: '40%' }} 
            />
            </Tooltip>
            <Tooltip title='Customize the alias or leave it blank for an auto-generated one'>
                <TextField 
                    size='small'
                    variant='outlined'
                    placeholder='alias'
                    error={aliasError.error}
                    helperText={aliasError.message}
                    required 
                    onChange={e => handleInputChange('alias', e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (<InputAdornment position='start'>/</InputAdornment>)
                        }
                    }}
                    sx={{ width: '20%' }} 
                />
            </Tooltip>
            <Tooltip title='Set a title for the button in your hub.'>
                <TextField 
                    size='small'
                    variant='outlined'
                    placeholder='Title'
                    error={titleError.error}
                    helperText={titleError.message}
                    required 
                    onChange={e => handleInputChange('title', e.target.value)}
                    sx={{ width: '20%' }} 
                />
            </Tooltip>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                gap: '16px'
            }}>                
                <FormControl>
                <Tooltip title='Select an icon for your hub button.'>
                <Select
                    size='small'
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
                    <MenuItem value=''>
                        None
                    </MenuItem>
                    {Icons.map((icon) => (
                        <MenuItem key={icon.name} value={icon.name} sx={{ display: 'flex', gap: '4px' }}>
                        <DynamicIcon iconName={icon.name} />
                        {icon.name}
                        </MenuItem>
                    ))}
                </Select>
                </Tooltip>
                </FormControl>
                <Tooltip 
                    title={ 
                        bigLinkError.error || aliasError.error || titleError.error || 
                        !formData.bigLink || !formData.alias || !formData.title 
                        ? 'All fields must be completed to add a link.' 
                        : 'Click to add your shortened link.' 
                    }
                    disableInteractive
                >
                    <span>
                        <Button 
                            type='submit'
                            endIcon={<AddIcon/>}
                            disabled={
                                bigLinkError.error || aliasError.error || titleError.error || 
                                !formData.bigLink || !formData.alias || !formData.title
                            }
                            sx={{
                                width: '150px'
                            }}
                        >
                            Add
                        </Button>
                    </span>
                </Tooltip>
            </Box>
        </Stack>
        
    )
}

export default AddLinkForm
