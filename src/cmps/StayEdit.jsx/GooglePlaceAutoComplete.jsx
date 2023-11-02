import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import { showErrorMsg } from "../../services/event-bus.service";
import { add } from "date-fns";
import { AiOutlineClear } from "react-icons/ai";

export function Component({ setLocation, stayLocation }) {
  console.log("stayLocation", stayLocation);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (stayLocation) {
      setAddress(stayLocation.address);
    }
  }, [stayLocation]);

  async function getPlaceDetails(placeId) {
    try {
      const location = await geocodeByPlaceId(placeId, "en");

      const address = location[0].formatted_address ?? "";
      const city = location[0]?.address_components[3]?.long_name ?? "";
      const country = location[0]?.address_components[5]?.long_name ?? "";
      const countryCode = location[0]?.address_components[5]?.short_name ?? "";
      const state = location[0]?.address_components[4]?.long_name ?? "";

      const lat = location[0]?.geometry?.location?.lat() ?? "";
      const lng = location[0].geometry.location.lng() ?? "";

      const streetNum = location[0].address_components[0].long_name ?? "";
      const street = location[0].address_components[1].long_name ?? "";

      const locationObj = {
        address,
        city,
        country,
        countryCode,
        state,
        lat,
        lng,
        street,
        streetNum,
      };

      setLocation(locationObj);
    } catch (err) {
      showErrorMsg("Cannot load location");
      console.log(err);
    }
  }

  function clearAddress() {
    setAddress("");
    setLocation("");
  }
  return (
    <section className="google-autocomplete">
      <button className="btn location-clear"
        hidden={!address}
        aria-label="Clear address"
        title="Clear address"
        name="Clear address"

       onClick={clearAddress} type="button"
      >
        <AiOutlineClear />
      </button>
      <div>
        <GooglePlacesAutocomplete
          apiKey="AIzaSyCF6YSAF__0aiqIrTE2ZClywS74stbpWuE"
          debounce={300}
          selectProps={{
            placeholder: stayLocation?.address ?? "Where are you going?",
            value: stayLocation?.address ?? address,
            onChange: (address) => {
              setAddress(address);
              getPlaceDetails(address.value.place_id);
            },
            // value: address.value.structured_formatting.main_text,
          }}
          onLoadFailed={(error) =>
            console.error("Could not inject Google script", error)
          }
        />
      </div>
    </section>
  );
}
