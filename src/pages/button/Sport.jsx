import "./Sport.css";

function Sport() {
  return (
    <div class="radio-input">
      <input value="value-1" name="value-radio" id="value-1" type="radio" />
      <label for="value-1">축구</label>
      <input value="value-2" name="value-radio" id="value-2" type="radio" />
      <label for="value-2">풋살</label>
      <input value="value-3" name="value-radio" id="value-3" type="radio" />
      <label for="value-3">농구</label>
      <input value="value-4" name="value-radio" id="value-4" type="radio" />
      <label for="value-4">배드민턴</label>
    </div>
  );
}

export default Sport;
