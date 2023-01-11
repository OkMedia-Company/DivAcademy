import { Outlet ,Navigate} from "react-router-dom";

const PrivateRoutes = () => {
  let auth =  localStorage.getItem("status");
  
  return auth ? <Outlet/> : <Navigate to="/login"   replace/>;
};

export default PrivateRoutes;