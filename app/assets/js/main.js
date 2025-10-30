(function ($) {
  'use strict';
  // **********************************************************************//
  // ! Init variables global
  // **********************************************************************//

  var $body = $('body');

  // **********************************************************************//
  // ! Owl Slider
  // **********************************************************************//
  var owlCarousel = function () {
    var $owlCarousel = $('[data-carousel]'),
      defaults = {
        items: 3,
        loop: false,
        center: false,
        margin: 20,
        autoWidth: false,
        rtl: false,
        responsive: {},
        responsiveBaseElement: window,
        lazyLoad: false,
        autoHeight: false,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        nav: false,
        navText: '',
        navElement: 'button',
        navClass: ['owl-prev fa fa-angle-left', 'owl-next fa fa-angle-right'],
        dots: true
      };

    // Check exit owl element
    if($owlCarousel.length > 0) {
      $owlCarousel.each(function() {
        // config mode
        var configs = $(this).data('carousel'),
          opts = $.extend({}, defaults, configs),
          $scope = $('.' + $(this).data('scope')),
          $prev = $scope.find('.' + $(this).data('prev')),
          $next = $scope.find('.' + $(this).data('next'));

        // Run owl carousel with option merged
        var  owl = $(this).owlCarousel(opts);

        // Trigger next
        $next.on('click', function() {
          owl.trigger('next.owl.carousel');
        });

        // Trigger prev
        $prev.on('click', function() {
          owl.trigger('prev.owl.carousel');
        });
      });
    }
  };

  // **********************************************************************//
  // ! Scroll to item
  // **********************************************************************//
  var scrollTo = function () {
    var $scrollItem = $('[data-action="scroll"]');

    $scrollItem.on('click', function (e) {
      e.preventDefault();
      var $target = $($(this).attr('href')) || $('#' + $(this).data('target')),
        offset = parseInt($(this).data('offset')) || 0;
      $('html, body').animate({
        scrollTop: $target.offset().top - offset
      }, 800);
    });
  };

  // **********************************************************************//
  // ! Check hash
  // **********************************************************************//
  var scrollToHash = function () {
    var $target = $(window.location.hash),
      offset = $target.data('offset') || 0;

    if($target.length > 0) {
      $('html, body').animate({
        scrollTop: $target.offset().top - offset
      }, 800);
    }
  };

  // **********************************************************************//
  // ! Countdown timer
  // **********************************************************************//
  var countDownTimer = function () {
    var $countDown = $('[data-countdown]'),
      countDownHtml = '<div class="countdown-item"><div class="countdown-time">%-D</div><div class="countdown-unit">Ngày</div></div>'+
        '<div class="countdown-item"><div class="countdown-time">%H</div><div class="countdown-unit">Giờ</div></div>' +
        '<div class="countdown-item"><div class="countdown-time">%M</div><div class="countdown-unit">Phút</div></div>' +
        '<div class="countdown-item"><div class="countdown-time">%S</div><div class="countdown-unit">Giây</div></div>';

    if($countDown.length > 0) {

      $countDown.each(function() {
        var datetime = $(this).data('countdown');

        $(this)
          .countdown(datetime)
          .on('update.countdown', function(event) {
            $(this).html(event.strftime(countDownHtml));
          });
      });
    }
  };

  // **********************************************************************//
  // ! Show modal payment
  // **********************************************************************//
  var modalShow = function () {
    var $modalShow = $('[data-modal="show"]');
    $modalShow.on('click', function (e) {
      e.preventDefault();
      var target = $(this).attr('href');
      $.fancybox.open({
        maxWidth	: '93%',
        fitToView	: false,
        padding : 0,
        margin: 0,
        href: target,
        width		: 685,
        autoHeight: true,
        autoSize	: true,
        arrows: false,
        title: null
      });
    });
  };

  // **********************************************************************//
  // ! Fancybox Modal
  // **********************************************************************//
  var modalRegister = function () {
    var $registerBtn = $('#register-btn', '.panel-register');

    $registerBtn.on('click', function (e) {
      e.preventDefault();
      var $this = $(this),
        target = $this.attr('href'),
        yourName = $.trim($('#your_name', '.panel-register').val()),
        yourPhone = $.trim($('#your_phone', '.panel-register').val());

      // Set value phone and name for modal
      $(target)
        .find('#reg_name').val(yourName).end()
        .find('#reg_phone').val(yourPhone);

      // Show modal
      $.fancybox.open({
        maxWidth	: '93%',
        fitToView	: false,
        padding : 0,
        margin: 0,
        href: target,
        width		: 685,
        autoHeight: true,
        autoSize	: true,
        arrows: false,
        title: null
      });
    });
  };
  
  // **********************************************************************//
  // ! Validate form
  // **********************************************************************//
  var validateForm = function () {
    var $registerForm = $('#register-form'),
      $rechargeForm = $('#recharge-form');

    // Modal register
    if ($registerForm.length > 0) {
      $registerForm.validate({
        invalidHandler: function(event, validator) {
          $.fancybox.update();
        },
        onfocusout : function() {
          $.fancybox.update();
        },
        submitHandler: function(form) {
          // Gọi ajax ở đây nếu form được submit

          // Kết quả submit ok sẽ show ra modal payment
          $.fancybox( {
            href : '#modal-payment',
            maxWidth	: '93%',
            fitToView	: false,
            padding : 0,
            margin: 0,
            width		: 685,
            autoHeight: true,
            autoSize	: true,
            arrows: false,
            title: null
          } );
        },
        ignore: [],
        errorClass: 'modal-error',
        rules: {
          reg_phone: {
            required: true,
            number: true,
            minlength: 8,
            maxlength: 11
          },
          reg_name: {
            required: true,
            minlength: 6,
            maxlength: 40
          },
          reg_pass: {
            required: true,
            minlength: 6,
            maxlength: 32
          },
          reg_pass_confirm: {
            required: true,
            minlength: 6,
            maxlength: 32,
            equalTo: '#reg_pass'
          },
          'g-recaptcha-response': {
            required: true
          }
        },
        messages: {
          reg_phone: {
            required: 'Vui lòng nhập số điện thoại',
            number: 'Vui lòng chỉ nhập chữ số',
            minlength: 'Số điện thoại tối thiểu 8 chữ số',
            maxlength: 'Số điện thoại tối đa 11 chữ số'
          },
          reg_name: {
            required: 'Vui lòng nhập họ và tên',
            minlength: 'Họ và tên thiểu 6 ký tự',
            maxlength: 'Họ và tên tối đa 40 ký tự'
          },
          reg_pass: {
            required: 'Vui lòng nhập mật khẩu',
            minlength: 'Mật khẩu tối thiểu 6 chứ số',
            maxlength: 'Mật khẩu tối đa 32 chứ số'
          },
          reg_pass_confirm: {
            required: 'Vui lòng nhập mật khẩu',
            minlength: 'Mật khẩu tối thiểu 6 chứ số',
            maxlength: 'Mật khẩu tối đa 32 chứ số',
            equalTo: 'Xác nhận mật khẩu không đúng'
          },
          'g-recaptcha-response': {
            required: 'Vui lòng xác nhận mã bảo vệ'
          }
        }
      });
    }

    if ($rechargeForm.length > 0) {
      $rechargeForm.validate({
        invalidHandler: function(event, validator) {
          $.fancybox.update();
        },
        onfocusout : function() {
          $.fancybox.update();
        },
        submitHandler: function(form) {
          // Gọi ajax ở đây nếu form được submit

          // Kết quả submit ok sẽ show ra modal payment
          // Tùy thuộc vào số thẻ nạp để quyết định người dùng có phải nạp tiền tiếp hay không
          // Nếu phải nạp tiền thêm

         /* $.fancybox( {
            href : '#modal-recharge',
            maxWidth	: '93%',
            fitToView	: false,
            padding : 0,
            margin: 0,
            width		: 685,
            autoHeight: true,
            autoSize	: true,
            arrows: false,
            title: null
          } );*/

          // Nếu đã nạp đủ
          $.fancybox( {
            href : '#modal-refill',
            maxWidth	: '93%',
            fitToView	: false,
            padding : 0,
            margin: 0,
            width		: 685,
            autoHeight: true,
            autoSize	: true,
            arrows: false,
            title: null
          } );
        },
        ignore: [],
        errorClass: 'modal-error',
        rules: {
          card_series: {
            required: true,
            number: true
          },
          card_pin: {
            required: true,
            number: true
          }
        },
        messages: {
          card_series: {
            required: 'Vui lòng nhập series của thẻ điện thoại',
            number: 'Mã thẻ không hợp lệ, vui lòng nhập lại'
          },
          card_pin: {
            required: 'Vui lòng nhập pin của thẻ điện thoại',
            number: 'Mã thẻ không hợp lệ, vui lòng nhập lại'
          }
        }
      });
    }
  };


  // **********************************************************************//
  // ! Window load
  // **********************************************************************//
  $(window).on('load', function() {
    scrollToHash();
  });

  // **********************************************************************//
  // ! Window resize
  // **********************************************************************//
  $(window).on('resize', function() {

  });

  // **********************************************************************//
  // ! Window scroll
  // **********************************************************************//
  $(window).on('scroll', function() {

  });
  // **********************************************************************//
  // ! window dome ready
  // **********************************************************************//
  $(document).on('ready', function () {
    owlCarousel();
    scrollTo();
    modalRegister();
    modalShow();
    countDownTimer();
    validateForm();
  });
})(jQuery);
