import Image from "next/image";
export default function Notes() {
  return (
    <div>
      <main className="mt-24">
        <section
          className="header relative items-center flex h-screen md:py-16 md:my-0 "
          style={{ maxHeight: "860px" }}
        >
          <div className="container mx-auto px-4 my-16 ">
            <div className="items-center flex flex-col md:flex-row-reverse">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto my-16 md:my-0">
                <div className="loader"></div>
                <div className="loader"></div>
                <div className="loader"></div>
              </div>
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <div className="pt-0 md:pt-32">
                  <h2 className="font-semibold text-4xl text-gray-700">
                    NOTES: Get Your Chores Done
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600">
                    ¡Crea, organiza y comparte tus notas fácilmente en nuestra
                    plataforma intuitiva! Ideal para escuela, trabajo y
                    proyectos personales. ¡Empieza a capturar tus ideas hoy!
                  </p>
                  <div className="mt-12">
                    <div className="flex flex-wrap">
                      <div className="w-6/12 md:w-5/12 p-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=" pb-20 py-10 relative bg-gray-200">
          <div className="justify-center text-center flex flex-wrap py-8">
            <div className="w-full md:w-6/12 px-12 md:px-4">
              <h2 className="font-semibold text-4xl">Why Use NOTES?</h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-600">
                Learn all the reasons why you should be using NOTES
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="items-center flex flex-col md:flex-row">
              <div className="w-full md:w-4/12 mr-auto px-4 md:pt-0 my-0">
                <Image
                  src="/cohete.png"
                  width={300}
                  height={300}
                  alt="cohete"
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-4">
                  <h3 className="text-3xl font-semibold">Notas Rápidas</h3>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600">
                    ¡Captura tus ideas rápidamente! Toma notas y organízalas en
                    cuestión de minutos, no horas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="items-center flex flex-col md:flex-row-reverse">
              <Image
                src="/productividad.png"
                width={300}
                height={300}
                alt="productividad"
              />
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-4">
                  <h3 className="text-3xl font-semibold">
                    Productividad Incrementada
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600">
                    ¡Con las tareas fuera del camino, ahora puedes enfocarte en
                    cosas importantes como el trabajo, la familia o simplemente
                    relajarte!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="relative bg-white pt-8 pb-6">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="mt-6">
                <a href="https://twitter.com/askfavr?lang=en" target="_blank">
                  <i className="fab fa-twitter bg-white text-blue-400 shadow-lg font-lg p-3 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 inline-block text-center"></i>
                </a>
                <a href="https://www.facebook.com/askfavr/" target="_blank">
                  <i className="fab fa-facebook-square bg-white text-blue-600 shadow-lg font-lg p-3 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 inline-block text-center"></i>
                </a>
                <a href="https://instagram.com/askfavr" target="_blank">
                  <i className="fab fa-instagram bg-white text-purple-600 shadow-lg font-lg p-3 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 inline-block text-center"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/askfavr/?viewAsMember=true"
                  target="_blank"
                >
                  <i className="fab fa-linkedin bg-white text-blue-700 shadow-lg font-lg p-3 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 inline-block text-center"></i>
                </a>
              </div>
              <div className="text-sm text-gray-600 font-semibold py-1">
                Copyright © 2024 NOTES
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
