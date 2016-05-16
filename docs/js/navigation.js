var navigation;

(function (window, $) {
    var $sections = $('article'),
        idCounter = 1,
        idPrefix = 'sub-section-',
        navTemplate = '<div class="nav-wrap"><nav class="nav" id="nav"></nav></div>',
        $nav,
        cache = {};

    function init () {
        updateCache();
        createHtml();

        $($nav).on('click', 'a', onClickNavItem);
    }

    function createHtml () {
        var html = '',
            section,
            curSection,
            subsection,
            curSubSection;

        $(navTemplate).appendTo('body');
        $nav = $('#nav');

        for (section in cache) {
            curSection = cache[section];

            html += '<div class="nav--section">' +
                '<h2 class="nav--section-title">' +
                '<a href="#' + section + '">' + curSection.title +'</a>' +
                '</h2>';

            if (curSection.subSections) {
                html += '<div class="nav--subsection">';

                for (subsection in curSection.subSections) {
                    curSubSection = curSection.subSections[subsection];
                    html += '' +
                        '<h3 class="nav--subsection-title">' +
                        '<a href="#' + subsection + '">' + curSubSection.title + '</a>' +
                        '</h3>'

                }
                html += '</div>';
            }

            html += '</div>';
        }

        $nav.html(html);
    }

    function updateCache () {
        cache = {};
        idCounter = 1;

        var id,
            title,
            subTitles,
            $subTitle,
            $current;

        $sections.each(function () {
            $current = $(this);
            title = $('h2', $current);
            subTitles = $('h3', $current);
            id = title.attr('id');

            cache[id] = {
                title: title.text(),
                offset: title.offset().top,
                subSections: ''
            };

            if (subTitles.length) {
                cache[id].subSections = {};

                subTitles.each(function () {
                     var $subTitle = $(this),
                         subId = $(this).attr('id');

                    if (!subId) {
                        subId = idPrefix + idCounter++;
                        $subTitle.attr('id', subId);
                    }

                    cache[id].subSections[subId] = {
                        title: $subTitle.text(),
                        offset: $subTitle.offset().top
                    }
                })
            }
        })
    }

    function scrollTo (pos) {
        $('body, html').animate({
            scrollTop: pos
        }, 700, 'easeInOutCubic')
    }

    function onClickNavItem (e) {
        e.preventDefault();

        var $link = $(e.target),
            $section = $($link.attr('href'));

        $section.addClass('-hilited-');

        setTimeout(function () {
            $section.removeClass('-hilited-');
        }, 1400)

        scrollTo($section.offset().top - 16)
    }

    navigation = {
        init: init
    }
})(window, jQuery);
