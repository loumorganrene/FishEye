import { MediaCard } from "../templates/MediaCard.js"
export class Sorter {
    /**
     * @param {Object} photographer 
     * @param {Array} mediaList
     */
    constructor(mediaList, photographer) {
        this._photographer = photographer
        this._media = mediaList
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

        if (sorter === 'Popular') { //sorting by descendant popularity
            const likesSorting = Array.from(this._media).sort((a, b) => a.likes - b.likes).reverse()
            return likesSorting.forEach(media => {
                const Template = new MediaCard(media, this._photographer)
                this.$mediasWrapper.appendChild(Template.createMediaCard()) })

        } else if (sorter === 'Date') { //sorting by descendant date
            const dateSorting = Array.from(this._media).sort((a, b) => a.date - b.date).reverse()
            return dateSorting.forEach(media => {
                const Template = new MediaCard(media, this._photographer)
                this.$mediasWrapper.appendChild(Template.createMediaCard()) })

        } else if (sorter === 'Title') { //sorting by alphabetical title
            const titleSorting = Array.from(this._media).sort((a, b) => a.title.localeCompare(b.title)) //non-ascii string comparaison
            return titleSorting.forEach(media => {
                const Template = new MediaCard(media, this._photographer)
                this.$mediasWrapper.appendChild(Template.createMediaCard()) })
                
        } else { //default media display
            this._media
                .forEach(media => {
                const Template = new MediaCard(media, this._photographer)
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
    /**
     * @returns {HTMLDOMElements}
     */
    render() {
        const sorterForm = `
          <form id="sorting_form" action="#" method="POST">
            <label for="sorting">Trier par</label>
              <select name="sorting" id="sorting">
              <option value="Default">Sélection</option>
                <option value="Popular">Popularité</option>
                <option value="Date">Date</option>
                <option value="Title">Titre</option>
              </select>
          </form>
        `
        this.$sorterFormWrapper.innerHTML = sorterForm
        this.onChangeSorter()
    }
}
