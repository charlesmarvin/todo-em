interface NullStateProps {
  children: React.ReactNode;
}

export default function NullState({ children }: NullStateProps) {
  return (
    <div className="grid h-full content-center">
      <div className="text-sm text-gray-700 text-center">{children}</div>
    </div>
  );
}
