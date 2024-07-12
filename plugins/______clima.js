//                       CLIMA
//                👇 CRÉDITOS PARA 👇          
//                  👉  ROBLEUY 👈
//                                          
//               (robleuy) PROGRAMADOR
//
import axios from "axios"
let handler = async (m, { args }) => {
if (!args[0]) throw "*Debes escribir el nombre de la ciudad o país para usar este comando.*\n_Ejemplo:_\n.clima Montevideo Uruguay\n.clima Paris Francia"
try {
const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`)
const res = await response
const name = res.data.name
const Country = res.data.sys.country
const Weather = res.data.weather[0].description
const Temperature = res.data.main.temp + "°C"
const Minimum_Temperature = res.data.main.temp_min + "°C"
const Maximum_Temperature = res.data.main.temp_max + "°C"
const Humidity = res.data.main.humidity + "%"
const Wind = res.data.wind.speed + "km/h"
const wea = `[📍] *Ubicación:* _${name}, ${Country}_\n[🌡️] *Temperatura:* _${Temperature}_\n[❄️] *Minima:* _${Minimum_Temperature}_\n[♨️] *Maxima:* _${Maximum_Temperature}_\n[🐌] *Humedad:* _${Humidity}_\n[💨] *Viento:* _${Wind}_`
m.reply(wea)
} catch {
return "*❌ ERROR*\n_No encontré resultados para la ubicación especificada.\n*Consejo: verifica que la localidad qué has escrito sea la correcta.*"}}
handler.help = ['clima *<ciudad/país>*']
handler.tags = ['herramientas']
handler.command = /^(clima)$/i
export default handler