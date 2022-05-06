import { MediaApi, PhotographerApi } from "./api/Api.js";
import { Media } from "./models/MediasModel.js";
import { Photographer } from "./models/PhotographersModel.js";
import { MediaCard } from "./templates/MediaCard.js";
import { PhotographerBanner } from "./templates/PhotographerBanner.js";
import { ContactForm } from "./utils/ContactForm.js";

export class App {
    constructor() {
        this.$bannerWrapper = document.querySelector('.photograph-header')
        this.$mediasWrapper = document.querySelector('.medias-wrapper')
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
        const Template = new PhotographerBanner(photographer)
        this.$bannerWrapper.appendChild(Template.createPhotographerBanner())

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
        //Apply template for each media for the photographer page media section
        mediasList
            // .map(media => new Media(media))
            .forEach(media => {
                const Template = new MediaCard(media, photographer)
                // console.log(media)
                // console.log("------------")
                this.$mediasWrapper.appendChild(
                    Template.createMediaCard()
                )
        })
    }
}

const app = new App()
app.main()



