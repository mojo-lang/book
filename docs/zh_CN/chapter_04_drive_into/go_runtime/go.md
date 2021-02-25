# Mapping between Mojo and Go



go的转换分成两部分，一部分转换成protobuf之后，通过gogoproto生成的golang源文件，支持protobuf的codec；另外一部分直接从mojo生成常用的辅助函数。



辅助函数一帮情况下有：

1. union类型的struct以及字段的new、创建以及操作相关的接口
   1. 如果union的object中间有相同的字段，增加这些字段的操作接口（get/set）
2. union类型对json的转换插件（基于jsonitor）
3. union类型对yaml的转换插件（TODO）
4. 其他类型的处理
   1. enum类型