type PasswordStrength = {
  score: number;
  label: string;
  bg: string;
  text: string;
};

type PasswordRequirement = {
  label: string;
  rule: boolean;
};

export function getPasswordRequirements(
  password: string
): PasswordRequirement[] {
  return [
    { label: 'At least 8 characters', rule: password.length >= 8 },
    {
      label: 'Upper and lowercase letters',
      rule: /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
    { label: 'At least one number', rule: /\d/.test(password) },
    { label: 'Special character (!@#$%)', rule: /[\W_]/.test(password) },
  ];
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { score: 0, label: '', bg: '', text: '' };
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const normalizedScore = Math.min(score, 3);

  if (normalizedScore <= 1) {
    return {
      score: normalizedScore,
      label: 'Weak password',
      bg: 'bg-red-500',
      text: 'text-red-500',
    };
  }

  if (normalizedScore === 2) {
    return {
      score: normalizedScore,
      label: 'Medium strength',
      bg: 'bg-yellow-400',
      text: 'text-yellow-400',
    };
  }

  return {
    score: normalizedScore,
    label: 'Strong password',
    bg: 'bg-green-500',
    text: 'text-green-500',
  };
}
