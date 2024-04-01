import "./Matching.css";
function Matching() {
  return (
    <button className="match" type="button" disabled="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 100 101"
        class="inline w-4 h-4 mr-3 text-white animate-bounce"
        role="status"
        aria-hidden="true"
      >
        <circle fill="#34D399" r="45" cy="50" cx="50"></circle>
      </svg>
      매칭중...
    </button>
  );
}
export default Matching;
