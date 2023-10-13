import React from "react";

const MapWrapper = React.memo(
    () => {
        return <div id="map-container" style={{width: '100vw', height: '50vh'}}></div>;
    },
    () => true,
);

export default MapWrapper;