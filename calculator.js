import { createApp } from "vue";

createApp({
  data() {
    return {
      resultDisplay: 0,
      operation: [],
    };
  },
  created() {
    let _app = this;
    _app.InitData();
  },
  computed: {
    LastIndexIsNotOperatorAndDot() {
      let _app = this;
      let latestRes = _app.operation[_app.operation.length - 1];
      if (latestRes != "+" && latestRes != "-" && latestRes != "/" && latestRes != "*" && latestRes != "%" && latestRes != ".") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    InitData() {
      let _app = this;
      toastr.info("Welcome!");
    },
    Reset() {
      let _app = this;
      _app.resultDisplay = 0;
      _app.operation = [];
    },
    Delete() {
      let _app = this;
      _app.operation.pop();

      if (_app.operation.length >= 1) {
        _app.resultDisplay = _app.operation.join("");
      } else {
        _app.resultDisplay = 0;
      }
    },
    ClearCurrentDisplay() {
      let _app = this;
      _app.resultDisplay = 0;
    },
    GetResultDisplay(param) {
      let _app = this;
      if (_app.IsOperatorOrDot(param)) {
        if (_app.operation.length != 0) {
          if (_app.LastIndexIsNotOperatorAndDot) {
            _app.operation.push(param);
          }
        }
      } else {
        _app.operation.push(param);
      }

      _app.RemoveInvalidDisplay();
    },
    GetTotal() {
      let _app = this;

      if (_app.LastIndexIsNotOperatorAndDot && _app.operation.length != 0) {
        _app.resultDisplay = eval(_app.operation.join(""));
        _app.operation = [];
        _app.operation.push(_app.resultDisplay);
      }
    },
    ChangeSign() {
      let _app = this;

      if (_app.LastIndexIsNotOperatorAndDot && _app.operation.length != 0) {
        if (_app.operation[0] != 0) {
          if (_app.operation[0].toString().charAt(0) != "-") {
            _app.operation[0] = "-" + _app.operation[0];
          } else {
            _app.operation[0] = _app.operation[0].toString().replace("-", "");
          }
        }
        _app.resultDisplay = _app.operation.join("");
      }
    },
    IsOperatorOrDot(param) {
      if (param == "+" || param == "-" || param == "*" || param == "/" || param == "%" || param == ".") {
        return true;
      } else {
        return false;
      }
    },
    RemoveInvalidDisplay() {
      let _app = this;
      if (_app.operation[0] == 0) {
        _app.operation.shift();
        _app.resultDisplay = 0;
      } else if (_app.operation.length == 0) {
        _app.resultDisplay = 0;
      } else {
        _app.resultDisplay = _app.operation.join("");
      }
    },
  },
}).mount("#calculatorApp");
