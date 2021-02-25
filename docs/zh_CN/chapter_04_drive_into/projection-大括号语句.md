对象的Projection（相当于literal object，使用现有变量构建新的对象）

1. 初始方式：对象Literal

{
    foo: foo
    bar: bar + "test"
}


2. 省略对象field的值表达式

{
    foo
    bar: bar + "test"
}

3. 对象字段

   ```
   {
   	foo.bar: "test"
   }
   ```

   等同于

   ```
   {
   	foo {
   		bar: "test"
   	}
   }
   ```

lamda

```
{	x: Int -> String in
	x + 5 }
	
{ x: Int -> x+ 5}

{ x + 5 }
	
```

function all

```
function.call(xx, bb) {
}

funcation.call {
}
```

Object init

```
Test {
}
```

等同于

```
Test({

})
```

// code block

```
{
}
```



解构赋值

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

Pattern

1. Tuple Pattern

2. Array Pattern (解构数组)

   ```
   var a, b, rest
   [a, b = 9] = [10, 20]
   
   [a, b, rest...] = [10, 20, 30, 40]
   
   
   {a, b} = { a: 10, b: 20 }
   ```

3. Object Pattern （解构对象/结构)

   ```
   var o = {p: 42, q: true};
   var {p, q} = o;
   var {p: foo, q: bar} = o;
   ```

4. 嵌套对象和数组

   ```
   const metadata = {
     title: 'Scratchpad',
     translations: [
       {
         locale: 'de',
         localization_tags: [],
         last_edit: '2014-04-14T08:43:37',
         url: '/de/docs/Tools/Scratchpad',
         title: 'JavaScript-Umgebung'
       }
     ],
     url: '/en-US/docs/Tools/Scratchpad'
   };
   
   let {
     title: englishTitle, // rename
     translations: [
       {
          title: localeTitle, // rename
       },
     ],
   } = metadata;
   
   console.log(englishTitle); // "Scratchpad"
   console.log(localeTitle);  // "JavaScript-Umgebung"
   ```

5. For each  迭代和解构

   ```
   var people = [
     {
       name: 'Mike Smith',
       family: {
         mother: 'Jane Smith',
         father: 'Harry Smith',
         sister: 'Samantha Smith'
       },
       age: 35
     },
     {
       name: 'Tom Jones',
       family: {
         mother: 'Norah Jones',
         father: 'Richard Jones',
         brother: 'Howard Jones'
       },
       age: 25
     }
   ];
   
   for (var {name: n, family: {father: f}} in people) {
     console.log('Name: ' + n + ', Father: ' + f);
   }
   
   // "Name: Mike Smith, Father: Harry Smith"
   // "Name: Tom Jones, Father: Richard Jones"
   ```

6. 对象属性计算名和解构

   ```
   const key = "z"
   var { `key`: foo } = { z: "bar" }
   
   console.log(foo); // "bar"
   ```

   

   