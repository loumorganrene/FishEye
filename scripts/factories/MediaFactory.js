import { Photo, Video } from "../models/MediasModel.js"
/** Media factory pattern */ 
export class MediaFactory {
    /**
     * 
     * @param {Object} photographer
     * @param {IMedia} media 
     */
    constructor(photographer, media) {
        this._photographer = photographer
        this._media = media
    }
    /**
     * @returns {HTMLImageElement | HTMLVideoElement} Media DOM Element
     */
    createMediaCard() {
        if (this._media.image) { // If media type is image
            return new Photo(this._photographer, this._media).render()
        } else if (this._media.video) { // If media type is video
            return new Video(this._photographer, this._media).render()
        } else {
            throw 'Unknown type format'
        }
    }
 }
