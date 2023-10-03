import React from 'react'

export function StayPreview({ stay }) {

    return (
        <section>
            <div >
                <div>
                    <img src="https://media.gettyimages.com/id/1322234491/photo/wide-angle-real-estate-interior-shot-of-a-beautiful-trendy-a-frame-tiny-home-in-western.jpg?s=170667a&w=gi&k=20&c=dHb27VRb6GMS3360Y1JJ7EH90WN61i6jgKBUXAW3e_k=" alt="" />
                </div>
                <div className='flex'>
                    <h1>{stay.name}</h1>
                    <p>⭐4.9</p>
                </div>
                <p>Nov 10 - 15</p>
                <p>₪{stay.price} night</p>
            </div >
        </section >
    )
}