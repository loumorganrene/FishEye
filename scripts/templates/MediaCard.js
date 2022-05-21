import { MediaFactory } from "../factories/MediaFactory.js";
export class MediaCard {
    constructor (media, photographer, LikesSubject) {
        this._photographer = photographer
        this._media = media
        this.LikesSubject = LikesSubject
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
        const mediaDomElement = new MediaFactory(this._photographer, this._media).createMediaCard();
        a.appendChild(mediaDomElement);

        // Media info
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
        const icon = document.createElement( 'i' ); // Font awesome heart icon
        icon.classList.add( "far" );
        icon.classList.add( "fa-heart" );
        icon.setAttribute( "aria-label", "likes" );
        mediaInfos.appendChild(like);
        mediaInfos.appendChild(icon);

        // Media like/dislike handling
        icon.addEventListener('click', () => {
            if (icon.classList.contains("fas")) {
                icon.classList.replace( "fas", "far" );
                this.LikesSubject.fire( 'DISLIKE' );
            } else {
                icon.classList.replace( "far", "fas" );
                this.LikesSubject.fire( 'LIKE' );
            }
        })

        $mediaCard.appendChild(mediaInfos);
        docFrag.appendChild($mediaCard);

        return docFrag
    }
}