WAND

包管理器



包注册中心（register）

本地工作环境（Workplace）

​	$HOME/.wand/

​							/bin 

​                           /package

​									github.com/mojo-lang/lang@

项目工作环境（Project）

​	vendor

```
wand install
wand compile --markdown --go --protobuf --openapi --java
```





1. 创建一个包

   ```
   wand init mojo.lang
   ```

2. 编辑mojo文件

3. 编辑包说明文件

   ```
   
   ```

4. 提交至github或者git库，自动ci运行生成相应的构建 wand.pkg.pbf， go，protobuf，markdown，openapi，java



1. ncraft-go
2. ncraft-java

2. ncraft service (go / java)

   ```
   ncraft.yaml // 服务配置文件
   ncraft.lock
   ```

   

   ```
   1. ncraft create --go package
   2. ncraft update
   3. ncraft test
   4. ncraft publish --document --service
   ```



Document:

1. Struct / Schema

   ```
   https://api.newayz.com/document/v1/shecmas/pakage/to/type.html
   ```

   ```
   https://api.newayz.com/document/v1/shecmas/pakage/to/type.md
   ```

   

2. API Service

   ```
   https://api.newayz.com/document/v1/apis/pakage/to/api.md
   ```



