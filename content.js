document.addEventListener("click", (event) => {
    const target = event.target;

    // 記事リンクをクリックした場合のみ処理
    if (target.tagName === "A" && target.classList.contains("js-keyboard-openable")) {
        const articleUrl = target.href; // 記事URLを取得

        // 以下のURL形式では通常のリンク動作にする
        if (
            /^https:\/\/b\.hatena\.ne\.jp\/entrylist\/[^\/]+\?page=\d+$/.test(articleUrl) ||
            /^https:\/\/b\.hatena\.ne\.jp\/hotentry\/[^\/]+\/\d{8}$/.test(articleUrl)
        ) {
            return; // 何もしない（通常のリンク動作）
        }

        event.preventDefault(); // デフォルトのクリック動作をキャンセル

        // ブコメページのURLを生成
        const commentsUrl = `https://b.hatena.ne.jp/entry/s/${new URL(articleUrl).hostname}${new URL(articleUrl).pathname}`;

        // 記事とコメントページを新しいタブで開くメッセージを送信
        chrome.runtime.sendMessage({
            action: "openTabs",
            urls: [articleUrl, commentsUrl],
        });
    }
});
