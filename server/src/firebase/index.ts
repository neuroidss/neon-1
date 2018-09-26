import * as firebase from 'firebase'
import { config } from './firebaseConfig'

class Firebase {
  client: firebase.app.App

  constructor() {
    if (!firebase.apps.length) {
      this.client = firebase.initializeApp(config)
    } else {
      this.client = firebase.app()
    }
    firebase.firestore().settings({ timestampsInSnapshots: true })
  }

  signInWithEmailAndPassword: any = async (email:string, password:string) => {
    try {
      const res = await this.client.auth().signInWithEmailAndPassword(email, password)
      console.log(res.user.emailVerified)
      return res
    } catch(error) {
      throw error
    }
  }

  createUserWithEmailAndPassword: any = async (email:string, password:string) => {
    try {
      const res = await this.client.auth().createUserWithEmailAndPassword(email, password)

      return res
    } catch(error) {
      throw error
    }
  }

  signOut: any = async () => {
    try {
      const res = await this.client.auth().signOut()

      return res
    } catch(error) {
      throw error
    }
  }
}

export default Firebase
