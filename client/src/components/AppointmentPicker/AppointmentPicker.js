import React from 'react';
import AppointmentPicker from 'appointment-picker';
import '../../../node_modules/appointment-picker/dist/appointment-picker.css';


class AppoPicker extends React.Component {

    constructor(props) {
        super(props);
        this.options = {
          leadingZero: true,
          mode: '12h',
          startTime: 9,
          endTime: 18,
          disabled: ["9:00", "10:00"]
        };
        this.state = { time: {} };
        this.pickerRef = React.createRef();
        this.onTimeSelect = this.onTimeSelect.bind(this);
    }

    onTimeSelect(event) {
        console.log('change.appo.picker', event.time);
        this.setState({ time: event.time });
        // Or do something different with your time object
    }

	render() {
        return (
            <div>
                <input type="text" ref={ this.pickerRef }></input>
            </div>);
	}

    componentDidMount() {
    	this.picker = new AppointmentPicker(this.pickerRef.current, this.options);
        this.pickerRef.current.addEventListener('change.appo.picker', this.onTimeSelect);
    }

    componentWillUnmount() {
        this.pickerRef.current.removeEventListener('change.appo.picker', this.onTimeSelect);
        this.picker.destroy();
    }
}

export default AppoPicker;