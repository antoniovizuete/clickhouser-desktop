type EditorLabelProps = {
  label: string;
};

export default function EditorLabel({ label }: EditorLabelProps) {
  return (
    <div className="py-1 px-3 text-xs cursor-default dark:text-white/50 dark:bg-[rgb(30,30,30)]">
      {label}
    </div>
  );
}
