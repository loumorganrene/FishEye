export class LikesCounter {
    constructor(media, photographer) {
        this._photographer = photographer
        this._media = media
    }

    update(action) {
        const $likesCountContainer = document.querySelector( '.media_like' )
        let currentLikes = parseInt(document.querySelector( '.media_like' ).textContent)

        if (action === 'LIKE') {
            currentLikes += 1
        } else if (action === 'DISLIKE') {
            currentLikes -= 1
        } else {
            throw "Unknow action"
        }

        $likesCountContainer.textContent = currentLikes
    }

}