# MOJO与Protobuf以及Go相关的Mapping



如何让Protobuf支持Union类型

## 何为Union类型

## 为什么需要UNION类型

## UNION和oneof的差异

protobuf的oneof只是值的oneof，而并非传统类型系统的Union，

```protobuf
message MsgWithOneof {
    oneof union {
      string title = 1;
      int64 salary = 2;
      string Country = 3;
      string home_address = 4;
    }
}
```

## 在不改变现有protobuf工具的情况下如何实现

## 我们如何实现



Union 类别



某个类型为 Union的一个Alias

```json
{
	"type": "Cat",
	"name": "my cat"
}
```



```go
func NewId(str string) *Id {}

func SetIdString()
```

```go
type IdCodec struct {
}

func (i *IdCodec) Encode() {}
func (i *IdCodec) Decode() {}
```



1. 某个struct的字段为一个匿名的Union

```
type Decl {
	name: String @1
	document : String @2 | Document @3
}
```



```
message Decl {
		string name = 1;
		oneof document {
			string   string_document = 2;
			Document object_document = 3; //  只有一个类型情况下，且小写后与oneof重名，则改用object
		}
}
```



独立一个Union Message

```protobuf
message MsgWithOneof {
   option (mojo.union) = true;
   option (gogoproto.onlyone) = true;
   
   string string_value = 1;
   int64 	 int_value = 2;
}
```

```

Array<Array<Test>>


message TestArray {
  option (mojo.array) = true;
  option (mojo.json_unwrap) = false;
  
  repeated Test tests = 1;
}

repeated Tests tests = 2;

message TestDictionary {
  option (mojo.dictionary) = true;

  map<string, Test> tests = 1;
}

Tuple类型 转换成 message，序号默认从1开始
```

```
interface Foobar {
	func test() -> 
}
```

