import { useState } from "react";
import { Link } from "react-router";
import Input from "../../components/form/Input";
import Label from "../../components/form/Label";
import Checkbox from "../../components/form/Checkbox";
import PageMeta from "../../components/common/PageMeta";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <PageMeta title="Register" />
      <div className="relative flex w-full h-screen overflow-hidden bg-white z-1 dark:bg-gray-900">
        <div className="relative items-center justify-center flex-1 hidden p-8 z-1 bg-brand-950 dark:bg-white/5 lg:flex">
          <img
            src="/images/logo/LogoHuman.png"
            alt="Logo"
            width={200}
            height={40}
          />
        </div>
        <div className="flex flex-col flex-1 p-6 rounded-2xl sm:rounded-none sm:border-0 sm:p-8">
          <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
                Registrarse
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ingresa tu email y password{" "}
              </p>
            </div>
            <div>
              <button className="flex items-center justify-center w-full gap-3 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-white/90 dark:hover:bg-gray-700">
                <FaGoogle className="text-xl" />
                Ingresa con Google
              </button>
              <div className="relative py-3 sm:py-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                    Or
                  </span>
                </div>
              </div>
              <form>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <Label>
                        Nombre<span className="text-error-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="fname"
                        name="fname"
                        placeholder="Ingresa tu nombre"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <Label>
                        Apellido<span className="text-error-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="lname"
                        name="lname"
                        placeholder="Ingresa tu apellido"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>
                      Email<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label>
                      Password<span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        placeholder="ingresa tu password"
                        type={showPassword ? "text" : "password"}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <FaEye className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <FaEyeSlash className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      className="w-5 h-5"
                      checked={isChecked}
                      onChange={setIsChecked}
                    />
                    <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                      Estoy de acuerdo con los{" "}
                      <span className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                        terminos y condiciones
                      </span>
                      <span className="text-error-500">*</span>
                    </p>
                  </div>
                  <div>
                    <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                      Registrarse
                    </button>
                  </div>
                </div>
              </form>
              <div className="mt-5">
                <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                  Ya tenes una cuenta ?{" "}
                  <Link
                    to="/signin"
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Ingresa
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
