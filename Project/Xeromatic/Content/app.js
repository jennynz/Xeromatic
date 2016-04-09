//React component that takes in some text as a property and displays it
var Tweet = React.createClass({
	render: function() {
	    return (
            <li className="list-group-item">
            {this.props.text}
	        {this.props.children}
	        </li>
        )
	}
});

//React component that takes in some text as a property and displays it
var Button = React.createClass({
    render: function() {
        return <button onClick={this.props.link} className="btn btn-info pull-right">{this.props.label}</button>
    }
});

//React component that makes a call to the API in the HomeController. If more than one tweet is returned, it displays a Tweet component for each.
var App = React.createClass({
    //React function that sets the initial state of the app (where changeable data is stored)
    getInitialState: function() {
        return {
            recentTweets: [],
            pinnedTweets: []
        };
    },

    //React function that runs after the app first loads
    componentDidMount: function() {
	    
        var self = this;

        // Wait for both fetches to return before setting state.
        var recentFetch = fetch('/recentTweets', {method: 'get'})
			.then(function(response) {
			    return response.json();
			})

        var pinnedFetch = fetch('/pinnedTweets', {method: 'get'})
			.then(function(response) {
			    return response.json();
			})

        // Wait for these two promises (fetches are types of promises) to return
        Promise.all([recentFetch, pinnedFetch])
			.then(function(data) {
			    self.setState({
			        recentTweets: data[0],
			        pinnedTweets: data[1]
			    });
			})
			.catch(function(error) {
			    console.error('Error', error);
			});
    },

    //React function/method within App class that pins tweet
    pin: function(tweet) {
        var self = this;

        // Add parameters to fetch
        fetch('/pinTweet', {
            method: 'post',
            headers: new Headers({
                'Content-Type' : 'application/json'
            }),
            // What we're actually sending to the API
            body: JSON.stringify(tweet)
        })
		.then(function(response) {
		    // Make a data array of current pinned tweets
		    var data = self.state.pinnedTweets;

            // Push the tweet that we want to pin to the data array
		    data.push(tweet)

            // Refresh the pinnedTweets array with newly updated data array which includes the newly pinned tweet
		    self.setState({pinnedTweets: data});
		})
        .catch(function(error) {
            console.error('Error', error);
        });
    },

    //React function that runs on first load and whenever the state is changed
    render: function() {

        var self = this;

        var pinnedTweets = (this.state.pinnedTweets.length > 0) ? this.state.pinnedTweets.map(function(tweet) {
            // For each item in pinnedTweets array, return a Tweet object
            return <Tweet key={tweet.Id} text={tweet.Text} />
            })
			: null;

        var recentTweets = (this.state.recentTweets.length > 0) ? this.state.recentTweets.map(function(tweet) {
            return (
                <Tweet key={tweet.Id} text={tweet.Text}>
                    <Button link={function(){self.pin(tweet)}} label="Pin" />
                </Tweet>    
            )
		    })
			: null;

		return (
			<div className="container">
                <table className="header-table"><tbody>
                    <tr>
                        <td><img src="/Content/UNYouthNZLogo.jpg" /></td>
                        <td>
                            <a className="nav-link" href="https://unyouth.org.nz/about">About</a>
                            <a className="nav-link" href="https://unyouth.org.nz/regions">Regions</a>
                            <a className="nav-link" href="https://unyouth.org.nz/events">Events</a>
                            <a className="nav-link" href="https://unyouth.org.nz/alumni">Alumni</a>
				            <a className="nav-link" href="https://blogs.unyouth.org.nz/">Blog</a>
                            <a className="nav-link" href="https://unyouth.org.nz/get-involved">Join Us</a>
                            <a className="nav-link" href="https://unyouth.org.nz/contact">Contact</a>
                        </td>
                    </tr>
                </tbody></table>
                <div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Pinned Tweets</h3>
					</div>
					<ul className="list-group">{pinnedTweets}</ul>
				</div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Recent Tweets</h3>
                    </div>
                    <ul className="list-group">{recentTweets}</ul>
                </div>
			</div>
		);
	}
});

//This function will render our App to the page
ReactDOM.render(<App />, document.getElementById('app'));