var $wordInput = $('#wordInput');
var $dictionarySubmit = $('#dictionarySubmit');
var $searchResults = $('.search-results');

$dictionarySubmit.on('click', function (event) {
    event.preventDefault();
    console.log('this is working');

    var $alerts = $('#alerts');
    var $word2search = $wordInput.val().trim().toLowerCase();

    if ($word2search === '' || /[^a-z]/i.test($word2search)) {
        $wordInput.addClass('animated wobble');
        $wordInput.css('animation-duration', '2s');
        //need to add css styles to this div for browser specific animations*
        $wordInput.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $wordInput.removeClass('animated wobble');
        });

        if ($wordInput.val() === '') {
            $alerts.text('You have to enter a word first.');
        }
        else {
            $alerts.text("Invalid word. You can only use letters.");
        }

    }
    else {
        $alerts.text('');
        $searchResults.empty();
        $('#wordInput').val('');
        $.ajax({
            url: '/wordsearch/' + `${$word2search}`,
            method: 'GET',
            success: function (response) {
                console.log(response);
                var word = response.word;
                var definitionList = response.results;


                //creating a primary div to hold appended definitions and word defined
                var $definitionCard = $('<div>');
                $definitionCard.addClass('card');
                $definitionCard.attr('id', 'definitionCard');

                //creating a div, adding class card-body to attempt to create bootstrap card body element
                var $definitionBody = $('<div>');
                $definitionBody.addClass('card-body');
                $definitionBody.attr('id', 'definition-card-body');
                $definitionCard.append($definitionBody);
                //appending the card-body div to the container card

                //creating a header item to display the current word defined
                var $wordDefined = $('<div>');
                $wordDefined.addClass('<h>');
                $wordDefined.attr('id', 'definitionCard-header');
                $wordDefined.text(word);
                //appending the header to the card body

                var $listBody = $('<div>');
                $listBody.attr('id', 'list-container');

                var $noSynonymCard = $('<div>');
                $noSynonymCard.addClass('card');
                var $noSynBody = $('<div>');
                $noSynBody.addClass('card-body');
                $noSynBody.attr('id', 'noSynList');
                $noSynonymCard.append($noSynBody);


                //creating a list of definitions found at response.results[index].definition
                if (definitionList) {
                    definitionList.forEach(function (element) {
                        var $synonymArray = element.synonyms;
                        var $newDefinition = $('<p>');
                        $newDefinition.attr('id', 'newDefinition');
                        console.log($synonymArray);


                        var $synonym = $('<h5>');
                        $synonym.attr('id', 'synonym');

                        if (element.hasOwnProperty('synonyms')) {
                            $newDefinition.text(element.definition);
                            $synonym.text($synonymArray.join(', '));
                            console.log('this ran');
                            $newDefinition.prepend($synonym);
                            $listBody.append($newDefinition);
                        }
                        else {
                            $newDefinition = $('<li>');
                            $newDefinition.text(element.definition);
                            $noSynBody.append($newDefinition);
                        }
                    })
                    $definitionBody.append($listBody, $noSynonymCard);
                    $searchResults.append($wordDefined, $definitionCard);
                }
                else {
                    $searchResults.append(`<h1>No results found for: ${$word2search}.</h1>`);
                }

            },
            error: function (error) {
                console.log(error);
                $wordInput.addClass('animated wobble');
                $wordInput.css('animation-duration', '2s');
                $wordInput.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $wordInput.removeClass('animated wobble');
                });

                //add alert text
            }
        });
    }
});





