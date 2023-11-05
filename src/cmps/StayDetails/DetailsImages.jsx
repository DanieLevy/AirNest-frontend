function fillUpTo5(arr) {
    return new Array(5).fill('').map((_, i) => arr[i] || '')
}

function imageHtml(url, className) {
    return (
        <div className={className}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#E4E4E4',
                overflow: 'hidden',
            }}
            key={url}
        >
            <img
                src={url}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
                alt=''
            />
        </div>
    )
}

export function DetailsImages({ urls }) {
    const images = fillUpTo5(urls)

    return (
        <div className='images-editor-container'
        >
            {imageHtml(urls[0], 'main')}
            <div className='rest'>
                {images.slice(1).map((url) => {
                    if (!url) return ''
                    return imageHtml(url, '')
                })}
            </div>
        </div >
    );
}