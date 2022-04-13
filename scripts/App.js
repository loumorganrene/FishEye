class App {
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographer_section')
        this.photographersApi = new PhotographerApi('data/photographers.json')
    }

    async main() {
        const photographers = await this.photographersApi.getPhotographers()

        photographers.forEach(photographer => {
            const Template = new PhotographerCard(photographer)
            this.$photographersWrapper.appendChild(Template.createPhotographerCard())
        })
    }
}

const app = new App()
app.main()
    