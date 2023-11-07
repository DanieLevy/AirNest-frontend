import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { stayService } from "../services/stay.service";
import { FormEditor } from "../cmps/StayEdit.jsx/FormEditor";
import { showErrorMsg } from "../services/event-bus.service";

export function StayEdit() {
  const [stay, setStay] = useState(stayService.getEmptyStay());
  const { stayId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (stayId) {
      loadStay();
    }
  }, [stayId]);

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId);
      setStay(stay);
    } catch (err) {
      console.log("err:", err);
      showErrorMsg("Cannot load stay");
    }
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      await stayService.save(stay);
      navigate("/stay");
    } catch (err) {
      console.log("err:", err);
      showErrorMsg("Cannot save stay");
    }
  }

  function setImgUrl(imgUrls) {
    setStay((prev) => ({
      ...prev,
      imgUrls,
    }));
  }

  function setLabels(labels) {
    setStay((prev) => ({
      ...prev,
      labels,
    }));
  }

  function setAmenities(amenities) {
    setStay((prev) => ({
      ...prev,
      amenities,
    }));
  }

  function setLocation(loc) {
    setStay((prev) => ({
      ...prev,
      loc,
    }));
  }

  function setPropertyType(propertyType) {
    console.log("ddd", propertyType.target);
    const propName = propertyType.target.name;
    const propValue = propertyType.target.value;
    setStay((prev) => ({
      ...prev,
      [propName]: propValue,
    }));
  }

  function handleInputChange(e) {
    let { name, value } = e.target;

    if (
      name === "price" ||
      name === "capacity" ||
      name === "bedrooms" ||
      name === "beds" ||
      name === "bathrooms"
    ) {
      setStay({ ...stay, [name]: parseFloat(value) });
      console.log(stay);
      return;
    }
    if (name === "country" || name === "city" || name === "address") {
      setStay({ ...stay, loc: { ...stay.loc, [name]: value } });
      console.log(stay);
      return;
    }
    setStay({ ...stay, [name]: value });
  }

  if (!stay)
    return (
      <PropagateLoader
        color={"#ff385c"}
        className="loader"
        speedMultiplier={0.8}
      />
    );
    
  return (
    <main>
      <FormEditor
        stay={stay}
        setLabels={setLabels}
        handleInputChange={handleInputChange}
        setLocation={setLocation}
        handleSubmit={handleSubmit}
        onUrlsChange={setImgUrl}
        onAmenitiesChange={setAmenities}
        onPropertyChange={setPropertyType}
      />
    </main>
  );
}
