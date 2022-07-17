import Login from "./src/components/Login";
import Signup from "./src/components/Signup";
import Logout from "./src/components/Logout";
import HomePage from "./src/components/Homepage";
import Header from "./src/components/Header";
import { Provider } from "react-redux";
import store, { Persistor } from "./src/redux/store";
import ProtectedRoutes from "./util/ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import PostComponent from "./src/components/PostComponent";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <Header />
        <div className="App mt-3 ">
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/post" element={<PostComponent />} />
              <Route exact path="/logout" element={<Logout />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
