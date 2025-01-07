var DOMAnimations = {

    /**
     * SlideUp
     *
     * @param {HTMLElement} element
     * @param {Number} duration
     * @returns {Promise<boolean>}
     */
    slideUp: function (element, duration) {
        duration = (duration) ? duration : 500;

        return new Promise(function (resolve, reject) {

            element.style.height = element.offsetHeight + 'px';
            element.style.transitionProperty = 'height, margin, padding';
            element.style.transitionDuration = duration + 'ms';
            element.offsetHeight;
            element.style.overflow = 'hidden';
            element.style.height = 0;
            element.style.paddingTop = 0;
            element.style.paddingBottom = 0;
            element.style.marginTop = 0;
            element.style.marginBottom = 0;
            window.setTimeout(function () {
                element.style.display = 'none';
                element.style.removeProperty('height');
                element.style.removeProperty('padding-top');
                element.style.removeProperty('padding-bottom');
                element.style.removeProperty('margin-top');
                element.style.removeProperty('margin-bottom');
                element.style.removeProperty('overflow');
                element.style.removeProperty('transition-duration');
                element.style.removeProperty('transition-property');
                resolve(false);
            }, duration)
        })
    },

    /**
     * SlideDown
     *
     * @param {HTMLElement} element
     * @param {Number} duration
     * @returns {Promise<boolean>}
     */
    slideDown: function (element, duration) {
        duration = (duration) ? duration : 500;

        return new Promise(function (resolve, reject) {

            element.style.removeProperty('display');
            var display;
            display = window.getComputedStyle(element).display;

            if (display === 'none')
                display = 'block';

            element.style.display = display;
            var height;
            height = element.offsetHeight;
            element.style.overflow = 'hidden';
            element.style.height = 0;
            element.style.paddingTop = 0;
            element.style.paddingBottom = 0;
            element.style.marginTop = 0;
            element.style.marginBottom = 0;
            element.offsetHeight;
            element.style.transitionProperty = 'height, margin, padding';
            element.style.transitionDuration = duration + 'ms';
            element.style.height = height + 'px';
            element.style.removeProperty('padding-top');
            element.style.removeProperty('padding-bottom');
            element.style.removeProperty('margin-top');
            element.style.removeProperty('margin-bottom');
            window.setTimeout(function () {
                element.style.removeProperty('height');
                element.style.removeProperty('overflow');
                element.style.removeProperty('transition-duration');
                element.style.removeProperty('transition-property');
            }, duration)
        })
    },

    /**
     * SlideToggle
     *
     * @param {HTMLElement} element
     * @param {Number} duration
     * @returns {Promise<boolean>}
     */
    slideToggle: function (element, duration) {
        duration = (duration) ? duration : 500;

        if (window.getComputedStyle(element).display === 'none') {

            return this.slideDown(element, duration);

        } else {

            return this.slideUp(element, duration);
        }
    }
}

// ------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

    var toggle, body;
    toggle = document.querySelector('.ctoc-toggle');
    body = document.querySelector('.ctoc-body');

    if (toggle && body) {
        if (body.offsetLeft <= 0) {
            toggle.classList.remove('active');
        }
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            if (body.offsetLeft <= 0)
                this.classList.add('active');
            else
                this.classList.remove('active');
            DOMAnimations.slideToggle(body);
        });
    }

});

var anchors = document.querySelectorAll('.ctoc__item');
var supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
if (anchors.length && supportsNativeSmoothScroll) {
    Object.keys(anchors).forEach(function (anchor) {
        anchors[anchor].addEventListener('click', function (e) {
            e.preventDefault();
            var blockID, element, yCoordinate, yOffset;
            blockID = anchors[anchor].getAttribute('href').substr(1);
            element = document.getElementById(blockID);
            if (element) {
                yCoordinate = element.getBoundingClientRect().top + window.pageYOffset;
                yOffset = -50;
                window.scrollTo({
                    top: yCoordinate + yOffset,
                    behavior: 'smooth'
                });
            }

        })
    });
}
