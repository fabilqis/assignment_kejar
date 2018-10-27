function findLocation(x,y) {
    //console.log(x,y)
    for (var i=0; i<places.length; i++) {
        if (places[i].lokasi[0]==x && places[i].lokasi[1]==y) {
            return i;
        }
    }
    return -1;
}

function showLocation(e) {
    //console.log("you clicked" + e.latlng.lat + "dan" + e.latlmg.lng);
    let ix = findLocation(e.latlng.lat, e.latlng.lng);
    if (ix >=0) {
        img.src = places[ix].gambar;
        par.textContent=places[ix].review;
    }
}

//Metode IIFE
(async function(){
    const URL = "./peta.json";
    try {
        let res = await(fetch(URL));
        let res2 = await res.json();
        localStorage.setItem('places', JSON.stringify(res2.places));
    }
    catch(err){
        console.log(err);
    }
})();

let gmb = document.getElementById("gmb")
let rev = document.getElementById('review')
let img = document.createElement("img")
let par = document.createElement('p')
gmb.appendChild(img)
rev.appendChild(par)

// const URL = "./peta.json";
// Metode Fetch
// fetch(URL)
// .then(function(response){
//     if(response.status !==200){
//         console.log('Status code:' + response.status);
//         throw response.statusText;
//     }
//     return response.json()
// })
// .then (res => {
//     let places = res.places;
//     localStorage.setItem('places',
//     JSON.stringify(res.places));
// })
// .catch(function(err){
//     console.log(err);
// })

//Metode Async
// async function f(url) {
//     try {
//         const res = await(fetch(url));
//         const res2 = await res.json();
//         localStorage.setItem('places', JSON.stringify(res2.places));
//     }
//     catch(err){
//         console.log(err);
//     }
// }
// f(URL);


let places= JSON.parse(localStorage.getItem('places'));
for (var p of places) {
    var marker = L.marker(p.lokasi).addTo(mymap)
    .bindPopup(p.sponsor);
    marker.on('click', showLocation);
}
