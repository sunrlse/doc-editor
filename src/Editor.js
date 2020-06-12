import React from 'react'
import Vditor from 'vditor'
import 'vditor/src/assets/scss/index.scss'
import './assets/obdoc.scss'

const headerStyle = {
  height: '60px',
  background: '#f5f6f7',
  boxShadow: '0 1px 5px #efefef'
}

const sectionStyle = {
  display: 'flex',
  minHeight: 'calc(100vh - 60px)'
}

const asideStyle = {
  width: '200px',
  borderRight: '1px solid rgba(255, 255, 255, .3)'
}

const editorStyle = {
  flex: 1,
}

class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // content: '# 一级标题\n\n## 二级标题\n\n### 三级标题\n\n#### 四级标题\n\n##### **五级标题**\n\n###### 六级标题\n'
      content: `<h1 id="一级标题">一级标题1</h1>
<h2 id="二级标题">二级标题2</h2>
<h3 id="三级标题">三级标题3</h3>
<h4 id="四级标题">四级标题4</h4>
<h5 id="五级标题"><strong>五级标题5</strong></h5>
<h6 id="六级标题">六级标题6</h6>`
    }
  }

  componentDidMount () {
    let con = this.state.content
    let that = this
    this.vditor = new Vditor('editor', {
      theme: 'ob-doc',
      cache: false,
      classes: {
        preview: 'diy-xxx'
      },
      upload: {
        url: 'http://localhost:8087/api/v1/doc/upload'
      },
      after: function() {
        let md = that.vditor.html2md(con)
        console.log(md)
        that.vditor.setValue(md)
      }
    })
  }

  saveHtml () {
    let html = this.vditor.getHTML();
    let val = this.vditor.getValue();
    
    console.log(html)
    console.log(val)
    console.log(JSON.stringify(val))
  }
  
  render () {
    return (
      <div>
        <header style={headerStyle}></header>
        <section style={sectionStyle}>
          <aside style={asideStyle}>
            <button onClick={this.saveHtml.bind(this)}>保存html</button>
          </aside>
          <div id="editor" className="my-editor" style={editorStyle}></div>
        </section>
      </div>
    )
  }

}

export default Editor;
