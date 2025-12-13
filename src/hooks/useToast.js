import { useEffect, useRef, useState } from 'react';

function useToastImpl(autoCloseMs = 2500) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('info');
  const [message, setMessage] = useState('');
  const timerRef = useRef(null);

  function showToast(nextType, nextMessage) {
    setType(nextType);
    setMessage(nextMessage);
    setOpen(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(false), autoCloseMs);
  }

  function hide() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(false);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const toast = { open, type, message };
  return { toast, showToast, hide };
}

export function useToast(autoCloseMs) {
  return useToastImpl(autoCloseMs);
}

export default useToastImpl;
