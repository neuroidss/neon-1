import * as admin from 'firebase-admin'
import { ValidationError } from 'apollo-server-express'
import * as firebaseRaw from 'firebase'
import * as jwt from 'jsonwebtoken'
import { evidentConfig } from '../../../config'
import {userQuery, verifyApiPayload, submitApiPayload, evidentAuth} from '../../constants'

interface User {
  id: string;
  name: string;
  username: string;
}

const createSubmitInputValue = (objectType, data, mime_type, metadata) => {
  return {
    '$objectType': objectType,
    'data': data,
    'mime_type': mime_type,
    'metadata': metadata
  }
}

const createDocumentType = (id_type, country) => {
  return {
    'id_type': id_type,
    'country': country
  }
}

export const evident = {
  async submitDataToEvidentID(_: null, { idToken, documentVerificationInput }) {
    try {
      // Verify idToken. https://firebase.google.com/docs/auth/admin/verify-id-tokens
      let decodedToken = await admin.auth().verifyIdToken(idToken);
      let requestId;
      return fetch(`${evidentConfig.EVIDENTID_VERIFYAPI_ENDPOINT}/verify/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': evidentAuth
          },
          body: JSON.stringify({
            'email': documentVerificationInput.emailAddress,
            'description': `${documentVerificationInput.id_type}`,
            'userAuthenticationType': verifyApiPayload.userAuthenticationType,
            'attributesRequested': verifyApiPayload.attributesRequested
            })
          })
          .then(resp => resp.json())
          .then(response => {
            requestId = response.id
            const submitInput = {
              'inputs': [
                {
                  'type': `identity_assurance.document_verification.${documentVerificationInput.id_type}.image.front`,
                  'value': createSubmitInputValue(submitApiPayload.$objectType, `${documentVerificationInput.frontImageData}`, `${documentVerificationInput.frontImageType}`, submitApiPayload.metadata)
                }, {
                  'type': 'identity_assurance.document_verification.document_type',
                  'value': createDocumentType(documentVerificationInput.id_type, documentVerificationInput.country)
                }, {
                  'type': 'identity_assurance.document_verification.selfie_to_document.selfie_image',
                  'value': createSubmitInputValue(submitApiPayload.$objectType, `${documentVerificationInput.selfieImageData}`, `${documentVerificationInput.selfieImageType}`, submitApiPayload.metadata)
                }
              ]
            }
            if (documentVerificationInput.id_type !== 'passport') {
              submitInput['inputs'].push({
                'type': `identity_assurance.document_verification.${documentVerificationInput.id_type}.image.back`,
                'value': createSubmitInputValue(submitApiPayload.$objectType, `${documentVerificationInput.backImageData}`, `${documentVerificationInput.backImageType}`, submitApiPayload.metadata)
              })
            }
          return fetch(`${evidentConfig.EVIDENTID_SUBMITAPI_ENDPOINT}/requests`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${response.userIdentityToken}`
            },
            body: JSON.stringify(submitInput)
        })
      })
      .then(response => response.json())
      .then((res) => {
        // TODO: Update user in firebase
        // return ctx.db.mutation.updateUser({
        //   where: { id: ctx.user.id },
        //   data: {
        //       thirdPartyAccounts: {
        //         create: [{
        //           type:'EVIDENT',
        //           referenceId: requestId
        //         }]
        //       }
        //   }
        // }, userQuery)
        return {};
      })
      .then((res) => {
        return Promise.resolve(res)
      })
      // let { name, picture, uid, email, firebase } = decodedToken

      // // Look up the user by email
      // const userDoc = await admin
      //   .firestore()
      //   .collection('users')
      //   .where('email', '==', email)
      //   .limit(1)
      //   .get()

      // let existingUser, user
      // let timestamp = Date.now()

      // userDoc.forEach(function (documentSnapshot) {
      //   existingUser = documentSnapshot.data() as User
      //   existingUser.id = documentSnapshot.id
      // }.bind(this))

      // let facebookAddon = firebase.sign_in_provider === 'facebook.com' ? '?type=large' : ''

      // // If no database user for this social+email, create one
      // if (!existingUser) {

      //   user = {
      //     name,
      //     photo: picture + facebookAddon,
      //     email,
      //     id: uid,
      //     provider: firebase.sign_in_provider
      //   }

      //   const newUserDoc = await admin
      //     .firestore()
      //     .collection('users')
      //     .doc(uid)
      //     .set({
      //       ...user,
      //       timestamp
      //     })

      //   // TODO: Test that this difference from the existingUser is fine
      //   return {
      //     accessToken: jwt.sign(user, config.appSecret, {expiresIn: Date.now() + config.accessTokenExpiryTime}),
      //     refreshToken: jwt.sign({userId: user.id}, config.appSecret, {expiresIn: Date.now() + config.refreshTokenExpiryTime}),
      //     user: user
      //   }
      // } else {
      //   // console.log('existing user ok sure')
      //   return {
      //     accessToken: jwt.sign(existingUser, config.appSecret, {expiresIn: Date.now() + config.accessTokenExpiryTime}),
      //     refreshToken: jwt.sign({userId: existingUser.id}, config.appSecret, {expiresIn: Date.now() + config.refreshTokenExpiryTime}),
      //     user: existingUser
      //   }
      // }
    }
    catch(error) {
      console.log('error decoding idToken')
      console.log(error)
    }
  }
}
