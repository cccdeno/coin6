# merkle tree

疑問： Block Header 裡存了些甚麼？

* https://ithelp.ithome.com.tw/articles/10215108

只安裝SPV Node，裏頭只有每個Block的Header(約80個Bytes)，一但有檢查交易紀錄是否存在於某個區塊中，就去訪問Full Node並且索取該區塊的Merkle Tree以供驗證，這個方法又稱之為Merkle Path Proof。

* https://countchu2.blogspot.com/2017/03/full-nodespv-nodetransaction.html

Full Node和SPV Node如何驗證Transaction？
對於Full Node和SPV Node如何驗證Transaction？在閱讀完以下論文、書籍、網上資料後，我把這個問題整理出來，希望能解釋清楚，讓大家了解：
Bitcoin: A Peer-to-Peer Electronic Cash System
Mastering Bitcoin
https://en.bitcoin.it/wiki/Thin_Client_Security

首先，我們要知道，Transaction的驗證，實際上有兩件事情要做。前篇文章有提：
Transaction存在性檢查 
Transaction無重花(重覆花費)檢查 
Full Node和SPV Node對這兩項檢查的策略不同，Full Node是走Height，SPV Node是走Depth。想必大家剛開始研究Bitcoin時，也常常搞不清楚什麼是Height，什麼是Depth？希望本文，對照下圖，能為大家撥雲見日：


PV Node - BDV (Block Depth Verification)

這種方法，在中本聰論文提到。SPV Node只有Block Header，為了檢查Transaction是否存在某個Block，就去問Full Node，它會回傳Merkle Path給SPV Node，SPV Node用它來驗證該Transaction是否存在Block，此驗證方稱之為Merkle Path Proof。
