import qrcode from 'qrcode'
import { crc } from 'polycrc'
import { IParameters } from './ParameterInterface'

function generateKey(pixkey: string, message?: string): string {
    const payloadKey = []
    payloadKey.push(genEMV('00', 'BR.GOV.BCB.PIX'))
    payloadKey.push(genEMV('01', pixkey))
    if (message) {
        payloadKey.push(genEMV('02', message))
    }
    return payloadKey.join('')
}

function generateGUID(guid: string): string {
    const payloadGUID = []
    payloadGUID.push(genEMV('05', guid))
    return payloadGUID.join('')
}

function genEMV(id: string, parameter: string): string {
    const len = parameter.length.toString().padStart(2, '0')
    return `${id}${len}${parameter}`
}
function QrCodePix(parameters: IParameters) {
    const { pixkey, city, name, value, guid, message, cep, currency, countryCode } = parameters
    const payloadKeyString = generateKey(pixkey, message)
    const payload = []
    payload.push(genEMV('00', '01'))
    payload.push(genEMV('01', '11'))
    payload.push(genEMV('26', payloadKeyString))
    payload.push(genEMV('52', '0000'))
    if (currency) {
        payload.push(genEMV('53', currency.toString()))
    }
    if (value) {
        payload.push(genEMV('54', value.toFixed(2)))
    }
    if (countryCode) {
        payload.push(genEMV('58', countryCode.toUpperCase()))
    }
    payload.push(genEMV('59', name))
    payload.push(genEMV('60', city.toUpperCase()))
    if (cep) {
        payload.push(genEMV('61', cep))
    }
    if (guid) {
        payload.push(genEMV('62', generateGUID(guid)))
    }
    payload.push('6304')
    const payloadString = payload.join('')
    const crc16CCiTT = crc(16, 0x1021, 0xffff, 0x0000, false)
    // @ts-ignore
    const crcResult = crc16CCiTT(payloadString).toString(16).toUpperCase()
    const payloadPIX = `${payloadString}${crcResult}`

    return {
        payload: () => payloadPIX,
        base64: () => qrcode.toDataURL(payloadPIX),
    }
}

export { QrCodePix }
