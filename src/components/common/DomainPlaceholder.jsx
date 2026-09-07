/**
 * 아직 화면을 채우지 않은 도메인 페이지용 빈 상태.
 * 탭 이동이 맞는지 확인하려고 도메인 이름만 보여 준다.
 */
export function DomainPlaceholder({ title, description }) {
  return (
    <section className="px-5 py-8">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </section>
  );
}
