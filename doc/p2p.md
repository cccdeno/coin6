# p2p

* https://github.com/lynn9388/p2p
    * In the P2P network, each node will choose some nodes as their neighbors.
* [tinyTorrent: 從頭寫一個 Deno 的 BitTorrent 下載器](https://www.gushiciku.cn/pl/peRE/zh-tw)
    * https://github.com/cj1128/tinyTorrent

Tracker
現在我們來看第二個問題，如何找到 Peer 以及如何讓 Peer 找到我們？

這裡的關鍵就是種子檔案中儲存的 announce 欄位，這個欄位是一個 URL，這個 URL 指向了一個 Tracker 伺服器。

Tracker 伺服器顧名思義，是一個追蹤者，或者說是中介。它本身不提供任何下載服務，它的作用是用來溝通 Peers。

每個 Peer 通過 PeerID 來標識自己，這是一個 20 位元組的資料，格式沒有要求。

我們可以通過請求 Tracker 獲取到當前資源有哪些 Peer，同時，我們可以向 Tracker 註冊自己成為一個 Peer。

Tracker 使用 HTTP 協議，請求時通過 Query 攜帶引數，下面是三個關鍵引數：

info_hash : 這個用來表明我們請求的資源是什麼，在 BT 下載中，對資源的唯一標識使用的是 InfoHash，也就是種子檔案中的 info 欄位的內容進行 SHA1 雜湊以後得到的結果，20 個位元組
peer_id : 我們自己生成的標識身份的一個 ID，20 個位元組
port : 我們客戶端的監聽埠，用於接受其他 Peer 發來的訊息
