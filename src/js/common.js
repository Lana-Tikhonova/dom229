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
        $('.dd_menu_btn, .nav-list,.mobile_menu_btn, .mobile_menu, .header_search, .header_search_result, .overlay, .nav-list, .header_catalog_btn, .catalog_dropdown, .header_calc_btn, .calculator_dropdown,.calculator_dropdown, header_calc_btn').removeClass('active');
    }

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

    // каталог
    $('.header_catalog_btn').on('click', function (e) {
        e.stopPropagation();
        $(this).toggleClass('active');
        $('.catalog_dropdown').toggleClass('active');

        if ($(this).hasClass('active')) {
            $('.overlay').addClass('active');
        } else {
            closeEverything();
        }
    });

    // клик по основной категории
    $('.catalog__header').on('click', function () {
        const $item = $(this).closest('.catalog__item');
        $item.toggleClass('is-active').find('> .catalog__content').slideToggle(250);

        // $item.siblings('.is-active').removeClass('is-active')
        //     .find('> .catalog__content').slideUp(300);
    });

    // клик по подкатегории 
    $('.catalog__sub-row.has-children').on('click', '.catalog__sub-header', function (e) {
        e.preventDefault();
        const $row = $(this).closest('.catalog__sub-row');
        $row.toggleClass('is-active').find('.catalog__sub-content').slideToggle(200);
    });

    // калькулятор
    $('.header_calc_btn').on('click', function (e) {
        e.stopPropagation();
        $(this).toggleClass('active');
        $('.calculator_dropdown').toggleClass('active');

        if ($(this).hasClass('active')) {
            $('.overlay').addClass('active');
        } else {
            closeEverything();
        }
    });

    // открытие Выберите опцию
    $('.calculator__select-header').on('click', function () {
        $(this).toggleClass('is-open');
        $('.calculator__select-content').slideToggle(300);
    });

    // логика внутренних аккордеонов 
    $('.calculator__header').on('click', function (e) {
        e.stopPropagation();
        const parent = $(this).closest('.calculator__item');

        // $('.calculator__item').not(parent).removeClass('is-active').find('.calculator__content').slideUp();

        parent.toggleClass('is-active');
        parent.find('.calculator__content').slideToggle(300);
    });

    // выбор подкатегории
    $('.calculator__sub-item').on('click', function (e) {
        e.stopPropagation();
        const $currentContent = $(this).closest('.calculator__content');
        $currentContent.find('.calculator__sub-item').removeClass('is-selected');
        $(this).addClass('is-selected');

        // разблок кнопку
        $('#next-step').prop('disabled', false);
    });

    // переключение шагов
    $('#next-step').on('click', function () {
        $('#step-1').fadeOut(200, function () {
            $('#step-2').fadeIn(200);
        });
    });

    $('#prev-step').on('click', function () {
        $('#step-2').fadeOut(200, function () {
            $('#step-1').fadeIn(200);
        });
    });

    // имитация стрелок input type="number"
    $('.input-number-arrow_top').on('click', function () {
        let input = $(this).closest('.input-number').find('input');
        input.val(parseInt(input.val()) + 1).trigger('input');
    });

    $('.input-number-arrow_bottom').on('click', function () {
        let input = $(this).closest('.input-number').find('input');
        let min = parseInt(input.attr('min'));
        let newVal = parseInt(input.val()) - 1;

        if (newVal >= min) {
            input.val(newVal).trigger('input');
        }
    });

    // имитация select в калькуляторе
    // открытие/закрытие выпадающего списка
    $('.calculator__select__dropdown-header').on('click', function (e) {
        e.stopPropagation();

        const $dropdown = $(this).closest('.calculator__select__dropdown');
        const $list = $dropdown.find('.calculator__select__dropdown-list');

        $('.calculator__select__dropdown-list').not($list).slideUp(200);
        $('.calculator__select__dropdown').not($dropdown).removeClass('is-open');

        $list.slideToggle(200);

        const isVisible = $list.is(':visible');
        $dropdown.toggleClass('is-open');
    });

    // выбор элемента из списка
    $(document).on('click', '.calculator__select__dropdown-item', function () {
        const $item = $(this);
        const value = $item.data('value');
        const text = $item.text();
        const $dropdown = $item.closest('.calculator__select__dropdown');

        $dropdown.find('.calculator__select__dropdown-current').text(text);

        $dropdown.find('.calculator__select__dropdown-item').removeClass('is-selected');
        $item.addClass('is-selected');

        $dropdown.removeClass('is-open')
        $dropdown.find('.calculator__select__dropdown-list').slideUp(200);

        console.log('Выбран ID:', value);
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.calculator__select__dropdown').length) {
            $('.calculator__select__dropdown-list').slideUp(200);
            $('.calculator__select__dropdown').removeClass('is-open');
        }
    });

    // закрывам калькулятор
    $('.calculator__close').on('click', function () {
        closeEverything();
    });

    // pакрываем моб меню при открытии калькулятора
    $('.mobile_menu .header_calc_btn').on('click', function () {
        $('.mobile_menu_btn').removeClass('active')
        $('.mobile_menu').removeClass('active');
    });


    // слайдер баннер
    document.querySelectorAll('.index_slider_wrapper').forEach(wrapper => {
        const slider = wrapper.querySelector('.index_slider');

        new Swiper(slider, {
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
            speed: 600,
            navigation: {
                nextEl: wrapper.querySelector('.swiper-button-next'),
                prevEl: wrapper.querySelector('.swiper-button-prev'),
            },
        });
    });


    // слайдер карточек
    let cardSlider = null;

    function initCardSlider() {
        const el = document.querySelector(".card_slider");
        if (!el) return;
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


    // слайдер каталога
    let catalogSlider = null;

    function initCatalogSlider() {
        const el = document.querySelector(".catalog_slider");
        if (!el) return;
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


    function handleResize() {
        initCardSlider();
        initCatalogSlider();
    }

    handleResize();
    window.addEventListener("resize", handleResize);


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
    document.querySelectorAll('.about_slider_wrapper').forEach(wrapper => {
        const slider = wrapper.querySelector('.about_slider');

        new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 24,
            watchSlidesProgress: true,
            mousewheelControl: true,
            watchOverflow: true,
            watchSlidesVisibility: true,
            speed: 600,
            navigation: {
                nextEl: wrapper.querySelector('.swiper-button-next'),
                prevEl: wrapper.querySelector('.swiper-button-prev'),
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                // dynamicBullets: true,
            },
        });
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


    const btnMAX = document.querySelector('.messenger_block .btn');
    if (btnMAX) {
        btnMAX.addEventListener('click', (e) => {
            if (btnMAX.classList.contains('is-animating')) return;

            btnMAX.classList.add('is-animating');
            setTimeout(() => {
                btnMAX.classList.remove('is-animating');
            }, 3000);
        });
    }

    // видео
    const players = Array.from(document.querySelectorAll('.player_video')).map(
        (p) => new Plyr(p, {
            autoplay: false,
        })
    );

    // для остановки всех видео
    const stopAllVideos = () => {
        players.forEach(player => player.pause());
    };

    //  остановить другие видео, если запустили текущее
    players.forEach((player) => {
        player.on('play', () => {
            players.forEach((otherPlayer) => {
                if (otherPlayer !== player) {
                    otherPlayer.pause();
                }
            });
        });
    });

    // слайдер картинок
    document.querySelectorAll('.gallery_slider_wrapper').forEach(wrapper => {
        const slider = wrapper.querySelector('.gallery_slider');

        new Swiper(slider, {
            slidesPerView: 'auto',
            spaceBetween: 12,
            watchSlidesProgress: true,
            watchOverflow: true,
            speed: 600,
            navigation: {
                nextEl: wrapper.querySelector('.swiper-button-next'),
                prevEl: wrapper.querySelector('.swiper-button-prev'),
            },
            pagination: {
                el: wrapper.querySelector('.swiper-pagination'),
                clickable: true,
            },
            breakpoints: {
                576: {
                    slidesPerView: 'auto',
                    spaceBetween: 24,
                },
            },
            // остановить видео при смене слайда
            on: {
                slideChange: function () {
                    stopAllVideos();
                },
            },

        });
    });

    // слайдер истории
    document.querySelectorAll('.history_slider_wrapper').forEach(wrapper => {
        const slider = wrapper.querySelector('.history_slider');

        new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 24,
            watchSlidesProgress: true,
            watchOverflow: true,
            speed: 600,
            navigation: {
                nextEl: wrapper.querySelector('.swiper-button-next'),
                prevEl: wrapper.querySelector('.swiper-button-prev'),
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                type: "progressbar",
            },
            breakpoints: {
                1200: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
            },

            // on: {
            //     slideChange: function () {
            //         const slides = this.slides
            //         slides.forEach(s => s.classList.remove('is-really-active'));

            //         let activeIdx = this.activeIndex;
            //         if (this.isEnd) {
            //             activeIdx = slides.length - 1;
            //         }

            //         slides[activeIdx].classList.add('is-really-active');
            //     }
            // }
        });
    });


    // слайдер услуг
    document.querySelectorAll('.services_slider_block').forEach(wrapper => {
        const slider = wrapper.querySelector('.services_slider');

        new Swiper(slider, {
            slidesPerView: 'auto',
            spaceBetween: 24,
            watchSlidesProgress: true,
            watchOverflow: true,
            speed: 600,
            navigation: {
                nextEl: wrapper.querySelector('.swiper-button-next'),
                prevEl: wrapper.querySelector('.swiper-button-prev'),
            },
        });
    });



    const $sort = $('.news_sort');
    const $trigger = $sort.find('.news_sort_btn');
    const $list = $sort.find('.news_sort_list');
    const $label = $sort.find('.news_sort_label');

    // Переключение списка
    $trigger.on('click', function (e) {
        e.stopPropagation();
        $list.toggleClass('is-active');
    });

    // Выбор элемента
    $('.news_sort_item').on('click', function () {
        const text = $(this).text();
        const val = $(this).data('sort');

        $('.news_sort_item').removeClass('active');
        $(this).addClass('active');

        $label.text('Сортировать ' + text.toLowerCase());

        $list.removeClass('is-active');

        console.log('Sorting by:', val);
    });

    $(document).on('click', function () {
        $list.removeClass('is-active');
    });


    // Блок "Поделиться"
    $('.share_list').on('click', 'button', function () {
        const $btn = $(this);
        const social = $btn.data('social');
        const pageUrl = window.location.href;
        const pageTitle = document.title;

        const socialUrls = {
            vkontakte: `https://vk.com/share.php?url=${encodeURIComponent(pageUrl)}`,
            telegram: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`,
            odnoklassniki: `https://connect.ok.ru/offer?url=${encodeURIComponent(pageUrl)}`,
            max: `https://max.ru/:share?text=${encodeURIComponent(pageUrl)}`
        };

        if (social === 'max') {
            if (navigator.share) {
                navigator.share({
                    title: pageTitle,
                    url: pageUrl
                }).catch(() => { });
            } else {
                const win = window.open(socialUrls.max, '_blank');

                if (!win) {
                    copyToClipboard(pageUrl, $btn);
                }
            }
        } else if (socialUrls[social]) {
            window.open(socialUrls[social], '_blank', 'width=600,height=400');
        }
    });

    // Функция для копирования
    function copyToClipboard(text, $triggerBtn) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showCopyFeedback($triggerBtn);
            });
        } else {
            // Резервный способ через скрытый input
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showCopyFeedback($triggerBtn);
            } catch (err) {
                console.error('Не удалось скопировать', err);
            }
            document.body.removeChild(textArea);
        }
    }

    function showCopyFeedback($btn) {
        const originalHtml = $btn.html();
        alert('Ссылка скопирована в буфер!');
    }


    // слайдер брендов
    const brandsSlider = new Swiper(".brands_slider", {
        slidesPerView: 'auto',
        spaceBetween: 12,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        speed: 600,
        grabCursor: true,
        breakpoints: {
            576: {
                slidesPerView: 'auto',
                spaceBetween: 24,
            },
        },
    });


    // вакансии
    $('.vacancy_item_btn').on('click', function () {
        // $('.vacancy_item_btn').not(this).parent().removeClass('active');
        // $('.vacancy_item_btn').not(this).next().slideUp();

        $(this).parent().toggleClass('active');
        $(this).next().slideToggle('slow');
    });


    // fancybox
    Fancybox.bind("[data-fancybox]");


    // кастомный скроллбар и прикрутка блока при наведении на свг
    const shopsScrollbar = $(".complex_filter_shops").overlayScrollbars({
        className: "os-theme-dark",
        scrollbars: {
            clickScrolling: true,
            visibility: "visible",
        }
    }).overlayScrollbars();


    // const mapButtons = document.querySelectorAll('.scheme_tippy_btn');

    // mapButtons.forEach(btn => {
    //     btn.addEventListener('mouseenter', function () {
    //         const shopId = this.getAttribute('data-template');

    //         const targetItems = document.querySelectorAll(`.complex_filter_shops_col[data-shop="${shopId}"]`);

    //         document.querySelectorAll('.complex_filter_shops_col').forEach(el => {
    //             el.classList.remove('is-highlighted');
    //         });

    //         if (targetItems.length > 0) {
    //             // подсвечиваем все найденные блоки
    //             targetItems.forEach(item => item.classList.add('is-highlighted'));

    //             // скроллим к первому из найденных
    //             if (shopsScrollbar) {
    //                 shopsScrollbar.scroll(targetItems[0], 500, "swing");
    //             }
    //         }
    //     });
    // });

    // кастомный селект в комплексе
    $('.complex_dropdown_btn').on('click', function (e) {
        e.stopPropagation();

        const $container = $(this).closest('.complex_dropdown');
        const $list = $container.find('.complex_dropdown_list');

        $('.complex_dropdown_list').not($list).removeClass('is-active');
        $('.complex_dropdown_btn').not($(this)).removeClass('is-active');


        $list.toggleClass('is-active');
        $(this).toggleClass('is-active');
    });

    $('.complex_dropdown_item').on('click', function () {
        const text = $(this).text();
        const $container = $(this).closest('.complex_dropdown');

        $container.find('.complex_dropdown_item').removeClass('active');
        $(this).addClass('active');

        $container.find('.complex_dropdown_label').text(text);

        $container.find('.complex_dropdown_list').removeClass('is-active');
        $container.find('.complex_dropdown_btn').removeClass('is-active');
    });

    $(document).on('click', function () {
        $('.complex_dropdown_list').removeClass('is-active');
        $('.complex_dropdown_btn').removeClass('is-active');
    });

    // pакрываем инфу
    $('.complex_scheme_info_head').on('click', function () {
        $(this).parent().toggleClass('active')
    });

    // логика карты свг
    const isMobile = () => window.innerWidth < 992;
    // const initialScale = isMobile() ? 2 : 1;

    let panzoomInstance = null;
    const schemeWrapper = document.querySelector('.complex_map');

    const schemeContainer = schemeWrapper.querySelector('.complex_scheme .img');
    const zoomInBtn = schemeWrapper.querySelector('#zoom-in');
    const zoomOutBtn = schemeWrapper.querySelector('#zoom-out');

    // приближение на карте
    panzoomInstance = Panzoom(schemeContainer, {
        minScale: 1,
        maxScale: 10,
        contain: 'outside',
        // startScale: initialScale,
        startScale: 1,
    });

    schemeContainer.addEventListener('wheel', panzoomInstance.zoomWithWheel);
    zoomInBtn.onclick = panzoomInstance.zoomIn;
    zoomOutBtn.onclick = panzoomInstance.zoomOut;

    // прокрутка списка
    function scrollToShopItems(shopId) {
        const targetItems = document.querySelectorAll(`.complex_filter_shops_col[data-shop="${shopId}"]`);

        document.querySelectorAll('.complex_filter_shops_col').forEach(el => {
            el.classList.remove('is-highlighted');
        });

        if (targetItems.length > 0 && shopsScrollbar) {
            targetItems.forEach(item => item.classList.add('is-highlighted'));

            // скроллим к первой из списка
            shopsScrollbar.scroll(targetItems[0], 500, "swing");
        }
    }

    // всплывашка при наведении на свг
    let currentTippy = null;

    tippy('.scheme_tippy_btn', {
        trigger: isMobile() ? 'click' : 'mouseenter focus',
        trigger: 'click',
        content(reference) {
            const id = reference.getAttribute('data-template');
            const template = document.getElementById(id);
            return template ? template.innerHTML : '';
        },
        allowHTML: true,
        arrow: false,
        theme: 'scheme_tooltip',
        animation: 'scale',
        placement: isMobile() ? 'bottom' : 'right',
        maxWidth: '272px',
        interactive: true,
        duration: [400, 200],
        appendTo: document.querySelector('.complex_section'),
        distance: 0,
        offset: [0, 0],
        onShow(instance) {
            if (currentTippy && currentTippy !== instance) {
                currentTippy.hide();
            }
            currentTippy = instance;


            // слайдер в открытом тултипе
            const sliderEl = instance.popper.querySelector('.tooltip_slider');

            if (sliderEl && !sliderEl.swiper) {
                new Swiper(sliderEl, {
                    slidesPerView: 1,
                    spaceBetween: 12,
                    watchSlidesProgress: true,
                    observeParents: true,
                    observer: true,
                    pagination: {
                        el: instance.popper.querySelector(".swiper-pagination"),
                        clickable: true,
                        // dynamicBullets: true,
                    },
                });
            }

            // прокрутка списка
            const shopId = instance.reference.getAttribute('data-template');
            scrollToShopItems(shopId);
        },
        onHide(instance) {
            // удаляем слайдер
            const sliderEl = instance.popper.querySelector('.tooltip_slider');
            if (sliderEl && sliderEl.swiper) {
                sliderEl.swiper.destroy();
            }

            if (currentTippy === instance) {
                currentTippy = null;
            }
        }
    });


})