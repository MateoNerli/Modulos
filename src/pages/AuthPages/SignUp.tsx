import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../../components/form/Input";
import Label from "../../components/form/Label";
import Checkbox from "../../components/form/Checkbox";
import PageMeta from "../../components/common/PageMeta";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    usuario: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handler for input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    if (!isChecked) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.email ||
      !formData.usuario ||
      !formData.password
    ) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/Auth/register`,
        {
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          usuario: formData.usuario,
          password: formData.password,
        }
      );

      if (response.status === 200) {
        toast.success("Registro exitoso!", {
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } else {
        setError(
          response.data.message || "Error en el registro, intenta de nuevo."
        );
      }
    } catch (error: any) {
      console.error("Error en el registro:", error);
      if (error.response) {
        setError(
          error.response.data.message ||
            "Hubo un error en el registro. Intenta nuevamente."
        );
      } else if (error.request) {
        setError("No se pudo conectar con el servidor. Verifica tu conexión.");
      } else {
        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

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
            <div className="mb-6 text-center sm:mb-8">
              <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
                Registrarse
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Registrate para continuar
              </p>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <Label>
                        Nombre<span className="text-error-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Ingresa tu nombre"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <Label>
                        Apellido<span className="text-error-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
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
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Ingresa tu email"
                    />
                  </div>
                  <div>
                    <Label>
                      Usuario<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="usuario"
                      name="usuario"
                      value={formData.usuario}
                      onChange={handleInputChange}
                      placeholder="Ingresa tu usuario"
                    />
                  </div>
                  <div>
                    <Label>
                      Password<span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        placeholder="Ingresa tu password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
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
                        términos y condiciones
                      </span>
                      <span className="text-error-500">*</span>
                    </p>
                  </div>
                  {error && (
                    <div className="text-center text-red-500 text-sm mt-3">
                      {error}
                    </div>
                  )}
                  <div>
                    <button
                      type="submit"
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                      disabled={loading}
                    >
                      {loading ? "Registrando..." : "Registrarse"}
                    </button>
                  </div>
                </div>
              </form>
              <div className="mt-5">
                <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                  Ya tienes una cuenta ?{" "}
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
