import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Corrección aquí
import Input from "../../components/form/Input";
import Label from "../../components/form/Label";
import Checkbox from "../../components/form/Checkbox";
import Button from "../../components/ui/button/Button";
import PageMeta from "../../components/common/PageMeta";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Ingreso exitoso!", {
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      setError("Credenciales incorrectas o problema en el servidor.");
    } finally {
      setLoading(false);
    }
  };

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
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <Label>
                      Email <span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      placeholder="info@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>
                      Password <span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                      to="/forgot-password"
                      className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <div>
                    <Button
                      className="w-full"
                      size="sm"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Cargando..." : "Ingresar"}
                    </Button>
                  </div>
                </div>
              </form>

              {error && (
                <div className="mt-4 text-center text-red-600">
                  <p>{error}</p>
                </div>
              )}

              <div className="mt-5">
                <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                  No tenes cuenta?{" "}
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
