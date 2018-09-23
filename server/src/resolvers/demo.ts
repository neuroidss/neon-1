import * as firebase from 'firebase'
import { ApolloError, ValidationError } from 'apollo-server-express'

interface User {
  id: string;
  name: string;
  screenName: string;
  statusesCount: number;
}

interface Tweet {
  id: string;
  likes: number;
  text: string;
  userId: string;
}

export default {
  Query: {
    async tweets() {
      const tweets = await firebase
        .firestore()
        .collection('tweets')
        .get();
      return tweets.docs.map(tweet => tweet.data()) as Tweet[];
    },
    async user(_: null, args: { id: string }) {
      try {
        const userDoc = await firebase
          .firestore()
          .doc(`users/${args.id}`)
          .get();
        const user = userDoc.data() as User | undefined;
        return user || new ValidationError('User ID not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  User: {
    async tweets(user) {
      try {
        const userTweets = await firebase
          .firestore()
          .collection('tweets')
          .where('userId', '==', user.id)
          .get();
        return userTweets.docs.map(tweet => tweet.data()) as Tweet[];
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  Tweets: {
    async user(tweet) {
      try {
        const tweetAuthor = await firebase
          .firestore()
          .doc(`users/${tweet.userId}`)
          .get();
        return tweetAuthor.data() as User;
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  }
};
