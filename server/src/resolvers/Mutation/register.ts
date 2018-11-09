import * as admin from 'firebase-admin'
import { ValidationError } from 'apollo-server-express'
import * as firebaseRaw from 'firebase'
import * as jwt from 'jsonwebtoken'
import { config } from '../../../config'
import { RegisterInfo } from '../../models';

export const register = {
    async register(_: null, args: RegisterInfo) {
        // @ts-ignore
        const { registerInfo: { username, firstname, lastname, emailAddress, password } } = args
        const userCollection = await admin
            .firestore()
            .collection('users')
        const userDoc: any = await userCollection
            .where('username', '==', username)
            .limit(1)
            .get()

        userDoc.forEach((documentSnapshot) =>  {            
            if (documentSnapshot.data()) {
              throw new Error("user is already registered")
            }
        })

        try {
            const userRecord = await admin.auth().createUser({
                email: emailAddress,
                emailVerified: false,
                password,
                displayName: `${firstname} ${lastname}`,
                disabled: false
            })
            console.log("Successfully created new user:", userRecord.uid);
            await userCollection
            .doc(userRecord.uid)
            .create({ firstname, lastname, username })
            
            return {
                accessToken: jwt.sign({username}, config.appSecret, {expiresIn: Date.now() + config.accessTokenExpiryTime}),
                refreshToken: jwt.sign({userId: userRecord.uid}, config.appSecret, {expiresIn: Date.now() + config.refreshTokenExpiryTime}),
                user: {username}
            }           
        } 
        catch(error) {
            console.log("Error creating new user:", error);
            throw new Error("Error creating new user:")
        };      
        
    }
}
