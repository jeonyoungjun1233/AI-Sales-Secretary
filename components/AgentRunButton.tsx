type AgentRunButtonProps = {
  loading: boolean;
  onClick: () => void;
};

export function AgentRunButton({ loading, onClick }: AgentRunButtonProps) {
  return (
    <button
      className="min-h-16 w-full rounded-[1.4rem] bg-emerald-500 px-5 py-4 text-lg font-black text-white shadow-xl shadow-emerald-200 transition active:scale-[0.99] disabled:opacity-60"
      disabled={loading}
      onClick={onClick}
      type="button"
    >
      {loading ? "오늘 할 일 준비 중" : "오늘 액션 만들기"}
    </button>
  );
}
