/**
 * Application Data
 * Contains all static data used throughout the application
 */

export const appData = {
    damages: [
        { id: 'faded', icon: '🌫️', es: 'Descolorida / Desvanecida', en: 'Faded / Discolored' },
        { id: 'yellowed', icon: '🟡', es: 'Amarilleada', en: 'Yellowed' },
        { id: 'sepia', icon: '🟤', es: 'Virada a sepia', en: 'Sepia toned' },
        { id: 'torn', icon: '📄', es: 'Roturas / Rasgaduras', en: 'Torn / Ripped' },
        { id: 'missing', icon: '🕳️', es: 'Partes faltantes', en: 'Missing parts' },
        { id: 'peeling', icon: '🎨', es: 'Descascarada', en: 'Peeling / Flaking' },
        { id: 'water', icon: '💧', es: 'Manchas de agua', en: 'Water stains' },
        { id: 'mold', icon: '🦠', es: 'Moho / Hongos', en: 'Mold / Fungus' },
        { id: 'ink', icon: '🖊️', es: 'Manchas de tinta', en: 'Ink stains' },
        { id: 'scratches', icon: '⚡', es: 'Rayones profundos', en: 'Deep scratches' },
        { id: 'dust', icon: '🌫️', es: 'Polvo y suciedad', en: 'Dust and dirt' },
        { id: 'overexposed', icon: '☀️', es: 'Sobreexpuesta', en: 'Overexposed' },
        { id: 'folds', icon: '📐', es: 'Pliegues y dobleces', en: 'Folds and creases' },
        { id: 'tape', icon: '📎', es: 'Cinta adhesiva vieja', en: 'Old adhesive tape' },
        { id: 'foxing', icon: '🟠', es: 'Manchas de óxido (foxing)', en: 'Foxing spots' },
        { id: 'cracks', icon: '💔', es: 'Grietas en emulsión', en: 'Emulsion cracks' }
    ],

    eras: [
        { id: 'pre1900', icon: '🏛️', es: 'Antes de 1900', en: 'Before 1900' },
        { id: '1900-1930', icon: '🎩', es: '1900 - 1930', en: '1900 - 1930' },
        { id: '1930-1955', icon: '📻', es: '1930 - 1955', en: '1930 - 1955' },
        { id: '1955-1975', icon: '📺', es: '1955 - 1975', en: '1955 - 1975' },
        { id: '1975-1995', icon: '📼', es: '1975 - 1995', en: '1975 - 1995' },
        { id: '1995-2010', icon: '📷', es: '1995 - 2010', en: '1995 - 2010' }
    ],

    types: [
        { id: 'family', icon: '👨‍👩‍👧‍👦', es: 'Retrato familiar', en: 'Family portrait' },
        { id: 'studio', icon: '🎭', es: 'Retrato de estudio', en: 'Studio portrait' },
        { id: 'wedding', icon: '💒', es: 'Foto de boda', en: 'Wedding photo' },
        { id: 'group', icon: '👥', es: 'Foto de grupo', en: 'Group photo' },
        { id: 'landscape', icon: '🏞️', es: 'Paisaje / Viaje', en: 'Landscape / Travel' },
        { id: 'id', icon: '🪪', es: 'Foto de identificación', en: 'ID photo' },
        { id: 'polaroid', icon: '📸', es: 'Polaroid', en: 'Polaroid' },
        { id: 'slide', icon: '🎞️', es: 'Diapositiva', en: 'Slide' }
    ],

    materials: [
        { id: 'matte', icon: '📝', es: 'Papel mate', en: 'Matte paper' },
        { id: 'glossy', icon: '✨', es: 'Papel brillante', en: 'Glossy paper' },
        { id: 'textured', icon: '🧱', es: 'Papel con textura', en: 'Textured paper' },
        { id: 'albumin', icon: '🥚', es: 'Albúmina / Plata gelatina', en: 'Albumen / Silver gelatin' },
        { id: 'tintype', icon: '🔩', es: 'Ferrotipo (tintype)', en: 'Tintype' },
        { id: 'cardboard', icon: '📦', es: 'Cartón fotográfico', en: 'Photo cardboard' }
    ],

    qualities: [
        { id: 'conservative', es: 'Conservadora (Museo)', en: 'Conservative (Museum)' },
        { id: 'natural', es: 'Natural (Realista)', en: 'Natural (Realistic)' },
        { id: 'cinematic', es: 'Cinematográfica', en: 'Cinematic' },
        { id: 'ultra', es: 'Ultra HD (8K-16K)', en: 'Ultra HD (8K-16K)' }
    ],

    advanced: [
        { id: 'colorize', icon: '🎨', es: 'Colorización ultra-realista', en: 'Ultra-realistic colorization' },
        { id: 'grain', icon: '🎞️', es: 'Añadir grano analógico sutil', en: 'Add subtle analog grain' },
        { id: 'details', icon: '👕', es: 'Recuperar detalles de ropa/tejidos', en: 'Recover clothing/fabric details' },
        { id: 'eyes', icon: '👁️', es: 'Corregir ojos cerrados/borrosos', en: 'Fix closed/blurry eyes' },
        { id: 'remove', icon: '🗑️', es: 'Quitar elementos del fondo', en: 'Remove background elements' },
        { id: 'outpaint', icon: '📐', es: 'Extender bordes (outpainting)', en: 'Extend borders (outpainting)' },
        { id: 'enhance', icon: '✨', es: 'Mejorar nitidez facial', en: 'Enhance facial sharpness' },
        { id: 'denoise', icon: '🧹', es: 'Reducción de ruido avanzada', en: 'Advanced noise reduction' }
    ],

    outputs: [
        { id: 'flux', icon: '⚡', es: 'Optimizado para Flux', en: 'Optimized for Flux' },
        { id: 'midjourney', icon: '🎨', es: 'Optimizado para Midjourney v6', en: 'Optimized for Midjourney v6' },
        { id: 'sdxl', icon: '🖼️', es: 'Optimizado para SDXL / SD3', en: 'Optimized for SDXL / SD3' },
        { id: 'technical', icon: '🔧', es: 'Técnico (GFPGAN, Topaz)', en: 'Technical (GFPGAN, Topaz)' }
    ],

    ais: [
        {
            id: 'flux',
            name: 'Flux.1',
            emoji: '⚡',
            badge: 'pro',
            badgeText: { es: 'Premium', en: 'Premium' },
            logo: 'flux',
            desc: {
                es: 'La IA más avanzada de 2024 para generación de imágenes. Excelente para restauración con prompts detallados.',
                en: 'The most advanced AI of 2024 for image generation. Excellent for restoration with detailed prompts.'
            },
            tags: ['Photorealistic', 'High Detail', 'Fast']
        },
        {
            id: 'midjourney',
            name: 'Midjourney v6',
            emoji: '🎨',
            badge: 'pro',
            badgeText: { es: 'Premium', en: 'Premium' },
            logo: 'midjourney',
            desc: {
                es: 'Líder en calidad artística y realismo. Ideal para restauraciones con estilo cinematográfico.',
                en: 'Leader in artistic quality and realism. Ideal for cinematic style restorations.'
            },
            tags: ['Artistic', 'Cinematic', 'Premium']
        },
        {
            id: 'gfpgan',
            name: 'GFPGAN',
            emoji: '🔬',
            badge: 'free',
            badgeText: { es: 'Gratis', en: 'Free' },
            logo: 'gfpgan',
            desc: {
                es: 'Especializado en restauración de rostros. Open source y muy efectivo para fotos de retrato.',
                en: 'Specialized in face restoration. Open source and very effective for portrait photos.'
            },
            tags: ['Face Restore', 'Open Source', 'Free']
        },
        {
            id: 'codeformer',
            name: 'CodeFormer',
            emoji: '🎭',
            badge: 'free',
            badgeText: { es: 'Gratis', en: 'Free' },
            logo: 'codeformer',
            desc: {
                es: 'Restauración de rostros con preservación de identidad. Mejor balance entre calidad y fidelidad.',
                en: 'Face restoration with identity preservation. Best balance between quality and fidelity.'
            },
            tags: ['Identity Preserve', 'Faces', 'Free']
        },
        {
            id: 'topaz',
            name: 'Topaz Photo AI',
            emoji: '💎',
            badge: 'pro',
            badgeText: { es: 'Premium', en: 'Premium' },
            logo: 'topaz',
            desc: {
                es: 'Suite profesional todo-en-uno: upscaling, eliminación de ruido, enfoque y restauración.',
                en: 'Professional all-in-one suite: upscaling, noise removal, sharpening and restoration.'
            },
            tags: ['Professional', 'All-in-One', 'Desktop']
        },
        {
            id: 'nanobanana',
            name: 'NanoBanana',
            emoji: '🍌',
            badge: 'free',
            badgeText: { es: 'Gratis', en: 'Free' },
            logo: 'nanobanana',
            desc: {
                es: 'Restauración de fotos con un solo clic. Especializada en fotos antiguas dañadas, descoloridas y con baja resolución.',
                en: 'One-click photo restoration. Specialized in old damaged, faded and low-resolution photos.'
            },
            tags: ['One-Click', 'Easy', 'Free']
        },
        {
            id: 'reve',
            name: 'Reve AI',
            emoji: '🌟',
            badge: 'free',
            badgeText: { es: 'Freemium', en: 'Freemium' },
            logo: 'reve',
            desc: {
                es: 'Suite completa de edición con IA. Incluye restauración elegante de fotos viejas con un solo click.',
                en: 'Complete AI editing suite. Includes elegant old photo restoration with one click.'
            },
            tags: ['AI Editing', 'One-Click', 'Suite']
        },
        {
            id: 'supir',
            name: 'SUPIR',
            emoji: '🧠',
            badge: 'free',
            badgeText: { es: 'Open Source', en: 'Open Source' },
            logo: 'supir',
            desc: {
                es: 'El gold standard 2024-2025 para restauración realista. Utiliza modelos de difusión de última generación.',
                en: 'The 2024-2025 gold standard for realistic restoration. Uses state-of-the-art diffusion models.'
            },
            tags: ['SOTA', 'Realistic', 'Diffusion']
        },
        {
            id: 'magnific',
            name: 'Magnific AI',
            emoji: '🔮',
            badge: 'pro',
            badgeText: { es: 'Premium', en: 'Premium' },
            logo: 'magnific',
            desc: {
                es: 'El upscaler y enhancer más avanzado. Reimagina detalles faltantes con precisión impresionante.',
                en: 'The most advanced AI upscaler & enhancer. Reimagines missing details with impressive accuracy.'
            },
            tags: ['Upscaler', 'Detail', 'Premium']
        },
        {
            id: 'remini',
            name: 'Remini',
            emoji: '📱',
            badge: 'free',
            badgeText: { es: 'Freemium', en: 'Freemium' },
            logo: 'remini',
            desc: {
                es: 'App móvil popular para mejora de fotos. Muy fácil de usar y resultados rápidos.',
                en: 'Popular mobile app for photo enhancement. Very easy to use with quick results.'
            },
            tags: ['Mobile', 'Easy', 'Quick']
        },
        {
            id: 'realesrgan',
            name: 'Real-ESRGAN',
            emoji: '⚙️',
            badge: 'free',
            badgeText: { es: 'Gratis', en: 'Free' },
            logo: 'realESRGAN',
            desc: {
                es: 'El mejor upscaler open source. Aumenta resolución x4 manteniendo detalles naturales.',
                en: 'The best open source upscaler. Increases resolution x4 while maintaining natural details.'
            },
            tags: ['Upscaling', 'Open Source', '4x']
        },
        {
            id: 'sdxl',
            name: 'Stable Diffusion XL',
            emoji: '🖼️',
            badge: 'free',
            badgeText: { es: 'Gratis', en: 'Free' },
            logo: 'stable',
            desc: {
                es: 'Modelo open source muy potente. Puedes ejecutarlo localmente o usar versiones online.',
                en: 'Very powerful open source model. You can run it locally or use online versions.'
            },
            tags: ['Open Source', 'Local', 'Flexible']
        }
    ]
};
