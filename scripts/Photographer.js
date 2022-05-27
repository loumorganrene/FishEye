import { MediaApi, PhotographerApi } from "./api/Api.js";
import { Photographer } from "./models/PhotographersModel.js";
import { MediaCard } from "./templates/MediaCard.js";
import { PhotographerBanner } from "./templates/PhotographerBanner.js";
import { ContactForm } from "./utils/ContactFormValidation.js";
import { LikesTotal } from "./observers/LikeCounter.js";
import { Sorter } from "./utils/SorterForm.js";
import { LikesSubject } from "./observers/LikeSubject.js";
import { InfosSidebar } from "./templates/InfosSidebar.js";
import {
    Lightbox
} from "./utils/Lightbox.js";
export class App {
    constructor() {
        this.$bannerWrapper = document.querySelector('.photograph-header')
        this.$mediasWrapper = document.querySelector('.medias-wrapper')
        this.$main = document.querySelector('main')
        this.photographersApi = new PhotographerApi('data/photographers.json')
        this.mediasApi = new MediaApi('data/photographers.json')
    }

    async main() {
        //Photographer infos section
        const photographersData = await this.photographersApi.getPhotographers()
        //Fetch photographerId from Url
        const url = new URL(window.location.href);
        const photographerPageId = url.searchParams.get('id')
        //Fetch photographer data by id
        const photographerApiId = photographersData.find(photographerId)
        function photographerId(photographer) {
            return photographer.id == photographerPageId
        }
        //Format photographer data
        const photographer = new Photographer(photographerApiId)
        
        //Apply template for the photogapher page banner
        const Banner = new PhotographerBanner(photographer)
        this.$bannerWrapper.appendChild(Banner.createPhotographerBanner())
        //Init eventListener contact form
        ContactForm.init()
        //Add photographer name to the contact me title
        document.getElementById('contact_me').innerHTML = `Contactez-moi <br> ${photographer.name}`

        // Medias section
        const mediasData = await this.mediasApi.getMedias()
        //Link media.photographerId with photographer url id
        function mediaPhotographerId(media) {
            return media.photographerId == photographerPageId
        }
        //Fetch allmedias data from a photographer
        const mediasList = mediasData.filter(mediaPhotographerId)

        //Init lightbox
        const lightbox = new Lightbox(mediasList, photographer)
        lightbox.init()

        //Init sorting
        const sorter = new Sorter(mediasList, photographer, lightbox)
        sorter.render()

        //Init Like counter
        this.LikesSubject = new LikesSubject()
        this.LikesTotal = new LikesTotal(mediasList, photographer)
        this.LikesSubject.subscribe(this.LikesTotal)

        //Apply template for each media for the photographer page media section
        mediasList
            .sort((a, b) => a.likes - b.likes).reverse()
            .forEach(media => {
                const Template = new MediaCard(media, photographer, this.LikesSubject)
                this.$mediasWrapper.appendChild(
                    Template.createMediaCard()
                )
            })

        //Apply template for the photographer page sidebar
        const Sidebar = new InfosSidebar(mediasList, photographer)
        this.$main.appendChild(Sidebar.createInfosSidebar())
    }
}

const app = new App()
app.main()
