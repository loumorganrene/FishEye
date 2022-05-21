export class LikesCounter {
    constructor(media, photographer) {
        this._photographer = photographer
        this._media = media
        this._$likesCountContainer = document.querySelector( '.media_like' )
        this._count = this._media.likes
    }

    update(action) {
        if (action === 'LIKE') {
            this._count += 1
        } else if (action === 'DISLIKE') {
            this._count -= 1
        } else {
            throw "Unknow action"
        }

        this._$likesCountContainer = this._count
    }

}