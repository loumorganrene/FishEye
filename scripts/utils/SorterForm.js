import { MediaCard } from "../templates/MediaCard.js"
export class Sorter {
    constructor(mediaList, photographer) {
        this._photographer = photographer
        this._media = mediaList
        this.$sorterFormWrapper = document.querySelector('.sorter-wrapper')
        this.$mediasWrapper = document.querySelector('.medias-wrapper')

    }

    async sorterMedias(sorter) {
        this.clearMediasWrapper()

        if (sorter === 'Popular') {
            const likesSorting = Array.from(this._media).sort((a, b) => a.likes - b.likes)
            return likesSorting.forEach(media => {
                const Template = new MediaCard(media, this._photographer)
                this.$mediasWrapper.appendChild(Template.createMediaCard()) })

        } else if (sorter === 'Date') {
            const dateSorting = Array.from(this._media).sort((a, b) => a.date - b.date).reverse()
            console.log(dateSorting)
            return dateSorting.forEach(media => {
                const Template = new MediaCard(media, this._photographer)
                this.$mediasWrapper.appendChild(Template.createMediaCard()) })

        } else if (sorter === 'Title') {
            const titleSorting = Array.from(this._media).sort((a, b) => a.title.localeCompare(b.title))
            console.log(titleSorting)
            return titleSorting.forEach(media => {
                const Template = new MediaCard(media, this._photographer)
                this.$mediasWrapper.appendChild(Template.createMediaCard()) })
                
        } else {
            this._media
                .forEach(media => {
                const Template = new MediaCard(media, this._photographer)
                this.$mediasWrapper.appendChild(Template.createMediaCard())
            })
            console.log('prout')
        }
    }

    onChangeSorter() {
        this.$sorterFormWrapper
            .querySelector('#sorting')
            .addEventListener('change', e => {
                const sorter = e.target.value
                this.sorterMedias(sorter)
                console.log(sorter)
            })
    }

    clearMediasWrapper() {
        this.$mediasWrapper.innerHTML = ""
    }

    render() {
        const sorterForm = `
          <form id="sorting_form" action="#" method="POST">
            <label for="sorting">Trier par</label>
              <select name="sorting" id="sorting">
              <option value="Default">Aucun tri</option>
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
