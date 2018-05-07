const tube = {
  URL: 'https://www.googleapis.com/youtube/v3/search',
  getData: (searchTerm, callback) => {
    const settings = {
      url: tube.URL,
      data: {
        part: 'snippet',
        maxResults: 12,
        key: 'AIzaSyCp0YOtbMRwglaTChGdQ9IxgwrOyxxCrpI',
        q: `${searchTerm}`,
      },
      dataType: 'json',
      type: 'GET',
      success: callback
    };
    $.ajax(settings);
  },
  render: result => {
    const videoUrl = `https://youtube.com/watch?v=${result.id.videoId}`;
    const channelUrl = `https://www.youtube.com/channel/${result.snippet.channelId}`;
    const imageUrl = `${result.snippet.thumbnails.medium.url}`;

    return `
			<div class="col-md-4 cards">
			  <!-- Card Wider -->
			  <div role="region" class="card card-cascade wider">
			    <!-- Card image -->
			    <div class="view overlay">
			      <img class="card-img-top" src="${imageUrl}" alt="${result.snippet.title}">
			      <a href="${videoUrl}" target="_blank" rel="nofollow">
			        <div class="mask rgba-white-slight"></div>
			      </a>
			    </div>
			    <!-- Card content -->
			    <header class="card-body text-center">
			      <!-- Title -->
			      <h4 class="card-title"><strong><a href="${videoUrl}" target="_blank">${result.snippet.title.substring(0, 40)}...</a></strong></h4>
			      <!-- Subtitle -->
			      <h5 class="pb-2"><strong>More from <a href="${channelUrl}" target="_blank">${result.snippet.channelTitle}</a></strong></h5>
			      <a href="${videoUrl}" target="_blank" class="btn btn-danger btn-rounded watch-button">Watch Video</a>
			    </header>
			    
			  </div>
			  <!-- Card Wider -->
			</div>
  `;
  },
  display: data => {
    const results = data.items.map((item, index) => tube.render(item));
    $('#js-search-results').html(results);
  },
  submit: () => {
    $('.js-search-form').submit(event => {
      view.showNav();
      view.hideSearch();
      const queryTarget = $(event.currentTarget).find('#js-query');
      const query = queryTarget.val();

      queryTarget.val("");
      tube.getData(query, tube.display);
    });
  },
};

const view = {
  showNav: () => {
    $('.navbar').removeClass('hidden');
  },
  hideSearch: () => {
    $('.homepage').remove();
  },
  focus: () => {
  	$('input').focus();
  }
};

$(() => {
	$(view.focus())
  $(tube.submit);
});