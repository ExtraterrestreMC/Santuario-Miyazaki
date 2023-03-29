const url = url_base + "bonos";


window.addEventListener("load", () => {
    let map = L.map('map').setView([38.6436863, -0.8732], 15)

    //Agregar tilelAyer mapa base desde openstreetmap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var marker = L.marker([38.6436863, -0.8732]).addTo(map);
    var popup = L.popup()
        .setLatLng([38.6442, -0.8732])
        .setContent("Estamos aqui.")
        .openOn(map)
        .addTo(map)
})