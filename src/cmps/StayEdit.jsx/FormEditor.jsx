import { AmenitiesEditor } from "./AmenitiesEditor";
import { Component } from "./GooglePlaceAutoComplete";
import { ImagesEditor } from "./ImagesEditor";
import MultiSelectLabels from "./MultiSelectLabels";

export function FormEditor({ stay, handleInputChange, handleSubmit, onUrlsChange, onAmenitiesChange, setLabels, setLocation }) {

    return (
        <section className="main-layout">
            <form onSubmit={handleSubmit}>

                <div className="flex">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={stay.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <ImagesEditor urls={stay.imgUrls} onUrlsChange={onUrlsChange} className="main" />
                <Component setLocation={setLocation} stayLocation={stay.loc.formatedAddress} />

                {/* <div className="flex">s
                    Country:
                    <input
                        type="text"
                        name="country"
                        value={stay.loc.country}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="flex">
                    City:
                    <input
                        type="text"
                        name="city"
                        value={stay.loc.city}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="flex">
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={stay.loc.address}
                        onChange={handleInputChange}
                        required
                    />
                </div> */}

                <div style={{ display: 'flex', gap: 10 }}>
                    <label>Property type:</label>
                    <select onChange={handleInputChange} name="type" required>
                        <option value="house">house</option>
                        <option value="boat">boat</option>
                        <option value="farm">farm</option>
                        <option value="off-grid">off-grid</option>
                    </select>
                </div>

                <MultiSelectLabels selectedLabels={stay.labels} onLabelsChange={setLabels} />
                <AmenitiesEditor stay={stay} onAmenitiesChange={onAmenitiesChange} />

                <div className="flex">
                    Capacity:
                    <input
                        type="number"
                        name="capacity"
                        value={stay.capacity}
                        onChange={handleInputChange}
                        required
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
                            required
                        />
                    </div>
                    <div className="flex">
                        beds:
                        <input
                            type="number"
                            name="beds"
                            value={stay.beds}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex">
                        bathrooms:
                        <input
                            type="number"
                            name="bathrooms"
                            value={stay.bathrooms}
                            onChange={handleInputChange}
                            required
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
                        required
                    />
                </div>

                <div>
                    Description:
                    <textarea rows="10" cols="70"
                        name="summary"
                        value={stay.summary}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit">{stay._id ? 'Edit' : 'List '} your stay</button>
            </form>
        </section >
    )
}