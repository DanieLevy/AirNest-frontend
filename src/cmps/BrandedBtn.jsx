import { is } from "date-fns/locale";

export function BrandedBtn({ txt, borderRadius, width, icon = '', isActive = false }) {

  console.log(isActive, 'isActive');
  return (
    <button className={`btn-container ${isActive ? 'active' : ''}`} >
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='cell'></div>
      <div className='content' style={{ borderRadius: borderRadius, width: width }}>
        <button className='action-btn' type='submit'>
          <span className='branded-btn-txt'>{icon}{txt}</span>
        </button>
      </div>
    </button>
  )
}
