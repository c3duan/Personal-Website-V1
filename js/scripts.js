/*!
    Last Change: 06/10/2018
    Author: Chengzhu Duan

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

(function($) {

    $(document).ready(function() {
        setTimeout(function() {
            $('body').addClass('loaded');
        }, 3000);
    });

    // Remove no-js class
    $('html').removeClass('no-js');



   // $('.panel').height = $('#skills').height + $('body').max


    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1);

    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Scroll to first element
    $('#lead-down span').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $($this.find('.vtimeline-point')[0]).prepend('<div class="vtimeline-icon"><a href="https://www.chinamcloud.com/" target="blank"><img src="./images/chinamcloud.png" alt="Avatar" style="margin: 5%; width: 88%; border-radius:50%"></div>');
        $($this.find('.vtimeline-point')[1]).prepend('<div class="vtimeline-icon"><a href="https://tritonse.github.io/" taget="blank"><img src="./images/tse.png" alt="Avatar" style="margin: 5%; width: 88%; border-radius: 50%"></div>');
        $($this.find('.vtimeline-point')[2]).prepend('<div class="vtimeline-icon"><a href="http://www.cn1win.com/index.html" taget="blank"><img src="./images/cn1win.png" alt="Avatar" style="margin: 5%; width: 88%; border-radius: 50%"></div>');

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });

    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

    var $window = $(window);
    var lastWindowWidth = $window.width();

    $window.resize(function () {
        /* Do not calculate the new window width twice.
         * Do it just once and store it in a variable. */
        var windowWidth = $window.width();

        /* Use !== operator instead of !=. */
        if (lastWindowWidth !== windowWidth) {
            if($('body').innerWidth() <= 670) {
                $('.layer .pull-right').width( $('.panel').innerWidth() - $('.skills-list-item .lang-name').width() -
                    parseInt($('.layer .skills-list').css('margin-right')) );

                $('.panel').height( $('.layer .content p').height() +
                    ($('ul.skills-list li').length + 2) * parseInt($('.skills-list-item').css('line-height')) );

                $('#skills').height( $('.panel').height() + $('.bullets il').height() * 3 );
            }

            else {
                $('.layer .pull-right').width( Math.ceil($('.panel').innerWidth() / 2) -
                    $('.skills-list-item .lang-name').width() -
                    parseInt($('.layer .skills-list').css('margin-right')) -
                    parseInt($('.layer .skills-list').css('margin-left')) );

                $('.panel').height( ($('ul.skills-list li').length + 2) * parseInt($('.skills-list-item').css('line-height')) );
                $('#skills').height( $('.panel').height() + $('.bullets il').height() * 3 );

            }
            lastWindowWidth = windowWidth;
        }
    });

    $(document).ready(function() {
        if($('body').innerWidth() <= 670) {
            $('.layer .pull-right').width( $('.panel').innerWidth() - $('.skills-list-item .lang-name').width() -
                parseInt($('.layer .skills-list').css('margin-right')) );

            $('.panel').height( $('.layer .content p').height() +
                ($('ul.skills-list li').length + 2) * parseInt($('.skills-list-item').css('line-height')) );

            $('#skills').height( $('.panel').height() + $('.bullets il').height() * 3 );
        }

        else {
            $('.layer .pull-right').width( Math.ceil($('.panel').innerWidth() / 2) -
                $('.skills-list-item .lang-name').width() -
                parseInt($('.layer .skills-list').css('margin-right')) -
                parseInt($('.layer .skills-list').css('margin-left')) );

            $('.panel').height( ($('ul.skills-list li').length + 2) * parseInt($('.skills-list-item').css('line-height')) );
            $('#skills').height( $('.panel').height() + $('.bullets il').height() * 3 );

        }
    });
})(jQuery);

window.panel = function( container ) {

    // Dispatched when the current layer changes
    var changed = new panel.Signal();

    // All layers in this instance of panel
    var layers = Array.prototype.slice.call( container.querySelectorAll( '.layer' ) );

    // Flag if the browser is capable of handling our fancy transition
    var capable =	'WebkitPerspective' in document.body.style ||
        'MozPerspective' in document.body.style ||
        'msPerspective' in document.body.style ||
        'OPerspective' in document.body.style ||
        'perspective' in document.body.style;

    if( capable ) {
        container.classList.add( 'capable' );
    }

    // Create dimmer elements to fade out preceding slides
    layers.forEach( function( el, i ) {
        if( !el.querySelector( '.dimmer' ) ) {
            var dimmer = document.createElement( 'div' );
            dimmer.className = 'dimmer';
            el.appendChild( dimmer );
        }
    } );

    /**
     * Transitions to and shows the target layer.
     *
     * @param target index of layer or layer DOM element
     */
    function show( target, direction ) {

        // Make sure our listing of available layers is up to date
        layers = Array.prototype.slice.call( container.querySelectorAll( '.layer' ) );

        // Flag to CSS that we're ready to animate transitions
        container.classList.add( 'animate' );

        // Flag which direction
        direction = direction || ( target > getIndex() ? 'right' : 'left' );

        // Accept multiple types of targets
        if( typeof target === 'string' ) target = parseInt( target );
        if( typeof target !== 'number' ) target = getIndex( target );

        // Enforce index bounds
        target = Math.max( Math.min( target, layers.length ), 0 );

        // Only navigate if were able to locate the target
        if( layers[ target ] && !layers[ target ].classList.contains( 'show' ) ) {

            layers.forEach( function( el, i ) {
                el.classList.remove( 'left', 'right' );
                el.classList.add( direction );
                if( el.classList.contains( 'show' ) ) {
                    el.classList.remove( 'show' );
                    el.classList.add( 'hide' );
                }
                else {
                    el.classList.remove( 'hide' );
                }
            } );

            layers[ target ].classList.add( 'show' );

            changed.dispatch( layers[target], target );

        }

    }

    /**
     * Shows the previous layer.
     */
    function prev() {

        var index = getIndex() - 1;
        show( index >= 0 ? index : layers.length + index, 'left' );

    }

    /**
     * Shows the next layer.
     */
    function next() {

        show( ( getIndex() + 1 ) % layers.length, 'right' );

    }

    /**
     * Retrieves the index of the current slide.
     *
     * @param of [optional] layer DOM element which index is
     * to be returned
     */
    function getIndex( of ) {

        var index = 0;

        layers.forEach( function( layer, i ) {
            if( ( of && of == layer ) || ( !of && layer.classList.contains( 'show' ) ) ) {
                index = i;
                return;
            }
        } );

        return index;

    }

    /**
     * Retrieves the total number of layers.
     */
    function getTotal() {

        return layers.length;

    }

    // API
    return {

        show: show,
        prev: prev,
        next: next,

        getIndex: getIndex,
        getTotal: getTotal,

        changed: changed

    };

};

/**
 * Minimal utility for dispatching signals (events).
 */
panel.Signal = function() {
    this.listeners = [];
}

panel.Signal.prototype.add = function( callback ) {
    this.listeners.push( callback );
}

panel.Signal.prototype.remove = function( callback ) {
    var i = this.listeners.indexOf( callback );

    if( i >= 0 ) this.listeners.splice( i, 1 );
}

panel.Signal.prototype.dispatch = function() {
    var args = Array.prototype.slice.call( arguments );
    this.listeners.forEach( function( f, i ) {
        f.apply( null, args );
    } );
}
