export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="px-4 py-2 bg-slate-400 text-white rounded" {...props}>
      {children}
    </button>
  );
}
