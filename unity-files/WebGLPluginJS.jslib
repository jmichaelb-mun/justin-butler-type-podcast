mergeInto(LibraryManager.library, {
  GameOver: function (score) {
    window.dispatchReactUnityEvent("GameOver", score);
  },
  SendType: function (type) {
    window.dispatchReactUnityEvent("SendType", UTF8ToString(type));
  },
  UpdateHealthScore: function (health, score) {
    window.dispatchReactUnityEvent("UpdateHealthScore", health, score);
  },
    GoNext: function (isFinished) {
    window.dispatchReactUnityEvent("GoNext", UTF8ToString(isFinished));
  },
});