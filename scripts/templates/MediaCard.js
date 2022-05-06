export class MediaCard {
    constructor (media, photographer) {
        this._photographer = photographer
        this._media = media
        this._image = media.image
        this._video = media.video
    }

    createMediaCard() {
        const docFrag = document.createDocumentFragment();
        const $mediaCard = document.createElement('article');
        $mediaCard.classList.add( "media_card" );

        // Link to lightbox modal
        const a = document.createElement( 'a' );
        a.classList.add( "media_thumbnail-link" );
        a.setAttribute( "href",  `` );
        $mediaCard.appendChild(a);

        // Media thumbnail
        if (this._image) { //if its an image
            const thumbnail = document.createElement( 'img' );
            thumbnail.classList.add( "media_thumbnail" );
            thumbnail.setAttribute( "src", `assets/photographers/${this._photographer.name}/${this._image}` );
            thumbnail.setAttribute( "alt", `${this._media.title}, vue en gros plan` );        
            a.appendChild(thumbnail);
        } else if (this._video) { //if its a video
            const videoThumbnail = document.createElement( 'video' )
            const videoSrc = document.createElement( 'source' )
            videoSrc.setAttribute( "src", `assets/photographers/${this._photographer.name}/${this._video}` );
            videoSrc.setAttribute( "type", `video/mp4` );
            videoSrc.setAttribute( "alt", `${this._media.title}, vue en gros plan` );  
            videoThumbnail.classList.add( "media_thumbnail" );
            videoThumbnail.setAttribute( "aria-label", `${this._media.title}, vue en gros plan` );
            videoThumbnail.appendChild(videoSrc);
            a.appendChild(videoThumbnail);
        }

        // Media info$mediaCard
        const mediaInfos = document.createElement( 'div' );
        mediaInfos.classList.add( "media_info" );

        // Media name
        const title = document.createElement( 'h2' );
        title.classList.add( "media_title" );
        title.textContent = `${this._media.title}`;
        mediaInfos.appendChild(title);
        
        // Media like
        const like = document.createElement( 'p' );
        like.classList.add( "media_like" );
        like.textContent = `${this._media.likes}`;
        const icon = document.createElement( 'i' );
        icon.classList.add( "fa-solid" );
        icon.classList.add( "fa-heart" );
        icon.setAttribute( "aria-label", "likes" );
        mediaInfos.appendChild(like);
        mediaInfos.appendChild(icon);

        $mediaCard.appendChild(mediaInfos);
        docFrag.appendChild($mediaCard);

        return docFrag;
    }
}

// export class PhotoCard extends MediaCard {
//     constructor (media, photographer) {
//         super(media,photographer)
//     }

//     createPhotoCard() {
//         // Media thumbnail
//         const a = document.querySelector( '.media_thumbnail-link' );
//         console.log(a);
//         const thumbnail = document.createElement( 'img' );
//         thumbnail.classList.add( "media_thumbnail" );
//         thumbnail.setAttribute( "src", `assets/photographers/${this._photographer.name}/${this._media.image}` );
//         thumbnail.setAttribute( "alt", `${this._media.title}, vue en gros plan` );
//         a.appendChild(thumbnail);
//     }
// }

// export class VideoCard extends MediaCard {
//     constructor (media, photographer) {
//         super(media,photographer)
//     }

//     createVideoCard() {
//         // Media thumbnail
//         const a = document.querySelector( '.media_thumbnail-link' );
//         console.log(a);
//         const thumbnail = document.createElement( 'img' );
//         thumbnail.classList.add( "media_thumbnail" );
//         thumbnail.setAttribute( "src", `assets/photographers/${this._photographer.name}/${this._media.video}` );
//         thumbnail.setAttribute( "alt", `${this._media.title}, vue en gros plan` );
//         a.appendChild(thumbnail);
//     }
// }