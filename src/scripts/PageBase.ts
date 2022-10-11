import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export abstract class PageBase {
	private gsapAnimations: (gsap.core.Animation | globalThis.ScrollTrigger)[] = []

	protected qs<T extends HTMLElement>(query: string) {
		return document.querySelector<T>(query)!
	}

	protected set registerAnimation(animation: gsap.core.Animation | globalThis.ScrollTrigger) {
		this.gsapAnimations.push(animation)
	}

	dispose() {
		this.gsapAnimations.forEach(animation => {
			if (animation instanceof gsap.core.Animation) {
				animation.scrollTrigger?.kill()
				animation.kill()
			} else if (animation instanceof ScrollTrigger) {
				animation.kill()
			}
		})
	}
}
