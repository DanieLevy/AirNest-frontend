import { AmenitiesEditor } from "./AmenitiesEditor";
import { ImagesEditor } from "./ImagesEditor";

export function FormEditor({ stay, handleInputChange, handleSubmit, urls, onUrlsChange }) {

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div className="flex">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={stay.name}
                        onChange={handleInputChange}
                    />
                </div>

                <ImagesEditor urls={urls} onUrlsChange={onUrlsChange} className="main" />

                <div className="flex">
                    Country:
                    <input
                        type="text"
                        name="country"
                        value={stay.loc.country}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex">
                    City:
                    <input
                        type="text"
                        name="city"
                        value={stay.loc.city}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex">
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={stay.loc.address}
                        onChange={handleInputChange}
                    />
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                    <label>Property type:</label>
                    <select onChange={handleInputChange} name="type">
                        <option value="house">house</option>
                        <option value="boat">boat</option>
                        <option value="farm">farm</option>
                        <option value="off-grid">off-grid</option>
                    </select>
                </div>

                <AmenitiesEditor stay={stay} />

                <div className="flex">
                    Capacity:
                    <input
                        type="number"
                        name="capacity"
                        value={stay.capacity}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex" style={{ gap: 10 }}>
                    <div className="flex">
                        bedrooms:
                        <input
                            type="number"
                            name="bedrooms"
                            value={stay.bedrooms}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex">
                        beds:
                        <input
                            type="number"
                            name="beds"
                            value={stay.beds}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex">
                        bathrooms:
                        <input
                            type="number"
                            name="bathrooms"
                            value={stay.bathrooms}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="flex">
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={stay.price}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    Description:
                    <textarea rows="10" cols="70"
                        name="summary"
                        value={stay.summary}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit">{stay._id ? 'Edit' : 'List '} your stay</button>
            </form>
        </section >
    )
}