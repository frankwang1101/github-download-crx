$(function () {
  $('.btns').on('click', 'button', function (ev) {
    var id = $(this).attr('id')
    switch(id){
      case 'memory':{
        sendMsg({
          type: 'memory'
        })
        break;
      }
      case 'shot':{
        sendMsg({
          type: 'shot'
        })
        break;
      }
    }
  })
})

function sendMsg(data) {
  chrome.runtime.sendMessage(data);
}

function changeTo(type){
  if (type === 2){
    $('.wrap[data-type=2]').show()
    $('.wrap[data-type=1]').hide()
  } else {
    $('.wrap[data-type=1]').show()
    $('.wrap[data-type=2]').hide()
  }
}

chrome.runtime.onMessage.addListener(
  function (arg, sender, sendResponse) {
    // 如果接收的消息类型是bkNode 解析树节点
    if(arg.type === 'bkNode') {
      changeTo(2)
      renderNode(arg.node)
    }
  });