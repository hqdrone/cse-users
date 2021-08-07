$(document).ready(function () {

	const mobile = () => {
		const nav = document.querySelector('.mobile')
		const open = document.querySelector('.nav__burger .hamburger')
		const close = document.querySelector('.mobile__close .hamburger')
		open.addEventListener('click', () => {
			nav.classList.add('mobile_active')
		})
		close.addEventListener('click', () => {
			nav.classList.remove('mobile_active')
		})
	}
	mobile()

	const slider = $('.slider__owl').owlCarousel({
		loop: true,
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 2
			},
			992: {
				items: 3
			}
		},
		dots: false,
		margin: 32
	})
	
	const logos = $('.logos__owl').owlCarousel({
		loop: true,
		responsive: {
			0: {
				items: 2
			},
			576: {
				items: 4
			},
			768: {
				items: 6
			},
			992: {
				items: 8
			}
		},
		dots: false,
		margin: 32
	})
	//
	// const specialists = $('.specialists__owl').owlCarousel({
	// 	loop: true,
	// 	responsive: {
	// 		0: {
	// 			items: 1
	// 		},
	// 		576: {
	// 			items: 2
	// 		},
	// 		992: {
	// 			items: 3
	// 		},
	// 		1200: {
	// 			items: 4
	// 		},
	// 		1400: {
	// 			items: 5
	// 		},
	// 		1600: {
	// 			items: 6
	// 		}
	// 	},
	// 	dots: false,
	// 	margin: 28
	// })
	// $('.specialists__prev').click(function () {
	// 	specialists.trigger('prev.owl.carousel');
	// })
	// $('.specialists__next').click(function () {
	// 	specialists.trigger('next.owl.carousel');
	// })
	//
	// const gallery = $('.gallery__owl').owlCarousel({
	// 	loop: true,
	// 	responsive: {
	// 		0: {
	// 			items: 1
	// 		},
	// 		480: {
	// 			items: 2
	// 		},
	// 		576: {
	// 			items: 3
	// 		},
	// 		992: {
	// 			items: 4
	// 		},
	// 		1200: {
	// 			items: 5
	// 		},
	// 		1400: {
	// 			items: 6
	// 		}
	// 	},
	// 	dots: false,
	// 	margin: 12
	// })
	// $('.gallery__prev').click(function () {
	// 	gallery.trigger('prev.owl.carousel');
	// })
	// $('.gallery__next').click(function () {
	// 	gallery.trigger('next.owl.carousel');
	// })
	//
	// $('.header__hamburger .hamburger').click(() => {
	// 	$('.mobile').addClass('mobile_active')
	// })
	// $('.mobile__close .hamburger').click(() => {
	// 	$('.mobile').removeClass('mobile_active')
	// })
	//
	// const stickyHeader = () => {
	// 	const header = document.querySelector('.header')
	// 	const headerTop = header.getBoundingClientRect().top
	// 	if (headerTop === 0) {
	// 		header.classList.add('header_sticky')
	// 	} else {
	// 		header.classList.remove('header_sticky')
	// 	}
	// }
	// stickyHeader()
	// window.addEventListener('scroll', () => {
	// 	stickyHeader()
	// })
	// window.addEventListener('resize', () => {
	// 	stickyHeader()
	// })
	//
	//
	// const countNums = () => {
	// 	if (!document.querySelector('.numbers-card__num span')) return
	//
	// 	const numbersObserver = new IntersectionObserver((entries, observer) => {
	// 		entries.forEach(entry => {
	// 			if (entry.isIntersecting) {
	// 				const count = new CountUp(entry.target.id, 0, entry.target.dataset.num, 0, 6, {
	// 						suffix: '+',
	// 						separator: ' '
	// 					}
	// 				)
	// 				count.start()
	// 				observer.unobserve(entry.target);
	//
	// 			}
	// 		})
	// 	});
	// 	document.querySelectorAll('.numbers-card__num span').forEach(num => {
	// 		numbersObserver.observe(num)
	// 	})
	// }
	// countNums()
	//
	// const reviews = $('.team-reviews__owl').owlCarousel({
	// 	loop: true,
	// 	responsive: {
	// 		0: {
	// 			items: 1
	// 		},
	// 		768: {
	// 			items: 2
	// 		},
	// 		992: {
	// 			items: 1
	// 		},
	// 		1200: {
	// 			items: 2
	// 		}
	// 	}
	// 	,
	// 	margin: 40,
	// 	dots: false
	// })
	// $('.team-reviews__prev').click(function () {
	// 	reviews.trigger('prev.owl.carousel');
	// })
	// $('.team-reviews__next').click(function () {
	// 	reviews.trigger('next.owl.carousel');
	// })

})
