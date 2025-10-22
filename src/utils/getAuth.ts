import { useNavigate } from "react-router";
import { Toast } from "../ui-kit";

export const useAuth = () => {
  const tempState = localStorage.getItem("gokka_login");
  const loginstate = tempState ? JSON.parse(tempState) : null;

  if (loginstate?.isLoggedIn) {
    return loginstate;
  } else {
    return {
      isLoggedIn: false,
      user: null,
      token: "",
      refresh: "",
    };
  }
};

export const useLogin = (): ((loginState: any) => void) => {
  const saveLogin = (loginState: any) => {
    localStorage.setItem("gokka_login", JSON.stringify(loginState));
  };
  return saveLogin;
};

export const useErrorHandler = () => {
  const navigate = useNavigate();
  // const parentPath = getParentPath();

  const handleErrorResponse = (
    res: any,
    customHeader?: string
  ) => {
    switch (res.status) {
      case 400:
        Toast("Gagal", "error", res.data.message);
        break;
      case 401:
        // *Logout case in useAxiosInterceptor.ts file
        // Uncomment the following code if refresh token API not available, also change the flow of axios.ts file (don't use axios interceptor yet)

        // Toast('Unauthorized', 'error', 'Please re-login and try again.');
        // localStorage.removeItem('aks_login')
        // navigate('/login')
        break;
      case 403:
        navigate("/");
        Toast("Akses Ditolak", "error", res.data.message);
        // localStorage.removeItem("aks_login");
        // setTimeout(() => {
        //   navigate("/login");
        // }, 100);
        break;
      case 404:
        Toast("Tidak Ditemukan", "error", res.data.message);
        // setTimeout(() => {
        //   navigate(parentRoute ? parentRoute : parentPath);
        // }, 100);
        break;
      case 413:
        Toast("Gagal", "error", "Data yang dikirim terlalu besar.");
        break;
      case 422:
        Toast(customHeader || "Terjadi Kesalahan!", "error", res.data.message);
        break;
      case 500:
        Toast("Terjadi Kesalahan!", "error", res.data.message);
        break;
      case 502:
        Toast("Terjadi Kesalahan!", "error", res.data.message);
        break;
    }
  };
  return handleErrorResponse;
};