# Ethereum如何對抗ASIC

* https://ithelp.ithome.com.tw/articles/10215123

挖礦的總出塊利潤是固定的，一有利潤就會有人想研製特別的硬體(ASIC)專門投入挖礦來取得比別人更大的優勢，為了對抗ASIC造成後續中心化與門檻提高的問題，Ethereum於是從挖礦的演算法著手，設計出不適合ASIC運算的演算法來抵抗威脅。

Dagger-Hashimoto演算法
Ethereum的挖礦演算法叫做Dagger-Hashimoto，簡稱為Ethash，是把Thaddeus Dryja發明的Hashimoto演算法加入Ethereum創始人Vitalik Buterin發明的Dagger演算法後融合而成，特色是挖礦的效率基本上和處理器效能無關，而跟記憶體的頻寬成正相關。

為什麼透過頻寬就可以對抗ASIC呢？因為ASIC的原理是透過處理器電路的設計與數目的堆疊來加大計算固定演算法的速度，因此設計的核心數目越多、製程越高階，處理速度就能夠輾壓家用的CPU與GPU，但同時在這種設計下的記憶體是共用的，也就是說即使計算能力得到了提升，記憶體的速度仍然留在原地。

如果設計出一種以頻寬(傳遞資料的速度，不懂的話可以看這裡)決定運算能力的算法，因為每塊記憶體的頻寬跟處理器的控制單元數目都是固定的，因此通常增加記憶體的數目只能加大記憶體的容量，並沒有辦法加大頻寬，有點像是一座小島上只有一個港口能靠岸(下圖)，這時候在島上加蓋新房子的確能夠增加容納的人數(記憶體大小)，但運輸的效能(運算能力)取決在港口數目而絲毫沒有改變。要同時移動更多人(增加運算能力)，增加房屋(記憶體數目或容量)是沒有用的，只能增加手上持有的小島(機器)數目，因此ASIC並沒有辦法佔到太多便宜。(但雙通道、四通道的技術就另當別論，而且雙通道或四通道並不適用在有向無環圖演算法)。

