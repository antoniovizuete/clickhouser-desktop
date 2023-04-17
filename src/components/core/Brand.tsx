type Props = {
  className?: string;
  logo?: boolean;
};
export default function Brand({ className = "", logo = false }: Props) {
  return (
    <span
      className={`${className} font-semibold tracking-wide text-[#eca834] dark:text-primary drop-shadow-sm`}
    >
      C{!logo && "lick"}H{!logo && "ouse"}
      <span className="text-[#ff5050]">r</span>
    </span>
  );
}
