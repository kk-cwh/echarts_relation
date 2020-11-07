var myChart = echarts.init(document.getElementById('main'))
var colorConfig = ['#61afff', '#91c7ae', '#d48265']
var ships = []
for (let index = 0; index < 5; index++) {
  ships.push({
    name: '实体' + (index + 1),
    value: index + 1,
    entityId: index + 1,
  })
}
var attributes = []
var arr = ['属性', '文章', '文档', '场景', '信息表']
for (let index = 0; index < 5; index++) {
  attributes.push({
    attributeName: arr[index] + (index + 1),
    value: index + 1,
    relatedId: index + 1,
    type: index,
  })
}

var dataList = []
var linkList = []
var firstEntity = {
  name: '中心实体',
  value: '中心实体',
  itemStyle: {
    color: colorConfig[1],
  },
  entityId: 0,
}
dataList.push(firstEntity)

for (let index = 0; index < ships.length; index++) {
  dataList.push({
    name: ships[index].name,
    value: ships[index].name,
    entityId: ships[index].entityId,
    itemStyle: {
      color: colorConfig[1],
    },
  })
  linkList.push({
    source: firstEntity.name,
    target: ships[index].name,
    value: firstEntity.name + '-' + ships[index].name,
  })
}

for (let index = 0; index < attributes.length; index++) {
  dataList.push({
    name: attributes[index].attributeName,
    value: attributes[index].attributeName,
    relatedId: attributes[index].relatedId,
    itemStyle: {
      color: attributes[index].type > 0 ? colorConfig[2] : colorConfig[0],
    },
  })
  linkList.push({
    source: firstEntity.name,
    target: attributes[index].attributeName,
    value: firstEntity.name + '-' + attributes[index].attributeName,
  })
}

var openObj = { 0: true }
var data = [
  {
    name: '节点1',
    value: 'v1',
    isOpen: true,
    itemStyle: {
      color: '#0f0',
    },
  },
  {
    name: '节点2',
    value: 'v2',
    itemStyle: {
      color: '#f40',
    },
  },
  {
    name: '节点3',
    value: 'v3',
    itemStyle: {
      color: '#f40',
    },
  },
  {
    name: '节点4',
    value: 'v4',
    itemStyle: {
      color: '#f40',
    },
  },
  {
    name: '节点5',
    value: 'v5',
    itemStyle: {
      color: '#00f',
    },
  },
]

var links = [
  {
    source: '节点1',
    target: '节点2',
    value: '关系',
  },
  {
    source: '节点1',
    target: '节点3',
    value: '关系',
  },
  {
    source: '节点1',
    target: '节点4',
    value: '关系',
  },
  {
    source: '节点1',
    target: '节点5',
    value: '100',
  },
]

var data = dataList
var links = linkList
// 指定图表的配置项和数据
var option = {
  title: {
    text: 'Graph 简单示例',
  },
  tooltip: {
    trigger: 'item',
    formatter: (params) => {
      return params.data.name
    },
    backgroundColor: '#ff7f50', //提示标签背景颜色
    textStyle: {
      color: '#fff',
    }, //提示标签字体颜色
  },
  series: [
    {
      type: 'graph',
      layout: 'force',
      symbolSize: 60,
      roam: true,
      draggable: true,
      label: {
        show: true,
        formatter: function (params) {
          return params.name.length > 5
            ? params.name.substr(0, 5) + '...'
            : params.name
        },
      },
      edgeSymbolSize: [2, 10],
      edgeLabel: {
        show: true,
        textStyle: {
          fontSize: 10,
        },
        formatter: '{c}',
      },
      force: {
        repulsion: 1000,
        edgeLength: 80,
      },
      data: data,
      links: links,
      lineStyle: {
        opacity: 0.9,
        width: 1,
        curveness: 0,
      },
    },
  ],
}

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option)
myChart.on('click', function (params) {
  console.log(params)
  if (params.dataType === 'node') {
    if (
      params.data.hasOwnProperty('entityId') &&
      !openObj.hasOwnProperty(params.data.entityId)
    ) {
      openObj[params.data.entityId] = true

      var entitys = []
      for (let index = 0; index < 2; index++) {
        entitys.push({
          name: params.name + '_' + (index + 1),
          value: index + 1,
          entityId: Math.floor(Math.random() * 10000),
        })
      }
      var attributeList = []
      var arr = ['属性', '文章', '文档', '场景', '信息表']
      for (let index = 0; index < 3; index++) {
        attributeList.push({
          attributeName: params.name + ' : ' + arr[index] + (index + 1),
          value: index + 1,
          relatedId: index + 1,
          type: index,
        })
      }

      for (let index = 0; index < entitys.length; index++) {
        option.series[0].data.push({
          name: entitys[index].name,
          value: entitys[index].name,
          entityId: entitys[index].entityId,
          itemStyle: {
            color: colorConfig[1],
          },
        })
        option.series[0].links.push({
          source: params.name,
          target: entitys[index].name,
          value: params.name + '-' + entitys[index].name,
        })
      }

      for (let index = 0; index < attributeList.length; index++) {
        option.series[0].data.push({
          name: attributeList[index].attributeName,
          value: attributeList[index].attributeName,
          relatedId: attributeList[index].relatedId,
          itemStyle: {
            color:
              attributeList[index].type > 0 ? colorConfig[2] : colorConfig[0],
          },
        })
        option.series[0].links.push({
          source: params.name,
          target: attributeList[index].attributeName,
          value: params.name + '-' + attributeList[index].attributeName,
        })
      }

      myChart.setOption(option)
    }
  }
})
