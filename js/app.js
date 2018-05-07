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
    <div class = "col-md-4 col-sm-12">
      <div class="demo-card-square mdl-card mdl-shadow--2dp">
            <a class="js-result-name" href="${videoUrl}" target="_blank"><img src="${imageUrl}"></a>
        <div class="mdl-card__title mdl-card--expand">
          <h2 class="mdl-card__title-text">${result.snippet.title}</h2>
        </div>
        <div class="mdl-card__supporting-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenan convallis.
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect js-result-name" href="${videoUrl}">
            Watch Video
          </a>
        </div>
      </div>
    </div>
  `;
  },
  display: data => {
    const results = data.items.map((item, index) => tube.render(item));
    $('#js-search-results').html(results);
  },
  submit: () => {
    $('#js-search-form').submit(event => {
      event.preventDefault();
      const queryTarget = $(event.currentTarget).find('#js-query');
      const query = queryTarget.val();
      // clear out the input
      queryTarget.val("");
      tube.getData(query, tube.display);
    });
  }
};

$(tube.submit);