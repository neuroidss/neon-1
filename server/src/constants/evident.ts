import {evidentConfig} from '../../config'

export const verifyApiPayload = {
  'userAuthenticationType': 'blindtrust',
    'attributesRequested': [
      {
        'attributeType': 'core.firstname'
      },
      {
        'attributeType': 'core.lastname'
      },
      {
        'attributeType': 'identity_assurance.document_verification.verification_status'
      },
      {
        'attributeType': 'identity_assurance.document_verification.selfie_to_document.confidence_level'
      },
      {
        'attributeType': 'identity_assurance.document_verification.selfie_to_document.selfie_image'
      },
      {
        'attributeType': 'identity_assurance.document_verification.selfie_to_document.id_picture_compared_to'
      }, {
        'attributeType': 'identity_assurance.document_verification.drivers_license.image.back'
      }, {
        'attributeType': 'identity_assurance.document_verification.drivers_license.image.front'
      }
    ]
}

export const submitApiPayload = {
  '$objectType': 'BinaryData',
  'metadata': {
    'cropped': false
  }
}

export const evidentAuth = `Basic ${new Buffer(evidentConfig.EVIDENTID_USERNAME + ':' + evidentConfig.EVIDENTID_APIKEY).toString('base64')}`

export const webhookResponse = {
  rpRequestCompleted: 'rpRequestCompleted',
  notificationFailure: 'notificationFailure'
}

export const DOCUMENT_VERIFIED = 'DocumentVerified'