import Link from "next/link";

interface ButtonProps {
  src?: string; // ← make optional
  light?: boolean; // ← make optional
  children: React.ReactNode;
  onClick?: () => void;
  flex?: boolean;
}

const Button = ({ src, light, onClick, children, flex }: ButtonProps) => {
  const className = `px-10 py-3 text-center ${
    light
      ? "border-2 border-amber-200 text-amber-200 hover:text-amber-400 hover:border-amber-400"
      : "bg-amber-200 text-blue-950 hover:bg-amber-400"
  } ${flex ? "flex-1" : undefined} rounded-lg duration-300`;

  if (src) {
    return (
      <Link href={src} onClick={onClick} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
