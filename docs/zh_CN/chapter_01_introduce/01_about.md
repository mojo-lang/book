# 关于 Mojo

------

Mojo 是一种受当代新编程语言（Swift、Go、Rust、Kotlin、Javascript）影响的 DSL 语言，可用于 Schema 定义，结构化数据操作语言。Mojo 具有较好的可扩展性，并且有良好定义的 AST 语法树规范，基于语法树可以支持更多的代码生成等任务。

在面向对象的编程模式方面，Mojo 采用和 Go 类似的 Duck 类型模式。

Mojo 对于初学者来说也很友好。它是一门有趣味性的 DSL 编程语言。<!-- 它支持代码预览(playgrounds)，这个革命性的特性可以允许程序员在不编译和运行应用程序的前提下运行 Mojo 代码并实时查看结果。-->

Mojo 主要定位于结构化数据处理的应用场景。

<!--

类似于PowerShell在shell方面的处理

```
msh> ps({}) | name == 'process_name' | {name:name, usages: count(usage)} | print
```

string -> pbf ast -> engine


类似于SQL在数据库操作方面的处理

```
roads |  grid_clip(3..15) |{
	grid: $
	point_count: $ | point_size | sum()
	geom: $.geom
} | attch_style({
	fill.color: scale(point_count, (100, #ffffff),
					              (300: #ffffdd),
						          (1000: #ffffaa),
						          (2000: #ffff00),
							      (_ #000000))

	symbol.text.name: point_count
}
```

mojo库代码文件命名及存储结构风格

1. module，一个mojo源代码文件即是一个模块，任何模块都会在一个包里

2. package 包，是指多个模块的集合，一般为目录；一个包允许存在多个目录，即子包。  

   

   -->
