import { Descriptions, message, Upload, UploadProps } from 'antd'
import { InboxOutlined } from '@ant-design/icons/lib/icons'
import { useState } from 'react'
import { fileTypeFromBuffer } from 'file-type'
import styles from './index.module.less'

interface IInfo {
  name?: string
  mime?: string
  size?: number
}

const ImageCheck = () => {
  const [info, setInfo] = useState<IInfo | null>(null)

  const { Dragger } = Upload

  const action: UploadProps['action'] = async (file) => {
    if (!file) {
      message.error('文件上传失败')
      return Promise.reject()
    }

    setInfo(null)

    const reader = new FileReader()
    reader.onload = async function (e) {
      const arrayBuffer = e.target?.result
      if (!arrayBuffer) {
        return
      }
      const res = await fileTypeFromBuffer(arrayBuffer as ArrayBuffer)
      if (!res) {
        message.error('不支持的文件格式')
        return
      }
      setInfo({
        name: file.name,
        mime: res.mime,
        size: file.size,
      })
    }

    // 读取文件为二进制字符串
    reader.readAsArrayBuffer(file)

    return ''
  }

  return (
    <div className={styles['image-check']}>
      <Dragger maxCount={1} action={action}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>点击或拖拽文件到这里上传</p>
      </Dragger>
      {info && (
        <Descriptions title='文件信息' bordered>
          <Descriptions.Item label='文件名'>{info.name}</Descriptions.Item>
          <Descriptions.Item label='MIME type'>{info.mime}</Descriptions.Item>
          <Descriptions.Item label='文件大小'>
            {info.size ? `${(info.size / 1024).toFixed(1)} kB` : '--'}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  )
}

export default ImageCheck
