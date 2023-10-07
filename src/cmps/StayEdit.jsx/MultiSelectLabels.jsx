import React, { useState } from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { stayService } from '../../services/stay.service.local';

const animatedComponents = makeAnimated();

export default function MultiSelectLabels({ selectedLabels, options = stayService.getLabels(), onLabelsChange }) {

    if (!options) return
    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            value={selectedLabels}
            options={options}
            onChange={onLabelsChange}
            required
        />
    );
}
