"use client";

type Props = {
  show: boolean;
  empty: React.ReactNode;
  children: React.ReactNode;
};

export default function SectionCard({ show, empty, children }: Props) {
  return (
    <section className="flex flex-col gap-6">
      {show ? (
        <p className="text-center text-gray-500 pt-2 mt-8 pb-4 animate-bounce">
          {empty}
        </p>
      ) : (
        children
      )}
    </section>
  );
}
