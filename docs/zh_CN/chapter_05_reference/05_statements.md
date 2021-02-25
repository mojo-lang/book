<a name="statement_statements"></a>

# 语句（Statements）

------

本页包含内容：

- [循环语句](#loop_statements)
  - [For 语句](#for_statements)
  - [While 语句](#while_statements)
  - [Repeat 语句](#repeat_statements)
- [分支语句](#branch_statements)
  - [If 语句](#if_statements)
  - [Match 语句](#match_statements)
- [控制转移语句](#control_transfer_statements)
  - [Break 语句](#break_statements)
  - [Continue 语句](#continue_statements)
  - [Return 语句](#return_statements)
- [Defer 语句](#defer_statements)

在 Mojo 中，只有两种类型的语句：简单语句和控制流语句。简单语句是最常见的，用于构造表达式或者声明。

控制流语句则用于控制程序执行的流程，Mojo 中有多种类型的控制流语句：循环语句、分支语句和控制转移语句。循环语句用于重复执行代码块；分支语句用于执行满足特定条件的代码块；控制转移语句则用于改变代码的执行顺序。另外，Mojo提供了 `defer` 语句，用于退出当前作用域之前执行清理操作。

是否将分号（`;`）添加到语句的末尾是可选的。但若要在同一行内写多条独立语句，则必须使用分号。

> 语句语法
>
> <a name="statement"></a>
>
> ```abnf
> statement = expression /
>          declaration /
>          loop-statement /
>          branch-statement /
>          control-transfer-statement /
>          init-statement /
>          defer-statement
>          
> statements = statement statement_seperator [ statements ]
> statement-separator = ";" / CRLF
> ```

<a name="loop_statements"></a>

## 循环语句

循环语句会根据特定的循环条件来重复执行代码块。Mojo 提供三种类型的循环语句：`for` 语句、`while` 语句和 `repeat` 语句。

通过 `break` 语句和 `continue` 语句可以改变循环语句的控制流。有关这两条语句，详情参见 [Break 语句](#break_statements) 和 [Continue 语句](#continue_statements)。

> 循环语句语法  
> <a name="loop-statements"></a>
>
> ```
> loop-statement = for-statement / while-statement / repeat-statement
> ```

<a name="for_statements"></a>

### For 语句

`for` 语句会为集合（或序列）中的每一项执行一次代码块。

`for` 语句的形式如下：

```swift
for 项 in 集合 {  
    循环体语句
}
```

`for` 语句在循环开始前会获取集合表达式的一个迭代器，并获取一个值。接下来循环开始，反复调用迭代器的next()方法，获取集合的下一个值。如果其返回值不是 `None`，它将会被赋给“项”，然后执行循环体语句，执行完毕后回到循环开始处，继续重复这一过程；否则，既不会赋值也不会执行循环体语句，`for` 语句至此执行完毕。

> for 语句语法  
> <a name="for-statements"></a>
>
> ```
> for-statement = "for" pattern "in" expression code-block
> ```

<a name="while_statements"></a>

### While 语句

只要循环条件为真，`while` 语句就会重复执行代码块。

`while` 语句的形式如下：

```mojo
while 条件 {
    语句
}
```

`while` 语句的执行流程如下：

1. 判断条件的值。如果为 `true`，转到第 2 步；如果为 `false`，`while` 语句至此执行完毕。
2. 执行循环体中的语句，然后重复第 1 步。

由于会在执行循环体中的语句前判断条件的值，因此循环体中的语句可能会被执行若干次，也可能一次也不会被执行。

条件的结果必须是Bool类型或者Bool的桥接类型。

> while 语句语法 
>
>  <a name="while-statement"></a>
>
> ```
> while-statement = "while" expression code-block
> ```

<a name="repeat_statements"></a>

### Repeat 语句

`repeat` 语句至少执行一次代码块，之后只要循环条件为真，就会重复执行代码块。

`repeat` 语句的形式如下：

```mojo
repeat {  
    语句  
} while 条件
```

```
repeat {
    语句
}
```

`repeat` 语句的执行流程如下：

1. 执行循环体中的语句，然后转到第 2 步。
2. 判断条件的值。如果为 `true`，重复第 1 步；如果为 `false`，`repeat` 语句至此执行完毕。

由于条件的值是在循环体中的语句执行后才进行判断，因此循环体中的语句至少会被执行一次。

条件的结果必须是Bool类型或者Bool的桥接类型。

> repeat 语句语法  
> <a name="repeat-statement"></a>
>
> ```
> repeat-while-statement = "repeat" code-block [ "while" expression ]
> ```

<a name="branch_statements"></a>

## 分支语句

分支语句会根据一个或者多个条件来执行指定部分的代码。分支语句中的条件将会决定程序如何分支以及执行哪部分代码。Mojo 提供两种类型的分支语句：`if` 语句和 `match` 语句。

`if` 语句和 `match` 语句中的控制流可以用 `break` 语句改变，请参阅 [Break 语句](#break_statement)。

> 分支语句语法  
> <a name="branch-statement"></a>
>
> ```
> branch-statement = if-statement /  match-statement
> ```

<a name="if_statements"></a>

### If 语句

`if` 语句会根据一个或多个条件来决定执行哪一块代码。

`if` 语句有两种基本形式，无论哪种形式，都必须有花括号。

第一种形式是当且仅当条件为真时执行代码，像下面这样：

```swift
if 条件 {  
    语句  
}  
```

第二种形式是在第一种形式的基础上添加 `else` 语句，当只有一个 `else` 语句时，像下面这样：

```swift
if 条件 {    
    若条件为真则执行这部分语句    
} else {           
    若条件为假则执行这部分语句
}
```

`else` 语句也可包含 `if` 语句，从而形成一条链来测试更多的条件，像下面这样：

```swift
if 条件1 {  
    若条件1为真则执行这部分语句  
} else if 条件2 {  
    若条件2为真则执行这部分语句
} else {  
    若前两个条件均为假则执行这部分语句
} 
```

`if` 语句中条件的结果必须是Bool类型或者Bool的桥接类型。

> if 语句语法  
> <a name="if-statement"></a>
>
> ```
> if-statement = if expression code-block [ else-clause ]
> else-clause = "else" code-block / "else" if-statement
> ```

<a name="match_statements"></a>

### match 语句

`match` 语句会根据控制表达式的值来决定执行哪部分代码。

`match` 语句的形式如下：

```mojo
match 控制表达式 {  
    模式1 => 表达式
    模式2 if 条件 => { 语句 }
    模式3, 模式4 if 条件 => 语句
    _ => 语句
}
```

`match` 语句会先计算控制表达式的值，然后与每一个 `case` 的模式进行匹配。如果匹配成功，程序将会执行对应的 `case` 中的语句。另外，每一个 `case` 都不能为空，也就是说在每一个 `case` 中必须至少有一条语句。如果你不想在匹配到的 `case` 中执行代码，只需在该 `case` 中写一条 `break` 语句即可。

可以用作控制表达式的值是十分灵活的。除了标量类型外，如 `Int`、`Character`，你可以使用任何类型的值，包括浮点数、字符串、元组、自定义类型的实例和可选类型。控制表达式的值还可以用来匹配枚举类型中的成员值或是检查该值是否包含在指定的 `Range` 中。关于如何在 `match` 语句中使用这些类型，请参阅 [控制流](../chapter2/05_Control_Flow.md) 一章中的 [Match](../chapter2/05_Control_Flow.html#match)。

每个 `case` 的模式后面可以有一个 `where` 子句。`where` 子句由 `where` 关键字紧跟一个提供额外条件的表达式组成。因此，当且仅当控制表达式匹配一个 `case` 的模式且 `where` 子句的表达式为真时，`case` 中的语句才会被执行。在下面的例子中，控制表达式只会匹配包含两个相等元素的元组，例如 `(1, 1)`：

```swift
case let (x, y) where x == y:
```

正如上面这个例子，也可以在模式中使用 `let`（或 `var`）语句来绑定常量（或变量）。这些常量（或变量）可以在对应的 `where` 子句以及 `case` 中的代码中使用。但是，如果一个 `case` 中含有多个模式，所有的模式必须包含相同的常量（或变量）绑定，并且每一个绑定的常量（或变量）必须在所有的条件模式中都有相同的类型。

`match` 语句也可以包含默认分支，使用 `default` 关键字表示。只有所有 `case` 都无法匹配控制表达式时，默认分支中的代码才会被执行。一个 `match` 语句只能有一个默认分支，而且必须在 `match` 语句的最后面。

`match` 语句中 `case` 的匹配顺序和源代码中的书写顺序保持一致。因此，当多个模式都能匹配控制表达式时，只有第一个匹配的 `case` 中的代码会被执行。

#### Match语句不能有遗漏

在 Mojo 中，`match` 语句中控制表达式的每一个可能的值都必须至少有一个 `case` 与之对应。在某些无法面面俱到的情况下（例如，表达式的类型是 `Int`），你可以使用 `_` 分支满足该要求。

#### 不存在隐式落入

当匹配到的 `case` 中的代码执行完毕后，`match` 语句会直接退出，而不会继续执行下一个 `case` 。

> match 语句语法
>
> <a name="match-statement"></a>
>
> ```
> match-statement = "match" expression "{" match-cases "}"
> match-cases = match-case statement-separator [ match-cases ]
> match-case = patterns [ match-guard ] "=>" ( code-block / expression )
>
> patterns = pattern /  pattern , patterns
> match-guard = "if" expression
> ```

<a name="control_transfer_statements"></a>

## 控制转移语句

控制转移语句能够无条件地把控制权从一片代码转移到另一片代码，从而改变代码执行的顺序。Swift 提供五种类型的控制转移语句：`break` 语句、`continue` 语句和`return` 语句。

> 控制转移语句语法  
> <a name="control-transfer-statement"></a>
>
> ```
> control-transfer-statement = break-statement / continue-statement / return-statement
> ```

<a name="break_statement"></a>

### Break 语句

`break` 语句用于终止循环语句、`if` 语句或 `match` 语句的执行。使用 `break` 语句时，可以只写 `break` 这个关键词，也可以在 `break` 后面跟上标签名，像下面这样：

> break  
> break `标签名`

当 `break` 语句后面带标签名时，可用于终止由这个标签标记的循环语句、`if` 语句或 `match` 语句的执行。

而只写 `break` 时，则会终止 `match` 语句或 `break` 语句所属的最内层循环语句的执行。不能使用 `break` 语句来终止未使用标签的 `if` 语句。

无论哪种情况，控制权都会被转移给被终止的控制流语句后面的第一行语句。

关于使用 `break` 语句的例子，请参阅 [控制流](../chapter2/05_Control_Flow.md) 一章的 [Break](../chapter2/05_Control_Flow.md#break) 和 [带标签的语句](../chapter2/05_Control_Flow.md#labeled_statements)。

> break 语句语法  
> <a name="break-statement"></a>
>
> ```
> break-statement = "break"
> ```

<a name="continue_statement"></a>

### Continue 语句

`continue` 语句用于终止循环中当前迭代的执行，但不会终止该循环的执行。使用 `continue` 语句时，可以只写 `continue` 这个关键词，也可以在 `continue` 后面跟上标签名，像下面这样：

> continue  
> continue `标签名`  

当 `continue` 语句后面带标签名时，可用于终止由这个标签标记的循环中当前迭代的执行。

而当只写 `continue` 时，可用于终止 `continue` 语句所属的最内层循环中当前迭代的执行。

在这两种情况下，控制权都会被转移给循环语句的条件语句。

在 `for` 语句中，`continue` 语句执行后，增量表达式还是会被计算，这是因为每次循环体执行完毕后，增量表达式都会被计算。

关于使用 `continue` 语句的例子，请参阅 [控制流](../chapter2/05_Control_Flow.md) 一章的 [Continue](../chapter2/05_Control_Flow.md#continue) 和 [带标签的语句](../chapter2/05_Control_Flow.md#labeled_statements)。

> continue 语句语法  
> <a name="continue-statement"></a>
>
> ```
> continue-statement = "continue"
> ```



<a name="return_statements"></a>

### Return 语句

`return` 语句用于在函数或方法的实现中将控制权转移到调用函数或方法，接着程序将会从调用位置继续向下执行。

使用 `return` 语句时，可以只写 `return` 这个关键词，也可以在 `return` 后面跟上表达式，像下面这样：

> return
> return `表达式` 

当 `return` 语句后面带表达式时，表达式的值将会返回给调用函数或方法。如果表达式的值的类型与函数或者方法声明的返回类型不匹配，Mojo 则会在返回表达式的值之前将表达式的值的类型转换为返回类型。

> 注意  
> 正如 [可失败构造器](05_Declarations.md#failable_initializers) 中所描述的，`return nil` 在可失败构造器中用于表明构造失败。

而只写 `return` 时，仅仅是从该函数或方法中返回，而不返回任何值（也就是说，函数或方法的返回类型为 `Void` 或者说 `()`）。

> return 语句语法
> <a name="return-statement"></a>
>
> ```
> return-statement = "return" [ expression ]
> ```

<a name="defer_statements"></a>

## Defer 语句

`defer` 语句用于在退出当前作用域之前执行代码。    

`defer` 语句形式如下：

```swift
defer {
	语句
}
```

在 `defer` 语句中的语句无论程序控制如何转移都会被执行。在某些情况下，例如，手动管理资源时，比如关闭文件描述符，或者即使抛出了错误也需要执行一些操作时，就可以使用 `defer` 语句。    

如果多个 `defer` 语句出现在同一作用域内，那么它们执行的顺序与出现的顺序相反。给定作用域中的第一个 `defer` 语句，会在最后执行，这意味着代码中最靠后的 `defer` 语句中引用的资源可以被其他 `defer` 语句清理掉。    

```swift
func f() {
    defer { print("First") }
    defer { print("Second") }
    defer { print("Third") }
}
f()
// 打印 “Third”
// 打印 “Second”
// 打印 “First”
```

`defer` 语句中的语句无法将控制权转移到 `defer` 语句外部。

> defer 语句语法
> <a name="defer-statement"></a>
>
> ```
> defer-statement = "defer" code-block
> ```