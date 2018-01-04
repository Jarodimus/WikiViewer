$("document").ready(function () {
    $('.mag').one("click", function () {
        $('.mag').animate({ right: '5px' });
        $('#searchbox').appendTo('.searchForm').show('slow');
        $('#searchbox').focus();
    });
    $('.searchForm').on("submit", function (e) {
            e.preventDefault();
            var searchval = ($("#searchbox").val());
            $.ajax({
                method: "GET",
                url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + searchval + '&prop=info&inprop=url&utf8=&format=json',
                dataType: 'jsonp',
                success: wikiSearch,
              });
            return false;
    });
});

function wikiSearch(e){
    var resultArr = e.query.search;
    var count = 0;
    $('.articles').empty();
    $.each(resultArr, function(index, val){
        $('.articles').append('<div id="article' + count + '"class="articleResult" style="color: white;margin: 3% auto auto auto;width: 540px;padding: 20px;background-color: rgb(128, 164, 206);"><table><tr><td><span id="title" style="font-family: Ubuntu, sans-serif;font-size: 18px;">' + val.title + '</span><hr></td><tr><td>' + val.snippet + '...' + '</td></tr></table></div>');
        $("#article" + count + "").click(function(e){
            var title = $(this).find("#title").text();
            window.open('https://en.wikipedia.org/wiki/' + title + '', 'window name', 'window settings');
            return false;
        })
        count++;
  });
}