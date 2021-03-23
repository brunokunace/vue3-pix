<template>
    <img :src="qrcodepix">
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue'
import { QrCodePix } from "../utils"
import { IParameters } from '../utils/ParameterInterface'

export default defineComponent({
    name: 'VuePix',
    props: {
        pixkey: { type: String, required: true },
        city: { type: String, required: true },
        name: { type: String, required: true },
        value: { type: Number, required: true, validator(value: Number): boolean { return value > 0 }},
        guid: { type: String, default: '' },
        message: { type: String, default: '' },
        cep: { type: String, default: '99999999', validator(value: String): boolean { return value.length === 8 }},
        currency: { type: Number, default: 986 },
        countryCode: { type: String, default: 'BR', validator(value: String): boolean { return value.length === 2 }}
    },
    setup: (props) => {
        const qrcodepix = ref('')
        watch([props], async () => {
            const qrCodePix = QrCodePix(props as IParameters)
            qrcodepix.value = await qrCodePix.base64()
        }, { immediate: true })
        return {
            qrcodepix
        }
    }
})
</script>
