using System.Collections.Generic;
using Tweetinvi;
using Tweetinvi.Core.Credentials;
using Tweetinvi.Core.Interfaces;

namespace Xeromatic.Services
{
    public class TwitterApiService
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
                AccessToken = "	718574735320227841-1u4YvqjHOFMnDTKUdgQBdowigoCX3st",
                AccessTokenSecret = "iKAGeb2UamATnkW0jxnVJ4lvspCmbfKC9MwSfwtTCXn7x"
            };
        }

        public IEnumerable<ITweet> GetTweets()
        {
            var tweets = Auth.ExecuteOperationWithCredentials(_creds, () =>
            {
                return Timeline.GetHomeTimeline();
            });

            return tweets;
        }

    }
}