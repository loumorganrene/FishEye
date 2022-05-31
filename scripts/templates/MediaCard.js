import { MediaFactory } from "../factories/MediaFactory.js";
export class MediaCard {
    /**
     * @param {Object} photographer 
     * @param {IMedia} media 
     * @param {Observer} LikesSubject
     */
    constructor (media, photographer, LikesSubject) {
        this._photographer = photographer
        this._media = media
        this.LikesSubject = LikesSubject
    }
    /**
     * @returns {HTMLDOMElements}
     */
    createMediaCard() {
        const docFrag = document.createDocumentFragment();
        const $mediaCard = document.createElement('article');
        $mediaCard.classList.add( "media_card" );
        // Link to photographer page
        const a = document.createElement( 'a' );
        a.setAttribute( "href",  "" );

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
        like.innerHTML = this._media.likes;
        const icon = document.createElement( 'i' ); // Font awesome heart icon
        icon.classList.add( "far" );
        icon.classList.add( "fa-heart" );
        icon.setAttribute( "aria-label", "likes" );
        mediaInfos.appendChild(like);
        mediaInfos.appendChild(icon);
        $mediaCard.appendChild(a);
        $mediaCard.appendChild(mediaInfos);
        
        // Media like/dislike handling
        icon.addEventListener('click', () => {
            if (icon.classList.contains("fas")) {
                icon.classList.replace( "fas", "far" );
                like.innerHTML = this._media.likes;
                this.LikesSubject.fire( 'DISLIKE' );
            } else {
                icon.classList.replace( "far", "fas" );
                like.innerHTML = this._media.likes + 1;
                this.LikesSubject.fire( 'LIKE' );
            }
        })

        a.addEventListener('click', (e) => {
            e.preventDefault()
        })

        docFrag.appendChild($mediaCard);
        
        return docFrag
    }

    
}