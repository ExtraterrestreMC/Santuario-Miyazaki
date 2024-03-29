import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
export const FormularioContactanos = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault(form.current);

    emailjs
      .sendForm(
        "service_zeb9n8o",
        "template_hlxw3tb",
        form.current,
        "uaeG-gi99GPFVqx0i"
      )
      .then(
        (result) => {
          toast.success("Se a enviado correacmente");
        },
        (error) => {
          toast.console.error();
          ("No se a podido enviar, intentelo mas tarde");
        }
      );
  };

  return (
    <section id="ContenidorForm" className="mb-2 text-white">
      <h2 className="h1-responsive font-weight-bold text-center my-4">
        Contactanos
      </h2>
      <p className="text-center w-responsive mx-auto mb-5">
        ¿Tiene usted alguna pregunta? Por favor, no dude en contactarnos
        directamente. Nuestro equipo se comunicará contigo en cuestión de horas
        para ayudarte.
      </p>
      <div className="row">
        <form ref={form} onSubmit={sendEmail}>
          <div className="row">
            <div className="col-md-6">
              <div className="md-form mb-0">
                <label>Name</label>
                <input
                  tabIndex={0}
                  type="text"
                  name="user_name"
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="md-form mb-0">
                <label>Email</label>
                <input
                  tabIndex={1}
                  type="email"
                  name="user_email"
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="md-form">
                <label>Message</label>
                <textarea
                  tabIndex={2}
                  name="message"
                  rows="2"
                  className="form-control md-textarea"
                />
              </div>
            </div>
            <div className="text-center text-md-left mt-5">
              <input
                type="submit"
                value="Enviar"
                className="btn btn-primary"
                id="btnContacanos"
              />
            </div>
          </div>
        </form>
      </div>
      <Toaster></Toaster>
    </section>
  );
};

export default FormularioContactanos;
