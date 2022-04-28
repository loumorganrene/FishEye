class Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url
    }

    async get(property) {
        return fetch(this._url)
            .then(res => res.json())
            .then(res => res[property])
            .catch(err => console.log('an error occurs', err))
    }
}
export class PhotographerApi extends Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url)
    }

    async getPhotographers() {
        return await this.get('photographers')
    }
}

export class MediaApi extends Api {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        super(url)
    }
// il faudrait plutôt utiliser un adaptater pattern
    async getMedias() {
        return this.get('media')
    }
}