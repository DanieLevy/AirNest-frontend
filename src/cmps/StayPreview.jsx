import React from 'react'

export function StayPreview({ stay }) {

    return (
        <section className='stay-preview'>
            <div className='stay-card'>
                <div>
                    <img src="https://media.gettyimages.com/id/1322234491/photo/wide-angle-real-estate-interior-shot-of-a-beautiful-trendy-a-frame-tiny-home-in-western.jpg?s=170667a&w=gi&k=20&c=dHb27VRb6GMS3360Y1JJ7EH90WN61i6jgKBUXAW3e_k=" alt="" />
                </div>
                <div className='stay-card-details'>
                    <div className='title'>
                        <h1>{stay.name}</h1>
                        <div><i className="fa-solid fa-star"></i><span>4.9</span></div>
                    </div>
                    <p>{stay.summary}</p>
                    <p>Nov 10 - 15</p>
                    <div className='stay-price'>₪{stay.price} night</div>
                </div>
            </div >
        </section >
    )
}