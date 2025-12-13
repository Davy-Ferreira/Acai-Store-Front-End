import { useState } from 'react';
import useToast from './useToast';
import { validateEmail, validatePassword, validateConfirmPassword } from '../utils/validators/authValidators';

export default function useRegisterForm() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassPassword, setShowPassPassword] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  function submit() {
    const emailRes = validateEmail(email);
    const passRes = validatePassword(password);
    const confirmRes = validateConfirmPassword(password, confirmPassword);

    const nextErrors = {};
    if (!emailRes.valid) nextErrors.email = emailRes.error;
    if (!passRes.valid) nextErrors.password = passRes.error;
    if (!confirmRes.valid) nextErrors.confirmPassword = confirmRes.error;
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      toast.show('success', 'Conta criada com sucesso');
    } else {
      toast.show('error', 'Corrija os campos para prosseguir');
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassPassword,
    setShowPassPassword,
    showPassConfirm,
    setShowPassConfirm,
    errors,
    submit,
    toast,
  };
}
