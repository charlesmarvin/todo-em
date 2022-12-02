interface NullStateProps {
  children: React.ReactNode;
}

export default function NullState({ children }: NullStateProps) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-sm text-gray-700 text-center">{children}</div>
    </div>
  );
}
