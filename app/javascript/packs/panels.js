// For a full explanation of this code, please refer to the blogpost at http://www.bram.us/2014/01/05/css-animated-content-switching/
jQuery(function ($) {

    var startAnimation = function ($panelContainer) {

        // Set .animating class (which triggers the CSS to start the animation)
        $panelContainer.addClass('animating');

    };

    var stopAnimation = function ($panelContainer, $panels, $panelToSlideIn) {

        // Fix for browsers who fire this handler for both prefixed and unprefixed events (looking at you, Chrome): remove any listeners
        // $panelToSlideIn.off('transitionend webkitTransitionEnd	MSTransitionEnd');

        // An optional extra class (or set of classes) that might be set on the panels
        var extraClass = $panelContainer.data('extraclass') || '';

        // set slid in panel as the current one
        $panelToSlideIn.removeClass().addClass('panel current ' + extraClass);

        // reset all other panels
        $panels.filter(':not(#' + $panelToSlideIn.attr('id') + ')').removeClass().addClass('panel ' + extraClass);

        // Allow a new animation
        $panelContainer.removeClass('animating');

    };

    var setExitPanel = function ($panelToSlideOut, exitAnimation) {

        $panelToSlideOut
            .addClass('exit ' + exitAnimation)
            .removeClass('current');

    };

    var setEnterPanel = function ($panelContainer, $panels, $panelToSlideIn, enterAnimation) {

        $panelToSlideIn

            // Slide it into view
            .addClass('enter ' + enterAnimation)

            // When sliding in is done,
            // .one('transitionend webkitTransitionEnd MSTransitionEnd', function(e) {

            // moved to a setTimeout in the click handling logic itself because Firefox doesn't always fire this!!!
            // stopAnimation($panelContainer, $panels, $panelToSlideIn)

            // })
            ;

    };

    $('#panelToggle').on('click', function(e) {
        console.log('panelToggle');

        $panelContainer = $('.app-body');
        $panels = $('.panel');
        // Local vars
        var $panelToSlideIn, $panelToSlideOut, enterAnimation, exitAnimation;

        // Don't do anything if we are currently animating
        if ($panelContainer.is('.animating')) return false;

        // Define the panel to slideOut
        $panelToSlideOut = $panels.filter('.current');

        // Define the the panel to slide in
        $panelToSlideIn = $('.panel:not(.current)');

        // Define animations to use
        enterAnimation = $panelToSlideIn.data('enter') || $panelContainer.data('enter');
        exitAnimation = $panelToSlideOut.data('exit') || $panelContainer.data('exit');

        // Set the exit panel
        setExitPanel($panelToSlideOut, exitAnimation);

        // Set the enter panel
        setEnterPanel($panelContainer, $panels, $panelToSlideIn, enterAnimation);

        // Start the animation (immediately)
        // @note: using a setTimeout because "it solves everything", dixit @rem
        setTimeout(function () {
            startAnimation($panelContainer);
        }, 0);

        // Stop the animation after a while
        setTimeout(function () {
            stopAnimation($panelContainer, $panels, $panelToSlideIn);
        }, 300);
    });
});