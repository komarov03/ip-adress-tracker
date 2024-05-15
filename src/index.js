import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {addTileLayer, addOffset, validateIp, getAdress} from './helpers';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
});

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
})

addTileLayer(map);

L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map);

function getData() {
    if (validateIp(ipInput.value)) {
        getAdress(ipInput.value).then(setInfo);
    }
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    console.log(mapData);
    ipInfo.innerText = mapData.ip_address;
    locationInfo.innerText = `${mapData.country} ${mapData.region}`;
    timezoneInfo.innerText = mapData.timezone.name;
    ispInfo.innerText = mapData.connection.isp_name;

    map.setView([mapData.latitude, mapData.longitude])
    L.marker([mapData.latitude, mapData.longitude], {icon: markerIcon}).addTo(map);

    if (matchMedia("(max-width: 1023px)").matches) {
        addOffset(map);
    }
}