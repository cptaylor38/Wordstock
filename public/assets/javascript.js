var $translatorButton = $('#translator-button'); //assigning buttons from homepage to variables
var $dictionaryButton = $('#dictionary-button');

$translatorButton.on('click', function () {
    window.location.href = '/translate';
});
// calling button-clicks to load corresponding pages
$dictionaryButton.on('click', function () {
    window.location.href = '/dictionary';
});


// - https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it

var $translateButton = $('#translateButton');
var $phrase2translate = $('#phrase2translate');

$translateButton.on('click', function (event) {
    event.preventDefault();

    var convertFrom = $('#convertFrom').val().trim();
    var convertTo = $('#convertTo').val().trim();
    var pairTest = 'langpair=' + convertFrom + '|' + convertTo;
    var $alerts = $('#alerts');

    var $translate = $phrase2translate.val().trim();

    // var testInput = $translate.replace(/\s+/g, '');

    if ($translate === '') {
        $('#resultsField').empty();
        $phrase2translate.addClass('animated wobble');
        $phrase2translate.css('animation-duration', '2s');
        //need to add css styles to this div for browser specific animations*
        $phrase2translate.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $phrase2translate.removeClass('animated wobble');
            $phrase2translate.val('');
        });

        if ($phrase2translate.val() === '') {
            $alerts.text('You must enter a word first.');
        }
    }
    else {
        $alerts.empty();
        $phrase2translate.val('');
        $.ajax({
            url: '/translate/' + `q=${$translate}&${pairTest}`,
            method: 'GET',
            success: function (response) {
                console.log(response);
                var translatedText = response.responseData.translatedText;

                var $resultsDiv = $('#resultsField');

                if (translatedText === $translate) {

                    $resultsDiv.addClass('animated rotateIn');
                    $resultsDiv.css('animation-duration', '2s');
                    $resultsDiv.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $resultsDiv.removeClass('animated rotateIn')
                    });
                    $resultsDiv.text('No valid translation found.');
                }
                else {
                    $resultsDiv.addClass('animated rotateIn');
                    $resultsDiv.css('animation-duration', '2s');
                    $resultsDiv.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $resultsDiv.removeClass('animated rotateIn')
                    });
                    $resultsDiv.text(translatedText);
                }


            },
            error: function (error) {
                $phrase2translate.addClass('animated wobble');
                $phrase2translate.css('animation-duration', '2s');
                $phrase2translate.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $phrase2translate.removeClass('animated wobble');
                });
                console.log(error);
            }
        });
    }


});

