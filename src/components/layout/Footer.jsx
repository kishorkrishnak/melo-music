import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { footerLinks } from "../../utils";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";

const Footer = () => {
  return (
    <footer className="mp-20 text-black ">
      <div className="overflow-x-hidden -mb-0.5"></div>

      <div className="bg-white dark:bg-[#151515] ">
        <div className="container pt-20 pb-10 mx-auto flex justify-between flex-col lg:flex-row pr-10">
          <div className="w-fit flex gap-20 justify-start -mb-10 -px-4">
            {footerLinks.map(({ id, title, links }) => (
              <div className="w-auto px-4 " key={id + title}>
                <h2 className="font-medium text-black dark:text-white tracking-widest text-sm mb-3">
                  {title}
                </h2>

                <div className="mb-10 flex flex-col gap-3 ">
                  {links.map((link, index) => (
                    <Link
                      key={link + index}
                      to="/"
                      className="text-black dark:text-gray-300 text-sm hover:text-white "
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <span className="mt-4 lg:mt-0 flex h-fit justify-center">
            <a
              href="https://github.com/kishorkrishnak"
              className="bg-[#263238] p-2.5 rounded-full h-fit text-white text-xl  hover:scale-125 ease-in-out duration-300"
            >
              <FaFacebookF size={17} />
            </a>
            <a
              href="https://github.com/kishorkrishnak"
              className="bg-[#263238] p-2.5 ml-3 rounded-full h-fit text-white text-xl  hover:scale-125 ease-in-out duration-300"
            >
              <FaTwitter size={17} />
            </a>
            <a
              href="https://github.com/kishorkrishnak"
              className="bg-[#263238] p-2.5 ml-3 rounded-full  h-fit text-white text-xl  hover:scale-125 ease-in-out duration-300"
            >
              <FiInstagram size={17} />
            </a>

            <a
              href="https://github.com/kishorkrishnak"
              className="bg-[#263238] p-2.5 ml-3 rounded-full h-fit text-white text-xl  hover:scale-125 ease-in-out duration-300"
            >
              <FaLinkedinIn size={17} />
            </a>
          </span>
        </div>

        <div className="border-b border-[#2A2A2A]">
          <p className="container px-5 mx-auto text-black dark:text-white mt-2">
            Subscribe to our Newsletter
          </p>

          <div className="container mx-auto px-5 pt-1 pb-8 flex flex-wrap items-center justify-between ">
            <div className="w-full md:w-2/4 lg:w-1/3 h-16 flex items-center justify-center md:justify-start ">
              <TextInput
                styles="w-full flex-grow md:w-40 2xl:w-64 bg-gray-100 sm:mr-4 md-2"
                type="email"
                placeholder="Email Address"
              />

              <CustomButton
                title="Subscribe"
                containerStyles={
                  "block bg-[#263238] text-white px-5 py-2.5 text-md rounded hover:bg-[#212121] focus:potline-none flex-col items-center mt-2"
                }
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#151515]">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-black dark:text-gray-300 text-sm text-center sm:text-left">
              © 2023 Melomuse
            </p>

            <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-black dark:text-gray-300 text-sm">
              Designed by{" "}
              <a
                href="https://github.com/kishorkrishnak"
                className="text-[#1199e7] ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kishor Krishna ❤️
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
