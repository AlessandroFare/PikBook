//display heart tweet and counter
$(function(){

	$tweet_meta = $('.tweet_meta');

	$tweet_meta.on('click', 'span.like', function(){
		$tweetstatscount = $(this).children('.tweetstatscount');
		if($(this).hasClass('red'))
		{
			$(this).removeClass('red');
			$tweetstatscount.text(parseInt($tweetstatscount.text()) - 1);
		}
		else
		{
			$(this).addClass('red');
			$tweetstatscount.text(parseInt($tweetstatscount.text()) + 1);
		}
	});
})