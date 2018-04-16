;(function ($) { $.fn.datepicker.language['ar'] = {
  days: ['الأحد', 'الاثنين', 'الاثنين', 'الاثنين', 'الخميس', 'الجمعة', 'السبت'],
  daysShort: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  daysMin: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  months: ['يناير','فبراير','مارس','أبريل','مايو','يونيو', 'يوليو','أغسطس','سبتمبر','أكتوبر','نوڤمبر','ديسمبر'],
  monthsShort: ['ينا', 'فبر', 'مار', 'أبر', 'ماي', 'يون', 'يول', 'أغس', 'سبت', 'أكت', 'نوڤ', 'ديس'],
  today: 'اليوم',
  clear: 'مسح',
  dateFormat: 'dd/mm/yyyy',
  timeFormat: 'hh:ii aa',
  firstDay: 0,
  am: "ص",
  pm: "م",
  defaultOverrides: {
    prevHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',
    nextHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
    monthsField: 'months',
    daysField: 'days',
    navTitles: {
      days: 'MM yyyy',
      months: 'yyyy',
      years: 'yyyy1 - yyyy2'
    }
  }
}; })(jQuery);