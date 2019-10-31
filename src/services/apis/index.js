import axios from 'axios'
import * as config from '../../config/connectionBase'

export const saveToken = async (token) => {
  let tokensPath = `${config.uri}/${config.tokens_path}`

  try {
    let data = await axios.post(tokensPath, { firebase: { token } })
                    .then( resp => resp.data )
                    .catch( error => error)
    console.log(data)
  } catch ( e ) {
    console.log(e)
  }
}

export const fetch_category_children = async (category_id) => {
  let uri = `${config.uri}/${config.category_path(category_id)}`

  try {
    let data = await axios.get(uri)
              .then( resp => {
                return resp.data
              } )
              .catch( err => {
                return err
              } )

    return data
  } catch(e) {
    console.error(e)
  }
}