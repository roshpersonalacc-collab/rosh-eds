/* eslint-disable linebreak-style */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
// blocks/carousel/carousel.js
import { renderBlock } from '../../scripts/faintly.js';
import { loadScript, loadCSS } from '../../scripts/aem.js';

export default async function decorate(block) {
  await loadScript('https://code.jquery.com/jquery-1.11.0.min.js');
  await loadScript('https://code.jquery.com/jquery-migrate-1.2.1.min.js');
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.js');
  await loadCSS('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css');
  await loadCSS('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.css');

  await renderBlock(block);
  $(document).ready(function () {
    $('.text-carousel').slick({
      dots: true,
      infinite: true,
      centerMode: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      centerPadding: '50px',
      arrows: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1,
          },
        },
      ],
    });
  });

  $(function () {
    var $c = $('.text-carousel');

    function ensureReady() {
      if (!$c.hasClass('slick-initialized')) return;
      var $track = $c.find('.slick-track');
      // If Slick hasn't assigned a width yet, force a full refresh+reposition
      if ($track.length && $track.width() === 0) {
        $c.slick('refresh', true);
        requestAnimationFrame(function () {
          //    $c.slick('setPosition');
        });
      }
    }

    // Bind BEFORE init so this always fires
    $c.on('init', function () {
      // Let layout settle, then check/repair
      requestAnimationFrame(ensureReady);
      setTimeout(ensureReady, 60);
    });

    // 🔻 your actual Slick init (example options – keep yours)
    $c.slick({
      arrows: true,
      dots: true,
      centerMode: true,
      variableWidth: true, // if you’re using CSS widths
      adaptiveHeight: false,
    });
  });
}
