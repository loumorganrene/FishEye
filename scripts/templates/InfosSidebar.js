export class  InfosSidebar{
    constructor (media, photographer, LikesSubject) {
        this._photographer = photographer
        this._media = media
        this.LikesSubject = LikesSubject
    }

    createInfosSidebar() {
        const docFrag = document.createDocumentFragment();
        const $totalLikesWrapper = document.querySelector( ".infos-wrapper" );
        this._currentTotalLikes = this._media.map(media => media.likes).reduce((prev, current) => prev + current, 0)
        
        // Media total like
        const likeWrapper = document.createElement( 'div' )
        likeWrapper.classList.add( "like-wrapper" );
        const like = document.createElement( 'p' );
        like.classList.add( "total_like" );
        like.innerHTML = this._currentTotalLikes;
        const icon = document.createElement( 'i' ); // Font awesome heart icon
        icon.classList.add( "fas" );
        icon.classList.add( "fa-heart" );
        icon.setAttribute( "aria-label", "likes" );

        // Photographer price per day
        const price = document.createElement( 'p' );
        price.textContent = `${this._photographer.price}€/jour`;
        
        likeWrapper.appendChild(like);
        likeWrapper.appendChild(icon);
        $totalLikesWrapper.appendChild(likeWrapper)
        $totalLikesWrapper.appendChild(price);

        docFrag.appendChild($totalLikesWrapper);

        return docFrag
    }
}