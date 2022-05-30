import { MediaCard } from "../templates/MediaCard.js"
import { LikesTotal } from "../observers/LikeCounter.js";
export class Sorter {
    /**
     * @param {Object} photographer 
     * @param {Array} mediaList
     */
    constructor(mediaList, photographer, lightbox, likesSubject) {
        this._photographer = photographer
        this._media = mediaList
        this._lightbox = lightbox
        this._likesSubject = likesSubject
        this.$sorterFormWrapper = document.querySelector('.sorter-wrapper')
        this.$mediasWrapper = document.querySelector('.medias-wrapper')
    }
    /**
     * @description Display medias in descendant order depending on the sorter
     * @param {string} sorter
     * @returns {HTMLDOMElements}
     */
    async sorterMedias(sorter) {
        this.clearMediasWrapper()
        this._likesSubject.subscribe(this._likesTotal)
        if (sorter === 'Date') { // sorting by descendant date
            const dateSorting = Array.from(this._media).sort((a, b) => a.date - b.date).reverse()
            this._lightbox.setMediaList(dateSorting);
            return dateSorting.forEach(media => {
                const Template = new MediaCard(media, this._photographer, this._likesSubject)
                this.$mediasWrapper.appendChild(Template.createMediaCard())
            })

        } else if (sorter === 'Title') { // sorting by alphabetical title
            const titleSorting = Array.from(this._media).sort((a, b) => a.title.localeCompare(b.title)) // non-ascii string comparaison
            this._lightbox.setMediaList(titleSorting);
            return titleSorting.forEach(media => {
                const Template = new MediaCard(media, this._photographer, this._likesSubject)
                this.$mediasWrapper.appendChild(Template.createMediaCard())
            })

        } else { // default media display
            this._lightbox.setMediaList(this._media);
            this._media
                .forEach(media => {
                    const Template = new MediaCard(media, this._photographer, this._likesSubject)
                    this.$mediasWrapper.appendChild(Template.createMediaCard())
                })
        }
    }
    /**
     * @description Toggle the arrow-icon from down to up on sorter selection.
     */
    onclickSelectSorter() {
        const selectArrow = document.getElementById( 'select_arrow-icon' )
        this.$sorterFormWrapper
            .querySelector('select')
            .addEventListener('click', e => {
                selectArrow.classList.toggle('clicked')
                e.preventDefault()
        })
    }
    /**
     * @description Observer Pattern of select option value to define it as sorter.
     */
    onChangeSorter() {
        this.$sorterFormWrapper
            .querySelector('#sorting')
            .addEventListener('change', e => {
                const sorter = e.target.value
                this.sorterMedias(sorter)
                // init Like counter
                this.clearTotalLikeCounter()
                this._likesTotal = new LikesTotal(sorter, this._photographer)
            })
    }
    /**
     * @description Reset all the media when a sorter is selected.
     */
    clearMediasWrapper() {
        this.$mediasWrapper.innerHTML = ""
    }
    /**
     * @description Reset the total likes counter when a sorter is selected.
     */
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
                <div class="select-wrapper">
                    <select name="sorting" id="sorting">
                        <option value="Default">Popularité</option>
                        <option value="Date">Date</option>
                        <option value="Title">Titre</option>
                    </select>
                    <i id="select_arrow-icon" class="fa-solid fa-chevron-down"></i>
                </div>
            </form>
        `
        this.$sorterFormWrapper.innerHTML = sorterForm
        this.onChangeSorter()
        this.onclickSelectSorter()
    }
}
