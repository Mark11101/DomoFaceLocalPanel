import React from 'react'
import Slider from '@material-ui/core/Slider'

import appendClassName from '../../../utils/string/appendClassName'

const SliderWrapper = (props) => {
	const {
		header,
		className,
		value,
		step = 10,
		min = 0,
		max = 100,
		marks = true,
		onChange,
		onBlur
	} = props;

	return (
		<div className={
			className
			?
				appendClassName('b-slider', className)
			:
				'b-slider'
		}>
			<small>
				{header}
			</small>
			<Slider
				value={Number(value)}
				getAriaValueText={(value) => value}
				aria-labelledby="discrete-slider"
				valueLabelDisplay="auto"
				step={step}
				marks={marks}
				min={min}
				max={max}
				onBlur={onBlur}
				onChange={onChange}
			/>
		</div>
	)
}

export default SliderWrapper
