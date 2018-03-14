$(function () {
    $('.cell-container')
        .popup({
            on: 'click',
            inline: false
        })
    ;

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    $('.save-criteria').click(function () {
        var form = $(this).closest('form.update-criteria');
        var formData = form.serialize();
        var elementId = form.attr('id');

        $.ajax({
            url: '/criteria/update',
            data: formData,
            type: 'post',
            cache: false,
            success: function (data) {
                console.log('success ', elementId, 'change');
                var cid = elementId.split('criteriaForm')[1];

                var criteriaCell = $('#criteriaCell' + cid);

                criteriaCell
                    .popup('hide');


                var textContent = ('textContent' in document) ? 'textContent' : 'innerText';
                criteriaCell.children('.benefits-score')[0][textContent] = 'B' + getParameterByName('benefits', formData);
                criteriaCell.children('.hurts-score')[0][textContent] = 'H' + getParameterByName('hurts', formData);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById(elementId).reset();
            }
        });
        return false;
    });

    var textContent = ('textContent' in document) ? 'textContent' : 'innerText';

    function valueOutput(element) {
        var value = element.value;
        var output = element.parentNode.getElementsByTagName('output')[0] || element.parentNode.parentNode.getElementsByTagName('output')[0];
        output[textContent] = value;
    }

    $(document).on('input', 'input[type="range"]', function (e) {
        valueOutput(e.target);
    });

    $("input[type='range']").each(function () {
        valueOutput(this);
    });
});