/**
 * Security Utilities Module
 * Proporciona protección contra ataques XSS, injection y otras vulnerabilidades comunes
 */

export class SecurityUtils {
    /**
     * Sanitiza HTML para prevenir XSS
     * @param {string} input - Texto a sanitizar
     * @returns {string} - Texto sanitizado
     */
    static escapeHtml(input) {
        if (typeof input !== 'string') return '';
        
        const htmlEscapes = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#96;',
            '=': '&#61;'
        };
        
        return input.replace(/[&<>"'`=/]/g, char => htmlEscapes[char]);
    }

    /**
     * Sanitiza atributos HTML
     * @param {string} input - Valor del atributo
     * @returns {string} - Atributo sanitizado
     */
    static escapeAttribute(input) {
        if (typeof input !== 'string') return '';
        
        return input
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    /**
     * Valida que un string no contenga scripts maliciosos
     * @param {string} input - Texto a validar
     * @returns {boolean} - True si es seguro
     */
    static isSafeInput(input) {
        if (typeof input !== 'string') return false;
        
        const dangerousPatterns = [
            /<script[^>]*>.*?<\/script>/gi,
            /<script[^>]*>/gi,
            /<\/script>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,  // event handlers: onclick, onerror, etc.
            /<iframe/gi,
            /<object/gi,
            /<embed/gi,
            /data:text\/html/gi,
            /eval\s*\(/gi,
            /expression\s*\(/gi,
            /url\s*\(\s*['"]*javascript/gi
        ];
        
        return !dangerousPatterns.some(pattern => pattern.test(input));
    }

    /**
     * Limpia input de usuario para prevenir injection
     * @param {string} input - Input del usuario
     * @param {number} maxLength - Longitud máxima permitida
     * @returns {string|null} - Input limpio o null si es inválido
     */
    static sanitizeInput(input, maxLength = 1000) {
        if (typeof input !== 'string') return null;
        
        // Verificar longitud
        if (input.length > maxLength) {
            console.warn('Security: Input excede longitud máxima');
            return null;
        }
        
        // Verificar caracteres peligrosos
        if (!this.isSafeInput(input)) {
            console.warn('Security: Input potencialmente peligroso detectado');
            return null;
        }
        
        // Eliminar caracteres de control excepto espacios comunes
        return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    }

    /**
     * Genera un token CSRF aleatorio
     * @returns {string} - Token CSRF
     */
    static generateCSRFToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Almacena token CSRF en localStorage de forma segura
     */
    static setCSRFToken() {
        const token = this.generateCSRFToken();
        localStorage.setItem('csrf_token', token);
        return token;
    }

    /**
     * Verifica token CSRF
     * @param {string} token - Token a verificar
     * @returns {boolean} - True si es válido
     */
    static validateCSRFToken(token) {
        const storedToken = localStorage.getItem('csrf_token');
        return storedToken && token === storedToken;
    }

    /**
     * Detecta si el usuario está usando modo privado/incógnito
     * @returns {Promise<boolean>}
     */
    static async isPrivateMode() {
        return new Promise((resolve) => {
            const testKey = 'test_private_mode';
            try {
                localStorage.setItem(testKey, '1');
                localStorage.removeItem(testKey);
                resolve(false);
            } catch (e) {
                resolve(true);
            }
        });
    }

    /**
     * Protege contra clickjacking verificando si estamos en un iframe
     */
    static antiClickjack() {
        if (window.top !== window.self) {
            console.error('Security: Detectado intento de clickjacking');
            document.body.innerHTML = '<h1>Acceso Denegado</h1><p>Esta aplicación no puede ejecutarse en un iframe por seguridad.</p>';
            return false;
        }
        return true;
    }

    /**
     * Deshabilita características peligrosas de la consola en producción
     */
    static disableConsoleInProduction() {
        if (window.location.hostname !== 'localhost' && 
            !window.location.hostname.includes('127.0.0.1')) {
            // Preservar console.error para reportes de errores
            const originalError = console.error;
            console.log = () => {};
            console.warn = () => {};
            console.info = () => {};
            console.debug = () => {};
            console.error = (...args) => {
                // Solo mostrar errores, no información sensible
                if (args[0] && typeof args[0] === 'string' && 
                    !args[0].includes('password') && 
                    !args[0].includes('token') &&
                    !args[0].includes('key')) {
                    originalError.apply(console, args);
                }
            };
        }
    }

    /**
     * Valida una URL para prevenir open redirects
     * @param {string} url - URL a validar
     * @returns {boolean} - True si es segura
     */
    static isValidRedirectUrl(url) {
        try {
            const parsed = new URL(url, window.location.origin);
            // Solo permitir URLs del mismo origen o HTTPS
            return parsed.protocol === 'https:' || 
                   parsed.origin === window.location.origin;
        } catch (e) {
            return false;
        }
    }

    /**
     * Rate limiting simple para prevenir abuse
     * @param {string} action - Nombre de la acción
     * @param {number} limit - Límite de intentos
     * @param {number} windowMs - Ventana de tiempo en ms
     * @returns {boolean} - True si está dentro del límite
     */
    static rateLimit(action, limit = 10, windowMs = 60000) {
        const key = `ratelimit_${action}`;
        const now = Date.now();
        const attempts = JSON.parse(localStorage.getItem(key) || '[]');
        
        // Limpiar intentos antiguos
        const validAttempts = attempts.filter(time => now - time < windowMs);
        
        if (validAttempts.length >= limit) {
            console.warn(`Security: Rate limit excedido para ${action}`);
            return false;
        }
        
        validAttempts.push(now);
        localStorage.setItem(key, JSON.stringify(validAttempts));
        return true;
    }

    /**
     * Inicializa todas las protecciones de seguridad
     */
    static init() {
        // Verificar clickjacking al cargar
        if (!this.antiClickjack()) return;
        
        // Deshabilitar consola en producción
        this.disableConsoleInProduction();
        
        // Generar token CSRF
        this.setCSRFToken();
        
        // Escuchar mensajes postMessage para validar origen
        window.addEventListener('message', (event) => {
            if (event.origin !== window.location.origin) {
                console.warn('Security: Mensaje postMessage de origen no válido');
                return;
            }
        });
        
        console.info('Security: Protecciones inicializadas correctamente');
    }
}

// Auto-inicializar en producción
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        SecurityUtils.init();
    });
}
