import { useState, useCallback } from 'react';
import { useAppSelector } from '@api/hooks';
import type { AuthPromptAction } from '@components/common/dialog/LoginPromptDialog';

type PromptOptions = {
  action?: AuthPromptAction;
  title?: string;
  description?: string;
};

export const useAuthPrompt = () => {
  const { user } = useAppSelector(state => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<PromptOptions>({ action: 'favorite' });

  const requireAuth = useCallback(
    (callback?: () => void, opts: PromptOptions = { action: 'favorite' }) => {
      if (!user) {
        setOptions(opts);
        setIsOpen(true);
        return false;
      }
      callback?.();
      return true;
    },
    [user]
  );

  return {
    user,
    isAuthenticated: Boolean(user),
    isOpen,
    setIsOpen,
    promptAction: options.action,
    promptTitle: options.title,
    promptDescription: options.description,
    requireAuth,
  };
};

export default useAuthPrompt;
