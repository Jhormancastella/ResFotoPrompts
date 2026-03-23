/**
 * Translations Module
 * Handles all internationalization for the application
 */

export const translations = {
    es: {
        guideTitle: 'Guía Rápida de Uso',
        guideSubtitle: 'Aprende a crear prompts perfectos en 4 pasos',
        step1Title: 'Selecciona los daños de tu foto',
        step1Desc: 'Marca todos los tipos de deterioro que tiene tu imagen: manchas, roturas, decoloración, etc.',
        step2Title: 'Define las características',
        step2Desc: 'Indica la época, tipo de foto, material original y calidad deseada para mayor precisión.',
        step3Title: 'Activa las opciones avanzadas',
        step3Desc: 'Colorización, recuperación de detalles, extensión de bordes y más funciones premium.',
        step4Title: 'Genera y copia tu prompt',
        step4Desc: 'Elige entre versiones corta, media o extensa según la IA que vayas a utilizar.',
        startBtn: '¡Comenzar Ahora!',
        guideBtn: 'Guía',
        themeBtn: 'Tema',
        heroTitle: '✨ Generador de Prompts para Restauración de Fotos',
        heroDesc: 'Crea prompts profesionales optimizados para las mejores IA de restauración.',
        damageTitle: 'Tipo de Daño',
        damageSubtitle: 'Selecciona todos los daños presentes en tu foto',
        eraTitle: 'Época de la Foto',
        eraSubtitle: '¿De qué década es aproximadamente?',
        typeTitle: 'Tipo de Fotografía',
        typeSubtitle: '¿Qué tipo de foto es?',
        materialTitle: 'Material Original',
        materialSubtitle: '¿Qué tipo de papel o material es?',
        qualityTitle: 'Calidad Deseada',
        qualitySubtitle: '¿Qué nivel de restauración necesitas?',
        advancedTitle: 'Opciones Avanzadas',
        advancedSubtitle: 'Funciones extra para mejores resultados',
        outputTitle: 'Estilo de Salida',
        outputSubtitle: '¿Para qué IA quieres optimizar el prompt?',
        generateBtn: 'Generar Prompt Mágico',
        outputResultTitle: 'Tu Prompt Generado',
        tabShort: 'Corto',
        tabMedium: 'Medio',
        tabLong: 'Extenso',
        copyBtn: 'Copiar Prompt',
        downloadBtn: 'Descargar TXT',
        resetBtn: 'Reiniciar',
        aiTitle: 'IAs Recomendadas para Restauración',
        aiSubtitle: 'Las mejores herramientas de IA para restaurar tus fotos',
        footerText: 'El generador de prompts definitivo para restauración de fotos',
        footerCredit: 'Creado con ❤️ para preservar tus recuerdos',
        copied: '¡Copiado!',
        selectDamage: 'Por favor, selecciona al menos un tipo de daño.'
    },
    en: {
        guideTitle: 'Quick Start Guide',
        guideSubtitle: 'Learn to create perfect prompts in 4 steps',
        step1Title: 'Select photo damages',
        step1Desc: 'Mark all types of deterioration in your image: stains, tears, discoloration, etc.',
        step2Title: 'Define characteristics',
        step2Desc: 'Indicate the era, type of photo, original material and desired quality for more precision.',
        step3Title: 'Enable advanced options',
        step3Desc: 'Colorization, detail recovery, border extension and more premium features.',
        step4Title: 'Generate and copy your prompt',
        step4Desc: 'Choose between short, medium or long versions depending on the AI you will use.',
        startBtn: 'Start Now!',
        guideBtn: 'Guide',
        themeBtn: 'Theme',
        heroTitle: '✨ Photo Restoration Prompt Generator',
        heroDesc: 'Create professional prompts optimized for the best restoration AIs.',
        damageTitle: 'Damage Type',
        damageSubtitle: 'Select all damages present in your photo',
        eraTitle: 'Photo Era',
        eraSubtitle: 'Approximately which decade?',
        typeTitle: 'Photo Type',
        typeSubtitle: 'What type of photo is it?',
        materialTitle: 'Original Material',
        materialSubtitle: 'What type of paper or material?',
        qualityTitle: 'Desired Quality',
        qualitySubtitle: 'What restoration level do you need?',
        advancedTitle: 'Advanced Options',
        advancedSubtitle: 'Extra features for better results',
        outputTitle: 'Output Style',
        outputSubtitle: 'Which AI do you want to optimize the prompt for?',
        generateBtn: 'Generate Magic Prompt',
        outputResultTitle: 'Your Generated Prompt',
        tabShort: 'Short',
        tabMedium: 'Medium',
        tabLong: 'Extended',
        copyBtn: 'Copy Prompt',
        downloadBtn: 'Download TXT',
        resetBtn: 'Reset',
        aiTitle: 'Recommended AIs for Restoration',
        aiSubtitle: 'The best AI tools to restore your photos',
        footerText: 'The ultimate prompt generator for photo restoration',
        footerCredit: 'Created with ❤️ to preserve your memories',
        copied: 'Copied!',
        selectDamage: 'Please select at least one type of damage.'
    }
};

export class I18n {
    constructor(currentLang = 'es') {
        this.currentLang = currentLang;
    }

    setLanguage(lang) {
        this.currentLang = lang;
        document.documentElement.lang = lang;
    }

    get(key) {
        return translations[this.currentLang][key] || key;
    }

    applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.get(key);
            if (translation) {
                el.textContent = translation;
            }
        });
    }
}
