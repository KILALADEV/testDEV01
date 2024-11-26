import gsap from "gsap";

import Swiper from 'swiper';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

export default function slider() {

	if (document.querySelector('.js-loading')) {
		function appendHtml(el, str) {
			var div = document.createElement('div');
			div.innerHTML = str;
			while (div.children.length > 0) {
				el.appendChild(div.children[0]);
			}
		}

		let colNum = Math.floor(window.innerWidth / (window.innerWidth > 767 ? 40 : 20)) + 1;
		let rowNum = Math.floor(window.innerHeight / (window.innerWidth > 767 ? 40 : 20)) + 1;

		for (var i = 0; i < colNum; i++) {
			appendHtml(document.querySelector('.js-loading-lattice__h'), "<div class=\"bar -horizon\"></div>");
		}
		for (var i = 0; i < rowNum; i++) {
			appendHtml(document.querySelector('.js-loading-lattice__v'), "<div class=\"bar -vertical\"></div>");
		}

		gsap.to(document.querySelector('.js-loading-bar'), {
			width: '100%',
			duration: 1,
		});
		gsap.to(document.querySelector('.js-loading-progress'), {
			opacity: 0,
			duration: 0.5,
			delay: 1
		});
		gsap.to(document.querySelectorAll('.bar.-horizon'), {
			opacity: 1,
			height: '100%',
			duration: 0.5,
			delay: 1.5
		});
		gsap.to(document.querySelectorAll('.bar.-vertical'), {
			opacity: 1,
			width: '100%',
			duration: 0.5,
			delay: 1.8
		});
		gsap.to(document.querySelector('.js-loading-lattice'), {
			filter: 'blur(15px)',
			duration: 1,
			delay: 2.3
		});
		gsap.to(document.querySelector('.js-loading'), {
			autoAlpha: 0,
			duration: 1.5,
			delay: 2.3,
			onComplete: function() {
				gsap.to(document.querySelector('.header'), {
					y: 0,
					duration: 0.5,
				});
				const swiper = new Swiper('.mv-slider .swiper', {
					modules: [Autoplay, Pagination, EffectFade],
					effect: 'fade',
					fadeEffect: {
						crossFade: true
					},
					autoplay: {
						delay: 9000,
						disableOnInteraction: false
					},
					speed: 1000,
					slidesPerView: 1,
					loop: true,
					pagination: {
					el: '.swiper-pagination',
						clickable: true,
					},
					grabCursor: false,
					allowTouchMove: false,
					on: {
						activeIndexChange: function() {
							let swiper = this;
							if (swiper.realIndex == 2 || swiper.realIndex == 3) {
								if (window.innerWidth >= 768) {
									document.querySelector('.txt01').style.color = "#fff";
									document.querySelector('.txt02').style.color = "#fff";
								}
								document.querySelectorAll('.swiper-pagination-bullet').forEach(function(item, i) {
									item.style.filter = "invert(1)"
								})
							}
							else {
								if (window.innerWidth >= 768) {
									document.querySelector('.txt01').style.color = "#1e1e1e";
									document.querySelector('.txt02').style.color = "#1e1e1e";
								}
								document.querySelectorAll('.swiper-pagination-bullet').forEach(function(item, i) {
									item.style.filter = "none"
								})
							}

							setTimeout(function() {
								gsap.fromTo(document.querySelector('.swiper-pagination-bullet-active'), {
									'--width': '0%',
								}, {
									'--width': '100%',
									duration: 10.5,
								});
							}, 100)
						}
					}
				});

				document.querySelectorAll('.txt01 span').forEach(function(item, i) {
			      gsap.to(item, {
					opacity: 1,
					duration: 1,
					delay: 0.15 * i
			      });
			    })

			    gsap.to(document.querySelector('.txt02'), {
					opacity: 1,
					duration: 0.5,
					delay: 3.5
				});
			}
		});
	}
	else {
		gsap.to(document.querySelector('.header'), {
			y: 0,
			duration: 0.5,
		});
	}
}