class App {
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographer_section')
        this.photographersApi = new PhotographerApi('data/photographers.json')
        console.log(this.photographersApi);
    }

    async main() {
        const photographers = await this.photographersApi.getPhotographers()
        console.log(this.photographersApi.getPhotographers());
        // erreur à corriger
        photographers.forEach(photographer => {
            const Template = new PhotographerCard(photographer)
            this.$photographersWrapper.appendChild(Template.createPhotographerCard())
        })
    }
}

const app = new App()
app.main()
    