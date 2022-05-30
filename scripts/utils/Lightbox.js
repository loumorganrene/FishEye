import { MediaFactory } from "../factories/MediaFactory.js";
// DOMElements selectors
const main = document.getElementById("main")
const $mediaWrapper = document.querySelector(".medias-wrapper")
const $LightboxWrapper = document.querySelector('.close_up-wrapper');
const modal = document.getElementById("lightbox_modal")
const closeIcon = document.getElementById("close_lightbox-icon")
const prevIcon = document.getElementById("prev-btn")
const nextIcon = document.getElementById("next-btn")

// DOMElements selectors for keyboard navigation in the modal
const focussableElements = `i, a, [tabindex]:not([tabindex="-1"]`
const firstFocusableElement = modal.querySelectorAll(focussableElements)[0];
const focusableContent = modal.querySelectorAll(focussableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1];
export class Lightbox {
    /**
     * @param {Object} photographer 
     * @param {Array} mediaList
     */
    constructor(mediaList, photographer) {
        this._media = mediaList
        this._photographer = photographer
    }
    /**
     * @description Get the total number of medias in mediaList
     * @returns {number}
     */
    get mediaTotal() {
        return this._media.length
    }

    setMediaList(mediaList) {
        this._media = mediaList
    }

    init() {
        // get the id of clicked media
        $mediaWrapper.addEventListener('click', e => {
            const media = e.target;
            if (media.nodeName == "VIDEO" || media.nodeName == "IMG") {
                const id = Number(media.dataset.id);
                this._index = this._media.findIndex(media_id => media_id.id === id)
                this.render(this._media[this._index])
            }
        })
        // close modal onclick
        closeIcon.addEventListener('click', this.closeModal)
        // display next media onclick
        nextIcon.addEventListener('click', () => {
            const nextMediaIndex = this._index < this.mediaTotal - 1 ? this._index + 1 : 0
            const nextMedia = this._media[nextMediaIndex]
            this.render(nextMedia);
            this._index = nextMediaIndex
        })
        // display previous media onclick
        prevIcon.addEventListener('click', () => {
            const prevMediaIndex = this._index > 0 ? this._index - 1 : this.mediaTotal - 1
            const prevMedia = this._media[prevMediaIndex]
            this.render(prevMedia);
            this._index = prevMediaIndex
        })
        // keep focus & nav in modal
        document.addEventListener('keydown', this.keyboardNav);
        // display next media onkeydown right
        document.addEventListener('keydown', (e) => {
            if(e.key === 'ArrowRight') {
                const nextMediaIndex = this._index < this.mediaTotal - 1 ? this._index + 1 : 0
                const nextMedia = this._media[nextMediaIndex]
                this.render(nextMedia);
                this._index = nextMediaIndex
            }
        })
        // display previous media onkeydown left
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                const prevMediaIndex = this._index > 0 ? this._index - 1 : this.mediaTotal - 1
                const prevMedia = this._media[prevMediaIndex]
                this.render(prevMedia);
                this._index = prevMediaIndex
            }
        })
        // close modal onclick
        document.addEventListener('keydown',  (e) => {
            if (e.key === "Escape") {
                this.closeModal()
            }
        })
        // close modal onkeypress "escape"
        closeIcon.addEventListener('keydown',  (e) => {
            if (e.key === "Escape") {
                this.closeModal()
            }
        })
        // init focus on first element
        firstFocusableElement.focus()
    }
    /**
     * @returns {HTMLDOMElements}
     * @param {IMedia} media 
     */
    render(media) {
        const docFrag = document.createDocumentFragment()
        $LightboxWrapper.innerHTML = ""

        const mediaDomElement = new MediaFactory(this._photographer, media).createMediaCard()
        if (mediaDomElement.nodeName == "VIDEO") {
            mediaDomElement.setAttribute("controls", "")
        }

        const title = document.createElement('h2');
        title.classList.add("media_title")
        title.textContent = `${media.title}`

        docFrag.appendChild(mediaDomElement)
        docFrag.appendChild(title)

        $LightboxWrapper.appendChild(docFrag)
        this.displayModal()
    }
    /**
     * @description Display the modal and disabled the scrolling of the page.
     */
    displayModal() {
        document.body.style.position = 'fixed'
        document.body.style.top = `-${window.scrollY}px`
        main.setAttribute('aria-hidden', 'true')
        modal.style.display = "block"
        modal.setAttribute('aria-hidden', 'false')
        closeIcon.setAttribute('aria-hidden', 'false')
        prevIcon.setAttribute('aria-hidden', 'false')
        nextIcon.setAttribute('aria-hidden', 'false')
        closeIcon.focus()
    }
    /**
     * @description Close the modal and enable the scrolling of the page.
     */
    closeModal() {
        document.body.style.position = ''
        document.body.style.top = ''
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
        main.setAttribute('aria-hidden', 'false')
        modal.style.display = "none"
        modal.setAttribute('aria-hidden', 'true')
        closeIcon.setAttribute('aria-hidden', 'true')
        prevIcon.setAttribute('aria-hidden', 'true')
        nextIcon.setAttribute('aria-hidden', 'true')
        //set focus on clicked element
        $mediaWrapper.focus()
    }
    /**
     * @description Loop the keyboard navigation in the modal
     */
    keyboardNav(e) {
        const isTabPressed = e.key === "Tab"
        // if any other key is pressed
        if (!isTabPressed) {
        return;
        }
    
        if (e.shiftKey) { // if shift+tab is pressed together
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus() // focus on last focusable element
                e.preventDefault()
            }
        } else { // if focus on the last focusable element
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus() // add focus on first focusable element
                e.preventDefault()
            }
        }
  }
}

