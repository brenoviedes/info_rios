import { writeFileSync } from 'fs'
import { RiverReading } from '../models/RiverReading'

export const saveToCsvFile = (readings: RiverReading[], fileName: string) => {
  let csvContent = 'COD. ESTACAO, RIO, DATA/HORA, NIVEL,VAZAO,CHUVA \n'

  readings = readings.reverse()

  readings.forEach((r) => {
    const timestamp = `${r.dateTime.toLocaleDateString()} ${r.dateTime.toLocaleTimeString()}`
    const line = `${r.stationCode}, ${r.riverName} , ${timestamp}, ${r.level}, ${r.flow}, ${r.rain}\n`
    csvContent = `${csvContent}${line}`
  })

  writeFileSync(fileName, csvContent)
}
