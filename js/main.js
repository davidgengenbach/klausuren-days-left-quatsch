(function($, R, moment, doT) {
    'use strict';

    moment.locale('de');

    var config = {
            SHOW_TODAY_MARKER: true,
            FILTER_OUT_TODAY_EXAMS: true,
            DAY_TEMPLATE: doT.template($('#dot').remove().html()),
            EXAMS_TEMPLATE: doT.template($('#exams').remove().html())
        },
        $holder = $('.holder'),
        $body = $('body'),
        today = moment().startOf('day');

    getExams().then(renderExams, console.error.bind(console));

    function renderExams(exams_) {
        var exams = exams_
            .map(enrichExam)
            .filter(exam => !config.FILTER_OUT_TODAY_EXAMS || exam.daysBetween > 0)
            .sort((a, b) => a.timeParsed.diff(b.timeParsed));

        $body.append(config.EXAMS_TEMPLATE({ exams: exams }));

        var dots = [];
        if (config.SHOW_TODAY_MARKER)
            dots.push({
                class: 'month-marker',
                left: '0%',
                content: 'Today',
                date: moment()
            });

        var daysBetween = R.last(exams).timeParsed.startOf('day').diff(today, 'days');
        dots = dots.concat(getExamMarkers(exams, daysBetween, true));
        var renderedDots = dots
            .sort((a, b) => a.date.diff(b.date))
            .map(config.DAY_TEMPLATE);

        $holder.find('.dots').append(renderedDots);
    }

    function enrichExam(exam, index) {
        exam.color = index;
        exam.timeParsed = moment(exam.time, 'DD.MM.YYYY');
        exam.timeDay = exam.time.split(' ')[1];
        exam.daysBetween = exam.timeParsed.startOf('day').diff(today, 'days');
        exam.date = exam.timeParsed.format('DD.MM.');
        exam.dateHuman = moment(exam.time, 'DD.MM.YYYY').format('DD.MM. (dd)');
        return exam;
    }

    function getExamMarkers(exams, daysDiff) {
        return exams.map(exam => {
            return {
                class: 'exam ' + (exam.class || ''),
                color: exam.color,
                left: getPercentage(exam.daysBetween, daysDiff),
                content: exam.date + '<br/>' + exam.topic,
                date: exam.timeParsed
            };
        });
    }

    function getPercentage(day, daysCount) {
        return (day / daysCount * 100) + '%';
    }

    function getExams() {
        return $.getJSON('exams.json');
    }
})(jQuery, R, moment, doT);