/**
 * 
 * @param  data 数据流
 * @param  fileName 文件名
 */
export function downloadFile(data, fileName = "", SuffixName = 'xlsx') {
    // if (data.data.type == "application/json" || data.data.type == "text/html;charset=utf-8") {
    //   let reader = new FileReader();
    //   reader.readAsText(data.data);
    //   reader.onload = function (res) {
    //     iView.Notice.error({
    //       title: '操作失败',
    //       desc: JSON.parse(res.target.result).message,
    //       duration: 0
    //     })
    //   }
    // }
    // else {
    const blob = new Blob([data]);
    const name = `${fileName}.${SuffixName}`
    if ('msSaveOrOpenBlob' in navigator) {
      window.navigator.msSaveOrOpenBlob(blob, name);
      return;
    }
    if ('download' in document.createElement('a')) { // 非IE下载
      const elink = document.createElement('a')
      elink.download = name
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    } else { // IE10+下载
  
      navigator.msSaveBlob(blob, name)
    }
    // }
  }