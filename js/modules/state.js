/**
 * State Management Module
 * Handles application state
 */

export class AppState {
    constructor() {
        this.currentLang = 'es';
        this.currentTheme = 'dark';
        this.selectedDamages = [];
        this.selectedEra = null;
        this.selectedType = null;
        this.selectedMaterial = null;
        this.selectedQuality = 'natural';
        this.selectedAdvanced = [];
        this.selectedOutput = 'flux';
        this.currentPromptType = 'short';
        this.generatedPrompts = { short: '', medium: '', long: '' };
    }

    toggleDamage(id) {
        const index = this.selectedDamages.indexOf(id);
        if (index > -1) {
            this.selectedDamages.splice(index, 1);
            return false;
        } else {
            this.selectedDamages.push(id);
            return true;
        }
    }

    selectEra(id) {
        this.selectedEra = id;
    }

    selectType(id) {
        this.selectedType = id;
    }

    selectMaterial(id) {
        this.selectedMaterial = id;
    }

    selectQuality(id) {
        this.selectedQuality = id;
    }

    toggleAdvanced(id) {
        const index = this.selectedAdvanced.indexOf(id);
        if (index > -1) {
            this.selectedAdvanced.splice(index, 1);
            return false;
        } else {
            this.selectedAdvanced.push(id);
            return true;
        }
    }

    selectOutput(id) {
        this.selectedOutput = id;
    }

    setPromptType(type) {
        this.currentPromptType = type;
    }

    setGeneratedPrompts(prompts) {
        this.generatedPrompts = prompts;
    }

    reset() {
        this.selectedDamages = [];
        this.selectedEra = null;
        this.selectedType = null;
        this.selectedMaterial = null;
        this.selectedQuality = 'natural';
        this.selectedAdvanced = [];
        this.selectedOutput = 'flux';
        this.currentPromptType = 'short';
        this.generatedPrompts = { short: '', medium: '', long: '' };
    }
}
