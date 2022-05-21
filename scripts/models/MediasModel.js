/** Media constructor pattern
 * @typedef {Object} IMedia
 * @property {number} id
 * @property {number} photographerId
 * @property {string} title
 * @property {string | null} image
 * @property {string | null} video
 * @property {number} likes
 * @property {string} date
 * @property {number} price
 */
export class Media {
    constructor(photographer, medias) {
        this._media = medias;
        this._id = medias.id
        this._photographerName = photographer.name;
        this._photographer = medias.photographerId
        this._title = medias.title
        this._likes = medias.likes
        this._date = medias.date
        this._price = medias.price
    }

    get id() {
        return this._id
    }

    get photographer() {
        return this._photographer
    }

    get title() {
        return this._title
    }

    get likes() {
        return this._likes
    }

    get date() {
        return this._date
    }

    get price() {
        return this._price
    }
}

export class Photo extends Media {
    /**
     * @param {Object} photographer 
     * @param {IMedia} media 
     */
    constructor(photographer, media) {
        super(photographer, media)
        this._image = media.image
    }

    /**
     * @returns {HTMLImageElement}
     */
    render() {
        const thumbnail = document.createElement( 'img' );
        thumbnail.classList.add( "media_thumbnail" );
        thumbnail.setAttribute( "src", `assets/photographers/${this._photographerName}/${this._image}` );
        thumbnail.setAttribute( "alt", `${this._media.title}, vue en gros plan` );
        return thumbnail;
    }
}

export class Video extends Media {
    /**
     * @param {Object} photographer 
     * @param {IMedia} media 
     */
    constructor(photographer, media) {
        super(photographer, media)
        this._video = media.video
    }

    /**
     * @returns {HTMLVideoElement}
     */
    render() {
        const videoThumbnail = document.createElement( 'video' )
        const videoSrc = document.createElement( 'source' )
        videoSrc.setAttribute( "src", `assets/photographers/${this._photographerName}/${this._video}` );
        videoSrc.setAttribute( "type", `video/mp4` );
        videoSrc.setAttribute( "alt", `${this._media.title}, vue en gros plan` );  
        videoThumbnail.classList.add( "media_thumbnail" );
        videoThumbnail.setAttribute( "aria-label", `${this._media.title}, vue en gros plan` );
        videoThumbnail.setAttribute( "tabIndex", -1);
        videoThumbnail.appendChild(videoSrc);
        return videoThumbnail;
    }
}
