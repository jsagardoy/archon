const functions = require('firebase-functions')
const admin = require( 'firebase-admin')

admin.inizializeApp(functions.config().firebase)

exports.checkDateDaily = functions.pubsub
  .schedule('0 0 * * *')
  .onRun(async (context:any) => {
      const dataDoc = await admin.firestore().collection('tournaments').doc('').get();
    return null
  })
