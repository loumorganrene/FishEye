import { MediaApi, PhotographerApi } from "./api/Api.js";
import { Photographer } from "./models/PhotographersModel.js";
import { MediaCard } from "./templates/MediaCard.js";
import { PhotographerBanner } from "./templates/PhotographerBanner.js";
import { ContactForm } from "./utils/ContactFormValidation.js";
import { LikesTotal } from "./observers/LikeCounter.js";
import { Sorter } from "./utils/SorterForm.js";
import { LikesSubject } from "./observers/LikeSubject.js";
import { InfosSidebar } from "./templates/InfosSidebar.js";
import { Lightbox } from "./utils/Lightbox.js";
export class App {
    constructor() {
        this.$bannerWrapper = document.querySelector('.photograph-header')
        this.$mediasWrapper = document.querySelector('.medias-wrapper')
        this.$main = document.querySelector('main')
        this.photographersApi = new PhotographerApi('data/photographers.json')
        this.mediasApi = new MediaApi('data/photographers.json')
    }

    async main() {
        /** Photographer infos section */
        const photographersData = await this.photographersApi.getPhotographers()
        const url = new URL(window.location.href); // fetch photographerId from Url
        const photographerPageId = url.searchParams.get('id')
        const photographerApiId = photographersData.find(photographerId) // fetch photographer data by id
        function photographerId(photographer) {
            return photographer.id == photographerPageId
        }
        const photographer = new Photographer(photographerApiId) // format photographer data

        /** Photographer banner */
        const Banner = new PhotographerBanner(photographer)
        this.$bannerWrapper.appendChild(Banner.createPhotographerBanner())

        /** Contact form */
        ContactForm.init()
        // display photographer's name as contact-me title
        document.getElementById('contact_me').innerHTML = `Contactez-moi <br> ${photographer.name}`

        /** Medias section */
        const mediasData = await this.mediasApi.getMedias() 
        function mediaPhotographerId(media) { 
            return media.photographerId == photographerPageId // fetch medias list by photographer's id
        }
        const mediasList = mediasData.filter(mediaPhotographerId) // medias array per photographer

        /** Lightbox */
        const lightbox = new Lightbox(mediasList, photographer)
        lightbox.init()

        /** Total likes counter */
        const likesSubject = new LikesSubject()
        const likesTotal = new LikesTotal(mediasList, photographer)
        likesSubject.subscribe(likesTotal)

        /** Sorting */
        const sorter = new Sorter(mediasList, photographer, lightbox, likesSubject)
        sorter.render()

        /** Media cards display */
        mediasList
            .sort((a, b) => a.likes - b.likes).reverse()
            .forEach(media => {
                const Template = new MediaCard(media, photographer, likesSubject)
                this.$mediasWrapper.appendChild(
                    Template.createMediaCard()
                )
            })

        /** Price & Total likes sidebar */
        const Sidebar = new InfosSidebar(mediasList, photographer)
        this.$main.appendChild(Sidebar.createInfosSidebar())
    }
}

const app = new App()
app.main()
