// components/Progress.tsx
import { FunctionalComponent } from "preact";

interface ProgressProps {
  className?: string;
  value?: number;
}

const Progress: FunctionalComponent<ProgressProps> = ({ className, value }) => {
  return (
    <div
      className={`relative h-1 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
    >
      <div
        className="h-full bg-gray-600 transition-all"
        style={{ width: `${value || 0}%` }}
      ></div>
    </div>
  );
};

export default Progress;