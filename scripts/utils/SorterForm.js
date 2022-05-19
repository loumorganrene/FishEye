import { MediaCard } from "../templates/MediaCard.js"
export class Sorter {
    constructor(mediaList) {
        this._media = mediaList
        this.$sorterFormWrapper = document.querySelector('.sorter-wrapper')
        this.$mediasWrapper = document.querySelector('.medias-wrapper')

    }

    async sorterMedias(media, sorter) {
        this.clearMediasWrapper()

        if (sorter === 'Popular') {
            const likesSorting = Array.from(media).sort((a, b) => a.likes - b.likes)
            return likesSorting.forEach(media => {
                const Template = new MediaCard(media)
                this.$mediasWrapper.appendChild(Template.createMediaCard()) })

        } else if (sorter === 'Date') {
            const dateSorting = Array.from(media).sort((a, b) => a.date - b.date)
            return dateSorting.forEach(media => {
                const Template = new MediaCard(media)
                this.$mediasWrapper.appendChild(Template.createMediaCard()) })

        } else if (sorter === 'Title') {
            const titleSorting = Array.from(media).sort(title)
            return titleSorting.forEach(media => {
                const Template = new MediaCard(media)
                this.$mediasWrapper.appendChild(Template.createMediaCard()) })
                
        } else {
            this._media
                .forEach(media => {
                const Template = new MediaCard(media)
                this.$mediasWrapper.appendChild(Template.createMediaCard())
            })
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
