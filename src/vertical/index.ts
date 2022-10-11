// https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.scrollerProxy()

import Scrollbar from 'smooth-scrollbar'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { PageBase } from '../scripts/PageBase'

ScrollTrigger.defaults({ pinType: ScrollTrigger.isTouch === 1 ? 'fixed' : 'transform' })

class App extends PageBase {
	private bodyScrollBar?: Scrollbar

	constructor() {
		super()
		if (ScrollTrigger.isTouch !== 1) {
			this.init()
		} else {
			document.body.style.overflow = 'auto'
		}
		this.createPin()
		this.createGsapAnimation()
	}

	private init() {
		const bodyScrollBar = Scrollbar.init(document.body)

		ScrollTrigger.scrollerProxy(document.body, {
			scrollTop(value) {
				if (arguments.length && value) {
					bodyScrollBar.scrollTop = value
				}
				return bodyScrollBar.scrollTop
			},
		})

		bodyScrollBar.addListener(ScrollTrigger.update)
		this.bodyScrollBar = bodyScrollBar
	}

	private createPin() {
		this.registerAnimation = gsap.to(this.qs('.v-s1'), {
			opacity: 0,
			ease: 'none',
			scrollTrigger: {
				trigger: this.qs('.v-s1'),
				start: 'bottom bottom',
				endTrigger: this.qs('.v-s2'),
				end: 'top top',
				scrub: true,
				pin: true,
				pinSpacing: false,
			},
		})

		this.registerAnimation = gsap.to(this.qs('.v-s2'), {
			opacity: 0,
			ease: 'none',
			scrollTrigger: {
				trigger: this.qs('.v-s2'),
				start: 'bottom bottom',
				endTrigger: this.qs('.v-s3'),
				end: 'top top',
				scrub: true,
				pin: true,
				pinSpacing: false,
			},
		})
	}

	private createGsapAnimation() {
		;[this.qs('.v-s2 > .v-text'), this.qs('.v-s3 > .v-text')].forEach(sectionText => {
			this.registerAnimation = gsap.to(sectionText, {
				opacity: 1,
				ease: 'none',
				scrollTrigger: {
					trigger: sectionText,
					start: 'top bottom',
					end: 'top center',
					scrub: true,
				},
			})
		})
	}

	dispose() {
		super.dispose()
		this.bodyScrollBar?.destroy()
	}
}

const app = new App()

window.addEventListener('beforeunload', () => {
	app.dispose()
})
