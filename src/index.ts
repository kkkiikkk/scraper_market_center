// Core
import axios from 'axios'
import { load } from 'cheerio'

// Config
import config from './config'

// Types
import type { MarketData } from './types'

const axiosInstance = axios.create()

const main = async () => {
    try {
        const response = await axiosInstance.get(config.PARSE_URL)
        const parseInfo = load(response.data)

        const tableStats = parseInfo('.table__body > tr')

        const arrayOfMarketData: MarketData[] = []

        tableStats.each((index, item) => {
            const name = parseInfo(item).find('.table__cell.w55 > a').text()
            const last = parseInfo(item).find('.table__cell.w15 > bg-quote').attr({field: 'Last'}).html()
            const change = parseInfo(item).find('.table__cell.w15 > bg-quote').attr({field: 'change'}).html()
            const percentchange = parseInfo(item).find('.table__cell.w15 > bg-quote').attr({field: 'percentchange'}).html()
            if (name.length !== 0 && last && change && percentchange) {
                const marketData: MarketData = {
                    name,
                    percentchange,
                    last,
                    change
                }
                arrayOfMarketData.push(marketData)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

main()
    .then()
    .catch((error) => {
        console.log('ERROR', error)
    })
