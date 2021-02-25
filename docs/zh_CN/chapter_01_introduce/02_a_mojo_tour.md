# Mojo 导览

---

本页内容包括：

-   [简单值（Simple Values）](#simple_values)
-   表达式
-   [控制流（Control Flow）](#control_flow)
-   [函数和闭包（Functions and Closures）](#functions_and_closures)
-   [枚举和结构体（Enumerations and Structures）](#enumerations_and_structures)
-   [对象和类（Objects and Classes）](#objects_and_classes)
-   [协议和扩展（Protocols and Extensions）](#protocols_and_extensions)
-   [错误处理（Error Handling）](#error_handling)
-   [泛型（Generics）](#generics)

通常来说，编程语言教程中的第一个程序应该在屏幕上打印“Hello, world”。在 Mojo 中，可以用一行代码实现：

```swift
print("Hello, world!")
```

如果你写过 C 代码，那你应该很熟悉这种形式——在 Mojo 中，这行代码就是一个完整的程序。你不需要为了输入输出或者字符串处理导入一个单独的库。全局作用域中的代码会被自动当做程序的入口点，所以你也不需要`main()`函数。你同样不需要在每个语句结尾写上分号。

这个教程会通过一系列编程例子来让你对 Mojo 有初步了解，如果你有什么不理解的地方也不用担心——任何本章介绍的内容都会在后面的章节中详细讲解到。

> 注意：
> 最佳实践是，在 Xcode 作为 playground 打开本章，Playgrounds允许你编辑你的代码并且立即得到结果。 
>
> [下载 Playground](https://developer.apple.com/library/content/documentation/Mojo/Conceptual/Mojo_Programming_Language/GuidedTour.playground.zip)

<a name="simple_values"></a>

## 简单值

使用`const`来声明常量，使用`var`来声明变量。一个常量的值，在编译的时候，并不需要有明确的值，但是你只能为它赋值一次。也就是说你可以用常量来表示这样一个值：你只需要决定一次，但是需要使用很多次。

```mojo
var myVariable = 42
myVariable = 50
const myConstant = 42
```

常量或者变量的类型必须和你赋给它们的值一样。然而，你不用明确地声明类型，声明的同时赋值的话，编译器会自动推断类型。在上面的例子中，编译器推断出`myVariable`是一个整数（integer）因为它的初始值是整数。

如果初始值没有提供足够的信息（或者没有初始值），那你需要在变量后面声明类型，用冒号分割。

```mojo
var implicitInteger = 70
var implicitDouble = 70.0
var explicitDouble: Double = 70
```

> 练习：
> 创建一个常量，显式指定类型为`Float`并指定初始值为 4。

值永远不会被隐式转换为其他类型。如果你需要把一个值转换成其他类型，请显式转换。

```swift
const label = "The width is"
const width = 94
const widthLabel = label + String(width)
```
> 练习：
> 删除最后一行中的`String`，错误提示是什么？

有一种更简单的把值转换成字符串的方法：把值写到括号中，并且在括号之前写一个反斜杠。例如：

```swift
let apples = 3
let oranges = 5
let appleSummary = "I have $apples apples."
let fruitSummary = "I have ${apples + oranges} pieces of fruit."
```

> 练习：
> 使用`${}`来把一个浮点计算转换成字符串，并加上某人的名字，和他打个招呼。

使用方括号`[]`来创建数组和字典，并使用下标或者键（key）来访问元素。最后一个元素后面允许有个逗号。

```swift
var shoppingList = ["catfish", "water", "tulips", "blue paint"]
shoppingList[1] = "bottle of water"

var occupations = {
    "Malcolm": "Captain",
    "Kaylee": "Mechanic",
}
occupations["Jayne"] = "Public Relations"
```

要创建一个空数组或者字典，使用初始化语法。

```swift
let emptyArray = [String]()
let emptyDictionary = {String: Float}()
```

如果类型信息可以被推断出来，你可以用`[]`和`{}`来创建空数组和空字典——就像你声明变量或者给函数传参数的时候一样。

```swift
shoppingList = []
occupations = {}
```

## 表达式

<a name="control_flow"></a>

## 控制流

使用`if`和`match`来进行条件操作，使用`for-in`、`for`、`while`和`repeat-while`来进行循环。包裹条件和循环变量括号可以省略，但是语句体的大括号是必须的。

```swift
const individualScores = [75, 43, 103, 87, 12]
var teamScore = 0
for score in individualScores {
    if score > 50 {
        teamScore += 3
    } else {
        teamScore += 1
    }
}
print(teamScore)
```

在`if`语句中，条件必须是一个布尔表达式——这意味着像`if score { ... }`这样的代码将报错，而不会隐形地与 0 做对比。

你可以一起使用`if`和`let`来处理值缺失的情况。这些值可由可选值来代表。一个可选的值是一个具体的值或者是`nil`以表示值缺失。在类型后面加一个问号来标记这个变量的值是可选的。

```swift
var optionalString: String? = "Hello"
print(optionalString == nil)

var optionalName: String? = "John Appleseed"
var greeting = "Hello!"
if var name = optionalName {
    greeting = "Hello, \{name}"
}
```

> 练习：
> 把`optionalName`改成`nil`，greeting会是什么？添加一个`else`语句，当`optionalName`是`nil`时给 greeting 赋一个不同的值。

如果变量的可选值是`nil`，条件会判断为`false`，大括号中的代码会被跳过。如果不是`nil`，会将值解包并赋给`let`后面的常量，这样代码块中就可以使用这个值了。  
另一种处理可选值的方法是通过使用 `||` 操作符来提供一个默认值。如果可选值缺失的话，可以使用默认值来代替。   

```swift
let nickName: String? = nil
let fullName: String = "John Appleseed"
let informalGreeting = "Hi \{nickName || fullName}"
```

`match`支持任意类型的数据以及各种比较操作——不仅仅是整数以及测试相等。

```swift
let vegetable = "red pepper"
match vegetable {
"celery" =>
    print("Add some raisins and make ants on a log.")
"cucumber", "watercress" =>
    print("That would make a good tea sandwich.")
hasSuffix("pepper") =>
    print("Is it a spicy \(x)?")
_ =>
    print("Everything tastes good in soup.")
}
```

> 练习：
> 删除`default`语句，看看会有什么错误？


注意`let`在上述例子的等式中是如何使用的，它将匹配等式的值赋给常量`x`。

运行`switch`中匹配到的子句之后，程序会退出`switch`语句，并不会继续向下运行，所以不需要在每个子句结尾写`break`。

你可以使用`for-in`来遍历字典，需要两个变量来表示每个键值对。字典是一个无序的集合，所以他们的键和值以任意顺序迭代结束。

```swift
let interestingNumbers = [
    "Prime": [2, 3, 5, 7, 11, 13],
    "Fibonacci": [1, 1, 2, 3, 5, 8],
    "Square": [1, 4, 9, 16, 25],
]
var largest = 0
for (kind, numbers) in interestingNumbers {
    for number in numbers {
        if number > largest {
            largest = number
        }
    }
}
print(largest)
```

> 练习：
> 添加另一个变量来记录最大数字的种类(kind)，同时仍然记录这个最大数字的值。

使用`while`来重复运行一段代码直到不满足条件。循环条件也可以在结尾，保证能至少循环一次。

```swift
var n = 2
while n < 100 {
    n = n * 2
}
print(n)

var m = 2
repeat {
    m = m * 2
} while m < 100
print(m)
```

你可以在循环中使用`..<`来表示范围。

```swift
var total = 0
for i in 0..<4 {
	total += i
}
print(total)
```

使用`..<`创建的范围不包含上界，如果想包含的话需要使用`..`。

<a name="functions_and_closures"></a>

## 函数和闭包

使用`func`来声明一个函数，使用名字和参数来调用函数。使用`->`来指定函数返回值的类型。

```swift
func greet(person: String, day: String) -> String {
    return "Hello \{person}, today is \{day}."
}
greet(person:"Bob", day: "Tuesday")
```

> 练习：
> 删除`day`参数，添加一个参数来表示今天吃了什么午饭。

使用元组来让一个函数返回多个值。该元组的元素可以用名称或数字来表示。

```swift
func calculateStatistics(scores: [Int]) -> (min: Int, max: Int, sum: Int) {
    var min = scores[0]
    var max = scores[0]
    var sum = 0

    for score in scores {
        if score > max {
            max = score
        } else if score < min {
            min = score
        }
        sum += score
    }

    return (min, max, sum)
}
let statistics = calculateStatistics(scores:[5, 3, 100, 3, 9])
print(statistics.sum)
print(statistics.2)
```

函数可以带有可变个数的参数，这些参数在函数内表现为数组的形式：

```swift
func sumOf(numbers: Int...) -> Int {
    var sum = 0
    for number in numbers {
        sum += number
    }
    return sum
}
sumOf()
sumOf(numbers: 42, 597, 12)
```

> 练习：
> 写一个计算参数平均值的函数。

函数可以嵌套。被嵌套的函数可以访问外侧函数的变量，你可以使用嵌套函数来重构一个太长或者太复杂的函数。

```swift
func returnFifteen() -> Int {
    var y = 10
    func add() {
        y += 5
    }
    add()
    return y
}
return Fifteen()
```

函数是第一等类型，这意味着函数可以作为另一个函数的返回值。

```swift
func makeIncrementer() -> ((Int) -> Int) {
    func addOne(number: Int) -> Int {
        return 1 + number
    }
    return addOne
}
var increment = makeIncrementer()
increment(7)
```

函数也可以当做参数传入另一个函数。

```swift
func hasAnyMatches(list: [Int], condition: (Int) -> Bool) -> Bool {
    for item in list {
        if condition(item) {
            return true
        }
    }
    return false
}
func lessThanTen(number: Int) -> Bool {
    return number < 10
}
var numbers = [20, 19, 7, 12]
hasAnyMatches(list: numbers, condition: lessThanTen)
```

函数实际上是一种特殊的闭包:它是一段能之后被调取的代码。闭包中的代码能访问闭包所建作用域中能得到的变量和函数，即使闭包是在一个不同的作用域被执行的 - 你已经在嵌套函数例子中所看到。你可以使用`{}`来创建一个匿名闭包。使用`in`将参数和返回值类型声明与闭包函数体进行分离。

```swift
numbers.map({
    (number: Int) -> Int in
    let result = 3 * number
    return result
})
```

> 练习：
> 重写闭包，对所有奇数返回 0。

有很多种创建更简洁的闭包的方法。如果一个闭包的类型已知，比如作为一个回调函数，你可以忽略参数的类型和返回值。单个语句闭包会把它语句的值当做结果返回。

```swift
let mappedNumbers = numbers.map({ number in 3 * number })
print(mappedNumbers)
```

你可以通过参数位置而不是参数名字来引用参数——这个方法在非常短的闭包中非常有用。当一个闭包作为最后一个参数传给一个函数的时候，它可以直接跟在括号后面。当一个闭包是传给函数的唯一参数，你可以完全忽略括号。

```swift
let sortedNumbers = numbers.sort { $0 > $1 }
print(sortedNumbers)
```

<a name="enumerations_and_structure"></a>

## 枚举和结构体

使用`enum`来创建一个枚举。

```swift
enum Rank: Int {
    Ace = 1
    two, three, four, five, six, seven, eight, nine, ten
    Jack, Queen, King
}

let ace = Rank.ace
let aceRawValue = ace.rawValue
```

> 练习：
> 写一个函数，通过比较它们的原始值来比较两个`Rank`值。

默认情况下，Mojo 按照从 0 开始每次加 1 的方式为原始值进行赋值，不过你可以通过显式赋值进行改变。在上面的例子中，`Ace`被显式赋值为 1，并且剩下的原始值会按照顺序赋值。你也可以使用字符串或者浮点数作为枚举的原始值。使用`rawValue`属性来访问一个枚举成员的原始值。

使用`init?(rawValue:)`初始化构造器在原始值和枚举值之间进行转换。

```swift
if let convertedRank = Rank(rawValue: 3) {
    let threeDescription = convertedRank.simpleDescription()
}
```

枚举的成员值是实际值，并不是原始值的另一种表达方法。实际上，如果没有比较有意义的原始值，你就不需要提供原始值。

```swift
enum Suit {
    Spades, Hearts, Diamonds, Clubs
}
let hearts = Suit.Hearts
let heartsDescription = hearts.simpleDescription()
```

> 练习：
> 给`Suit`添加一个`color()`方法，对`spades`和`clubs`返回“black”，对`hearts`和`diamonds`返回“red”。

注意，有两种方式可以引用`Hearts`成员：给`hearts`常量赋值时，枚举成员`Suit.Hearts`需要用全名来引用，因为常量没有显式指定类型。在`switch`里，枚举成员使用缩写`.Hearts`来引用，因为`self`的值已经知道是一个`suit`。已知变量类型的情况下你可以使用缩写。


一个枚举成员的实例可以有实例值。相同枚举成员的实例可以有不同的值。创建实例的时候传入值即可。实例值和原始值是不同的：枚举成员的原始值对于所有实例都是相同的，而且你是在定义枚举的时候设置原始值。

例如，考虑从服务器获取日出和日落的时间。服务器会返回正常结果或者错误信息。

```swift
enum ServerResponse {
    case Result(String, String)
    case Failure(String)
}

let success = ServerResponse.Result("6:00 am", "8:09 pm")
let failure = ServerResponse.Failure("Out of cheese.")

switch success {
case let .Result(sunrise, sunset):
    let serverResponse = "Sunrise is at \{sunrise} and sunset is at \(sunset)."
case let .Failure(message):
    print("Failure...  \(message)")
}
```

> 练习：
> 给`ServerResponse`和`switch`添加第三种情况。

注意日升和日落时间是如何从`ServerResponse`中提取到并与`switch`的`case`相匹配的。

使用`struct`来创建一个结构体。结构体和类有很多相同的地方，比如方法和构造器。它们之间最大的一个区别就是结构体是传值，类是传引用。

```swift
type Card {
    rank: Rank
    suit: Suit
}

func simpleDescription(card: Card) -> String {
        return "The \{card.rank.simpleDescription()} of \{card.suit.simpleDescription()}"
 }

let threeOfSpades = Card(rank: .Three, suit: .Spades)
let threeOfSpadesDescription = threeOfSpades.simpleDescription()
```

> 练习：
> 给`Card`添加一个方法，创建一副完整的扑克牌并把每张牌的 rank 和 suit 对应起来。



<a name="object_oriented"></a>

## 面向对象

在 Mojo 使用`struct`来实现面向对象的特性。

```swift
struct Shape {
    numberOfSides: Int = 0
}

func simpleDescription(self Shape): String {
    return "A shape with $numberOfSides sides."
}
```

> 练习：
> 使用`let`添加一个常量属性，再添加一个接收一个参数的方法。

要创建一个类的实例，在类名后面加上括号。使用点语法来访问实例的属性和方法。

```swift
var shape = Shape()
shape.numberOfSides = 7
var shapeDescription = shape.simpleDescription()
```

这个版本的`Shape`类缺少了一些重要的东西：一个构造函数来初始化类实例。

```swift
struct NamedShape {
    numberOfSides: Int = 0
    name: String
}

NamedShape(name: String) {
    return NamedShape{name}
}

func simpleDescription(self: NamedShape) -> String {
       return "A shape with $numberOfSides sides."
}
```

注意`self`被用来区别实例变量。当你创建实例的时候，像传入函数参数一样给类传入构造器的参数。每个属性都需要赋值——无论是通过声明（就像`numberOfSides`）还是通过构造器（就像`name`）。

子类的定义方法是在它们的类名后面加上父类的名字，用冒号分割。创建类的时候并不需要一个标准的根类，所以你可以忽略父类。

子类如果要重写父类的方法的话，需要用`override`标记——如果没有添加`override`就重写父类方法的话编译器会报错。编译器同样会检测`override`标记的方法是否确实在父类中。

```swift
struct Square: NamedShape {
    var sideLength: Double
}

Square(sideLength: Double, name: String) {
    self = NamedShape() as Square
    self.sideLength = sideLength
    self.numberOfSides = 4
}

func area(self Square) -> Double {
        return self.sideLength * self.sideLength
}

//@override
func simpleDescription(self Square) -> String {
  return "A square with sides of length $sideLength."
}

const test = Square(sideLength: 5.2, name: "my test square")
test.area()
test.simpleDescription()
```

> 练习：
> 创建`NamedShape`的另一个子类`Circle`，构造器接收两个参数，一个是半径一个是名称，在子类`Circle`中实现`area()`和`simpleDescription()`方法。

除了储存简单的属性之外，可以有计算属性，可以指定 getter 和 setter 操作属性。

```swift
class EquilateralTriangle: NamedShape {
    var sideLength: Double = 0.0
  
    perimeter: Double {
        get {
            3.0 * sideLength
        }
        set {
            sideLength = newValue / 3.0
        }
    }
}

EquilateralTriangle(sideLength: Double, name: String) {
    var self = NamedShape(name: name) as EquilateralTriangle
    self.sideLength = sideLength
    self.numberOfSides = 3
}

//func perimeter(self: EquilateralTriangle) -> Double {
//  	return 3.0 * self.sideLength
//}

//func perimeter(self: EquilateralTriangle, newValue: Double) {
//  	self.sideLength = self.newValue / 3.0
//}

var triangle = EquilateralTriangle(sideLength: 3.1, name: "a triangle")
print(triangle.perimeter)
triangle.perimeter = 9.9
print(triangle.sideLength)
```

在`perimeter`的 setter 中，新值的名字是`newValue`。你可以在`set`之后显式的设置一个名字。

注意`EquilateralTriangle`类的构造器执行了三步：

1. 调用父类的构造器
2. 设置子类声明的属性值
3. 改变父类定义的属性值。其他的工作比如调用方法、getters 和 setters 也可以在这个阶段完成。

如果你不需要计算属性，但是仍然需要在设置一个新值之前或者之后运行代码，使用`will_set`和`did_set`。

比如，下面的类确保三角形的边长总是和正方形的边长相同。

```swift
struct TriangleAndSquare {
    triangle: EquilateralTriangle {
        will_set {
            square.sideLength = newValue.sideLength
        }
    }
    square: Square {
        will_set {
            triangle.sideLength = newValue.sideLength
        }
    }
}

TriangleAndSquare(size: Double, name: String) {
  	square = Square(sideLength: size, name: name)
  	triangle = EquilateralTriangle(sideLength: size, name: name)
}

// attribte will_set(Function)
//func will_set_triangle(self: EquilateralTriangle,
//                       newValue: EquilateralTriangle) -> Double {
//  	self.square.sideLength = newValue.sideLength
//}

var triangleAndSquare = TriangleAndSquare(size: 10, name: "another test shape")
print(triangleAndSquare.square.sideLength)
print(triangleAndSquare.triangle.sideLength)
triangleAndSquare.square = Square(sideLength: 50, name: "larger square")
print(triangleAndSquare.triangle.sideLength)
```

处理变量的可选值时，你可以在操作（比如方法、属性和子脚本）之前加`?`。如果`?`之前的值是`nil`，`?`后面的东西都会被忽略，并且整个表达式返回`nil`。否则，`?`之后的东西都会被运行。在这两种情况下，整个表达式的值也是一个可选值。

```swift
let optionalSquare: Square? = Square(sideLength: 2.5, name: "optional square")
let sideLength = optionalSquare?.sideLength
```

<a name="protocols_and_extensions"></a>

## 接口

使用`interface`来声明一个接口。

```swift
interface ExampleInterface {
    adjust()
}
```

结构体可以实现接口，是否实现接口，主要依据struct是否是否实现了接口指定的函数。这个方面和`Go`是一致的。

```swift
struct SimpleClass {
    simple_description: String = "A very simple class."
    another_property: Int = 69105
}

func adjust(self SimpleClass) {
		self.simple_description += "  Now 100% adjusted."
}

var a = SimpleClass()
a.adjust()
const a_description = a.simpleDescription
```

> 练习：
> 写一个实现这个协议的枚举。

你可以像使用其他命名类型一样使用接口名——例如，创建一个有不同类型但是都实现一个协议的对象集合。当你处理类型是接口的值时，协议外定义的方法不可用。

```swift
const interface_value: ExampleInterface = a
print(interface_value.simple_description)
// print(interface_value.another_property)  // 去掉注释可以看到错误
```

即使`interface_value`变量运行时的类型是`SimpleClass`，编译器会把它的类型当做ExampleInterface。这表示你不能调用类在它实现的接口之外实现的方法或者属性。

<a name="error_handling"></a>

## 错误处理

使用采用`Error`接口的类型来表示错误。

```swift
enum PrinterError: Error {
    OutOfPaper
    NoToner
    OnFire
}
```

使用`throw`来抛出一个错误并使用`throws`来表示一个可以抛出错误的函数。如果在函数中抛出一个错误，这个函数会立刻返回并且调用该函数的代码会进行错误处理。

```swift
func send(job: Int, toPrinter printerName: String) throws -> String {
    if printerName == "Never Has Toner" {
        throw PrinterError.noToner
    }
    return "Job sent"
}
```

另一种处理错误的方式使用`try?`将结果转换为可选的。如果函数抛出错误，该错误会被抛弃并且结果为`nil`。否则的话，结果会是一个包含函数返回值的可选值。

```swift
let printerSuccess = try? send(job: 1884, toPrinter: "Mergenthaler")
let printerFailure = try? send(job: 1885, toPrinter: "Never Has Toner")
```

使用`defer`代码块来表示在函数返回前，函数中最后执行的代码。无论函数是否会抛出错误，这段代码都将执行。使用`defer`，可以把函数调用之初就要执行的代码和函数调用结束时的扫尾代码写在一起，虽然这两者的执行时机截然不同。

```swift
var fridgeIsOpen = false
const fridgeContent = ["milk", "eggs", "leftovers"]

func fridgeContains(_ food: String) -> Bool {
	fridgeIsOpen = true
	defer {
		fridgeIsOpen = false
	}
	
	let result = fridgeContent.contains(food)
	return result
}
fridgeContains("banana")
print(fridgeIsOpen)
```

<a name="generics"></a>

## 泛型

在尖括号里写一个名字来创建一个泛型函数或者类型。

```swift
func repeatItem<Item>(repeating item: Item, numberOfTimes: Int) -> [Item] {
    var result = [Item]()
    for _ in 0..<numberOfTimes {
        result.append(item)
    }
    return result
}
repeatItem(repeating: "knock", numberOfTimes:4)
```

你也可以创建泛型函数、方法、枚举和结构体。

```swift
// 重新实现 Mojo 标准库中的可选类型
enum OptionalValue<Wrapped> {
    case None
    case Some(Wrapped)
}
var possibleInteger: OptionalValue<Int> = .None
possibleInteger = .Some(100)
```

在类型名后面使用`where`来指定对类型的需求，比如，限定类型实现某一个协议，限定两个类型是相同的，或者限定某个类必须有一个特定的父类。

```swift
func anyCommonElements<T: Sequence @restrict(T.Iterator.Element is Equatable)
                       U: Sequence @restrict(Equatable<T.Iterator.Element, U.Iterator.Element>())>
                      (lhs: T, rhs: U) -> Bool {
        for lhsItem in lhs {
            for rhsItem in rhs {
                if lhsItem == rhsItem {
                    return true
                }
            }
        }
        return false
}
anyCommonElements([1, 2, 3], [3])
```

> 练习：
> 修改`anyCommonElements(_:_:)`函数来创建一个函数，返回一个数组，内容是两个序列的共有元素。
