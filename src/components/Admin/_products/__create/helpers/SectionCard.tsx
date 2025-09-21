"use client";

type Props = {
  title: string;
  show: boolean;
  empty: React.ReactNode;
  children: React.ReactNode;
};

export default function SectionCard({ title, show, empty, children }: Props) {
  return (
    <section className="flex flex-col gap-6 bg-gray-50 rounded-2xl p-4">
      <h2 className="text-[16px] font-medium">{title}</h2>
      {show ? (
        <p className="text-center text-gray-500 pt-2 pb-4 animate-bounce">
          {empty}
        </p>
      ) : (
        children
      )}
    </section>
  );
}
