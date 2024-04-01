import "./Time.css";

function Time() {
  return (
    <div class="card-conteiner">
      <div class="card-content">
        <div class="card-title">
          <span>시간 설정</span>
        </div>
        <div class="values">
          <div>
            <span id="first">16:00</span>
          </div>
          {""}-
          <div>
            <span id="second">20:00</span>
          </div>
        </div>
        <small class="current-range">
          시간범위:
          <div>
            <span id="third"> 4시간 </span>
          </div>
        </small>
        <div
          data-range="#third"
          data-value-1="#second"
          data-value-0="#first"
          class="slider"
        >
          <label class="label-min-value">16:00</label>
          <label class="label-max-value">24:00</label>
        </div>
        <div class="rangeslider">
          <input
            class="min input-ranges"
            name="range_1"
            type="range"
            min="1"
            max="10000"
            value="0"
          />
          <input
            class="max input-ranges"
            name="range_1"
            type="range"
            min="1"
            max="10000"
            value="5000"
          />
        </div>
      </div>
    </div>
  );
}

export default Time;
