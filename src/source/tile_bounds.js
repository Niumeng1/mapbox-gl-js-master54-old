// @flow

const LngLatBounds = require('../geo/lng_lat_bounds');
const clamp = require('../util/util').clamp;

import type {CanonicalTileID} from './tile_id';

class TileBounds {
    bounds: LngLatBounds;
    minzoom: number;
    maxzoom: number;

    constructor(bounds: [number, number, number, number], minzoom: ?number, maxzoom: ?number) {
        this.bounds = LngLatBounds.convert(this.validateBounds(bounds));
        this.minzoom = minzoom || 0;
        this.maxzoom = maxzoom || 24;
    }

    validateBounds(bounds: [number, number, number, number]) {
        // make sure the bounds property contains valid longitude and latitudes
        if (!Array.isArray(bounds) || bounds.length !== 4) return [-180, -90, 180, 90];
     //   return [Math.max(-180, bounds[0]), Math.max(-90, bounds[1]), Math.min(180, bounds[2]), Math.min(90, bounds[3])];
        return [Math.max( 420043.291699999943, bounds[0]), Math.max(253042.74990000017, bounds[1]), Math.min(597919.739900000393, bounds[2]), Math.min(432493.1771000009, bounds[3])];
    }

    contains(tileID: CanonicalTileID) {
        const level = {
            minX: Math.floor(this.lngX(this.bounds.getWest(), tileID.z)),
            minY: Math.floor(this.latY(this.bounds.getNorth(), tileID.z)),
            maxX: Math.ceil(this.lngX(this.bounds.getEast(), tileID.z)),
            maxY: Math.ceil(this.latY(this.bounds.getSouth(), tileID.z))
        };
        const hit = tileID.x >= level.minX && tileID.x < level.maxX && tileID.y >= level.minY && tileID.y < level.maxY;
        return hit;
    }

    lngX(lng: number, zoom: number) {
        //return (lng + 180) * (Math.pow(2, zoom) / 360);
        return  (9502136.49754042178 + lng) * (Math.pow(2, zoom) / (2 * 10002136.4975404218));
    }

    latY(lat: number, zoom: number) {
        // const f = clamp(Math.sin(Math.PI / 180 * lat), -0.9999, 0.9999);
        // const scale = Math.pow(2, zoom) / (2 * Math.PI);
        // return Math.pow(2, zoom - 1) + 0.5 * Math.log((1 + f) / (1 - f)) * -scale;
        return (10002136.4975404218 -lat) * (Math.pow(2, zoom)/ (2 * 10002136.4975404218));
    }
}

module.exports = TileBounds;
