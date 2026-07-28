import React, { useState } from 'react'
import { Box, Button, FormControl, IconButton, InputAdornment, MenuItem, Select, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import DynamicIcon from '../Icons/DynamicIcon.jsx'
import Icons from '../Icons/Icons.jsx'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import { updateLinkAdapter } from '../../Adapters/links.adapter.js'
import { updateLinkField } from '../../Redux/slices/links.slice.js'
import { updateLink as updateLinkService } from '../../Service/links.service.js'
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


    const { handleEditting } = useLink()
    const dispatch = useDispatch()
    const linksList = useSelector(state => state.links.links)
    const [link] = linksList.filter(e => e.id === linkId )

    const [formData, setFormData] = useState({
        alias: link?.alias?.replace(/^\//, '') || '',
        title: link?.title || '',
        icon: link?.icon || ''
    })
    

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
            const updates = {}
            const originalAlias = link?.alias?.replace(/^\//, '') || ''
            const originalTitle = link?.title || ''
            const originalIcon = link?.icon || ''

            if (formData.alias !== originalAlias) {
                updates.alias = formData.alias
            }
            if (formData.title !== originalTitle) {
                updates.title = formData.title
            }
            if (formData.icon !== originalIcon) {
                updates.icon = formData.icon
            }

            if (Object.keys(updates).length === 0) {
                toast.info('No se detectaron cambios', { theme: 'dark' })
                return
            }

            const result = await updateLinkService(linkId, updates)
            const adapted = await updateLinkAdapter(result)

            setAliasError({ error: false, message: '' })
            setTitleError({ error: false, message: '' })
            dispatch(updateLinkField({ id: linkId, field: 'title', value: adapted.title }))
            dispatch(updateLinkField({ id: linkId, field: 'alias', value: adapted.alias }))
            dispatch(updateLinkField({ id: linkId, field: 'icon', value: adapted.icon }))
            dispatch(updateLinkField({ id: linkId, field: 'shortLink', value: adapted.shortLink }))
            toast.success('Link actualizado exitosamente', { theme: 'dark'})
            handleEditting(linkId)
        } catch (err) {
            console.log(err)
            toast.error(err.message || 'Error al actualizar el link', { theme: 'dark' })
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
                onClick={() => handleEditting(linkId)}
                >
                <CloseIcon/>
            </IconButton>
             <Typography color='secondary' variant='h5'>
                Edit Link:
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'flex-start' },
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
                sx={{ width: { xs: '100%', sm: '40%' } }} 
            />
            </Tooltip>
            <Tooltip title='Customize the alias or leave it unchanged'>
                <TextField 
                    size='small'
                    variant='outlined'
                    value={formData.alias}
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
                    sx={{ width: { xs: '100%', sm: '20%' } }} 
                />
            </Tooltip>
            <Tooltip title='Set a title for the button in your hub.'>
                <TextField 
                    size='small'
                    variant='outlined'
                    value={formData.title}
                    placeholder={link.title}
                    error={titleError.error}
                    helperText={titleError.message}
                    required 
                    onChange={e => handleInputChange('title', e.target.value)}
                    sx={{ width: { xs: '100%', sm: '20%' } }} 
                />
            </Tooltip>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
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
                            endIcon={<EditIcon/>}
                            sx={{
                                width: { xs: '100%', sm: '150px' }
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
