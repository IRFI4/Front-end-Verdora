import {
  getPasswordStrength,
  getPasswordRequirements,
} from '@/utils/passwordStrength';

const PasswordStrength = ({ password }: { password: string }) => {
  const passwordStrength = getPasswordStrength(password);
  const displayScore = Math.max(passwordStrength.score, 1);
  const requirements = getPasswordRequirements(password);

  return (
    <>
      {password && (
        <div className="grid gap-1 my-3">
          <div className="flex gap-3">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className={`h-4 flex-1 rounded-full transition-all duration-300 
                    ${
                      displayScore >= i
                        ? `${passwordStrength.bg}`
                        : 'bg-gray-200'
                    }`}
              />
            ))}
          </div>
          {passwordStrength.label && (
            <p className={`text-xs ${passwordStrength.text} font-medium`}>
              {passwordStrength.label}
            </p>
          )}
          <ul className="list-disc list-inside pl-2">
            {requirements.map(req => (
              <li
                key={req.label}
                className={`list-item text-xs transition-colors font-medium ${
                  req.rule ? `text-green-500` : 'text-zinc-400'
                }`}
              >
                {req.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default PasswordStrength;
