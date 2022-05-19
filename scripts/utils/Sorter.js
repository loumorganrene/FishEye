import { MediaCard } from "../templates/MediaCard.js"
export class SorterApi {
    static async sorter(media, orderBy) {

        if (orderBy == 'Popular') {
            return Array.from(media).sort((a, b) => a.likes - b.likes)

        } else if (orderBy == 'Date') {
            return Array.from(media).sort((a, b) => a.date - b.date)

        } else if (orderBy == 'Title') {
            return Array.from(media).sort(title)
        } else {
            throw 'unknow orderBy type'
        }
    }
}

export class Sorter {
    constructor(media, photographer) {
        this.photographer = photographer
        this.media = media
        this.$sorterFormWrapper = document.querySelector('.sorter-wrapper')
        this.$mediasWrapper = document.querySelector('.medias-wrapper')

    }

    async sorterMedias(sorter) {
        this.clearMediasWrapper()

        if (!!sorter) { //alternance: truthy value if one of the <select> option is choosen
            const sortedData = await SorterApi.sorter(this.media, this.photographer, sorter)
            const SortedMedias = sortedData.media 

            SortedMedias
                .forEach(media => {
                    const Template = new MediaCard(media, photographer)
                    console.log(this.media)
                    console.log("------------")
                    this.$mediasWrapper.appendChild(
                        Template.createMediaCard()
                    )
                })
        } else {
            this.media
                .forEach(media => {
                const Template = new MediaCard(media, photographer)
                this.$mediasWrapper.appendChild(Template.createMediaCard())
            })
        }
    }

    onChangeSorter() {
        this.$sorterFormWrapper
            .querySelector('form')
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
