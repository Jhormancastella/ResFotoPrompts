/**
 * Prompt Generation Module
 * Handles prompt generation logic
 */

import { appData } from '../data/appData.js';

export class PromptGenerator {
    constructor() {
        this.data = appData;
    }

    generateAllPrompts(state) {
        const { selectedDamages, selectedEra, selectedType, selectedMaterial, selectedQuality, selectedAdvanced } = state;

        if (selectedDamages.length === 0) {
            return null;
        }

        const damages = selectedDamages.map(id => 
            this.data.damages.find(d => d.id === id).en
        ).join(', ');

        const era = selectedEra 
            ? this.data.eras.find(e => e.id === selectedEra).en 
            : 'vintage';

        const type = selectedType 
            ? this.data.types.find(t => t.id === selectedType).en 
            : 'photograph';

        const material = selectedMaterial 
            ? this.data.materials.find(m => m.id === selectedMaterial).en 
            : 'photo paper';

        const quality = this.data.qualities.find(q => q.id === selectedQuality).en;

        const advanced = selectedAdvanced.map(id => 
            this.data.advanced.find(a => a.id === id).en
        ).join(', ');

        return {
            short: this.generateShortPrompt(damages, era, type, quality),
            medium: this.generateMediumPrompt(damages, era, type, material, quality, advanced),
            long: this.generateLongPrompt(damages, era, type, material, quality, advanced)
        };
    }

    generateShortPrompt(damages, era, type, quality) {
        return `Restore this ${era} ${type} with ${damages}. ${quality} restoration, preserve original details, fix all damages, enhance clarity while maintaining authenticity.`;
    }

    generateMediumPrompt(damages, era, type, material, quality, advanced) {
        let prompt = `Professional photo restoration of a ${era} ${type} printed on ${material}. `;
        prompt += `The image has the following damages that need to be fixed: ${damages}. `;
        prompt += `Apply ${quality} restoration techniques. `;
        prompt += `Carefully repair all damaged areas while preserving the original character and authenticity of the photograph. `;
        prompt += `Enhance sharpness, correct exposure issues, and restore proper contrast. `;
        
        if (advanced) {
            prompt += `Additional requirements: ${advanced}. `;
        }
        
        prompt += `Final result should look naturally restored without artificial appearance.`;
        return prompt;
    }

    generateLongPrompt(damages, era, type, material, quality, advanced) {
        let prompt = `COMPREHENSIVE PHOTO RESTORATION TASK:\n\n`;
        prompt += `[SOURCE MATERIAL]\n`;
        prompt += `- Era: ${era}\n`;
        prompt += `- Type: ${type}\n`;
        prompt += `- Material: ${material}\n\n`;
        prompt += `[IDENTIFIED DAMAGES]\n`;
        prompt += `${damages.split(', ').map(d => `- ${d}`).join('\n')}\n\n`;
        prompt += `[RESTORATION REQUIREMENTS]\n`;
        prompt += `- Quality Level: ${quality}\n`;
        prompt += `- Preserve original composition and framing\n`;
        prompt += `- Maintain authentic period-appropriate aesthetics\n`;
        prompt += `- Repair all physical damages (tears, scratches, missing parts)\n`;
        prompt += `- Correct color degradation and fading\n`;
        prompt += `- Remove stains, spots, and discoloration\n`;
        prompt += `- Enhance facial features while preserving likeness\n`;
        prompt += `- Restore proper contrast and tonal range\n`;
        prompt += `- Fix any exposure issues\n`;
        prompt += `- Remove dust, dirt, and scanning artifacts\n\n`;
        
        if (advanced) {
            prompt += `[ADVANCED OPTIONS]\n`;
            prompt += `${advanced.split(', ').map(a => `- ${a}`).join('\n')}\n\n`;
        }
        
        prompt += `[OUTPUT SPECIFICATIONS]\n`;
        prompt += `- High resolution output (minimum 4K)\n`;
        prompt += `- Natural appearance without over-processing\n`;
        prompt += `- Subtle film grain retention for authenticity\n`;
        prompt += `- Museum-quality restoration standards\n`;
        prompt += `- Ready for archival printing`;
        
        return prompt;
    }

    applyOutputStyle(prompts, outputType) {
        const styledPrompts = { ...prompts };

        switch (outputType) {
            case 'midjourney':
                styledPrompts.short += ' --style raw --v 6';
                styledPrompts.medium += ' --style raw --v 6 --q 2';
                styledPrompts.long += '\n\n[MIDJOURNEY PARAMETERS]\n--style raw --v 6 --q 2 --ar 4:5';
                break;
            case 'flux':
                // Flux works best with natural language, no modifications needed
                break;
            case 'sdxl':
                styledPrompts.short = styledPrompts.short.replace(/\./g, ',') + ' highly detailed, 8k uhd, photorealistic';
                styledPrompts.medium = styledPrompts.medium.replace(/\./g, ',') + ' masterpiece, best quality, highly detailed, 8k resolution, photorealistic restoration';
                break;
            case 'technical':
                styledPrompts.long += '\n\n[RECOMMENDED PIPELINE]\n1. GFPGAN/CodeFormer for face restoration\n2. Real-ESRGAN for upscaling\n3. LAMA for inpainting missing parts\n4. Manual touch-ups in Photoshop';
                break;
        }

        return styledPrompts;
    }
}
