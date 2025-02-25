import { Input } from 'antd'
import { useEffect, useState } from 'react'
import { JSONPath } from 'jsonpath-plus'
import './index.less'

import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'

const Info = () => {
  const [path, setPath] = useState<string>()
  const [inputJson, setInputJson] = useState<string>()
  const [output, setOutput] = useState<string>()

  useEffect(() => {
    let json = {}
    try {
      json = JSON.parse(inputJson || '{}')
    } catch (e) {
      console.error(e)
    }

    const res = JSONPath({
      path: path || '',
      json,
    })
    setOutput(JSON.stringify(res, null, '\t'))
  }, [path, inputJson])

  return (
    <div className='jp-container'>
      <Input
        placeholder='输入jsonpath语句'
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />

      <div className='jp-container-textarea'>
        <AceEditor
          mode={'json'}
          theme={'github'}
          name='InputJsonpath'
          value={inputJson}
          onChange={(v) => setInputJson(v)}
          wrapEnabled
        />
        <AceEditor
          mode={'json'}
          theme={'github'}
          name='OutputJsonpath'
          value={output}
          readOnly
          wrapEnabled
        />
      </div>
    </div>
  )
}

export default Info
