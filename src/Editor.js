import React from 'react'
import Vditor from 'vditor'
import axios from 'axios'
import 'vditor/src/assets/scss/index.scss'
import './assets/editor.scss';
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
    let content = '# something new↵↵## seceond ang↵↵### let it work!↵↵| good | price | count |↵| :- | :-: | -: |↵| t-shirt | 123 | 21 |↵| paint | 999 | 3 |↵↵#### 四级标题↵↵##### **五级标题**↵↵###### 六级标题↵↵no matter how ,no matter what, no matter where, they are↵'
    content = content.replace(/↵/g, '\n')
    this.state = {
      // content: '# 一级标题\n\n## 二级标题\n\n### 三级标题\n\n| col11111 | col2 | col222223 |\n| :- | :-: | -: |\n| 1 | d | a |\n| 1 | x | a |\n#### 四级标题\n\n##### **五级标题**\n\n![Lark20200512154957.png](http://localhost:8087/image/Lark20200512154957.png)\n\n###### 六级标题\n'
      content
    }
  }

  componentDidMount () {
    let con = this.state.content
    let that = this
    let config = {
      theme: 'ob-doc',
      cache: false,
      toolbar: [
        "headings",
        "bold",
        "italic",
        "strike",
        "link",

        "list",
        "ordered-list",
        "outdent",
        "indent",

        "quote",
        "line",
        "code",
        "inline-code",
        "insert-before",
        "insert-after",

        "table",
        "upload",
        "emoji",

        "undo",
        "redo",
      ],
      tab: '\t',
      mode: 'wysiwyg',
      upload: {
        url: 'http://localhost:8087/api/v1/doc/upload',
        success(vditor, body) {
          console.log(arguments)
          let res = JSON.parse(body)
          if (res.code == 0 && res.data && res.data.succFiles) {
            let files = res.data.succFiles
            files.forEach(item => {
              let { name, src, type } = item
              let node = ''
              switch(type) {
                case 'image':
                  node = `<img src=${src} alt="${name}">`
                  break
                case 'video':
                  node = `<video src="${src}" controls controlsList="nodownload" oncontextmenu="return false" alt="${name}"/>`
                  break
                case 'audio':
                  node = `<audio src="${src}" controls controlsList="nodownload" oncontextmenu="return false" alt="${name}"/>`
                  break
                default:
                  node = `<a href="${src}" target="_blank">${name}</a>`
              }
              console.log(node)
              that.vditor.insertValue(node)
              
            })
          }
        }
      },
      after: function() {
        that.vditor.setValue(con)
      }
    }
    this.vditor = new Vditor('editor', config)
  }

  create () {
    let md = this.vditor.getValue();
    let params = {
      content: md
    }
    axios.post('http://localhost:3006/api/md', params)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log('catch ', err)
      })
  }
  update () {
    let md = this.vditor.getValue();
    let params = {
      aid: 'hihi',
      content: md
    }
    axios.post('http://localhost:3006/api/md/update', params)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log('catch ', err)
      })
  }
  delete () {
    let params = {
      aid: 'hihi'
    }
    axios.post('http://localhost:3006/api/md/del', params)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log('catch ', err)
      })
  }

  
  render () {
    return (
      <div>
        <header style={headerStyle}></header>
        <section style={sectionStyle}>
          <aside style={asideStyle}>
            <button onClick={this.create.bind(this)}>创建</button>
            <button onClick={this.update.bind(this)}>更新</button>
            <button onClick={this.delete.bind(this)}>删除</button>
          </aside>
          <div id="editor" className="my-editor" style={editorStyle}></div>
        </section>
      </div>
    )
  }

}

export default Editor;
