function render() {
  let url = location.href // 获取当前地址
  const isGithub = !!~url.indexOf('github') // 判断是文件详情页面还是目录页面
  const isMenu = !~url.indexOf('/blob/')
  if (isMenu) { // 目录页面，遍历a链接， 加上下载按钮
    const query = !isGithub ? '.table-holder .tree-item .tree-item-file-name a' : '.file-wrap tbody .js-navigation-item .content a'

    let fileWrap = document.querySelectorAll(query)
    fileWrap = [].filter.call(fileWrap, el => ~el.href.indexOf('/blob/'))
    fileWrap.forEach((el) => {
      let link = el.href
      let p = el.parentElement
      if (isGithub) {
        p = p.parentElement
      }
      p.appendChild(genBtn(link, 'span', {
        padding: '0 10px',
        marginLeft: '6px'
      }))
    })
  } else { // 文件页面，加上下载按钮
    const query = !isGithub ? '.file-actions .btn-group:first-child' : '.file-header .file-actions .BtnGroup'
    const group = document.querySelector(query)
    const link = url.replace('/blob/', '/raw/')
    group.prepend(genBtn(link, !isGithub ? 'button' : 'a', {}, !isGithub ? '' : 'btn-sm BtnGroup-item'))
  }

  // 生成下载按钮
  function genBtn(href, type, style, className) {
    const a = document.createElement(type)
    a.className = 'btn'
    a.onclick = function (e) {
      e.preventDefault()
      e.stopPropagation()
      const a = document.createElement('a')
      let filename = a.download = href.substr(href.lastIndexOf('/') + 1)
      const url = a.href = href.replace('/blob/', '/raw/')
      a.style.visibility = 'hidden'
      if (filename[0] === '.') {
        filename = filename.substr(1)
      }
      // 调用chrome的api发送下载消息
      chrome.runtime.sendMessage({
        type: 'download',
        url,
        filename,
      });
    }
    a.innerHTML = 'download'
    if (className) {
      a.className += ` ${className}`
    }
    for (let key in style) {
      a.style[key] = style[key]
    }
    return a
  }

}
// github 采用了pjax， 需要检测其完成事件去生成按钮
document.addEventListener('pjax:success', function(){
  setTimeout(render, 200)
})
render();
