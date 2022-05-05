export class PhotoCard {
    constructor (media, photographer) {
        this._photographer = photographer
        this._media = media
    }

    createPhotoCard() {
        const docFrag = document.createDocumentFragment();
        const $mediaCard = document.createElement('article');
        $mediaCard.classList.add( "media_card" );

        // Link to lightbox modal
        const a = document.createElement( 'a' );
        a.setAttribute( "href",  `` );
        $mediaCard.appendChild(a);

        // Media thumbnail
        const thumbnail = document.createElement( 'img' );
        thumbnail.classList.add( "media_thumbnail" );
        thumbnail.setAttribute( "src", `assets/photographers/${this._photographer.name}/${this._media.image}` );
        thumbnail.setAttribute( "alt", `${this._media.title}, vue en gros plan` );
        a.appendChild(thumbnail);

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
