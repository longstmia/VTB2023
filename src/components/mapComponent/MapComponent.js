import React, { useEffect, useState } from 'react';

import { load } from '@2gis/mapgl';
import { Directions } from '@2gis/mapgl-directions';
import { useSelector } from 'react-redux';

import MapWrapper from '../mapWrapper/mapWrapper';
import RouteSwitch from '../routeSwitch/routeSwitch';

const MapComponent = (props) => {
    const [map, setMap] = useState({});
    const [curPos, setCurPos] = useState([]);
    const [mapglApi, setMapGLApi] = useState({});
    const routeType = useSelector((state) => state.routes.type);

    const success = (pos) => {
        const center = [pos.coords.longitude, pos.coords.latitude];
        const marker = new mapglApi.Marker(map, {
            coordinates: [pos.coords.longitude, pos.coords.latitude],
        });
        setCurPos(center);
        map.setCenter(center);

    }

    const error = () => {
        alert('Не удалось определить местоположение');
    }

    const geoFindMe = () => {
        if (!navigator.geolocation) {
            alert('Геолокация не поддерживается вашим браузером');
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    useEffect(() => {
        const directions = new Directions(map, {
            directionsApiKey: '9d37cb77-658c-44e1-8370-a652dbba6792',
        });

        if(curPos.length === 0) return;

        if(routeType === 'auto') {
            directions.carRoute({
                points: [
                    curPos,
                    [37.5948, 55.786426],
                ],
            });
        } else if(routeType === 'pedestrian') {
            directions.pedestrianRoute({
                points: [
                    curPos,
                    [37.5948, 55.786426],    
                ],
            });
        }
    }, [routeType]);

    useEffect(() => {
        let map;

        load().then((mapglAPI) => {
            map = new mapglAPI.Map('map-container', {
                center: [37.622318, 55.754989],
                zoom: 13,
                key: '9d37cb77-658c-44e1-8370-a652dbba6792',
            });

            setMap(map);
            setMapGLApi(mapglAPI);
        });

        return () => map && map.destroy();
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <button onClick={()=> geoFindMe()}>Найти местоположение</button>
            <RouteSwitch/>
            <MapWrapper/>
        </div>
    );
};

export default MapComponent;