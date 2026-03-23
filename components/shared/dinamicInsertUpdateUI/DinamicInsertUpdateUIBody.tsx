"use client";

export function DinamicInsertUpdateBody({
  leftTitle,
  rightTitle,
  leftContent,
  rightContent,
}: {
  leftTitle: string;
  rightTitle: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}) {
  return (
    <div className="flex-1 overflow-y-auto lg:flex gap-6 max-h-full">
      {/* LEFT CONTENT */}
      <div className="lg:w-2/3 w-full rounded-2xl border border-neutral-200 flex flex-col min-h-0 mb-6 lg:mb-0">
        <div className="w-full h-fit p-4 shrink-0 border-b border-b-neutral-200">
          <p className="font-light text-lg">{leftTitle}</p>
        </div>
        <div className="overflow-y-auto flex-1 min-h-0 p-4">{leftContent}</div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="lg:w-1/3 lg:min-w-1/3 w-full flex flex-col justify-between rounded-2xl border border-neutral-200">
        <div className="w-full h-fit p-4 shrink-0 border-b border-b-neutral-200">
          <p className="font-light text-lg">{rightTitle}</p>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-4 px-4 pt-4 relative">
          {rightContent}
        </div>
      </div>
    </div>
  );
}
