import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';

export function Component() {
    const [value, setValue] = useState(null);

    async function getPlaceDetails(placeId) {
        try {
            const location = await geocodeByPlaceId(placeId)

            const locationDetails = location[0].address_components.reduce((acc, curr) => {
                if (curr.types.includes('route')) {
                    acc.address = curr.short_name
                }
                if (curr.types.includes('locality')) {
                    acc.city = curr.long_name
                }
                if (curr.types.includes('country')) {
                    acc.country = curr.long_name
                    acc.countryCode = curr.short_name
                }
                return acc
            }, {})

            const streetNumber = location[0].address_components.find(address => address.types.includes('street_number')).short_name
            if (streetNumber) locationDetails.address = `${locationDetails.address} ${streetNumber}`

            locationDetails.lat = location[0].geometry.location.lat()
            locationDetails.lng = location[0].geometry.location.lng()
            locationDetails.formatedAddress = location[0].formatted_address.split(',')
            locationDetails.placeId = placeId

            console.log('obj:', locationDetails)
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div>
            <GooglePlacesAutocomplete
                apiKey='AIzaSyCF6YSAF__0aiqIrTE2ZClywS74stbpWuE'
                debounce={300}
                selectProps={{
                    value,
                    onChange: (newValue) => {
                        setValue(newValue);
                        if (newValue?.value.place_id) {
                            getPlaceDetails(newValue.value.place_id);
                        }
                    },
                }}
                onLoadFailed={(error) => (
                    console.error("Could not inject Google script", error)
                )}
            />
        </div>
    )
}

