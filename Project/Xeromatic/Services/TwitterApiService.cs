using System.Collections.Generic;
using System.Linq;
using Tweetinvi;
using Tweetinvi.Core.Credentials;
using Tweet = Xeromatic.Models.Tweet;
using Xeromatic.Services;

namespace Xeromatic.Services
{
    public class TwitterApiService : ITwitterService
    {
        // Get keys from: https://apps.twitter.com
        // Wiki for tweetinvi: https://github.com/linvi/tweetinvi/wiki

        readonly TwitterCredentials _creds;

        public TwitterApiService()
          {
            _creds = new TwitterCredentials
            {
                ConsumerKey = "PI96aIiQUq5Z9kWNYm0bIO7FA",
                ConsumerSecret = "Dmi1Wk7naZJNi2UepX4526wcfJX3OtQmWL8qRcnFVEv9ikSoaZ",
                AccessToken = "718574735320227841-1u4YvqjHOFMnDTKUdgQBdowigoCX3st",
                AccessTokenSecret = "iKAGeb2UamATnkW0jxnVJ4lvspCmbfKC9MwSfwtTCXn7x"
            };
        }

        public IEnumerable<Tweet> GetTweets()
        {
            var tweets =
                Auth.ExecuteOperationWithCredentials(_creds, () => Timeline.GetUserTimeline("xero", 10))?.ToList();
            if (tweets != null && tweets.Any())
                return tweets.Select(t => new Tweet
                {
                    Id = t.Id,
                    Text = t.Text
                });
            return new List<Tweet>();
        }

    }
}