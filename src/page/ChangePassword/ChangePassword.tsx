import { useEffect, useState } from "react";
import { AdminButton, InputField, Toast } from "../../ui-kit";
import "./ChangePassword.scss";
import Gokka from '../../assets/Logo/Gokka.png';
import { changePassword } from "../../services/login.services";
import { useAuth, useErrorHandler } from "../../utils/getAuth";
import { useNavigate } from "react-router";
import { useLoader } from "../../utils/userLoader";

const ChangePassword = () => {
  const { showLoader, hideLoader } = useLoader();
  const { isLoggedIn } = useAuth();
  // const saveLogin = useLogin();
  const currData = localStorage.getItem("gokka_login");
  const navigate = useNavigate();
  const handleErrorResponse = useErrorHandler();

  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      showLoader();
      const res = await changePassword(oldPassword, newPassword)
      if (res.status === 200) {
        // const data: any = res.data.data;
        // const tokens = res.data.tokens;
        // const initialState: any = {
        //   isLoggedIn: true,
        //   user: data,
        //   token: tokens?.access.token || "",
        //   refresh: tokens?.refresh.token || "",
        // };
        Toast("Sukses", "success", res.data.message);
        navigate("/admin/v1/dashboard")
      } else handleErrorResponse(res);
    } finally {
      hideLoader()
    }
  }

  const handleButtonDisabled = () => {
    if (oldPassword !== '' && newPassword !== '') {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    if (currData) {
      if (JSON.parse(currData).user.is_pwd_resetted === true && isLoggedIn) {
        navigate("/admin/v1/dashboard");
      } 
    }
  }, [currData]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-64">
        <img src={Gokka} className="mb-4 mx-auto" />
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-6 rounded-2xl gap-6 flex flex-col gap-4">
            <InputField
              label="Password Lama"
              placeholder="Password Lama"
              type="password"
              value={oldPassword}
              onChange={(val) => setOldPassword(val as string)}
            />
            <InputField
              label="Password Baru"
              placeholder="Password Baru"
              type="password"
              value={newPassword}
              onChange={(val) => setNewPassword(val as string)}
            />
            <AdminButton disabled={handleButtonDisabled()}>
              Login
            </AdminButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
