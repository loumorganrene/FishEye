import { MediaCard } from "../templates/MediaCard.js"
import { LikesSubject } from "../observers/LikeSubject.js";
import { LikesTotal } from "../observers/LikeCounter.js";
export class Sorter {
    /**
     * @param {Object} photographer 
     * @param {Array} mediaList
     */
    constructor(mediaList, photographer, lightbox) {
        this._photographer = photographer
        this._media = mediaList
        this._lightbox = lightbox
        this.$sorterFormWrapper = document.querySelector('.sorter-wrapper')
        this.$mediasWrapper = document.querySelector('.medias-wrapper')
    }
    /**
     * @description Display medias in descendant order depending on the sorter
     * @param {string} sorter
     * @param {Object} media
     * @returns {HTMLDOMElements}
     */
    async sorterMedias(sorter) {
        this.clearMediasWrapper()
        this.LikesSubject = new LikesSubject()
        if (sorter === 'Date') { //sorting by descendant date
            this.clearTotalLikeCounter()
            const dateSorting = Array.from(this._media).sort((a, b) => a.date - b.date).reverse()
            //Init Like counter
            this.LikesTotalCounter = new LikesTotal(dateSorting, this._photographer)
            this.LikesSubject.subscribe(this.LikesTotalCounter)
            this._lightbox.setMediaList(dateSorting);
            return dateSorting.forEach(media => {
                const Template = new MediaCard(media, this._photographer, this.LikesSubject)
                this.$mediasWrapper.appendChild(Template.createMediaCard())
            })

        } else if (sorter === 'Title') { //sorting by alphabetical title
            this.clearTotalLikeCounter()
            const titleSorting = Array.from(this._media).sort((a, b) => a.title.localeCompare(b.title)) //non-ascii string comparaison
            //Init Like counter
            this.LikesTotalCounter = new LikesTotal(titleSorting, this._photographer)
            this.LikesSubject.subscribe(this.LikesTotalCounter)
            this._lightbox.setMediaList(titleSorting);
            return titleSorting.forEach(media => {
                const Template = new MediaCard(media, this._photographer, this.LikesSubject)
                this.$mediasWrapper.appendChild(Template.createMediaCard())
            })

        } else { //default media display
            this.clearTotalLikeCounter()
            this._lightbox.setMediaList(this._media);
            this._media
                .forEach(media => {
                    const Template = new MediaCard(media, this._photographer, this.LikesSubject)
                    this.$mediasWrapper.appendChild(Template.createMediaCard())
                })
        }
    }
    /**
     * @description Observer Pattern of select option to assign it as sorter.
     */
    onChangeSorter() {
        this.$sorterFormWrapper
            .querySelector('#sorting')
            .addEventListener('change', e => {
                const sorter = e.target.value
                this.sorterMedias(sorter)
            })
    }
    /**
     * @description Reset all the media when a sorter is selected.
     */
    clearMediasWrapper() {
        this.$mediasWrapper.innerHTML = ""
    }

    clearTotalLikeCounter() {
        const totalLikes = this._media.map(media => media.likes).reduce((prev, current) => prev + current, 0)
        document.querySelector('.total_like').innerHTML = totalLikes
    }
    /**
     * @returns {HTMLDOMElements}
     */
    render() {
        const sorterForm = `
          <form id="sorting_form" action="#" method="POST">
            <label for="sorting">Trier par</label>
              <select name="sorting" id="sorting">
                <option value="Default">Popularité</option>
                <option value="Date">Date</option>
                <option value="Title">Titre</option>
              </select>
          </form>
        `
        this.$sorterFormWrapper.innerHTML = sorterForm
        this.onChangeSorter()
    }
}
