import React, { useState } from 'react'
import { Box, Button, FormControl, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import DynamicIcon from '../Icons/DynamicIcon.jsx'
import Icons from '../Icons/Icons.jsx'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { addLink as addLinkRedux } from '../../Redux/slices/links.slice.js'
import { addNewLink as addNewLinkService } from '../../Service/links.service.js'
import { useDispatch, useSelector } from 'react-redux'
import { validateAlias } from '../../Utils/validateRegex.js'
import { useLink } from '../../Context/useLink.jsx'


const EditLinkForm = ({linkId}) => {

    const [ aliasError, setAliasError ] = useState({
        error: false,
        message: ''
    })
    const [ titleError, setTitleError ] = useState({
        error: false,
        message: ''
    })


    const [formData, setFormData] = useState({
        alias: '',
        title: '',
        icon: ''
    })

    const { setIsEdditing } = useLink()
    const dispatch = useDispatch()
    const linksList = useSelector(state => state.links.links)
    const [link] = linksList.filter(e => e.id === linkId )
    

    const handleInputChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value,
        }))
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
            const result = await addNewLinkService(formData)
            
            setAliasError({ error: false, message: '' })
            setTitleError({ error: false, message: '' })
            if (result.status.ok) {
                const formattedLink = addLinkAdapter(result)
                dispatch(addLinkRedux(formattedLink))
            } else {
                throw new Error(result.message || 'Error desconocido al añadir el enlace')
            }
            toast.success('Formulario enviado', { theme: 'dark'})
        } catch (err) {
            console.log(err)
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
            <IconButton sx={{
                alignSelf: 'flex-end',
                width: '50px'
                }}
                color='secondary'
                onClick={() => setIsEdditing(false)}
                >
                <CloseIcon/>
            </IconButton>
             <Typography color='secondary'>
                Edit Link:
            </Typography>
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
                color='primary'
                defaultValue={link.bigLink}
                slotProps={{
                    input: {
                        readOnly: true,
                    }
                }}
                // placeholder={link.bigLink}
                sx={{ width: '40%' }} 
            />
            </Tooltip>
            <Tooltip title='Customize the alias or leave it blank for an auto-generated one'>
                <TextField 
                    size='small'
                    variant='outlined'
                    placeholder={link.alias}
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
                    placeholder={link.title}
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
                        aliasError.error || titleError.error || 
                        !formData.alias || !formData.title 
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
                                aliasError.error || titleError.error || 
                                !formData.alias || !formData.title
                            }
                            sx={{
                                width: '150px'
                            }}
                        >
                            Edit
                        </Button>
                    </span>
                </Tooltip>
            </Box>
        </Stack>
        
    )
}

export default EditLinkForm
