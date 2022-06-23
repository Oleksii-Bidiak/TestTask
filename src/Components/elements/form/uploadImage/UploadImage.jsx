import React from 'react'
import './uploadImage.scss'

const UploadImage = ({ value, handler, blurHandler }) => {
   const [image, isDirty, error] = value
   return (
      <div className='form__file'>
         <div className='file-form'>
            <div className="file-form__item">
               <input
                  onChange={(e) => handler(e)}
                  onBlur={(e) => blurHandler(e)}
                  accept='.jpeg, .jpg'
                  type="file"
                  name="image"
                  id="formImage"
                  className='file-form__input' />
               <div className="file-form__button">Upload</div>
            </div>
            <div className="file-form__preview">
               {
                  image === ''
                     ? 'Upload your photo'
                     : <span>Item<img src={`${image}`} alt="" id='imagePreview' /></span>
               }
               {/* <img src={`${image}`} alt="" id='imagePreview' /> */}
            </div>
         </div>
         {(isDirty && error) && <div className="line-input__error">{error}</div>}
         {isDirty && <div className="line-input__dirty"></div>}
      </div>
   )
}

export default UploadImage