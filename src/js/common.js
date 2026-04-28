document.addEventListener('DOMContentLoaded', () => {

    // // чтобы страница не смешалась, когда скролл пропадает
    // function getScrollbarWidth() {
    //     return window.innerWidth - document.documentElement.clientWidth;
    // }

    // function lockScroll() {
    //     const scrollBarWidth = getScrollbarWidth();

    //     $('body')
    //         .addClass('locked')
    //         .css('padding-right', scrollBarWidth + 'px');
    // }

    // function unlockScroll() {
    //     $('body')
    //         .removeClass('locked')
    //         .css('padding-right', '');
    // }

    // function toggleScroll() {
    //     if ($('body').hasClass('locked')) {
    //         unlockScroll();
    //     } else {
    //         lockScroll();
    //     }
    // }

    //пункты меню, которые не входят, скрываются в бургер на десктопе
    function responseMenu() {
        let $navList = $('.nav-list');
        let $dropdown = $('.nav-list_dropdown');
        let $ddMenu = $navList.find('li.dd_menu');

        $dropdown.find('li.nav-item').appendTo($navList);
        let items = $navList.children('.nav-item');

        let totalItemsWidth = 0;
        items.each(function () {
            totalItemsWidth += $(this).outerWidth(true);
        });

        let containerWidth = $navList.width();

        if (totalItemsWidth <= containerWidth) {
            $ddMenu.hide();
            return;
        }

        $ddMenu.show();

        let reservedBtnWidth = 150;
        // let btnWidth = $ddMenu.outerWidth(true);
        // let max_width = containerWidth - btnWidth;
        let max_width = containerWidth - reservedBtnWidth;
        let currentWidth = 0;

        items.each(function () {
            let itemWidth = $(this).outerWidth(true);
            if (currentWidth + itemWidth > max_width) {
                $(this).nextAll('.nav-item').addBack().appendTo($dropdown);
                return false;
            }
            currentWidth += itemWidth;
        });
    }

    $(window).on('resize', function () {
        responseMenu();
    }).trigger('resize');


    // Функция для закрытия всего
    function closeEverything() {
        $('.nav-list_dropdown').hide();
        $('.dd_menu_btn, .nav-list,.mobile_menu_btn, .mobile_menu, .header_search, .header_search_result, .overlay, .nav-list').removeClass('active');
    }

    //показ не входивших пунктов меню на деске
    $(' .nav-list').on('click', '.dd_menu_btn', function (e) {
        e.stopPropagation();
        $('.nav-list_dropdown').toggle();
        $(this).toggleClass('active');
        $('.nav-list').toggleClass('active');

        // оверлей включаем только если открываем меню
        if ($(this).hasClass('active')) {
            $('.overlay').addClass('active');
        } else {
            $('.overlay').removeClass('active');
        }
    });

    // моб. меню
    $('.mobile_menu_btn').on('click', function (e) {
        e.stopPropagation();
        $(this).toggleClass('active');
        $('.mobile_menu').toggleClass('active');

        if ($(this).hasClass('active')) {
            $('.overlay').addClass('active');
        } else {
            closeEverything(); // при закрытии бургера чистим все
        }
    });

    // поиск
    $('.header_search').on('click', function (e) {
        e.stopPropagation();
        $(this).toggleClass('active');
        $('.header_search_result').toggleClass('active');

        // находим, где находится поиск
        const isInsideMobileMenu = $(this).closest('.mobile_menu').length > 0;

        // Если поиск не в моб меню, тогда управляем оверлеем
        if (!isInsideMobileMenu) {
            if ($(this).hasClass('active')) {
                $('.overlay').addClass('active');
            } else {
                $('.overlay').removeClass('active');
            }
        }

    });

    //закрытие  при клике на оверлей
    $('.overlay').on('click', function (e) {
        closeEverything();
    });

    // Esc
    $(document).on('keydown', function (e) {
        if (e.keyCode === 27) {
            closeEverything();
        }
    });


    // слайдер баннер
    const IndexSlider = new Swiper(".index_slider", {
        slidesPerView: 1,
        spaceBetween: 16,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        navigation: {
            nextEl: ".index_slider_wrapper .swiper-button-next",
            prevEl: ".index_slider_wrapper .swiper-button-prev"
        },
    });


    // слайдер карточек
    let cardSlider = null;

    function initCardSlider() {
        if (window.innerWidth < 768) {
            if (!cardSlider) {
                cardSlider = new Swiper(".card_slider", {
                    slidesPerView: 'auto',
                    spaceBetween: 16,
                    watchSlidesProgress: true,
                    mousewheelControl: true,
                    watchOverflow: true,
                    watchSlidesVisibility: true,
                });
            }
        } else {
            if (cardSlider) {
                cardSlider.destroy(true, true);
                cardSlider = null;
            }
        }
    }
    initCardSlider();
    window.addEventListener("resize", initCardSlider);


    // слайдер каталога
    let catalogSlider = null;

    function initCatalogSlider() {
        if (window.innerWidth < 992) {
            if (!catalogSlider) {
                catalogSlider = new Swiper(".catalog_slider", {
                    slidesPerView: 'auto',
                    spaceBetween: 24,
                    watchSlidesProgress: true,
                    mousewheelControl: true,
                    watchOverflow: true,
                    watchSlidesVisibility: true,
                    autoHeight: true,
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                });
            }
        } else {
            if (catalogSlider) {
                catalogSlider.destroy(true, true);
                catalogSlider = null;
            }
        }
    }
    initCatalogSlider();
    window.addEventListener("resize", initCatalogSlider);


    // слайдер товаров
    const productSlider = new Swiper(".product_slider", {
        slidesPerView: 'auto',
        spaceBetween: 24,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            // dynamicBullets: true,
        },
        breakpoints: {
            992: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 24,
            },
        },
    });

    // слайдер в сеции о компании
    const gallerySlider = new Swiper(".about_slider", {
        slidesPerView: 1,
        spaceBetween: 24,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        navigation: {
            nextEl: ".about_slider_wrapper .swiper-button-next",
            prevEl: ".about_slider_wrapper .swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            // dynamicBullets: true,
        },
    });

    // раскрытие меню на мобилке
    $('.footer_menu .title').on('click', function () {
        const $submenu = $(this).next('.footer_submenu');

        if ($(window).width() < 992) {
            const $submenu = $(this).next('.footer_submenu');

            if ($submenu.length > 0) {
                // $('.footer_submenu').not($submenu).slideUp(); 

                $submenu.stop().slideToggle(300);
                $(this).toggleClass('active');
            }
        }
    });


    // // показать еще / скрыть
    $('.footer_submenu_all').on('click', function () {
        $(this).toggleClass('active');
        $(this).siblings('.footer_submenu').find('li:nth-child(n+5)').stop().slideToggle(300);
    });

    $('.footer_submenu').each(function () {
        if ($(this).find('li').length <= 4) {
            $(this).siblings('.footer_submenu_all').hide();
        }
    });


    AOS.init({
        easing: 'ease-in-out',
        delay: 100,
        once: true,
        duration: 700,
        offset: window.innerWidth < 577 ? 0 : 100,
    });

    // // маска для телефона
    // const phoneInputs = document.querySelectorAll('.form_input[type="tel"]');
    // phoneInputs.forEach(input => {
    //     IMask(input, {
    //         mask: '+{7}(000)000-00-00'
    //     })
    // })

    // // валидация телефона
    // $.validator.addMethod("phoneRU", function (value, element) {
    //     const digits = value.replace(/\D/g, '');
    //     return this.optional(element) || digits.length === 11;
    // }, "Введите корректный номер телефона");

    // // jq валидация
    // $('form.validate').each(function () {
    //     $(this).validate({
    //         errorPlacement: function (error, element) {
    //             error.appendTo(element.closest(".form_input_group"));
    //         },
    //         highlight: function (element, errorClass, validClass) {
    //             $(element).addClass(errorClass);
    //             $(element).closest('.form_input_group').addClass(errorClass);
    //         },
    //         unhighlight: function (element, errorClass, validClass) {
    //             $(element).removeClass(errorClass);
    //             $(element).closest('.form_input_group').removeClass(errorClass);
    //         },
    //         rules: {
    //             agree: "required",
    //             phone: {
    //                 required: true,
    //                 phoneRU: true
    //             }
    //         },
    //         messages: {
    //             agree: "",
    //         }
    //     })
    // });
})