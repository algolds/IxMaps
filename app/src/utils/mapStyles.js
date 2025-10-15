const generateStyle = (id) => {
return (id.toLowerCase() === 'rivers') ? {
  id: id,
  type: 'line',
  paint: {
    'line-color': ['get', 'fill'],
    'line-width': 1

  },
}
 : {
  id: id,
  type: 'fill',
  paint: {
    'fill-color': ['get', 'fill'],
  },
}


}

export default generateStyle;
