document.addEventListener("click", (event) => {
  const target = event.target;

  // 記事リンクをクリックした場合のみ処理
  if (target.tagName === "A" && target.classList.contains("js-keyboard-openable")) {
    event.preventDefault(); // デフォルトのクリック動作をキャンセル

    const articleUrl = target.href; // 記事URLを取得

    // ブコメページのURLを生成
    const commentsUrl = `https://b.hatena.ne.jp/entry/s/${new URL(articleUrl).hostname}${new URL(articleUrl).pathname}`;

    // 記事とコメントページを新しいタブで開くメッセージを送信
    chrome.runtime.sendMessage({
      action: "openTabs",
      urls: [articleUrl, commentsUrl],
    });
  }
});
