import { useEffect, useState } from "react";
import { AdminButton, InputField, Toast } from "../../ui-kit";
import "./Login.scss";
import Gokka from '../../assets/Logo/Gokka.svg';
import { login } from "../../services/login.services";
import { useAuth, useErrorHandler, useLogin } from "../../utils/getAuth";
import { useNavigate } from "react-router";
import { useLoader } from "../../utils/userLoader";

const Login = () => {
  const { showLoader, hideLoader } = useLoader();
  const { isLoggedIn } = useAuth();
  const saveLogin = useLogin();
  const currData = localStorage.getItem("gokka_login");
  const navigate = useNavigate();
  const handleErrorResponse = useErrorHandler();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // showLoader()
      const res = await login(username, password)
      if (res.status === 200) {
        const data: any = res.data.data;
        const tokens = res.data.tokens;
        const initialState: any = {
          isLoggedIn: true,
          user: data,
          token: tokens?.access.token || "",
          refresh: tokens?.refresh.token || "",
        };
        saveLogin(initialState);
        if (initialState.user?.is_pwd_resetted === false) {
          navigate("/admin/v1/change-password");
        } else {
          navigate("/admin/v1/dashboard");
          Toast("Sukses", "success", res.data.message);
        }
      } else handleErrorResponse(res);
    } finally {
      // hideLoader()
    }
  }

  const handleButtonDisabled = () => {
    if (username !== '' && password !== '') {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    if (currData) {
      if (JSON.parse(currData).user.is_pwd_resetted === true && isLoggedIn) {
        navigate("/");
      } 
    }
  }, [isLoggedIn, navigate, currData]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-64">
        <img src={Gokka} className="mb-4 mx-auto" />
        <form onSubmit={handleSubmit} >
          <div className="bg-white p-6 rounded-2xl flex flex-col gap-4">
            <InputField
              label="Username"
              placeholder="Username"
              type="text"
              value={username}
              onChange={(val) => setUsername(val as string)}
            />
            <InputField
              label="Password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(val) => setPassword(val as string)}
            />
            <AdminButton className="w-full" onClick={() => handleSubmit} disabled={handleButtonDisabled()}>
              Login
            </AdminButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
