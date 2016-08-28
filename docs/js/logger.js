var logger;
(function (window) {
    logger = function (el, clearText) {
        var $el = $(el);

        addContent($el);
        addClearButton(clearText, $el);

        $('.logger--clear', $el).on('click', clear.bind('', $el));

        return function(text) {
            var count = $('p', $el).length,
                $content = $('.logger--content', $el);
            $content.append('<p><span>' + ++count + '.</span> ' + text + '</p>').scrollTop(100000)
        }
    };

    function addClearButton (text, el) {
        el.append('<span class="logger--clear">' + text + '</span>')
    }

    function addContent (el) {
        el.html('<div class="logger--content"></div>')
    }

    function clear (el) {
        $('.logger--content', el).html('');
    }
})(window);
