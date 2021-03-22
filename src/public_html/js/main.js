class Burger {
  constructor() {
		this.ui = {
			toggle: document.querySelector('.js-menu-toggle'),
			dropdown: document.querySelector('.js-dropdown'),
			lines: document.querySelectorAll(".js-dropdown-menu__line--main"),
			links: document.querySelectorAll(".js-site-link"),
			openLines: document.querySelectorAll('.js-burger__line'),
			closeLineOne: document.querySelector(".js-burger-close__line--1"),
			closeLineTwo: document.querySelector(".js-burger-close__line--2")
    }
    
    this.active = false

    this.setInitial.bind(this)
    this.addEvents.bind(this)
    this.open.bind(this)
    this.close.bind(this)

    this.init()
  }

  init() {
    this.setInitial()
		this.addEvents()
  }

	setInitial() {
		const { dropdown, lines } = this.ui
		gsap.set(dropdown, {
			xPercent: -101
		})
		gsap.set(lines, {
      xPercent: -101
    })
		gsap.set(".js-burger-close__line--1", {
			scaleX: 0
		})
		gsap.set(".js-burger-close__line--2", {
			scaleY: 0
		})
	}

	open() {
    this.active = true
    document.body.classList.add('menu-is-open')

		this.tl && this.tl.kill()
		this.tl = gsap.timeline()
		const { dropdown, 
			lines, 
			links, 
			openLines, 
			closeLineOne, 
			closeLineTwo } = this.ui

		this.tl
			.to(openLines, {
        scaleX: 0,
        duration: .35,
        stagger: -.05,
        ease: 'power1.in'
      }, 0)
			.to(closeLineOne, {
        scaleX: 1,
        duration: .75,
        ease: 'expo.out'
      }, .55)
			.to(closeLineTwo, {
        scaleY: 1,
        duration: .75,
        ease: 'expo.out'
      }, .56)
			.to(dropdown, {
        xPercent: 0,
        duration: 1.1,
				ease: 'expo.inOut'
			}, .075, .5)
			.to(lines, {
        xPercent: 0,
        stagger: .075,
        duration: .75,
        ease: 'expo.out'
      }, .6)
	}

	close() {
    this.active = false
    document.body.classList.remove('menu-is-open')

		this.tl && this.tl.kill()
		this.tl = gsap.timeline()
		const { dropdown, 
			lines, 
			links, 
			openLines, 
			closeLineOne, 
			closeLineTwo } = this.ui

		this.tl
			.to(closeLineOne, {
        scaleX: 0,
        duration: .35,
        ease: 'power1.in'
      }, 0)
      .to(closeLineTwo, .35, {
        scaleY: 0,
        duration: .35,
        ease: 'power1.in'
      }, .05)
			.to(dropdown, {
        xPercent: -101,
        duration: 1.1,
        ease: 'expo.inOut'
      }, 0)
			.to(lines, {
        xPercent: -101,
        duration: .75,
        stagger: -.075,
        ease: 'expo.inOut'
      }, 0)
			.to(openLines, {
        scaleX: 1,
        duration: .5,
        stagger: -.05,
        ease: 'expo.out'
      }, .75)
	}

  addEvents() {
		this.ui.toggle.addEventListener("click", () => {
      this.active ? this.close() : this.open()
		})
  }
}

var burger = new Burger()

$(function(){

  var loader = $('.loader')
  var loaderLogo = $('.loader-logo')

  var tl = gsap.timeline()

  tl
    .to(loaderLogo, {
      autoAlpha: 1,
      duration: 1.5,
      ease: 'expo.inOut'
    })
    .to(loaderLogo, {
      autoAlpha: 0,
      duration: 1.5,
      ease: 'expo.inOut'
    })
    .to(loaderLogo, {
      autoAlpha: 1,
      duration: 1.5,
      ease: 'expo.inOut'
    })
    .to(loaderLogo, {
      autoAlpha: 0,
      duration: 1,
      ease: 'power3',
      onComplete: () => {
        gsap.to(loader, {
          autoAlpha: 0,
          pointerEvents: 'none',
          duration: 1,
          ease: 'power3',
          onStart: () => {
            setTimeout(() => {
              $('html, body').addClass('loadedGrow');
            }, 100);
          },
          onComplete: () => {
            $('html, body').animate({ scrollTop: 0 }, 0).addClass('loaded');
            setTimeout(() => {
              loader.remove()
            }, 200);
          }
        })
      }
    })
  
    window.addEventListener('scroll', function(){
      document.querySelector('.rueda').style.transform = `rotate(${window.scrollY / 5}deg)`
    })

    $('.app-slide').slick({
      arrows: false,
      slidesToShow: 1,
      infinite: false,
      dots: true,
      fade: true,
    });

    $('.arrow-left').click(function(){
      $('.app-slide').slick('slickPrev');
    })
    $('.arrow-right').click(function(){
      $('.app-slide').slick('slickNext');
    })


  setTimeout(() => {
    bindScroll();
    hideHeader();
  }, 1000);

  // document.querySelector(".js-menu-toggle").addEventListener("click", (event) => {
  //   console.log('asdasd')
  //   if (document.getElementById('burga-menu').classList.contains("open")) {
  //     document.getElementById('burga-menu').classList.remove("open")
  //     $('.menu-dropdown').removeClass('menu-active')
  //     document.documentElement.style.overflow = 'inherit'
  //   } else {
  //     document.getElementById('burga-menu').classList.add("open")
  //     $('.menu-dropdown').addClass('menu-active')
  //     document.documentElement.style.overflow = 'hidden'
  //   }
  // });

  $('.c-dropdown-menu__item').on('click', function(event) {
    event.preventDefault();
    var target = $('.js-' + this.dataset.anchor).offset().top
    $('html, body').animate({
        scrollTop: target
    }, 700, 'swing');
    burger.close()
  });

  // $('.nav__item__mobile').on('click', function(event) {
  //   event.preventDefault();
  //   document.getElementById('burga-menu').classList.remove("open")
  //   $('.menu-dropdown').removeClass('menu-active')
  //   document.documentElement.style.overflow = 'inherit'
  //   setTimeout(() => {
  //     var target = $('.js-' + this.dataset.anchor).offset().top
  //     $('html, body').animate({
  //         scrollTop: target
  //     }, 1000, 'swing');
  //   }, 800);

  // });
  
})

function bindScroll() {
  var controller = new ScrollMagic.Controller();
  var showArray = [];

  $('.show-me').each(function(i,v){
    var $self = $(this);
    var id = '#' + $self.attr('id');
    var offset = $self.data('offset');

    showArray[i] = new ScrollMagic.Scene({
      triggerElement: id,
      duration: $self.outerHeight(),
      offset: offset
    })
    .addTo(controller);

    showArray[i].on('enter',function(){
      $self.addClass('show');
    });
    showArray[i].on('leave',function(){
      // $self.removeClass('show');
    });
  });

}

function hideHeader() {
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('header').outerHeight();

  $(window).scroll(function (event) {
    hasScrolled();
  });

  function hasScrolled() {
    var st = $(this).scrollTop();
    if (Math.abs(lastScrollTop - st) <= delta)
      return;

    if (st > lastScrollTop) {
      $('.header').removeClass('active');
      $('.header').removeClass('nav-down').addClass('nav-up');
    } else {
      if (st + $(window).height() < $(document).height()) {
        $('.header').removeClass('nav-up').addClass('nav-down');
      }
    }
    if(st <= 0){
      $('.header').removeClass('nav-up nav-down');
    }
    lastScrollTop = st;
  }
}


$('#projectForm').on('submit', function(evt) {
  evt.preventDefault()     
  $.ajax({
      type: "POST",
      url: 'https://hi-designers.com/hauzen/mail.php',
      data: $(this).serialize(),
      beforeSend: function() {
        // $('#btnF').hide()
      },
      success: function (data){
        $('#btnF').hide()
        document.querySelector('.sendit').style.opacity = 1
      }
  })
})

