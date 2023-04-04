import React from "react";

export const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-center text-white border-0">
        {/* <!-- Grid container --> */}
        <div className="container p-2 pb-0 ">
          {/* <!-- Section: Redes Sociales --> */}
          <section className="mb-2 ">
            {/* <!-- Twitter --> */}
            <a
              className="btn "
              href="https://twitter.com/SatunarioMiyazaki "
              role="button "
            >
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg "
                  className="icon icon-tabler icon-tabler-brand-twitter "
                  width="20 "
                  height="20 "
                  viewBox="0 0 24 24 "
                  strokeWidth="1.5 "
                  stroke="#FFF "
                  fill="none "
                  strokeLinecap="round "
                  strokeLinejoin="round "
                >
                  <path stroke="none " d="M0 0h24v24H0z " fill="none " />
                  <path
                    d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58
                                      -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z "
                  />
                </svg>
              </i>
            </a>
            {/* <!-- Instagram --> */}
            <a
              className="btn "
              href="https://www.instagram.com/santuarioMiyazaki/ "
              role="button "
            >
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg "
                  className="icon icon-tabler icon-tabler-brand-instagram "
                  width="20 "
                  height="20 "
                  viewBox="0 0 24 24 "
                  strokeWidth="1.5 "
                  stroke="#ffffff "
                  fill="none "
                  strokeLinecap="round "
                  strokeLinejoin="round "
                >
                  <path stroke="none " d="M0 0h24v24H0z " fill="none " />
                  <rect x="4 " y="4 " width="16 " height="16 " rx="4 " />
                  <circle cx="12 " cy="12 " r="3 " />
                  <line x1="16.5 " y1="7.5 " x2="16.5 " y2="7.501 " />
                </svg>
              </i>
            </a>
            {/* <!-- Facebook --> */}
            <a
              className="btn "
              href="https://www.facebook.com/santuarioMiyazaki "
              role="button "
            >
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg "
                  className="icon icon-tabler icon-tabler-brand-facebook "
                  width="20 "
                  height="20 "
                  viewBox="0 0 24 24 "
                  strokeWidth="1.5 "
                  stroke="#ffffff "
                  fill="none "
                  strokeLinecap="round "
                  strokeLinejoin="round "
                >
                  <path stroke="none " d="M0 0h24v24H0z " fill="none " />
                  <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3 " />
                </svg>
              </i>
            </a>
          </section>
        </div>
        <div className="text-center p-3 ">
          © 2023 Copyright:
          <a className="text-white " href="https://SatunarioMiyazaki.com/ ">
            Santuario Miyazaki
          </a>
        </div>
      </footer>
    </>
  );
};
