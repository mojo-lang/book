在`Protobuf`中支持对数组以及Map序列化时采用压缩编码方式，但是在接口的使用中，采用正常的类型。

1. Run Length Encoding

   适用场景：重复数据

2. Delta Encoding

   适用场景：有序数据集，例如 timestamp，自动生成的 ID，以及监控的各种 metrics

3. Dictionary Encoding

   适用场景：小规模的数据集合，例如 IP 地址

   对于`Array<T>`类型数据，encoding后会增加两个Field，一个`keys`以及一个`encoded_{field}`

   对于`Dictionary<K, V>`类型数据，encoding后会增加三个Field，一个`keys`，一个`values`，以及一个 `encoded_{field}`

4. Prefix Encoding（暂不支持）

5. Delta Encoding for strings （暂不支持）

```
type DictionaryOptions

type RunLengthOptions

type DeltaOptions

attribute encoding(DictionaryOptions | RunLengthOptions | DeltaOptions)
```



