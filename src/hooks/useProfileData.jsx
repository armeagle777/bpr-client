import { useMutation } from "@tanstack/react-query";

import { changePassword } from "../api/personsApi";
import { toast } from "react-toastify";
import { useState } from "react";

const useProfileData = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [approvedPassword, setApprovedPassword] = useState("");

  const resetPasswordFields = () => {
    setPassword("");
    setNewPassword("");
    setApprovedPassword("");
  };

  const canSubmit =
    !!password &&
    !!newPassword &&
    !!approvedPassword &&
    newPassword === approvedPassword;

  const changePwdMutation = useMutation(
    ({ id, data }) => changePassword({ id, data }),
    {
      onSuccess: (data) => {
        // queryClient.invalidateQueries("users");
        resetPasswordFields();
        toast.success("Հաջողությամբ խմբագրվել է", {
          progress: undefined,
        });
      },
      onError: (error, variables, context, mutation) => {
        toast.error(error.response?.data?.message || error.message, {
          progress: undefined,
        });
      },
    }
  );

  const onChangePwdSubmit = (id) => {
    if (newPassword !== approvedPassword) return;
    changePwdMutation.mutate({ id, data: { password, newPassword } });
  };

  return {
    password,
    canSubmit,
    setPassword,
    changePwdLoading: changePwdMutation.isLoading,
    newPassword,
    setNewPassword,
    approvedPassword,
    onChangePwdSubmit,
    resetPasswordFields,
    setApprovedPassword,
  };
};

export default useProfileData;
