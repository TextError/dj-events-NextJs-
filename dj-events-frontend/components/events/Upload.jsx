import { useState } from 'react'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'

const Upload = ({ id, onUpload }) => {
  const [image, setImage] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'events')
    formData.append('refId', id)
    formData.append('field', 'image')

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      onUpload()
    }
  }

  const onChange = ({ target: { files }}) => {
    setImage(files[0])
  }

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={onSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={onChange} />
        </div>
        <input type='submit' value='Upload' className='btn' />
      </form>
    </div>
  )
}

export default Upload;