import moment from 'moment'

import { RiverReading } from './models/RiverReading'
import { fetchRiverReadingData } from './services/river_reading_service'
import { saveToCsvFile } from './utils/file_utils'
import { rivers } from './utils/riversNamesObj'

const getRiverReadingList = async (
  rivers: any,
  initialDate: Date,
  finalDate: Date
) => {

  let riverReadingList = []

  for (let river of rivers) {
    const readings: RiverReading[] = await fetchRiverReadingData(
      river.stationCode,
      river.riverName,
      initialDate,
      finalDate
    )
  
    riverReadingList.push(readings)
  } 
    return riverReadingList.flat()
}

const generateRiverDataFiles = async (
  readings: RiverReading[]
) => {
  saveToCsvFile(readings, 'leituras.csv')
  console.log('Mal feito desfeito')
}

const generateFile = async () => {
  let lastWeek = moment().subtract(1, 'week').toDate()
  let today = moment().toDate()
  
  let readings = await getRiverReadingList(rivers, lastWeek, today)
  generateRiverDataFiles(readings)
}

generateFile()