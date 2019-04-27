import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './en.json'
import fr from './fr.json'
import ar from './ar.json'
import es from './es.json'
import cn from './cn.json'
import it from './it.json'


Vue.use(VueI18n)


const locale = 'en' 


const messages = {
    en , fr , ar , es , cn , it 
}

const i18n = new VueI18n({
    
    locale,
    messages,
    silentTranslationWarn: process.env.NODE_ENV === 'production',
})

export default i18n