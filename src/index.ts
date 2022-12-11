// Core
import axios from 'axios'

// Config
import config from './config/idnex'

const axiosInstance = axios.create()

const main = async () => {
    try {
        const response = await axiosInstance.get(config.PARSE_URL)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

main()
    .then()
    .catch((error) => {
        console.log('ERROR', error)
    })
