type Props = {
  className?: string
};
export default function Brand({
  className = ""
}: Props) {
  return (
    <span className={`${className} font-semibold tracking-wide text-[#eca834] drop-shadow-sm`}>
      Clickhouse<span className="text-[#ff5050]">r</span>
    </span>
  );
}
