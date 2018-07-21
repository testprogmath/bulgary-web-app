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

    function showError(container, errorMessage) {
        container.className = 'error';
        var msgElem = document.createElement('span');
        msgElem.className = "error-message";
        msgElem.innerHTML = errorMessage;
        container.appendChild(msgElem);
    }

    function resetError(container) {
        container.className = '';
        if (container.lastChild.className == "error-message") {
            container.removeChild(container.lastChild);
        }
    }

    function validate(form) {
        var elems = form.elements;

        resetError(elems.from.parentNode);
        if (!elems.from.value) {
            showError(elems.from.parentNode, ' Укажите от кого.');
        }

        resetError(elems.password.parentNode);
        if (!elems.password.value) {
            showError(elems.password.parentNode, ' Укажите пароль.');
        } else if (elems.password.value != elems.password2.value) {
            showError(elems.password.parentNode, ' Пароли не совпадают.');
        }

        resetError(elems.to.parentNode);
        if (!elems.to.value) {
            showError(elems.to.parentNode, ' Укажите, куда.');
        }

        resetError(elems.message.parentNode);
        if (!elems.message.value) {
            showError(elems.message.parentNode, ' Отсутствует текст.');
        }

    }





/*
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
        required:true
      },
      email:{
          required:true,
        email:true
      }
    },
      messages:{
        tel:{
              required:'Поле обязательно для заполнения',
              regex:'Телефон может содержать символы + - ()'
        },
        name:{
              required:'Поле обязательно для заполнения',
        },
        email:{
            required:'Поле обязательно для заполнения',
            email:'Неверный формат E-mail'
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
                    location.href='https://wayup.in/lm/landing-page-marathon/success';
                    //отправка целей в Я.Метрику и Google Analytics
                    ga('send', 'event', 'masterklass7', 'register');
            yaCounter27714603.reachGoal('lm17lead');
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
*/