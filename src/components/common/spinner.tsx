export default function Spinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-16 w-16">
        <img
          src="/spinner-icon.png"
          alt="Loading"
          className="w-full h-full object-contain"
          onError={(e) => {
            // 이미지 로드 실패 시 기본 스피너로 대체
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling?.classList.remove("hidden");
          }}
        />
        <div className="hidden animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white"></div>
      </div>
    </div>
  );
}
