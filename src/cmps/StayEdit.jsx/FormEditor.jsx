import { StayMap } from "../StayDetails/StayMap";
import { AmenitiesEditor } from "./AmenitiesEditor";
import { Component } from "./GooglePlaceAutoComplete";
import { ImagesEditor } from "./ImagesEditor";
import MultiSelectLabels from "./MultiSelectLabels";
import { PropertyEditor } from "./PropertyEditor";
import { GiBunkBeds } from "react-icons/gi";
import { BrandedBtn } from "../BrandedBtn";

export function FormEditor({
  stay,
  handleInputChange,
  handleSubmit,
  onUrlsChange,
  onAmenitiesChange,
  setLabels,
  setLocation,
  onPropertyChange,
}) {
  return (
    <section className="main-layout">
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 40,
          paddingBottom: 40,
        }}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginTop: 40,
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.6em" }}>
              let's give your earth home a title
            </h1>
            <p style={{ fontSize: "0.8em" }}>
              {" "}
              Short titles work best. Have fun with it—you can always change it
              later.
            </p>
          </div>
          <div className="flex">
            <input
              type="text"
              style={{
                borderRadius: 5,
                border: "1px solid black",
                padding: 8,
                width: 200,
              }}
              rows="5"
              cols="30"
              name="name"
              value={stay.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </section>

        <div class="divider"></div>

        <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <h1 style={{ fontSize: "1.6em" }}>Property Type</h1>
          </div>
          <PropertyEditor
            selectProperty={stay.propertyType}
            onPropertyChange={onPropertyChange}
          />
        </section>

        <div class="divider"></div>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            width: 400,
          }}
        >
          <h1 style={{ fontSize: "1.6em" }}>Property address</h1>
          <Component
            setLocation={setLocation}
            stayLocation={stay.loc.formatedAddress}
          />
        </section>
        <StayMap loc={stay.loc} />
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
        {/* 
                <div style={{ display: 'flex', gap: 10 }}>
                    <select onChange={handleInputChange} name="type" required>
                        <option value="house">house</option>
                        <option value="boat">boat</option>
                        <option value="farm">farm</option>
                        <option value="off-grid">off-grid</option>
                    </select>
                </div> */}

        <div class="divider"></div>

        <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <h1 style={{ fontSize: "1.6em" }}>How does the property looks?</h1>
            <p style={{ fontSize: "0.8em" }}>put your best 5 photos.</p>
          </div>
          <ImagesEditor
            urls={stay.imgUrls}
            onUrlsChange={onUrlsChange}
            className="main"
          />
        </section>

        <div class="divider"></div>

        <section>
          <MultiSelectLabels
            selectedLabels={stay.labels}
            onLabelsChange={setLabels}
          />
        </section>

        <div class="divider"></div>

        <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <h1 style={{ fontSize: "1.6em" }}>
              Tell guests what your place has to offer
            </h1>
            <p style={{ fontSize: "0.8em" }}>
              You can add more amenities after you publish your listing.
            </p>
          </div>
          <AmenitiesEditor stay={stay} onAmenitiesChange={onAmenitiesChange} />
        </section>

        <div class="divider"></div>

        <div className="flex" style={{ flexDirection: "column" }}>
          <section>
            <div>
              <h1 style={{ fontSize: "1.6em" }}>
                Whats the capacity of the house
              </h1>
              <p style={{ fontSize: "0.8em" }}>how many guest can stay</p>
            </div>
            <input
              type="number"
              name="capacity"
              value={stay.capacity}
              onChange={handleInputChange}
              required
              style={{
                borderRadius: 5,
                border: "1px solid black",
                padding: 8,
              }}
            />
          </section>
        </div>

        <div className="flex" style={{ gap: 10, flexDirection: "column" }}>
          <div className="flex" style={{ gap: 10, flexDirection: "column" }}>
            <h1>bedrooms</h1>
            <input
              type="number"
              name="bedrooms"
              value={stay.bedrooms}
              onChange={handleInputChange}
              required
              style={{
                borderRadius: 5,
                border: "1px solid black",
                padding: 8,
                width: 200,
              }}
            />
          </div>
          <div className="flex" style={{ gap: 10, flexDirection: "column" }}>
            <h1>beds</h1>
            <input
              type="number"
              name="beds"
              value={stay.beds}
              onChange={handleInputChange}
              required
              style={{
                borderRadius: 5,
                border: "1px solid black",
                padding: 8,
                width: 200,
              }}
            />
          </div>
          <div className="flex" style={{ gap: 10, flexDirection: "column" }}>
            <h1>bathrooms</h1>
            <input
              type="number"
              name="bathrooms"
              value={stay.bathrooms}
              onChange={handleInputChange}
              required
              style={{
                borderRadius: 5,
                border: "1px solid black",
                padding: 8,
                width: 200,
              }}
            />
          </div>
        </div>

        <div class="divider"></div>

        <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <h1 style={{ fontSize: "1.6em" }}>Create your description</h1>
            <p style={{ fontSize: "0.8em" }}>
              Share what makes your place special.
            </p>
          </div>

          <div>
            <textarea
              style={{ borderRadius: 10, padding: 24, resize: "none" }}
              rows="10"
              cols="70"
              name="summary"
              value={stay.summary}
              onChange={handleInputChange}
              required
            />
          </div>
        </section>

        <div class="divider"></div>

        <section>
          <div>
            <h1 style={{ fontSize: "1.6em" }}>Set your price for a night</h1>
            <p style={{ fontSize: "0.8em" }}>You can change it anytime.</p>
          </div>
          <div className="flex">
            <input
              type="number"
              name="price"
              value={stay.price}
              onChange={handleInputChange}
              required
              style={{
                borderRadius: 5,
                border: "1px solid black",
                padding: 8,
              }}
            />
          </div>
        </section>

        {/* <button
          type="submit"
          style={{
            borderRadius: 5,
            border: "1px solid black",
            width: 200,
          }}
        >
          {stay._id ? "Edit" : "List "} your stay
        </button> */}
        <div style={{ width: "210px" }}>
          <BrandedBtn txt={`${stay._id ? "Edit" : "List "} your stay`} />
        </div>
      </form>
    </section>
  );
}
