import { useState } from "react";
import Input from "../../components/form/InputField";
import Label from "../../components/form/Label";
import { Link } from "react-router";
import Checkbox from "../../components/form/Checkbox";
import Button from "../../components/ui/button/Button";
import PageMeta from "../../components/common/PageMeta";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <PageMeta title="Ingresar" />
      <div className="relative flex w-full h-screen px-4 py-6 overflow-hidden bg-white z-1 dark:bg-gray-900 sm:p-0">
        <div className="flex flex-col flex-1 p-6 rounded-2xl sm:rounded-none sm:border-0 sm:p-8">
          <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div className="mb-6 text-center sm:mb-8">
              <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
                Ingresa
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ingresa a tu cuenta para continuar
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
                <div className="space-y-6">
                  <div>
                    <Label>
                      Email <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Input placeholder="info@gmail.com" />
                  </div>
                  <div>
                    <Label>
                      Password <span className="text-error-500">*</span>{" "}
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox checked={isChecked} onChange={setIsChecked} />
                      <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                        Recordame
                      </span>
                    </div>
                    <Link
                      to="/"
                      className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <div>
                    <Button className="w-full" size="sm">
                      Ingresar
                    </Button>
                  </div>
                </div>
              </form>

              <div className="mt-5">
                <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                  No tenes cuenta? {""}
                  <Link
                    to="/signup"
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Registrate
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative items-center justify-center flex-1 hidden p-8 z-1 bg-brand-950 dark:bg-white/5 lg:flex">
          <img
            src="/images/logo/LogoHuman.png"
            alt="Logo"
            width={200}
            height={40}
          />
        </div>
      </div>
    </>
  );
}
