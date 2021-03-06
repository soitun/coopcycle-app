import { AsyncStorage } from 'react-native'
import EventEmitter from 'EventEmitter'

let events = new EventEmitter()

class Settings {

  static saveServer(server) {
    return new Promise((resolve, reject) => {
      try {
        AsyncStorage.setItem('@Server', server)
          .then((error) => {
            if (error) {
              return reject(error)
            }
            resolve()
          });
      } catch (error) {
        reject(error.message)
      }
    });
  }

  static loadServer() {
    return new Promise((resolve, reject) => {
      try {
        AsyncStorage.getItem('@Server')
          .then((data, error) => {
            if (error) {
              return reject(error)
            }

            return resolve(data)
          });
      } catch (error) {
        reject(error.message)
      }
    });
  }

  static removeServer() {
    return new Promise((resolve, reject) => {
      try {
        AsyncStorage.removeItem('@Server')
          .then((error) => {
            if (error) {
              return reject(error)
            }
            events.emit('server:remove')
            resolve()
          });
      } catch (error) {
        reject(error.message)
      }
    });
  }

  static addListener(event, handler) {
    events.addListener(event, handler)
  }

  static removeListener(event, handler) {
    events.removeListener(event, handler)
  }

}

module.exports = { Settings, events }