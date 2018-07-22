$(function() {


    /*----  Плавная прокрутка  ----*/


    $("a.scrollto").click(function () {
        var elementClick = '#'+$(this).attr("href").split("#")[1]
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1200);
        return false;
    });


    /*----  Модальное окно  ----*/


    $('.act-click').click(function (){
        $('#exampleModal').arcticmodal();
    });


    /*----  Слайдер  ----*/


    $('.comments-slider').slick({
        dots: true,
        infinite:true,
        arrows: true,
        slidesToShow: 1,
        adaptiveHeight: false,
        edgeFriction: 0.25,
        responsive: [
            {
                breakpoint: 860,
                settings: {
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                }
            }
        ],
        prevArrow: '<i class="slick-arrow fa reviews__arrows fa-angle-left" aria-hidden="true" style="font-size:40px;"></i>',
        nextArrow: '<i class="slick-arrow fa reviews__arrows fa-angle-right" aria-hidden="true" style="font-size:40px;"></i>'
    });



    /*----  Проверка данных и отправка формы  ----*/


    $('[data-submit]').on('click', function(e){
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );
    function valEl(el){

        el.validate({
            rules:{
               tel:{
                    required:true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                name:{
                    required:true,
                    regex: '(^[A-Z]{1}[a-z]{1,14} [A-Z]{1}[a-z]{1,14}$)|(^[А-Я]{1}[а-я]{1,14} [А-Я]{1}[а-я]{1,14}$)'
                },
                email:{
                    required:true,
                    regex: '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
                    //email:true
                }
            },
            messages:{
                tel:{
                    required:'Поле обязательно для заполнения',
                    regex:'Телефон может содержать символы + - ()'
                },
                name:{
                    required:'Поле обязательно для заполнения',
                    regex: 'Имя может содержать только буквы и не может содержать цыфры'
                },
                email:{
                    required:'Поле обязательно для заполнения',
                    regex:'Неверный формат E-mail'
                }
            },
            submitHandler: function (form) {
                $('#loader').fadeIn();
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch($formId){
                    case'goToNewPage':
                        $.ajax({
                            type: 'POST',
                            url: $form.attr('action'),
                            data: $form.serialize(),
                        })
                            .always(function (response) {
                                //ссылка на страницу "спасибо" - редирект
                                location.href='#';
                                //отправка целей в Я.Метрику и Google Analytics
                                //ga('send', 'event', 'masterklass7', 'register');
                            });
                        break;
                    case'popupResult':
                        $.ajax({
                            type: 'POST',
                            url: $form.attr('action'),
                            data: $form.serialize(),
                        })
                            .always(function (response) {
                                setTimeout(function (){
                                    $('.box-modal').fadeOut();
                                    $.arcticmodal('close');
                                    $('#overlay').fadeIn();

                                    $form.trigger('reset');
                                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                                },1100);
                                $('#overlay').on('click', function(e) {
                                    $('#overlay').fadeOut();
                                });

                            });
                        break;
                }
                return false;
            }
        })
    }

    $('.js-form').each(function() {
        valEl($(this));
    });
});