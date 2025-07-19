export default function TermsConditions({ isModalOpen, setIsModalOpen }) {
  return (
    <>
      <div className={`modalMiPerfil w-full h-full xl:p-10 z-100 top-0 left-0 absolute ${isModalOpen ? "modalPerfilOpen" : ""} transition-opacity duration-300 ease-in-out`}>
        <div className="miperfil bg-white shadow-xl roundex-2xl w-full h-full flex flex-col">
          <div className="header w-full border-b border-gray-200 flex justify-between items-center px-15 py-10">
            <div className="title">
              <h1 className="text-3xl font-semibold text-primary">Términos y Condiciones de Uso</h1>
            </div>
            <div className="close-btn">
              <button type="button" className="cursor-pointer" onClick={() => setIsModalOpen(false)}>
                <div className="icon cursor-pointer">
                  <svg className="size-10 fill-primary hover:fill-black ease-in-out duration-400" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                    <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="content w-full h-full flex flex-col items-start justify-start px-20 py-10 overflow-scroll hide-scrollbar">
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">1. Aceptación de los términos</h2>
              <p>
                Al acceder, o utilizar la aplicación Trivo, usted acepta cumplir y quedar legalmente vinculado por estos Términos y Condiciones de Uso. Si no está de acuerdo con alguna parte de estos
                términos, no debe utilizar la Aplicación.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">2. Descripción del servicio</h2>
              <p>
                Trivo es una plataforma digital que permite a los usuarios recibir recomendaciones personalizadas de otros usuarios, facilitando conexiones sociales, profesionales o de interés común.
                Algunas funcionalidades incluyen:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Visualización de usuarios recomendados.</li>
                <li>Actualización dinámica de contenido relevante.</li>
                <li>Registro y autenticación de usuarios.</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">3. Requisitos de registro</h2>
              <p>
                Para acceder a la mayoría de las funciones, el usuario debe registrarse y proporcionar información verídica y actualizada. Trivo se reserva el derecho de suspender o eliminar cuentas
                que infrinjan estos términos o presenten actividad sospechosa.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">4. Privacidad y seguridad</h2>
              <p>
                El tratamiento de sus datos personales se realiza de conformidad con la Política de Privacidad de Trivo. Utilizamos protocolos seguros de autenticación, incluyendo JWT y canales
                cifrados, para proteger su información.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">5. Uso aceptable</h2>
              <p>Al utilizar Trivo, usted se compromete a no:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Utilizar la plataforma para enviar contenido ofensivo, ilegal o engañoso.</li>
                <li>Suplantar a otra persona o entidad.</li>
                <li>Intentar vulnerar la seguridad del sistema o interceptar información.</li>
              </ul>
              <p className="mt-2">El uso indebido de la aplicación puede derivar en la suspensión inmediata de su cuenta.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">6. Comunicación en tiempo real</h2>
              <p>
                Algunas funcionalidades de la aplicación pueden requerir comunicaciones dinámicas para ofrecer una experiencia personalizada. Estas comunicaciones pueden depender de la estabilidad de
                su conexión y del estado del servidor.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">7. Propiedad intelectual</h2>
              <p>
                Todo el contenido de Trivo, incluyendo marca, logo, diseño y funcionalidades, pertenece a sus desarrolladores y está protegido por leyes de propiedad intelectual. Usted no puede
                reproducir, distribuir ni modificar ningún contenido sin autorización previa.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">8. Responsabilidad</h2>
              <p>Trivo no se hace responsable por:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>La veracidad de las recomendaciones recibidas.</li>
                <li>Interacciones fuera de la plataforma entre usuarios.</li>
                <li>Pérdidas de datos causadas por factores externos (fallos eléctricos, ataques cibernéticos, etc.).</li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">9. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los cambios serán notificados a través de la aplicación o del sitio web. El uso continuo después de dichas
                modificaciones constituye su aceptación.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">10. Terminación</h2>
              <p>Podemos suspender o cancelar su acceso a Trivo si incumple estos Términos o si detectamos uso indebido de la plataforma.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">11. Legislación aplicable</h2>
              <p>Estos Términos se rigen por las leyes de la República Dominicana, sin perjuicio de cualquier conflicto con otras jurisdicciones.</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
