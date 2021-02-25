<a name="declarations"></a>

# 声明（Declarations）
-----------------

本页包含内容：

- [顶级代码](#top-level_code)
- [代码块](#code_blocks)
- 包声明
- [导入声明](#import_declaration)
- [常量声明](#constant_declaration)
- [变量声明](#variable_declaration)
  - [存储型变量和存储型变量属性](#stored_variables_and_stored_variable_properties)
  - [计算型变量和计算型属性](#computed_variables_and_computed_properties)
  - [存储型变量和属性的观察器](#stored_variable_observers_and_property_observers)
  - [类型变量属性](#type_variable_properties)
- [类型别名声明](#type_alias_declaration)
- [函数声明](#function_declaration)
  - [参数名](#parameter_names)
  - [输入输出参数](#in-out_parameters)
  - [特殊参数](#special_kinds_of_parameters)
  - [特殊方法](#special_kinds_of_methods)
  - [抛出错误的函数和方法](#throwing_functions_and_methods)
  - [重抛错误的函数和方法](#rethrowing_functions_and_methods)
- [枚举声明](#enumeration_declaration)
  - [任意类型的枚举用例](#enumerations_with_cases_of_any_type)
  - [递归枚举](#enumerations_with_indirection)
  - [拥有原始值的枚举用例](#enumerations_with_cases_of_a_raw-value_type)
  - [访问枚举用例](#accessing_enumeration_cases)
- [结构体声明](#structure_declaration)
- [接口声明](#interface_declaration)
  - [协议属性声明](#protocol_property_declaration)
  - [协议方法声明](#protocol_method_declaration)
  - [协议构造器声明](#protocol_initializer_declaration)
  - [协议下标声明](#protocol_subscript_declaration)
  - [协议关联类型声明](#protocol_associated_type_declaration)
- [构造器声明](#initializer_declaration)
  - [可失败构造器](#failable_initializers)

*声明 (declaration)* 用以向程序里引入新的名字或者结构。举例来说，可以使用声明来引入函数和方法，变量和常量，或者定义新的具有命名的枚举、结构和接口类型。还可以使用声明在程序里引入在其它地方声明的符号。

在 Mojo 中，大多数声明在某种意义上讲也是定义，因为声明往往伴随着实现或初始化。由于接口并不提供实现，接口成员仅仅只是声明而已。为了方便起见，也是因为这些区别在 Mojo 中并不是很重要，“声明”这个术语同时包含了声明和定义两种含义。

> 声明语法  
> <a name="declaration"></a>
>
> ```
> declaration = package-decl /
>               import-decl /
>               constant-decl /
>               variant-decl /
>               struct-decl /
>               type-alias-decl /
>               function-decl /
>               enum-decl /
>               interface-decl /
>               attribute-decl
>               
> declarations = declaration [ declarations ]
> ```

<a name="top-level_code"></a>

## 顶级代码

Mojo 的源文件中的顶级代码 (top-level code) 由零个或多个语句、声明和表达式组成。默认情况下，在一个源文件的顶层声明的变量，常量和其他具有命名的声明可以被同包中的每一个源文件中的代码访问。如果想要把定义限制在同一源文件内，在变量的定义前可以增加`_`。

> 顶级声明语法  
> *顶级声明* → [*多条语句*](10_Statements.md#statements)<sub>可选</sub>

<a name="code_blocks"></a>
## 代码块

*代码块 (code block)* 可以将一些声明和控制结构组织在一起。它有如下的形式：

```swift
{
	语句
}
```
代码块中的“语句”包括声明、表达式和各种其他类型的语句，它们按照在源码中的出现顺序被依次执行。

> 代码块语法  
> <a name="code-block"></a>
> *代码块* → **{** [*多条语句*](10_Statements.md#statements)<sub>可选</sub> **}**  

<a name="import_declaration"></a>

## 导入声明

*导入声明 (import declaration)* 让你可以使用在其他文件中声明的内容。导入语句的基本形式是导入整个包，它由 `import` 关键字和紧随其后的包名组成：

```swift
import 包
```

可以对导入操作提供更细致的控制，如指定一个特殊的子包或者指定一个包或子包中的某个声明。提供了这些限制后，在当前作用域中，只有被导入的符号是可用的，而不是整个模块中的所有声明。

```mojo
import 导入类型 模块.符号名
import 模块.子模块
import 模块.子模块 as 子模块别名
import 模块.子模块.*
import 模块.子模块.符号名
import 模块.子模块 {符号名}
import 模块.子模块 {符号名 as 符号别名}
```

<a name="grammer_of_an_import_declaration"></a>
> 导入声明语法  
> <a name="import-declaration"></a>
> *导入声明* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> **import** [*导入类型*](#import-kind)<sub>可选</sub> [*导入路径*](#import-path)  
> <a name="import-kind"></a>
> *导入类型* → **typealias** | **struct** | **type** | **enum** | **interface** | **var** | **const** | **func**  
> <a name="import-path"></a>
> *导入路径* → [*导入路径标识符*](#import-path-identifier) | [*导入路径标识符*](#import-path-identifier) **.** [*导入路径*](#import-path)  
> <a name="import-path-identifier"></a>
> *导入路径标识符* → [*标识符*](02_Lexical_Structure.md#identifier) | [*运算符*](02_Lexical_Structure.md#operator)  

<a name="constant_declaration"></a>
## 常量声明

*常量声明 (constant declaration)* 可以在程序中引入一个具有命名的常量。常量以关键字 `const` 来声明，遵循如下格式：

```mojo
const 常量名称: 类型 = 表达式
```

常量声明在“常量名称”和用于初始化的“表达式”的值之间定义了一种不可变的绑定关系；当常量的值被设定之后，它就无法被更改。这意味着，如果常量以类对象来初始化，对象本身的内容是可以改变的，但是常量和该对象之间的绑定关系是不能改变的。

当一个常量被声明为全局常量时，它必须拥有一个初始值。在类或者结构中声明一个常量时，它将作为*常量属性 (constant property)*。常量声明不能是计算型属性，因此也没有存取方法。

如果常量名称是元组形式，元组中每一项的名称都会和初始化表达式中对应的值进行绑定。

```swift
const (first_number, second_number) = (10, 42)
```

在上例中，`first_number` 是一个值为 `10` 的常量，`secnode_name` 是一个值为 `42` 的常量。所有常量都可以独立地使用：

```swift
print("The first number is \{first_number}.")
// 打印 “The first number is 10.”
print("The second number is \{second_number}.")
// 打印 “The second number is 42.”
```

当常量名称的类型 (`:` 类型) 可以被推断出时，类型标注在常量声明中是可选的，正如 [类型推断](03_Types.md#type_inference) 中所描述的。

如果还想获得更多关于常量的信息或者想在使用中获得帮助，请参阅 [常量和变量](../chapter2/01_The_Basics.md#constants_and_variables) 和 [存储属性](../chapter2/10_Properties.md#stored_properties)。

<a name="grammer_of_a_constant_declaration"></a>
> 常量声明语法  
> <a name="constant-declaration"></a>
>
> ```abnf
> constant-declaration = "const" pattern-initializer
>
> pattern-initializer = pattern initializer
> initializer = "=" expression
> ```
>
> <a name="constant-group-declaration"></a>
>
> ```
> constant-group-declaration = "const" { pattern-initializer-group }
>
> pattern-initializer-group = pattern-initializer /
>                             pattern-initializer (";" / LR) pattern-initializer-group
> ```



```
const_declaration
```

<a name="variable_declaration"></a>

## 变量声明

*变量声明 (variable declaration)* 可以在程序中引入一个具有命名的变量，通常可以省略关键字 `var` 。

使用如下形式声明一个变量：

```mojo
变量名称 : 类型 = 表达式
变量名称 : 类型          // 省略初始值，使用默认初始值
变量名称 := 表达式       // 省略类型，使用系统类型推断
```

可以在全局范围及函数内部使用这种形式来声明一个变量。当变量以这种形式在全局范围或者函数内部被声明时，它代表一个存储型变量。当它在结构中被声明时，它代表一个*存储型变量属性 (stored variable property)*。

用于初始化的表达式是可选的。如果没有初始化表达式，那么变量声明必须包含类型标注 (`:` *type*)。

如同常量声明，如果变量名称是元组形式，元组中每一项的名称都会和初始化表达式中对应的值进行绑定。

<a name="grammer_of_a_variable_declaration"></a>
> 变量声明语法  

<a name="variable-declaration"></a>
> 

<a name="variable-declaration-head"></a>
> *变量声明头* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*声明修饰符列表*](#declaration-modifiers)<sub>可选</sub> **var**  
> <a name="variable-name"></a>
> *变量名称* → [*标识符*](02_Lexical_Structure.md#identifier)  

<a name="type_alias_declaration"></a>
## 类型别名声明

*类型别名 (type alias)* 声明可以在程序中为一个既有类型声明一个别名。类型别名声明语句使用关键字 `type` 声明，遵循如下的形式：

```mojo
type 类型别名 = 现存类型
```

当声明一个类型的别名后，可以在程序的任何地方使用“别名”来代替现有类型。现有类型可以是具有命名的类型或者混合类型。类型别名不产生新的类型，它只是使用别名来引用现有类型。
类型别名声明可以通过泛型参数来给一个现有泛型类型提供名称。类型别名为现有类型的一部分或者全部泛型参数提供具体类型。例如:

```mojo
type StringDictionary<Value> = Dictionary<String, Value>

// 下列两个字典拥有同样的类型
var dictionary1: StringDictionary<Int>
var dictionary2: Dictionary<String, Int>
```
当一个类型别名带着泛型参数一起被声明时,这些参数的约束必须与现有参数的约束完全匹配。例如:
```swift
type DictionaryOfInts<Key: Hashable> = Dictionary<Key, Int>
```
因为类型别名可以和现有类型相互交换使用,类型别名不可以引入额外的类型约束。
在协议声明中,类型别名可以为那些经常使用的类型提供一个更短更方便的名称,例如:
```swift
interface Sequence {
    type Iterator: IteratorProtocol
    type Element = Iterator.Element
}
 
func sum<T: Sequence @check(T.Element is Int)>(sequence: T) -> Int {
    // ...
}
```
假如没有类型别名,sum函数将必须引用关联类型通过T.Iterator.Element的形式来替代 T.Element。

另请参阅 [协议关联类型声明](#protocol_associated_type_declaration)。

<a name="grammer_of_a_type_alias_declaration"></a>
> 类型别名声明语法  
> <a name="typealias-declaration"></a>
> *类型别名声明* → [*类型别名头*](#typealias-head) [*类型别名赋值*](#typealias-assignment)  
> <a name="typealias-head"></a>
> *类型别名头* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*访问级别修饰符*](#access-level-modifier)<sub>可选</sub> **type** [*类型别名名称*](#typealias-name)  
> <a name="typealias-name"></a>
> *类型别名名称* → [*标识符*](02_Lexical_Structure.md#identifier)  
> <a name="typealias-assignment"></a>
> *类型别名赋值* → **=** [*类型*](03_Types.md#type)  

<a name="function_declaration"></a>

## 函数声明

使用*函数声明 (function declaration)* 在程序中引入新的函数或者方法。在接口中声明的函数会作为方法，并且可以省略`func`关键字。函数声明使用关键字 `func`，遵循如下的形式：

```swift
func 函数名称(参数列表) -> 返回类型 {  
	语句 
}
```

如果函数返回 `Void` 类型，返回类型可以省略，如下所示：

```swift
func 函数名称(参数列表) {  
	语句
}
```

每个参数的类型都要标明，因为它们不能被推断出来。

函数可以使用元组类型作为返回类型来返回多个值。

<a name="parameter_names"></a>

### 参数名

函数的参数列表由一个或多个函数参数组成，参数间以逗号分隔。函数调用时的参数顺序必须和函数声明时的参数顺序一致。最简单的参数列表有着如下的形式：

`参数名称`: `参数类型`

```swift
func f(x: Int, y: Int) -> Int { return x + y }
f(1, y: 2) // 参数 y 有标签，参数 x 则没有
```

<a name="in-out_parameters"></a>

### 特殊参数

参数可以被忽略，数量可以不固定，还可以为其提供默认值，使用形式如下：

```swift
参数名称: 参数类型...  
参数名称: 参数类型 = 默认参数值  
```

一个参数的基本类型名称如果紧跟着三个点（`...`），会被视为可变参数。一个函数至多可以拥有一个可变参数，且必须是最后一个参数。可变参数会作为包含该参数类型元素的数组处理。举例来讲，可变参数 `Int...` 会作为 `[Int]` 来处理。关于使用可变参数的例子，请参阅 [可变参数](../chapter2/06_Functions.md#variadic_parameters)。

如果在参数类型后面有一个以等号（`=`）连接的表达式，该参数会拥有默认值，即给定表达式的值。当函数被调用时，给定的表达式会被求值。如果参数在函数调用时被省略了，就会使用其默认值。

```swift
func f(x: Int = 42) -> Int { return x }
f()     // 有效，使用默认值
f(7)    // 有效，提供了值
```

<a name="grammer_of_a_function_declaration"></a>

> 函数声明语法  

<a name="function-declaration"></a>
> *函数声明* → [*函数头*](#function-head) [*函数名*](#function-name) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [*函数签名*](#function-signature) [*函数体*](#function-body)<sub>可选</sub>  

<a name="function-head"></a>

> *函数头* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*声明修饰符列表*](#declaration-modifiers)<sub>可选</sub> **func**  
> <a name="function-name"></a>
> *函数名* → [*标识符*](02_Lexical_Structure.md#identifier) | [*运算符*](02_Lexical_Structure.md#operator)  

<a name="function-signature"></a>
> *函数签名* → [*参数子句列表*](#parameter-clauses) **throws**<sub>可选</sub> [*函数结果*](#function-result)<sub>可选</sub>  
> *函数签名* → [*参数子句列表*](#parameter-clauses) **rethrows** [*函数结果*](#function-result)<sub>可选</sub>  
> <a name="function-result"></a>
> *函数结果* → **->** [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*类型*](03_Types.md#type)  
> <a name="function-body"></a>
> *函数体* → [*代码块*](#code-block)  

<a name="parameter-clauses"></a>
> *参数子句列表* → [*参数子句*](#parameter-clause) [*参数子句列表*](#parameter-clauses)<sub>可选</sub>  
> <a name="parameter-clause"></a>
> *参数子句* → **(** **)** | **(** [*参数列表*](#parameter-list) **)**  
> <a name="parameter-list"></a>
> *参数列表* → [*参数*](#parameter) | [*参数*](#parameter) **,** [*参数列表*](#parameter-list)  
> <a name="parameter"></a>
> *参数* → **let**<sub>可选</sub> [*外部参数名*](#external-parameter-name)<sub>可选</sub> [*内部参数名*](#local-parameter-name) [*类型标注*](03_Types.md#type-annotation) [*默认参数子句*](#default-argument-clause)<sub>可选</sub>  
> *参数* → **inout** [*外部参数名*](#external-parameter-name)<sub>可选</sub> [*内部参数名*](#local-parameter-name) [*类型标注*](03_Types.md#type-annotation)  
> *参数* → [*外部参数名*](#external-parameter-name)<sub>可选</sub> [*内部参数名*](#local-parameter-name) [*类型标注*](03_Types.md#type-annotation) **...**  
> <a name="external-parameter-name"></a>
> *外部参数名* → [*标识符*](02_Lexical_Structure.md#identifier) | **_**  
> <a name="local-parameter-name"></a>
> *内部参数名* → [*标识符*](02_Lexical_Structure.md#identifier) | **_**  
> <a name="default-argument-clause"></a>
> *默认参数子句* → **=** [*表达式*](04_Expressions.md#expression)  




<a name="enumeration_declaration"></a>
## 枚举声明

在程序中使用*枚举声明 (enumeration declaration)* 来引入一个枚举类型。

枚举声明有两种基本形式，使用关键字 `enum` 来声明。枚举声明体包含零个或多个值，称为枚举用例，还可包含任意数量的声明，包括计算型属性、实例方法、类型方法、构造器、类型别名，甚至其他枚举、结构体和类。枚举声明不能包含析构器或者协议声明。

枚举类型可以采纳任意数量的协议，但是枚举不能从类、结构体和其他枚举继承。

不同于类或者结构体，枚举类型并不隐式提供默认构造器，所有构造器必须显式声明。一个构造器可以委托给枚举中的其他构造器，但是构造过程仅当构造器将一个枚举用例赋值给 `self` 后才算完成。

和结构体类似但是和类不同，枚举是值类型。枚举实例在被赋值到变量或常量时，或者传递给函数作为参数时会被复制。更多关于值类型的信息，请参阅 [结构体和枚举是值类型](../chapter2/09_Classes_and_Structures.md#structures_and_enumerations_are_value_types)。

可以扩展枚举类型，正如在 [扩展声明](#extension_declaration) 中讨论的一样。

<a name="enumerations_with_indirection"></a>

### 拥有原始值的枚举用例

以下形式声明了一种枚举类型，其中各个枚举用例的类型均为同一种基本类型：

```swift
enum 枚举名称: 原始值类型 {  
	枚举用例1 = 原始值1
	枚举用例2 = 原始值2
}  
```

在这种形式中，每一个用例块由 `case` 关键字开始，后面紧跟一个或多个以逗号分隔的枚举用例。和第一种形式的枚举用例不同，这种形式的枚举用例包含一个基础值，叫做原始值，各个枚举用例的原始值的类型必须相同。这些原始值的类型通过原始值类型指定，必须表示一个整数、浮点数、字符串或者字符。原始值类型必须符合 `Equatable` 协议和下列字面量转换协议中的一种：整型字面量需符合 `IntergerLiteralConvertible` 协议，浮点型字面量需符合 `FloatingPointLiteralConvertible` 协议，包含任意数量字符的字符串型字面量需符合 `StringLiteralConvertible` 协议，仅包含一个单一字符的字符串型字面量需符合 `ExtendedGraphemeClusterLiteralConvertible` 协议。每一个用例的名字和原始值必须唯一。

如果原始值类型被指定为 `Int`，则不必为用例显式地指定原始值，它们会隐式地被赋值 `0`、`1`、`2` 等。每个未被赋值的 `Int` 类型的用例会被隐式地赋值，其值为上一个用例的原始值加 `1`。

```Swift
enum ExampleEnum: Int {
    a, b, c = 5, d
}
```

在上面的例子中，`ExampleEnum.a` 的原始值是 `0`，`ExampleEnum.b 的原始值是 `1`。因为 `ExampleEnum.c` 的原始值被显式地设定为 `5`，因此 `ExampleEnum.d` 的原始值会自动增长为 `6`。

如果原始值类型被指定为 `String` 类型，你不用明确地为用例指定原始值，每个没有指定原始值的用例会隐式地将用例名字作为原始值。

```swift
enum WeekendDay: String {
    saturday, sunday
}
```

在上面这个例子中，`WeekendDay.saturday` 的原始值是 `"saturday"`，`WeekendDay.sunday` 的原始值是 `"sunday"`。

枚举用例具有原始值的枚举类型隐式地符合定义在 Mojo 标准库中的 `RawRepresentable` 协议。所以，它们拥有一个 `rawValue` 属性和一个可失败构造器 `init?(rawValue: RawValue)`。可以使用 `rawValue` 属性去获取枚举用例的原始值，例如 `ExampleEnum.B.rawValue`。还可以根据原始值来创建一个相对应的枚举用例，只需调用枚举的可失败构造器，例如 `ExampleEnum(rawValue: 5)`，这个可失败构造器返回一个可选类型的用例。要获得更多关于具有原始值的枚举用例的信息和例子，请参阅 [原始值](../chapter2/08_Enumerations.md#raw_values)。

<a name="accessing_enumeration_cases"></a>
### 访问枚举用例

使用点语法（`.`）来引用枚举类型的枚举用例，例如 `EnumerationType.EnumerationCase`。当枚举类型可以由上下文推断而出时，可以省略它（但是 `.` 仍然需要），正如 [枚举语法](../chapter2/08_Enumerations.md#enumeration_syntax) 和 [显式成员表达式](04_Expressions.md#explicit_member_expression) 所述。

可以使用 `switch` 语句来检验枚举用例的值，正如 [使用 switch 语句匹配枚举值](../chapter2/08_Enumerations.md#matching_enumeration_values_with_a_switch_statement) 所述。枚举类型是模式匹配的，依靠 `switch` 语句 `case` 块中的枚举用例模式，正如 [枚举用例模式](07_Patterns.md#enumeration_case_pattern) 所述。

<a name="grammer_of_an_enumeration_declaration"></a>
> 枚举声明语法 

<a name="enum-declaration"></a>
> *枚举声明* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*访问级别修饰符*](#access-level-modifier)<sub>可选</sub> [*联合风格枚举*](#union-style-enum)  
> *枚举声明* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*访问级别修饰符*](#access-level-modifier) <sub>可选</sub> [*原始值风格枚举*](#raw-value-style-enum) 

<a name="union-style-enum"></a>
> *联合风格枚举* → **indirect**<sub>可选</sub> **enum** [*枚举名称*](#enum-name) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [类型继承子句](03_Types.md#type-inheritance-clause)<sub>可选</sub> **{** [*多个联合风格枚举成员*](#union-style-enum-members)<sub>可选</sub> **}**  
> <a name="union-style-enum-members"></a>
> *多个联合风格枚举成员* → [*联合风格枚举成员*](#union-style-enum-member) [*多个联合风格枚举成员*](#union-style-enum-members)<sub>可选</sub>  
> <a name="union-style-enum-member"></a>
> *联合风格枚举成员* → [*声明*](#declaration) | [*联合风格枚举用例子句*](#union-style-enum-case-clause)  
> <a name="union-style-enum-case-clause"></a>
> *联合风格枚举用例子句* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> **indirect**<sub>可选</sub> **case** [*联合风格枚举用例列表*](#union-style-enum-case-list)  
> <a name="union-style-enum-case-list"></a>
> *联合风格枚举用例列表* → [*联合风格枚举用例*](#union-style-enum-case) | [*联合风格枚举用例*](#union-style-enum-case) **,** [*联合风格枚举用例列表*](#union-style-enum-case-list)  
> <a name="union-style-enum-case"></a>
> *联合风格枚举用例* → [*枚举用例名称*](#enum-case-name) [*元组类型*](03_Types.md#tuple-type)<sub>可选</sub>  
> <a name="enum-name"></a>
> *枚举名称* → [*标识符*](02_Lexical_Structure.md#identifier)  
> <a name="enum-case-name"></a>
> *枚举用例名称* → [*标识符*](02_Lexical_Structure.md#identifier)  

<a name="raw-value-style-enum"></a>
> *原始值风格枚举* → **enum** [*枚举名称*](#enum-name) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [类型继承子句](03_Types.md#type-inheritance-clause) **{** [*多个原始值风格枚举成员*](#raw-value-style-enum-members) **}**  
> <a name="raw-value-style-enum-members"></a>
> *多个原始值风格枚举成员* → [*原始值风格枚举成员*](#raw-value-style-enum-member) [*多个原始值风格枚举成员*](#raw-value-style-enum-members)<sub>可选</sub>  
> <a name="raw-value-style-enum-member"></a>
> *原始值风格枚举成员* → [*声明*](#declaration) | [*原始值风格枚举用例子句*](#raw-value-style-enum-case-clause)  
> <a name="raw-value-style-enum-case-clause"></a>
> *原始值风格枚举用例子句* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> **case** [*原始值风格枚举用例列表*](#raw-value-style-enum-case-list)  
> <a name="raw-value-style-enum-case-list"></a>
> *原始值风格枚举用例列表* → [*原始值风格枚举用例*](#raw-value-style-enum-case) | [*原始值风格枚举用例*](#raw-value-style-enum-case) **,** [*原始值风格枚举用例列表*](#raw-value-style-enum-case-list)  
> <a name="raw-value-style-enum-case"></a>
> *原始值风格枚举用例* → [*枚举用例名称*](#enum-case-name) [*原始值赋值*](#raw-value-assignment)<sub>可选</sub>  
> <a name="raw-value-assignment"></a>
> *原始值赋值* → **=** [*原始值字面量*](#raw-value-literal)  
> <a name="raw-value-literal"></a>
> *原始值字面量* → [数字型字面量](02_Lexical_Structure.md#numeric-literal) | [字符串型字面量](02_Lexical_Structure.md#static-string-literal) | [布尔型字面量](02_Lexical_Structure.md#boolean-literal)

<a name="structure_declaration"></a>
## 结构体声明

使用*结构体声明 (structure declaration)* 可以在程序中引入一个结构体类型。结构体声明使用 `type` 关键字，遵循如下的形式：

```swift
type 结构体名称 : 继承结构体列表 {  
	多条声明
}
```

结构体内可包含零个或多个声明。这些声明可以包括存储型和计算型属性、类型属性、下标、类型别名，甚至其他结构体、类、和枚举声明。结构体声明不能包含接口声明。

结构体可以采纳任意数量的协议，但是不能继承自类、枚举或者其他结构体。

有三种方法可以创建一个已声明的结构体实例：

* 调用结构体内声明的构造器，正如 [构造器](../chapter2/14_Initialization.md#initializers) 所述。

* 如果没有声明构造器，调用结构体的成员逐一构造器，正如 [结构体类型的成员逐一构造器](../chapter2/14_Initialization.md#memberwise_initializers_for_structure_types) 所述。

* 如果没有声明构造器，而且结构体的所有属性都有初始值，调用结构体的默认构造器，正如 [默认构造器](../chapter2/14_Initialization.md#default_initializers) 所述。

结构体的构造过程请参阅 [构造过程](../chapter2/14_Initialization.md)。

结构体实例的属性可以用点语法（`.`）来访问，正如 [访问属性](../chapter2/09_Classes_and_Structures.md#accessing_properties) 所述。

结构体是值类型。结构体的实例在被赋予变量或常量，或传递给函数作为参数时会被复制。关于值类型的更多信息，请参阅
[结构体和枚举是值类型](../chapter2/09_Classes_and_Structures.md#structures_and_enumerations_are_value_types)。

可以使用扩展声明来扩展结构体类型的行为，请参阅 [扩展声明](#extension_declaration)。

<a name="grammer_of_a_protocol_initializer_declaration"></a>

> 协议构造器声明语法  
> <a name="protocol-initializer-declaration"></a>
> *协议构造器声明* → [*构造器头*](#initializer-head) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [*参数子句*](#parameter-clause)  **throws**<sub>可选</sub>  
> *协议构造器声明* → [*构造器头*](#initializer-head) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [*参数子句*](#parameter-clause)  **rethrows**

<a name="grammer_of_a_structure_declaration"></a>
> 结构体声明语法  
> <a name="struct-declaration"></a>
>
> ```abnf
> type-declaration = "type" type-name  [generic-parameter-clause] [ type-inheritance-clause ]  type-body
>
> type-body = "{" [ type-inner-decalrations ] "}"
> type-inner-decalrations = type-inner-decalration [ type-inner-decalration ]
> type-inner-decalration = variable-declaration / type-declaration / enum-declaration
> ```

```
Term {
	type: "type_declaration"
  	terms: [{
    	type: "type_name"
    	value: ""
  	}]
}
```

```
type TypeDecl : Decl {
    name: String @10
    generic_parameters: [GenericParameter] @11
    attributes: [Attribute] @12
}

type DataDecl : TypeDecl {
    type: DataType @13 | NominalType @14
}

type TypeAliasDecl : TypeDecl @skip_fields(attributes) {
    type: NominalType @13
}

type StructDecl : TypeDecl {
    type: StructType @13
    enclosing_type : NominalType @14
    
    type_alias_decls: [TypeAliasDecl] @15
    struct_decls: [StructDecl] @17
    enum_decls: [EnumDecl] @18
}

type StructType : DataType {
    /// A Field represents a Field declaration list in a struct type,
    /// a method list in an interface type, or a parameter/result declaration
    /// in a signature.
    ///
    fields: [StructField] @10

    ///
    inherits: [NominalType] @12
}
```





<a name="protocol_declaration"></a>

## 接口声明

*接口声明 (interface declaration)* 可以为程序引入一个命名的接口类型。接口声明只能在全局区域使用 `interface` 关键字来进行声明，并遵循如下形式：

```mojo
interface 接口名称: 继承的接口 {  
	接口成员函数声明
}
```

协议的主体包含零个或多个协议成员声明，这些成员描述了任何采纳该协议的类型必须满足的一致性要求。一个协议可以声明采纳者必须实现的某些属性、方法、构造器以及下标。协议也可以声明各种各样的类型别名，叫做关联类型，它可以指定协议的不同声明之间的关系。协议声明不能包括类、结构体、枚举或者其它协议的声明。协议成员声明会在后面进行讨论。

协议类型可以继承自任意数量的其它协议。当一个协议类型继承自其它协议的时候，来自其它协议的所有要求会聚合在一起，而且采纳当前协议的类型必须符合所有的这些要求。关于如何使用协议继承的例子，请参阅 [协议继承](../chapter2/22_Protocols.md#protocol_inheritance)。

> 注意  
> 也可以使用协议合成类型来聚合多个协议的一致性要求，请参阅 [协议合成类型](03_Types.md#protocol_composition_type) 和 [协议合成](../chapter2/22_Protocols.md#protocol_composition)。

可以通过类型的扩展声明来采纳协议，从而为之前声明的类型添加协议一致性。在扩展中，必须实现所有采纳协议的要求。如果该类型已经实现了所有的要求，可以让这个扩展声明的主体留空。

默认地，符合某个协议的类型必须实现所有在协议中声明的属性、方法和下标。即便如此，可以用 `optional` 声明修饰符标注协议成员声明，以指定它们的实现是可选的。`optional` 修饰符仅仅可以用于使用 `objc` 特性标记过的协议。因此，仅仅类类型可以采用并符合包含可选成员要求的协议。更多关于如何使用 `optional` 声明修饰符的信息，以及如何访问可选协议成员的指导——例如不能确定采纳协议的类型是否实现了它们时——请参阅 [可选协议要求](../chapter2/22_Protocols.md#optional_protocol_requirements)

为了限制协议只能被类类型采纳，需要使用 `class` 关键字来标记协议，将 `class` 关键在写在冒号后面的继承的协议列表的首位。例如，下面的协议只能被类类型采纳：

```swift
protocol SomeProtocol: class {
	/* 这里是协议成员 */
}
```

任何继承自标记有 `class` 关键字的协议的协议也仅能被类类型采纳。

> 注意  
> 如果协议已经用 `objc` 特性标记了，`class` 要求就隐式地应用于该协议，无需显式使用 `class` 关键字。

协议类型是命名的类型，因此它们可以像其他命名类型一样使用，正如 [协议作为类型](../chapter2/22_Protocols.md#protocols_as_types) 所讨论的。然而，不能构造一个协议的实例，因为协议实际上不提供它们指定的要求的实现。

可以使用协议来声明作为代理的类或者结构体应该实现的方法，正如 [委托(代理)模式](../chapter2/22_Protocols.md#delegation) 中所述。

<a name="grammer_of_a_protocol_declaration"></a>
> 协议声明语法  

<a name="protocol-declaration"></a>
> *协议声明* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](#access-level-modifier)<sub>可选</sub> **protocol** [*协议名称*](#protocol-name) [*类型继承子句*](03_Types.html#type-inheritance-clause)<sub>可选</sub> [*协议主体*](#protocol-body)  
> <a name="protocol-name"></a>
> *协议名称* → [*标识符*](02_Lexical_Structure.md#identifier)  
> <a name="protocol-body"></a>
> *协议主体* → **{** [*协议成员声明列表*](#protocol-member-declarations)<sub>可选</sub> **}**  

<a name="protocol-member-declaration"></a>
> *协议成员声明* → [*协议属性声明*](#protocol-property-declaration)  
> *协议成员声明* → [*协议方法声明*](#protocol-method-declaration)  
> *协议成员声明* → [*协议构造器声明*](#protocol-initializer-declaration)  
> *协议成员声明* → [*协议下标声明*](#protocol-subscript-declaration)  
> *协议成员声明* → [*协议关联类型声明*](#protocol-associated-type-declaration)  
> <a name="protocol-member-declarations"></a>
> *协议成员声明列表* → [*协议成员声明*](#protocol-member-declaration) [*协议成员声明列表*](#protocol-member-declarations)<sub>可选</sub>  

<a name="protocol_method_declaration"></a>
### 接口方法声明

协议可以通过在协议声明主体中引入一个协议方法声明，来声明符合的类型必须实现的方法。协议方法声明和函数方法声明有着相同的形式，但有两项例外：它们不包括函数体，也不能包含默认参数。关于如何实现协议中的方法要求的例子，请参阅 [方法要求](../chapter2/22_Protocols.md#method_requirements)。

另请参阅 [函数声明](#function_declaration)。

<a name="grammer_of_a_protocol_declaration"></a>

> 协议方法声明语法  
> <a name="protocol-method-declaration"></a>
> *协议方法声明* → [*函数头*](#function-head) [*函数名*](#function-name) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [*函数签名*](#function-signature)  

<a name="initializer_declaration"></a>

## 构造器声明

构造器声明会为程序中的类型（包含结构体）引入构造器。

结构体、枚举、类可以有任意数量的构造器，但是类的构造器具有不同的规则和行为。不同于结构体和枚举，类有两种构造器，即指定构造器和便利构造器，请参阅 [构造过程](../chapter2/14_Initialization.md)。

采用如下形式声明结构体和枚举的构造器，以及类的指定构造器：

```swift
类型(参数列表) {  
	构造语句
}
```

类的指定构造器直接将类的所有属性初始化。它不能调用类中的其他构造器，如果类有超类，则必须调用超类的一个指定构造器。如果该类从它的超类继承了属性，必须在调用超类的指定构造器后才能修改这些属性。

指定构造器只能在类声明中声明，不能在扩展声明中声明。

结构体和枚举的构造器可以调用其他已声明的构造器，从而委托其他构造器来进行部分或者全部构造过程。

默认情况下，超类中的构造器不会被子类继承。但是，如果子类的所有存储型属性都有默认值，而且子类自身没有定义任何构造器，它将继承超类的构造器。如果子类重写了超类的所有指定构造器，子类将继承超类的所有便利构造器。

关于在不同类型中声明构造器的例子，请参阅 [构造过程](../chapter2/14_Initialization.md)。

<a name="grammer_of_an_initializer_declaration"></a>

> 构造器声明语法  
> <a name="initializer-declaration"></a>
> *构造器声明* → [*构造器头*](#initializer-head) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [*参数子句*](#parameter-clause) **throws**<sub>可选</sub> [*构造器主体*](#initializer-body)  
> *构造器声明* → [*构造器头*](#initializer-head) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [*参数子句*](#parameter-clause) **rethrows**<sub>可选</sub> [*构造器主体*](#initializer-body)  
> <a name="initializer-head"></a>
> *构造器头* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*声明修饰符列表*](#declaration-modifiers)<sub>可选</sub> **init**  
> *构造器头* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*声明修饰符列表*](#declaration-modifiers)<sub>可选</sub> **init** **?**  
> *构造器头* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*声明修饰符列表*](#declaration-modifiers)<sub>可选</sub> **init** **!**  
> <a name="initializer-body"></a>
> *构造器主体* → [*代码块*](#code-block)  

<a name="access_control_levels"></a>
### 访问控制级别

Mojo在module内部不存在指定的访问控制，可以通过package的声明，来控制可以对外开放的类型。
