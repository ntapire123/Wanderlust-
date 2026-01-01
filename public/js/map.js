// Initializes a MapTiler map on an element with id "map".
// Expects the element to have data-token and data-coordinates attributes.

// data-coordinates should be a JSON string of [lng, lat].
(function(){
  function initMap() {
    const mapEl = document.getElementById('map');
    if (!mapEl) return;

    const token = mapEl.dataset.token || '';
    const coordsRaw = mapEl.dataset.coordinates || '[0,0]';
    let coordinates;
    try { coordinates = JSON.parse(coordsRaw); } catch (e) { coordinates = [0,0]; }

    if (!window.maptilersdk) {
      console.error('maptilersdk is not loaded. Include the MapTiler SDK script in your layout.');
      return;
    }

    maptilersdk.config.apiKey = token;

    const map = new maptilersdk.Map({
      container: 'map',
      style: maptilersdk.MapStyle.STREETS,
      center: coordinates,
      zoom: 14
    });

    const popup = new maptilersdk.Popup({
      offset: 25,
      className: 'map-popup'
    }).setHTML('<strong>Exact Location will be provided after booking</strong>');

    new maptilersdk.Marker({ color: '#FF0000' })
      .setLngLat(coordinates)
      .setPopup(popup)
      .addTo(map);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
  } else {
    initMap();
  }
})();
