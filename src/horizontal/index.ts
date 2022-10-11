import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { PageBase } from '../scripts/PageBase'

class HorizontalScrollPlugin extends ScrollbarPlugin {
	static pluginName = 'horizontalScroll'

	transformDelta(delta: any, fromEvent: any) {
		if (!/wheel/.test(fromEvent.type)) {
			return delta
		}
		const { x, y } = delta
		return { y: 0, x: Math.abs(x) > Math.abs(y) ? x : y }
	}
}

Scrollbar.use(HorizontalScrollPlugin)

ScrollTrigger.defaults({ pinType: ScrollTrigger.isTouch === 1 ? 'fixed' : 'transform' })

class App extends PageBase {
	private bodyScrollBar?: Scrollbar

	constructor() {
		super()
		if (ScrollTrigger.isTouch !== 1) {
			this.init()
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
			scrollLeft(value) {
				if (arguments.length && value) {
					bodyScrollBar.scrollLeft = value
				}
				return bodyScrollBar.scrollLeft
			},
		})

		bodyScrollBar.addListener(ScrollTrigger.update)
		this.bodyScrollBar = bodyScrollBar
	}

	private createPin() {
		this.registerAnimation = gsap.to(this.qs('.h-s1'), {
			opacity: 0,
			ease: 'none',
			scrollTrigger: {
				trigger: this.qs('.h-s1'),
				start: 'right right',
				endTrigger: this.qs('.h-s2'),
				end: 'left left',
				scrub: true,
				pin: true,
				pinSpacing: false,
				horizontal: true,
			},
		})

		this.registerAnimation = gsap.to(this.qs('.h-s2'), {
			opacity: 0,
			ease: 'none',
			scrollTrigger: {
				trigger: this.qs('.h-s2'),
				start: 'right right',
				endTrigger: this.qs('.h-s3'),
				end: 'left left',
				scrub: true,
				pin: true,
				pinSpacing: false,
				horizontal: true,
			},
		})
	}

	private createGsapAnimation() {
		;[this.qs('.h-s2 > .h-text'), this.qs('.h-s3 > .h-text')].forEach(sectionText => {
			this.registerAnimation = gsap.to(sectionText, {
				opacity: 1,
				ease: 'none',
				scrollTrigger: {
					trigger: sectionText,
					start: 'left right',
					end: 'left center',
					scrub: true,
					horizontal: true,
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
