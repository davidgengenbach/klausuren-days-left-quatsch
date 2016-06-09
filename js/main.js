(function($, R, moment, doT) {
    'use strict';

    var $holder = $('.holder');
    var dayTmpl = doT.template($('#exam').remove().html());
    var examsTmpl = doT.template($('#exams').remove().html());

    getExams()
        .then(renderExams);

    function renderExams(exams_) {
        var exams = exams_.map(function(item) {
                item.timeParsed = moment(item.time, 'DD.MM.YYYY');
                item.timeDay = item.time.split(' ')[1];
                item.daysBetween = item.timeParsed.diff(moment(), 'days');
                item.date = item.timeParsed.format('DD.MM');
                return item;
            })
            .sort(function(a, b) {
                return a.timeParsed - b.timeParsed;
            });

        var daysBetween = R.last(exams).timeParsed.diff(moment(), 'days');

        $('.exams').append(examsTmpl({
            exams: exams
        }));

        $holder.append(exams
            .map(function(exam, index) {
                return dayTmpl({
                    class: index % 2 === 0 ? 'even' : 'odd',
                    left: (exam.daysBetween / daysBetween * 100) + '%',
                    date: exam.date,
                    days: exam.timeParsed.diff(moment(), 'days'),
                    exam: exam.topic
                });
            })
            .join(''));
    }

    function getExams() {
        return $.getJSON('exams.json');
    }

})(jQuery, R, moment, doT);
