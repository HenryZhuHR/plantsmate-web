

导出 `.svg` 文件后


在 `<svg>` 的根节点添加
```svg
<MetaInfo xmlns="http://www.prognoz.ru"><Geo>
  <GeoItem X="-595.30" Y="-142.88" Latitude="37.375593" Longitude="-121.977795"/>
  <GeoItem X="1388.66" Y=" 622.34" Latitude="37.369930" Longitude="-121.959404"/>
</Geo></MetaInfo>
```

```svg
<MetaInfo xmlns="http://www.prognoz.ru">
    <Geo>
        <GeoItem 
                X="{{svg图片边界的X坐标（小）}}" Y="{{svg图片边界的Y坐标（小）}}" 
                Latitude="{{geojson边界的伟度坐标（高）}}" Longitude="{{geojson边界的经度坐标（左）}}"
        />
        <GeoItem 
                X="{{svg图片边界的X坐标（大）}}" Y="{{svg图片边界的Y坐标（大）}}" 
                Latitude="{{geojson边界的伟度坐标（低）}}" Longitude="{{geojson边界的经度坐标（右）}}"
        />
    </Geo>
</MetaInfo>
```

```sh
$ npm install -g svg2geojson
$ svg2geojson file.svg          # Writes file.geojson
$ svg2geojson file.svg --layers # Writes file.geojson, file-layer1Name.geojson, …
# See svg2geojson --help for more parameters
```


参考： 
- [echarts自定义地图（想怎么画就怎么画）](https://blog.csdn.net/bs__q/article/details/80074771)

https://echarts.apache.org/examples/data/asset/data/disk.tree.json


[基于Echarts的超高自定义地图（设计稿转地图）](https://www.jianshu.com/p/99e1ab4521fd)

参考 https://echarts.apache.org/examples/zh/editor.html?c=geo-beef-cuts

svg 交互与 echarts 嵌入 https://juejin.cn/post/7009889635618799630