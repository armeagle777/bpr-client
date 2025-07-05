import { useEffect, useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import { checkMyIp, login, logOut } from "../api/personsApi";

const useAuthData = () => {
  const [checkErrors, setCheckErrors] = useState(false);
  // const [outerNetwork, setOuterNetwork] = useState(() => {
  //   return localStorage.getItem("serverSwitch") === "true";
  // });
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const signIn = useSignIn();
  const signOut = useSignOut();

  const serverSavedUrl = localStorage.getItem("serverUrl");

  useEffect(() => {
    setCheckErrors(false);
  }, [identifier, password]);

  const {
    data: serverUrl,
    isLoading: getServerUrlLoading,
    isError: getServerIsError,
    error: getServerUrlError,
  } = useQuery({
    queryKey: ["server-url"],
    queryFn: checkMyIp,
    enabled: !serverSavedUrl,
  });

  useEffect(() => {
    if (serverUrl && !serverSavedUrl) {
      localStorage.setItem("serverUrl", serverUrl);
    }
  }, [serverUrl, serverSavedUrl]);

  const redirectPath = location.state?.path || "/";

  const loginMutation = useMutation((credentials) => login(credentials), {
    onSuccess: (data) => {
      const { accessToken, refreshToken, userData } = data;

      setIdentifier("");
      setPassword("");
      signIn({
        auth: {
          token: accessToken,
          type: "Bearer",
        },
        refresh: refreshToken,
        userState: userData,
      });
      return navigate(redirectPath, { replace: true });
    },
    onError: (error, variables, context, mutation) => {},
  });

  const logoutMutation = useMutation((credentials) => logOut(), {
    onSuccess: (data) => {
      signOut();
      return navigate("/login", { replace: true });
    },
    onError: (error, variables, context, mutation) => {},
  });

  const { isLoading: isLogoutLoading } = logoutMutation;
  const { isLoading, error, isError } = loginMutation;

  const handleSubmit = async (e) => {
    setCheckErrors(true);
    e.preventDefault();
    loginMutation.mutate({ email: identifier, password });
  };

  const onLogout = async (e) => {
    logoutMutation.mutate();
  };

  // const switchServers = () => {
  //   const newValue = !outerNetwork;
  //   setOuterNetwork((oldNetwork) => !oldNetwork);
  //   localStorage.setItem("serverSwitch", newValue);
  // };

  return {
    error,
    isError,
    password,
    isLoading,
    identifier,
    setPassword,
    // switchServers,
    // outerNetwork,
    checkErrors,
    setIdentifier,
    onLogout,
    onSubmit: handleSubmit,
    getServerUrlLoading,
    getServerIsError,
    serverUrl: serverUrl || serverSavedUrl,
  };
};

export default useAuthData;
