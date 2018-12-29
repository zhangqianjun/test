#selector 组件

该组件和hr-picker的主要区别是

1. hr-picker只接受传入的值为简单的数据类型，如 [[1,2,3,4,5], ['00', '01', '02', '03']]，不接受[[{key1: '1', key2: '11'}, {key1: '2', key2: '22'}], [{key3: '1', key4: '11'}, {key1: '2', key2: '22'}]]这种类型，因为picker 中会把整个item渲染出来，如果为对象类型渲染出来的效果会是[object Object]

2. hr-picker接受多维度选择，而selector只接受一维的选择