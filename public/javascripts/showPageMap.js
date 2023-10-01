mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: camp.geometry.coordinates,
    zoom: 6
});

map.addControl(new mapboxgl.NavigationControl());

const marker = new mapboxgl.Marker()
    .setLngLat(camp.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
        .setHTML(
            `<h3>${camp.title}</h3> <p>${camp.location}</p>`
        )
    )
    .addTo(map);