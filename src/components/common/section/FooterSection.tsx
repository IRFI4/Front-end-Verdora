type Props = {
  title: string;
  children: React.ReactNode;
};

const FooterSection = ({ title, children }: Props) => {
  return (
    <div>
      <h3 className="mb-6 text-lg font-semibold">{title}</h3>

      <div className="space-y-4 text-sm">{children}</div>
    </div>
  );
};

export default FooterSection;
