import { Paper, Checkbox, FormControlLabel } from '@mui/material';

const LayerToggle = ({ mapRef, layerIds }) => {
    const reveredLayerIds = [...layerIds].reverse()

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
                {reveredLayerIds.map((layerId) => (
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
        </Paper>
    )
}

export default LayerToggle;