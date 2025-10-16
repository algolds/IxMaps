import {
    Paper,
    Checkbox,
    FormControlLabel,
    Box,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel
} from '@mui/material';

const LayerToggle = ({ mapRef, layerIds, setMapStyleState }) => {
    const reversedLayerIds = [...layerIds].reverse()

    const onProjectionChange = (event) => {
        const projection = event.target.value;
        setMapStyleState((prevState) => ({
            ...prevState,
            projection: { type: projection }
        }));
    }

    const handleToggle = (event) => {
        const layerId = event.target.id;
        const desiredState = event.target.checked
        if (!desiredState) {
            mapRef.current.getLayer(layerId).visibility = 'none'
        }
        else {
            mapRef.current.getLayer(layerId).visibility = 'visible'
        }
        mapRef.current.triggerRepaint()
    }

    return (
        <Paper elevation={3} sx={{
            position: 'fixed',
            top: '70px',
            right: '20px',
            backgroundColor: 'rgba(240, 239, 240, 1)',
            fontSize: '1.2rem',
            minWidth: '70px',
            borderRadius: '5px',
            border: 'none',
        }}>
            <ul style={{ 'listStyle': 'none', 'margin': 0, 'paddingLeft': '15px' }}>
                {reversedLayerIds.map((layerId) => (
                    <li key={layerId}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id={layerId}
                                    defaultChecked
                                    onChange={handleToggle}
                                />
                            }
                            label={layerId.charAt(0).toUpperCase() + layerId.slice(1)}
                        />
                    </li>
                ))}
            </ul>
            <hr style={{margin: 0}} />
            <Box sx={{ pl: '15px' }}>

                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="mercator"
                        name="radio-buttons-group"
                        onChange={onProjectionChange}
                    >
                        <FormControlLabel value="mercator" control={<Radio />} label="Web Mercator" />
                        <FormControlLabel value="globe" control={<Radio />} label="Globe" />
                    </RadioGroup>
                </FormControl>

            </Box>

        </Paper>
    )
}

export default LayerToggle;