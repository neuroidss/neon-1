import * as admin from 'firebase-admin'
import { ValidationError } from 'apollo-server-express'
import * as firebaseRaw from 'firebase'
import * as jwt from 'jsonwebtoken'
import { evidentConfig } from '../../../config'
import {userQuery, verifyApiPayload, submitApiPayload, evidentAuth} from '../../constants'
import { ThirdPartyAccountType } from '../../models';

interface User {
  id: string;
  name: string;
  username: string;
}

const {$objectType, metadata} = submitApiPayload

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
      const {emailAddress, id_type, frontImageData, backImageData, frontImageType, backImageType, country, selfieImageData, selfieImageType } = documentVerificationInput;
      let requestId;
      return fetch(`${evidentConfig.EVIDENTID_VERIFYAPI_ENDPOINT}/verify/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': evidentAuth
          },
          body: JSON.stringify({
            'email': emailAddress,
            'description': `${id_type}`,
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
                  'type': `identity_assurance.document_verification.${id_type}.image.front`,
                  'value': createSubmitInputValue($objectType, `${frontImageData}`, `${frontImageType}`, metadata)
                }, {
                  'type': 'identity_assurance.document_verification.document_type',
                  'value': createDocumentType(id_type, country)
                }, {
                  'type': 'identity_assurance.document_verification.selfie_to_document.selfie_image',
                  'value': createSubmitInputValue($objectType, `${selfieImageData}`, `${selfieImageType}`, metadata)
                }
              ]
            }
            if (id_type !== 'passport') {
              submitInput['inputs'].push({
                'type': `identity_assurance.document_verification.${id_type}.image.back`,
                'value': createSubmitInputValue($objectType, `${backImageData}`, `${backImageType}`, metadata)
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
      .then(async (response) => {
        // TODO: Update user in firebase
        const userCollection = admin
          .firestore()
          .collection('users')
        const userDoc = await userCollection
          .where('username', '==', emailAddress)
          .limit(1)
          .get()

        let user
        userDoc.forEach(function (documentSnapshot) {
          user = documentSnapshot.data()
          user.id = documentSnapshot.id
        }.bind(this))
        let res = await userCollection
          .doc(user.id)
          .update({
            // TODO: before updating, fetch older thirdparty accounts and extend it.
            thirdPartyAccounts: [{
              type: ThirdPartyAccountType.STRIPE,
            }] 
          })
        return res;
      })
      .then((res) => {
        return Promise.resolve(res)
      })
    }
    catch(error) {
      console.log('error decoding idToken')
      console.log(error)
    }
  }
}
