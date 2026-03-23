/**
 * Main Application Module
 * Entry point for the ResFotoPrompts application
 */

import { appData } from './data/appData.js';
import { I18n } from './modules/translations.js';
import { AppState } from './modules/state.js';
import { UIRenderer } from './modules/ui.js';
import { PromptGenerator } from './modules/prompts.js';
import { SecurityUtils } from './modules/security.js';

class ResFotoApp {
    constructor() {
        this.state = new AppState();
        this.i18n = new I18n('es');
        this.ui = new UIRenderer(appData, this.i18n);
        this.promptGenerator = new PromptGenerator();
        this.init();
    }

    init() {
        // Inicializar seguridad
        SecurityUtils.init();
        
        this.setupEventListeners();
        this.loadPreferences();
        this.ui.renderAllOptions(this.state);
        this.i18n.applyTranslations();
        this.checkGuideModal();
    }

    setupEventListeners() {
        // Options containers
        document.getElementById('damageOptions')?.addEventListener('click', (e) => this.handleDamageClick(e));
        document.getElementById('eraOptions')?.addEventListener('click', (e) => this.handleEraClick(e));
        document.getElementById('typeOptions')?.addEventListener('click', (e) => this.handleTypeClick(e));
        document.getElementById('materialOptions')?.addEventListener('click', (e) => this.handleMaterialClick(e));
        document.getElementById('qualityOptions')?.addEventListener('click', (e) => this.handleQualityClick(e));
        document.getElementById('advancedOptions')?.addEventListener('click', (e) => this.handleAdvancedClick(e));
        document.getElementById('outputOptions')?.addEventListener('click', (e) => this.handleOutputClick(e));
        document.getElementById('outputTabs')?.addEventListener('click', (e) => this.handleTabClick(e));
    }

    loadPreferences() {
        // Load theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            this.toggleTheme();
        }
    }

    checkGuideModal() {
        const guideModal = document.getElementById('guideModal');
        if (!localStorage.getItem('guideShown')) {
            guideModal?.classList.remove('hidden');
        } else {
            guideModal?.classList.add('hidden');
        }
    }

    // Event Handlers
    handleDamageClick(e) {
        const item = e.target.closest('[data-type="damage"]');
        if (!item) return;

        const id = item.dataset.id;
        const isSelected = this.state.toggleDamage(id);
        item.classList.toggle('selected', isSelected);
    }

    handleEraClick(e) {
        const item = e.target.closest('[data-type="era"]');
        if (!item) return;

        this.state.selectEra(item.dataset.id);
        this.ui.renderEraOptions(this.state.selectedEra);
    }

    handleTypeClick(e) {
        const item = e.target.closest('[data-type="type"]');
        if (!item) return;

        this.state.selectType(item.dataset.id);
        this.ui.renderTypeOptions(this.state.selectedType);
    }

    handleMaterialClick(e) {
        const item = e.target.closest('[data-type="material"]');
        if (!item) return;

        this.state.selectMaterial(item.dataset.id);
        this.ui.renderMaterialOptions(this.state.selectedMaterial);
    }

    handleQualityClick(e) {
        const item = e.target.closest('[data-type="quality"]');
        if (!item) return;

        this.state.selectQuality(item.dataset.id);
        this.ui.renderQualityOptions(this.state.selectedQuality);
    }

    handleAdvancedClick(e) {
        const item = e.target.closest('[data-type="advanced"]');
        if (!item) return;

        const id = item.dataset.id;
        const isSelected = this.state.toggleAdvanced(id);
        item.classList.toggle('active', isSelected);
    }

    handleOutputClick(e) {
        const item = e.target.closest('[data-type="output"]');
        if (!item) return;

        this.state.selectOutput(item.dataset.id);
        this.ui.renderOutputOptions(this.state.selectedOutput);
    }

    handleTabClick(e) {
        const tab = e.target.closest('.output-tab');
        if (!tab) return;

        const type = tab.dataset.type;
        this.state.setPromptType(type);
        this.ui.switchPromptType(type);
        
        const promptOutput = document.getElementById('promptOutput');
        if (promptOutput) {
            promptOutput.textContent = this.state.generatedPrompts[type];
        }
    }

    // Public methods exposed to window for onclick handlers
    generatePrompt() {
        // Rate limiting: máximo 20 generaciones por minuto
        if (!SecurityUtils.rateLimit('generate_prompt', 20, 60000)) {
            alert('Por favor espera un momento antes de generar más prompts.');
            return;
        }
        
        if (this.state.selectedDamages.length === 0) {
            alert(this.i18n.get('selectDamage'));
            return;
        }

        let prompts = this.promptGenerator.generateAllPrompts(this.state);
        prompts = this.promptGenerator.applyOutputStyle(prompts, this.state.selectedOutput);
        
        this.state.setGeneratedPrompts(prompts);
        this.ui.showOutput(prompts, this.state.currentPromptType);
    }

    switchPromptType(type) {
        this.state.setPromptType(type);
        this.ui.switchPromptType(type);
        
        const promptOutput = document.getElementById('promptOutput');
        if (promptOutput) {
            promptOutput.textContent = this.state.generatedPrompts[type];
        }
    }

    copyPrompt() {
        // Rate limiting: máximo 5 copias por minuto
        if (!SecurityUtils.rateLimit('copy_prompt', 5, 60000)) {
            alert('Por favor espera un momento antes de copiar nuevamente.');
            return;
        }
        
        const prompt = this.state.generatedPrompts[this.state.currentPromptType];
        navigator.clipboard.writeText(prompt).then(() => {
            this.ui.showCopiedFeedback();
        }).catch(err => {
            console.error('Error al copiar:', err);
            // Fallback para navegadores que bloquean clipboard API
            const textarea = document.createElement('textarea');
            textarea.value = prompt;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                this.ui.showCopiedFeedback();
            } catch (e) {
                console.error('Fallback copy failed:', e);
            }
            document.body.removeChild(textarea);
        });
    }

    downloadPrompt() {
        // Rate limiting: máximo 10 descargas por minuto
        if (!SecurityUtils.rateLimit('download_prompt', 10, 60000)) {
            alert('Por favor espera un momento antes de descargar nuevamente.');
            return;
        }
        
        const prompt = this.state.generatedPrompts[this.state.currentPromptType];
        // Sanitizar el nombre de archivo
        const safeFileName = 'ResFotoProms_prompt.txt'.replace(/[^a-zA-Z0-9._-]/g, '');
        
        const blob = new Blob([prompt], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = safeFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    resetAll() {
        this.state.reset();
        this.ui.hideOutput();
        this.ui.renderAllOptions(this.state);
        
        // Reset output selection to flux
        document.querySelector('#outputOptions [data-id="flux"]')?.classList.add('selected');
    }

    toggleTheme() {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            html.setAttribute('data-theme', 'light');
            this.state.currentTheme = 'light';
        } else {
            html.setAttribute('data-theme', 'dark');
            this.state.currentTheme = 'dark';
        }
        
        this.ui.updateThemeIcon(this.state.currentTheme);
        localStorage.setItem('theme', this.state.currentTheme);
    }

    toggleLanguage() {
        this.state.currentLang = this.state.currentLang === 'es' ? 'en' : 'es';
        this.i18n.setLanguage(this.state.currentLang);
        this.ui.updateLangText(this.state.currentLang);
        this.i18n.applyTranslations();
        this.ui.renderAllOptions(this.state);
    }

    openGuide() {
        document.getElementById('guideModal')?.classList.remove('hidden');
    }

    closeGuide() {
        document.getElementById('guideModal')?.classList.add('hidden');
        localStorage.setItem('guideShown', 'true');
    }
}

// Initialize app and expose to window
const app = new ResFotoApp();

// Expose methods to window for onclick handlers
window.generatePrompt = () => app.generatePrompt();
window.switchPromptType = (type) => app.switchPromptType(type);
window.copyPrompt = () => app.copyPrompt();
window.downloadPrompt = () => app.downloadPrompt();
window.resetAll = () => app.resetAll();
window.toggleTheme = () => app.toggleTheme();
window.toggleLanguage = () => app.toggleLanguage();
window.openGuide = () => app.openGuide();
window.closeGuide = () => app.closeGuide();
