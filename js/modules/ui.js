/**
 * UI Rendering Module
 * Handles all DOM rendering and UI updates
 */

export class UIRenderer {
    constructor(appData, i18n) {
        this.data = appData;
        this.i18n = i18n;
    }

    renderAllOptions(state) {
        this.renderDamageOptions(state.selectedDamages);
        this.renderEraOptions(state.selectedEra);
        this.renderTypeOptions(state.selectedType);
        this.renderMaterialOptions(state.selectedMaterial);
        this.renderQualityOptions(state.selectedQuality);
        this.renderAdvancedOptions(state.selectedAdvanced);
        this.renderOutputOptions(state.selectedOutput);
        this.renderAIRecommendations();
    }

    renderDamageOptions(selectedDamages) {
        const container = document.getElementById('damageOptions');
        if (!container) return;
        
        container.innerHTML = this.data.damages.map(d => `
            <div class="option-item ${selectedDamages.includes(d.id) ? 'selected' : ''}" data-id="${d.id}" data-type="damage">
                <div class="option-checkbox"><i class="fas fa-check"></i></div>
                <span class="option-label"><span class="emoji-icon">${d.icon}</span> ${d[this.i18n.currentLang]}</span>
            </div>
        `).join('');
    }

    renderEraOptions(selectedEra) {
        const container = document.getElementById('eraOptions');
        if (!container) return;
        
        container.innerHTML = this.data.eras.map(e => `
            <div class="radio-item ${selectedEra === e.id ? 'selected' : ''}" data-id="${e.id}" data-type="era">
                <div class="icon"><span class="emoji-icon">${e.icon}</span></div>
                <div class="label">${e[this.i18n.currentLang]}</div>
            </div>
        `).join('');
    }

    renderTypeOptions(selectedType) {
        const container = document.getElementById('typeOptions');
        if (!container) return;
        
        container.innerHTML = this.data.types.map(t => `
            <div class="radio-item ${selectedType === t.id ? 'selected' : ''}" data-id="${t.id}" data-type="type">
                <div class="icon"><span class="emoji-icon">${t.icon}</span></div>
                <div class="label">${t[this.i18n.currentLang]}</div>
            </div>
        `).join('');
    }

    renderMaterialOptions(selectedMaterial) {
        const container = document.getElementById('materialOptions');
        if (!container) return;
        
        container.innerHTML = this.data.materials.map(m => `
            <div class="radio-item ${selectedMaterial === m.id ? 'selected' : ''}" data-id="${m.id}" data-type="material">
                <div class="icon"><span class="emoji-icon">${m.icon}</span></div>
                <div class="label">${m[this.i18n.currentLang]}</div>
            </div>
        `).join('');
    }

    renderQualityOptions(selectedQuality) {
        const container = document.getElementById('qualityOptions');
        if (!container) return;
        
        container.innerHTML = this.data.qualities.map(q => `
            <div class="quality-label ${selectedQuality === q.id ? 'active' : ''}" data-id="${q.id}" data-type="quality">
                ${q[this.i18n.currentLang]}
            </div>
        `).join('');
    }

    renderAdvancedOptions(selectedAdvanced) {
        const container = document.getElementById('advancedOptions');
        if (!container) return;
        
        container.innerHTML = this.data.advanced.map(a => `
            <div class="toggle-item ${selectedAdvanced.includes(a.id) ? 'active' : ''}" data-id="${a.id}" data-type="advanced">
                <div class="toggle-info">
                    <span class="toggle-icon"><span class="emoji-icon">${a.icon}</span></span>
                    <span>${a[this.i18n.currentLang]}</span>
                </div>
                <div class="toggle-switch"></div>
            </div>
        `).join('');
    }

    renderOutputOptions(selectedOutput) {
        const container = document.getElementById('outputOptions');
        if (!container) return;
        
        container.innerHTML = this.data.outputs.map(o => `
            <div class="radio-item ${selectedOutput === o.id ? 'selected' : ''}" data-id="${o.id}" data-type="output">
                <div class="icon"><span class="emoji-icon">${o.icon}</span></div>
                <div class="label">${o[this.i18n.currentLang]}</div>
            </div>
        `).join('');
    }

    renderAIRecommendations() {
        const container = document.getElementById('aiRecommendations');
        if (!container) return;
        
        container.innerHTML = this.data.ais.map(ai => `
            <div class="ai-card">
                <div class="ai-card-header">
                    <div class="ai-logo ${ai.logo}">
                        <span class="emoji-icon">${ai.emoji || '🤖'}</span>
                    </div>
                    <div class="ai-info">
                        <h4>${ai.name}</h4>
                        <span class="ai-badge ${ai.badge}">${ai.badgeText[this.i18n.currentLang]}</span>
                    </div>
                </div>
                <p class="ai-description">${ai.desc[this.i18n.currentLang]}</p>
                <div class="ai-tags">
                    ${ai.tags.map(tag => `<span class="ai-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    showOutput(prompts, currentType) {
        const outputSection = document.getElementById('outputSection');
        const promptOutput = document.getElementById('promptOutput');
        
        if (outputSection && promptOutput) {
            outputSection.classList.add('visible');
            promptOutput.textContent = prompts[currentType];
            outputSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    hideOutput() {
        const outputSection = document.getElementById('outputSection');
        if (outputSection) {
            outputSection.classList.remove('visible');
        }
    }

    switchPromptType(type) {
        document.querySelectorAll('.output-tab').forEach(tab => tab.classList.remove('active'));
        const activeTab = document.querySelector(`[data-type="${type}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }

    showCopiedFeedback() {
        const btn = document.querySelector('.btn-action');
        if (!btn) return;
        
        btn.classList.add('copied');
        btn.innerHTML = `<i class="fas fa-check"></i><span>${this.i18n.get('copied')}</span>`;
        
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = `<i class="fas fa-copy"></i><span>${this.i18n.get('copyBtn')}</span>`;
        }, 2000);
    }

    updateThemeIcon(theme) {
        const icon = document.getElementById('themeIcon');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    updateLangText(lang) {
        const langText = document.getElementById('langText');
        if (langText) {
            langText.textContent = lang === 'es' ? 'EN' : 'ES';
        }
    }
}
