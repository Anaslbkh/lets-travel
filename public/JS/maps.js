let platform = new H.service.Platform({
    'apikey': 'V0uFp79VD8FKzqbMLhL7XyTqW8v3Ncxw7BT47Mr7vjE'
});



function landmarkGeocode() {
    let title = document.querySelector('h1').textContent;
    var geocoder = platform.getGeocodingService(),
        landmarkGeocodingParameters = {
            searchtext: title,
            jsonattributes: 1
        };

    geocoder.search(
        landmarkGeocodingParameters,
        showMap,
        (e) => console.log(e)
    );
}
function showMap(result) {
    let location = result.response.view[0].result[0].location.displayPosition;
    console.log(location);

    // Obtain the default map types from the platform object:
    let defaultLayers = platform.createDefaultLayers();
    // Instantiate (and display) a map object:
    let map = new H.Map(
        document.querySelector('.map'),
        defaultLayers.vector.normal.map,
        {
            zoom: 15,
            center: { lat: location.latitude, lng: location.longitude },

        });
    //add marker to the map
    var marker = new H.map.Marker({ lat: location.latitude, lng: location.longitude });
    map.addObject(marker);
    // Create the default UI:
    let ui = H.ui.UI.createDefault(map, defaultLayers);
}


landmarkGeocode();