

# template string

基于正则表达式的结构化模板语言

## 目的

1. capture variable （变量提取）
2. extend variable （变量扩展）
3. modify variable（变量修改）
3. verify （验证）

## 使用场景
在MOJO中，struct类型与String类型（非JSON、XML、YAML等格式）的codec。

比如DateTime的格式，EMail、HostName、IPV4、IPV6

## 语法

```
${}

?[]

regex-expression = '`'   '`'
func-call-expression = '@' 
```

```
template = element+

element = literals | expression

expression = "{" expression-clause "}"

expression-clause = variables-clause [":" (restriction | modifier) ]
                  | ":" restriction

variables-clause = [ operator ] variables [ operator ]

restriction = regex
						| function-call
						
regex = "r'"   "'"

modifier = composite
         | function-call
         
composite = ',' , ';' , '|' 

function-call = @
```



```abnf
template = 1* element
element = regex-element / optional-block / expression

//optional-block = "[" template "]"

expression = "{" [ variable ] [ ":" restrict-expression ] "}"
expression = "{" function "}"

restrict-expression = template / function
function = "@" identifer [ "<" ">" ] [ "("  ")" ]
```

## Examples

```RegTemplate
{:.{2,4}-{@string}}
{:r'.*'}
{:@string}
{@string}

/abc/{id}[.{format:@type<Element>}]

/abc/{id}[.{format:@string}]
/abc/{id}[.{format:@array('.')}]

/abc/{}/xyz
/abc/{:r'[^/]+'}/xyz
/abc/{@array('/')}/xyz[?{@map('&', '=')}]

{longitude},{latitude}
T{kilometer}[[+.]{meter}]
{labels: @array(".", 1, 127)}

[{top_left.longitude},{top_left.latitude},{right_bottom.longitude},{right_bottom.latitude}]

{top_left;right_bottom}

{longitude},{latitude}{,altitude}
{type}{/facet}{-producer}-{product}-{media}.{suffix}
{major}.{minor}.{path}{-pre_release:@seperate('.')}{+build:'.'}
```



```
year  := ["1965", "2000", "2012"]

dictionary := {
		'foo': 'bar',
		'key-1': 'value-2'
}
       dom   := ("example", "com")

     Example Template     Expansion

       find{?{'year='year:&}}       find?year=1965&year=2000&year=2012
       www{.dom:.}         www.example.com

```







## Compile

RegTemplate最终都可以编译成标准的Regex；对应Url的template可以编译成Uri Template。

编译参数：
1. 对于匿名表达式（即没有variable的expression），可以选择是否进行capture；对于纯验证目的的情况下，可以优化Regex；
2. 对于非匿名表达式，也可以进行是否capture设置；








LineTemplate支持Type类型从string转换为Type实例，或者从Type实例转换为string


如果Type存在template的annotation，则，该Type类型能够自动和string转换


```
{}
[]
```

[.]

```
expression =  "{" [ operator ] variable-list  [ operator ]  "}"

variable-list =  varspec *( "," varspec )

varspec       =  varname [ modifier-level4 ]

```

