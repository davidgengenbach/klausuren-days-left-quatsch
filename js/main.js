(function($, R, moment, doT) {
    'use strict';

    var config = {
        SHOW_TODAY_MARKER: true,
        SHOW_MONTH_MARKERS: false,
        DAY_TEMPLATE: doT.template($('#dot').remove().html()),
        EXAMS_TEMPLATE: doT.template($('#exams').remove().html())
    };

    var $holder = $('.holder');

    getExams().then(renderExams);

    function renderExams(exams_) {
        var exams = exams_
            .map(function(item, index) {
                item.color = index;
                item.timeParsed = moment(item.time, 'DD.MM.YYYY');
                item.timeDay = item.time.split(' ')[1];
                item.daysBetween = item.timeParsed.diff(moment(), 'days');
                item.date = item.timeParsed.format('DD.MM.');
                return item;
            })
            .sort(function(a, b) {
                return a.timeParsed.diff(b.timeParsed);
            });

        var daysBetween = R.last(exams).timeParsed.diff(moment(), 'days');

        $('body').append(config.EXAMS_TEMPLATE({
            exams: exams
        }));

        var dots = [];
        if (config.SHOW_TODAY_MARKER)
            dots.push({
                class: 'month-marker',
                left: '0%',
                content: 'Today',
                date: moment()
            });

        if (config.SHOW_MONTH_MARKERS)
            dots = dots.concat(getMonthMarkers(R.last(exams).timeParsed, daysBetween));

        dots = dots.concat(getExamMarkers(exams, daysBetween));

        $holder
            .find('.dots')
            .append(dots
                .sort(function(a, b) {
                    return a.date.diff(b.date);
                })
                .map(config.DAY_TEMPLATE));
    }

    function getExamMarkers(exams, daysDiff) {
        return exams.map(function(exam, index) {
            return {
                class: 'exam ' + (exam.class || ''),
                color: exam.color,
                left: getLeftForDay(exam.daysBetween, daysDiff),
                content: exam.date + '<br/>' + exam.topic,
                date: exam.timeParsed
            };
        });
    }

    function getMonthMarkers(lastDate, daysDiff) {
        var date = moment().startOf('month');
        var monthsBetween = lastDate.diff(date, 'months');

        var dots = [];
        for (var i = 0; i < monthsBetween; i++) {
            date.add(1, 'months');
            dots.push({
                class: 'month-marker',
                left: getLeftForDay(date.diff(moment(), 'days'), daysDiff),
                content: date.format('DD.MM.'),
                date: date.clone()
            });
        }
        return dots;
    }

    function getLeftForDay(day, daysCount) {
        return (day / daysCount * 100) + '%';
    }

    function getExams() {
        return $.getJSON('exams.json');
    }
})(jQuery, R, moment, doT);
