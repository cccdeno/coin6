# coin6

1. 有同步問題：
  

$ ./run.sh start chaining
$ ./run.sh start mining

兩者同時執行時，會有同步問題，因為兩個都有一份 chain 資料(放在記憶體)，於是造成

chaining 一直把 mineId=0 寫進去，而 mining 一直把 minId++ 之後的結果寫進去。
chaining 的 mineId 一直沒有加，而 mining 的 size 也一直沒有加

解決辦法：不能用記憶體變數，改用 redis/sqlite 或直接讀檔寫檔。

https://www.sqlite.org/lockingv3.html

另一個辦法是，寫入讀取統一由某個 server/worker 程式來處理。

(注意，改寫成 class 並無法解決這個問題，因為資料還是有兩份)
(不過如果把 size 交給 chain 管，mineId 交給 miner 管，或許可行)


若用 localStorage 或許可行

* https://deno.com/blog/v1.10#support-for-web-storage-api

worker 

* https://stackoverflow.com/questions/67163326/deno-web-worker-api-sharedworker


看來得學會 worker 的用法

* [JavaScript 平行化使用 Web Worker、SharedArrayBuffer、Atomics](https://tigercosmos.xyz/post/2020/02/web/js-parallel-worker-sharedarraybuffer/)

問題： SharedArrayBuffer/Atomics 可以跨 process 嗎？

* [阮一峰 ECMAScript 6 (ES6) 标准入门教程 第三版 SharedArrayBuffer](https://es6.ruanyifeng.com/#docs/arraybuffer#SharedArrayBuffer)

Atomics对象提供了wait()和notify()两个方法用于等待通知