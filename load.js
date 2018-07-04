chrome.runtime.onMessage.addListener(
  function (arg, sender, sendResponse) {
    // 如果接收的消息类型是下载，则执行下载api
    if (arg.type === 'download') {
      chrome.downloads.download({
        url: arg.url,
        filename: arg.filename,
      })
    }
  });

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.captureVisibleTab(function (url) {
    chrome.downloads.download({
      url,
      filename: 'screenshot.jpeg',
    })
  })
})