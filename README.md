# tiny-tools
用node实现的简单的小工具

1.将png批量转换成base64编码

2.百度聚合点优化  

    （1）.将官方聚合代码每次循环操作一次DOM 元素提出去，处理完之后再统一操作DOM。这个大大降低处理时间。
    
    （2）.源代码中   _addToClosestCluster() ;方法中的 this._map.getDistance(center, position)；方法修改为直接 计算平面距离（后面会放代码）；

    （3）.经过以上两步处理之后，聚合效率已经大大提升；但是还有个问题是：初次聚合的时候，如果数据量大将会等待很久（实测11W数据会等待6s左右），这个时间都耗在     ：数据初始化时的  indexOf() 方法上。该方法是  一个一个判断 这些个点是否已经添加进待聚合点点中。
    (4) 动态设置网格大小 ： _gridSize 。根据地图层级设置网格大小，不仅会优化聚合处理效率，对展示也比较友好。
