// /logic/translate.js

export default {
    methods: {
      // Método para cambiar el idioma seleccionado
      changeLanguage(event) {
        // Establecer español por defecto si no se proporciona un idioma
        const selectedLanguage = event.target.value || 'es'; 
        // Configurar el nuevo idioma en vue-i18n     
        this.$i18n.locale = selectedLanguage;
      },
      // Otros métodos relacionados con la traducción pueden ir aquí
    },
  };
  