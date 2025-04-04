document.addEventListener('DOMContentLoaded', () => {
    // Determinar qué formulario está presente
    if (document.getElementById('cvBasicForm')) {
      document.getElementById('cvBasicForm').addEventListener('submit', handleBasicCV);
    } else if (document.getElementById('cvIntermediateForm')) {
      document.getElementById('cvIntermediateForm').addEventListener('submit', handleIntermediateCV);
    } else if (document.getElementById('cvAdvancedForm')) {
      document.getElementById('cvAdvancedForm').addEventListener('submit', handleAdvancedCV);
    }
  
    // Función para el CV Básico
    function handleBasicCV(event) {
      event.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const apellido = document.getElementById('apellido').value.trim();
      const telefono = document.getElementById('telefono').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const ciudad = document.getElementById('ciudad').value.trim();
      const pais = document.getElementById('pais').value.trim();
      const perfil = document.getElementById('perfil').value.trim();
      const formacion = document.getElementById('formacion').value.trim();
      const experiencia = document.getElementById('experiencia').value.trim();
      const habilidades = document.getElementById('habilidades').value.trim();
  
      // Combina nombre y apellido
      const fullName = `Mi nombre es ${nombre} ${apellido}.`;
      // Combina teléfono y correo
      const contacto = `Contacto: Tel. ${telefono} - Correo: ${correo}.`;
      // Combina ubicación (si se proporcionan)
      const ubicacion = (ciudad || pais) ? `Ubicación: ${ciudad}${ciudad && pais ? ', ' : ''}${pais}.` : '';
      // Consolidación final para CV Básico
      const resumenCV = `${fullName} ${contacto} ${ubicacion} Perfil: ${perfil} Formación: ${formacion} Experiencia: ${experiencia} Habilidades: ${habilidades}`;
      
      console.log("CV Básico:", resumenCV);
      alert("CV Básico guardado:\n" + resumenCV);
      event.target.reset();
    }
  
    // Función para el CV Intermedio
    function handleIntermediateCV(event) {
      event.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const apellido = document.getElementById('apellido').value.trim();
      const telefono = document.getElementById('telefono').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const perfilProfesional = document.getElementById('perfilProfesional').value.trim();
      const formacion = document.getElementById('formacion').value.trim();
      const experiencia = document.getElementById('experiencia').value.trim();
      const habilidades = document.getElementById('habilidades').value.trim();
      const idiomas = document.getElementById('idiomas').value.trim();
      const certificaciones = document.getElementById('certificaciones').value.trim();
      const proyectos = document.getElementById('proyectos').value.trim();
  
      const fullName = `Mi nombre es ${nombre} ${apellido}.`;
      const contacto = `Contacto: Tel. ${telefono} - Correo: ${correo}.`;
      const resumenCV = `${fullName} ${contacto} Perfil Profesional: ${perfilProfesional} Formación: ${formacion} Experiencia: ${experiencia} Habilidades: ${habilidades} Idiomas: ${idiomas} Certificaciones: ${certificaciones} Proyectos: ${proyectos}`;
      
      console.log("CV Intermedio:", resumenCV);
      alert("CV Intermedio guardado:\n" + resumenCV);
      event.target.reset();
    }
  
    // Función para el CV Avanzado
    function handleAdvancedCV(event) {
      event.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const apellido = document.getElementById('apellido').value.trim();
      const tituloProfesional = document.getElementById('tituloProfesional').value.trim();
      const telefono = document.getElementById('telefono').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const linkedin = document.getElementById('linkedin').value.trim();
      const portafolio = document.getElementById('portafolio').value.trim();
      const resumen = document.getElementById('resumen').value.trim();
      const experiencia = document.getElementById('experiencia').value.trim();
      const formacion = document.getElementById('formacion').value.trim();
      const habilidades = document.getElementById('habilidades').value.trim();
      const idiomas = document.getElementById('idiomas').value.trim();
      const publicaciones = document.getElementById('publicaciones').value.trim();
      const portafolioAdicional = document.getElementById('portafolioAdicional').value.trim();
  
      const fullNameTitle = `Soy ${nombre} ${apellido}, ${tituloProfesional}.`;
      const contacto = `Contacto: Tel. ${telefono} - Correo: ${correo} - LinkedIn: ${linkedin} - Portafolio: ${portafolio}.`;
      const resumenCV = `${fullNameTitle} ${contacto} Resumen: ${resumen} Experiencia: ${experiencia} Formación: ${formacion} Habilidades: ${habilidades} Idiomas: ${idiomas} Publicaciones: ${publicaciones} Enlaces: ${portafolioAdicional}`;
      
      console.log("CV Avanzado:", resumenCV);
      alert("CV Avanzado guardado:\n" + resumenCV);
      event.target.reset();
    }
  });
  