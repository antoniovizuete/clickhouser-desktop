type Props = {
  text: string;
};

export default function SideBarEmptyState({ text }: Props) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 text-gray-500">
      <p>{text}</p>
    </div>
  );
}
