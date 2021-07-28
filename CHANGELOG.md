* убран jquery
* кастомные кнопки
* возможность перетаскивания дат в range
* onlyTimepicker - только визуально оставляет выбор времени
* теперь при изменении статуса ячейки, перерисовывается только она, а не весь контент как раньше
* убраны onChangeMonth, onChangeYear, onChangeDecade, заменены одним колбэком onChangeViewDate
* onSelect теперь принимает объект вместо нескольких параметров
* onRenderCell тоже принимает объект
* selectDate добавлен второй параметр {updateTime}
* изменена формат даты на Unicode Technical Standard https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
* добавлена возможность передавать функцию в dateFormat
* language -> locale - теперь это объекты
* добавлена возможность передавать функцию в navTitles
